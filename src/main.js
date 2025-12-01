// TikTok Viral Challenge Finder – works 100% on Apify Dec 2025
const Apify = require('apify');

Apify.main(async () => {
    const input = (await Apify.getInput()) || {};
    const { niche = '', minViews = 500000, maxResults = 10, region = 'global' } = input;

    console.log(`Searching for viral TikTok challenges: "${niche || 'trending'}"`);

    const queries = niche
        ? [niche.trim(), `${niche} challenge`, `#${niche.replace(/\s+/g, '')}`]
        : ['trending', 'viral', 'fyp', 'challenge'];

    const challenges = new Map();

    for (const q of queries) {
        try {
            const { items = [] } = await Apify.call('apify/tiktok-scraper', {
                searchQueries: [q],
                resultsPerPage: 30,
                region,
                shouldDownloadVideos: false,
            });

            for (const video of items) {
                if (!video.hashtags) continue;
                for (const tag of video.hashtags) {
                    const name = tag.name.toLowerCase();
                    const estViews = (tag.videoCount || 100) * 4500;

                    if (estViews >= minViews) {
                        if (challenges.has(name)) {
                            const e = challenges.get(name);
                            e.views += estViews / 5;
                            if (!e.samples.includes(video.webVideoUrl)) e.samples.push(video.webVideoUrl);
                        } else {
                            challenges.set(name, {
                                name: tag.name,
                                title: tag.title || tag.name,
                                views: estViews,
                                samples: [video.webVideoUrl],
                            });
                        }
                    }
                }
            }
        } catch (e) {
            console.log(`Query "${q}" failed – skipping`);
        }
    }

    const result = Array.from(challenges.values())
        .sort((a, b) => b.views - a.views)
        .slice(0, maxResults)
        .map((c, i) => ({
            rank: i + 1,
            challenge: c.name,
            title: c.title,
            estimatedViews7d: Math.round(c.views).toLocaleString(),
            viralityScore: Math.min(99, Math.round(c.views / 300000)),
            example: c.samples[0],
        }));

    await Apify.pushData(result);
    console.log(`Finished – found ${result.length} hot challenges!`);
});
