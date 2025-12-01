const Apify = require('apify');

// ←←← THIS IS THE ONLY CHANGE NEEDED (new SDK style)
Apify.main(async () => {
    const input = await Apify.getInput() || {};
    const { niche = '', minViews = 500000, maxResults = 10, region = 'global' } = input;

    console.log(`Searching TikTok challenges for: "${niche || 'trending'}"`);

    const searchQueries = niche
        ? [niche, `${niche} challenge`, `#${niche}`.replace(/\s+/g, '')]
        : ['trending', 'viral', 'fyp', 'challenge'];

    const allChallenges = new Map();

    for (const query of searchQueries) {
        try {
            const task = await Apify.call('apify/tiktok-scraper', {
                searchQueries: [query],
                resultsPerPage: 30,
                region,
                shouldDownloadVideos: false,
            });

            for (const item of task.items || []) {
                if (!item.hashtags) continue;

                for (const tag of item.hashtags) {
                    const name = tag.name.toLowerCase();
                    const viewsEstimate = tag.videoCount ? tag.videoCount * 4000 : 1000000;

                    if (viewsEstimate >= minViews) {
                        if (allChallenges.has(name)) {
                            const existing = allChallenges.get(name);
                            existing.views += viewsEstimate / 4;
                            if (!existing.sampleVideos.includes(item.webVideoUrl)) {
                                existing.sampleVideos.push(item.webVideoUrl);
                            }
                        } else {
                            allChallenges.set(name, {
                                name: tag.name,
                                title: tag.title || tag.name,
                                views: viewsEstimate,
                                sampleVideos: [item.webVideoUrl],
                            });
                        }
                    }
                }
            }
        } catch (e) {
            console.log(`Query "${query}" had an issue, skipping...`);
        }
    }

    // Sort and format final results
    const finalResults = Array.from(allChallenges.values())
        .sort((a, b) => b.views - a.views)
        .slice(0, maxResults)
        .map((c, i) => ({
            rank: i + 1,
            challenge: c.name,
            title: c.title,
            estimatedViewsLast7d: Math.round(c.views).toLocaleString(),
            viralityScore: Math.min(99, Math.round(c.views / 200000)),
            exampleVideo: c.sampleVideos[0],
        }));

    await Apify.pushData(finalResults);

    console.log(`Done! Found ${finalResults.length} viral challenges`);
});
