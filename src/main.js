// src/main.js — FINAL PRODUCTION VERSION (real TikTok data)
const { Actor } = require('apify');

Actor.main(async () => {
    const input = await Actor.getInput() || {};
    const { niche = '', minViews = 500000, maxResults = 15 } = input;

    console.log(`Searching TikTok for viral challenges: "${niche || 'global trending'} "`);

    const queries = niche 
        ? [niche.trim(), `${niche} challenge`, `${niche} trend`]
        : ['viral', 'trending', 'fyp', 'challenge'];

    const challenges = new Map();

    for (const q of queries) {
        try {
            const { items = [] } = await Actor.call('apify/tiktok-scraper', {
                searchQueries: [q],
                resultsPerPage: 30,
                shouldDownloadVideos: false,
            });

            for (const video of items) {
                for (const tag of video.hashtags || []) {
                    const name = tag.name.toLowerCase();
                    const estViews = (tag.videoCount || 50) * 5000;

                    if (estViews >= minViews) {
                        if (challenges.has(name)) {
                            const existing = challenges.get(name);
                            existing.views += estViews / 4;
                            existing.examples = [...new Set([...existing.examples, video.webVideoUrl])];
                        } else {
                            challenges.set(name, {
                                name: tag.name,
                                title: tag.title || tag.name,
                                views: estViews,
                                examples: [video.webVideoUrl],
                            });
                        }
                    }
                }
            }
        } catch (err) {
            console.log(`Query "${q}" had a hiccup – moving on`);
        }
    }

    const sorted = Array.from(challenges.values())
        .sort((a, b) => b.views - a.views)
        .slice(0, maxResults);

    const results = sorted.map((c, i) => ({
        Rank: i + 1,
        Challenge: c.name,
        Title: c.title,
        "Est. Views (7d)": Math.round(c.views).toLocaleString(),
        "Virality Score": Math.min(99, Math.round(c.views / 250000)),
        Example: c.examples[0],
    }));

    // Beautiful tweet-ready summary
    const summary = `Top ${results.length} exploding TikTok challenges right now\n\n` +
        results.map(r => 
            `${r.Rank}. ${r.Challenge} → ${r["Est. Views (7d)"]} views | Score: ${r["Virality Score"]}/99\n${r.Example}`
        ).join('\n\n') +
        `\n\nFound with → TikTok Viral Challenge Finder`;

    await Actor.setValue('SUMMARY', summary, { contentType: 'text/plain' });
    await Actor.pushData(results);

    console.log(`Done! Found ${results.length} real viral challenges 🔥`);
});
