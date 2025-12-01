const Apify = require('apify');

Apify.main(async () => {
    const input = await Apify.getInput();
    const { niche = '', minViews = 500000, maxResults = 10, region = 'global' } = input || {};

    const searchQueries = niche
        ? [niche, `${niche} challenge`, `#${niche.replace(/\s+/g, '')}`]
        : ['trending', 'viral', 'fyp'];

    const results = [];

    for (const query of searchQueries.slice(0, 3)) {
        const { items } = await Apify.call('apify/tiktok-scraper', {
            searchQueries: [query],
            maxResults: 50,
            region,
            shouldDownloadVideos: false,
        });

        for (const item of items) {
            if (!item.hashtags || results.length >= maxResults * 3) continue;

            for (const tag of item.hashtags) {
                const existing = results.find(r => r.name === tag.name);
                const views = tag.videoCount * 5000; // rough estimate

                if (views >= minViews) {
                    if (existing) {
                        existing.views += views / 3;
                        existing.sampleVideos.push(item.webVideoUrl);
                    } else {
                        results.push({
                            name: tag.name,
                            title: tag.title,
                            views: Math.round(views),
                            sampleVideos: [item.webVideoUrl],
                            author: item.authorMeta.name,
                        });
                    }
                }
            }
        }
    }

    // Sort & slice
    const final = results
        .sort((a, b) => b.views - a.views)
        .slice(0, maxResults)
        .map((r, i) => ({
            rank: i + 1,
            challenge: r.name,
            estimatedViewsLast7d: r.views.toLocaleString(),
            viralityScore: Math.min(99, Math.round((r.views / 1000000) * 10)),
            exampleVideo: r.sampleVideos[0],
        }));

    // Push beautiful output
    await Apify.pushData(final);

    console.log(`Found ${final.length} viral challenges for "${niche || 'trending'}"`);
});
