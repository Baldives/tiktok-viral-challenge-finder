# TikTok Viral Challenge Finder

Find exploding TikTok challenges & viral hashtags BEFORE they peak.
Real-time 7-day view estimates, virality scores, niche filtering, and direct example videos.

## Features

- Detect the fastest-growing TikTok hashtag challenges in real time
- Accurate 7-day estimated views + growth velocity
- Virality Score (1–99) for quick trend evaluation
- Includes a real trending example video for each challenge
- Niche filtering: dance, fitness, GRWM, cooking, pets, beauty, comedy
- Region support: Global · US · UK
- Clean JSON output + copy-ready Markdown summary
- No TikTok API key required

## Input Schema

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| niche | string | Keyword to narrow down challenges | "" |
| minViews | integer | Minimum estimated views | 250000 |
| maxResults | integer | Max challenges to return | 15 |
| region | string | Filter by region | Global |

## Example Input

```json
{
  "niche": "dance",
  "minViews": 300000,
  "maxResults": 10,
  "region": "Global"
}

Output Schema

Returns an array of challenges with:

Rank (integer)

Challenge (string)

Title (string)

Est_Views_7d (string)

Virality_Score (integer)

Example (string)

Also stores a tweet-ready summary under the key TWEET.

Example Output
[
  {
    "Rank": 1,
    "Challenge": "#DanceTrend",
    "Title": "New Dance Moves",
    "Est_Views_7d": "2,500,000",
    "Virality_Score": 95,
    "Example": "https://www.tiktok.com/@trending/video/743927"
  }
]

Actor URL: https://apify.com/badruddeen/tiktok-viral-challenge-finder
