const { Actor } = require('apify');

Actor.main(async () => {
    const input = await Actor.getInput() || {};
    const { niche = '', minViews = 500000, maxResults = 10, region = 'global' } = input;

    console.log('Starting TikTok Viral Challenge Finder...');

    // Mock results for syntax testing (replace with real scraper once this runs)
    const mockResults = [
        {
            rank: 1,
            challenge: '#RenegadeDance',
            estimatedViews7d: '1,250,000',
            viralityScore: 89,
            example: 'https://www.tiktok.com/@example/video/123456'
        },
        {
            rank: 2,
            challenge: '#GRWMChallenge',
            estimatedViews7d: '980,000',
            viralityScore: 82,
            example: 'https://www.tiktok.com/@example/video/789012'
        },
        {
            rank: 3,
            challenge: '#PetTricks',
            estimatedViews7d: '720,000',
            viralityScore: 76,
            example: 'https://www.tiktok.com/@example/video/345678'
        }
    ].slice(0, maxResults).filter(r => parseInt(r.estimatedViews7d.replace(/,/g, '')) >= minViews);

    await Actor.pushData(mockResults);
    console.log(`Success! Found ${mockResults.length} challenges (mock mode)`);
});
