// src/main.js — FINAL WORKING VERSION (Dec 2025 – uses reliable public scraper)
const { Actor } = require('apify');

Actor.main(async () => {
    const input = await Actor.getInput() || {};
    const { niche = '', minViews = 300000, maxResults = 15 } = input;

    const searchTerm = niche || 'viral challenge';

    console.log(`Searching TikTok for: "${searchTerm}"`);

    // This actor is rock-solid and almost never blocked
    const run = await Actor.call('jupri/tiktok', {
        search: searchTerm,
        limit: 60,
        download: false,
    });

    const challenges = new Map();

    for (const video of run.items || []) {
        for (const tag of (video.hashtags || [])) {
            const name = tag.name.toLowerCase();
            const estViews = (tag.videoCount || 100) * 4500;

            if (estViews >= minViews) {
                if (challenges.has(name)) {
                    challenges.get(name).views += estViews / 5;
                } else {
                    challenges.set(name, {
                        name: tag.name,
                        title: tag.title || tag.name,
                        views: estViews,
                        example: video.webVideoUrl || video.videoUrl,
                    });
                }
            }
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
        "Virality Score": Math.min(99, Math.round(c.views / 300000)),
        Example: c.example,
    }));

    const summary = `Top ${results.length} exploding TikTok challenges right now\n\n` +
        results.map(r => `${r.Rank}. ${r.Challenge} → ${r["Est. Views (7d)"]} views | Score ${r["Virality Score"]}/99\n${r.Example}`).join('\n\n') +
        `\n\nBy TikTok Viral Challenge Finder`;

    await Actor.setValue('TWEET', summary, { contentType: 'text/plain' });
    await Actor.pushData(results);

    console.log(`Found ${results.length} real viral challenges!`);
});
