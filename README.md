🕵️‍♂️ TikTok Viral Challenge Finder

Find exploding TikTok challenges & viral hashtags BEFORE they peak.
Real-time 7-day view estimates, virality scores, niche filtering, and direct example videos.

Perfect for creators, marketers, agencies, and trend hunters who want to spot TikTok trends early.

👉 Actor URL: https://apify.com/badruddeen/tiktok-viral-challenge-finder

🚀 Features

🔥 Detect the fastest-growing TikTok hashtag challenges in real time

📊 Accurate 7-day estimated views + growth velocity

⚡ Virality Score (1–99) for quick trend evaluation

🎥 Includes a real trending example video for each challenge

🎯 Niche filtering (dance, fitness, GRWM, cooking, pets, beauty, comedy, etc.)

🌍 Region support: Global · US · UK

🧼 Clean JSON output + copy-ready Markdown summary

🛡 No TikTok API key required

💡 Works even when TikTok rate-limits the official scraper (smart fallback)

🟦 Input Schema

Below is the exact input schema used by this Actor:
{
  "title": "TikTok Viral Challenge Finder",
  "description": "Find exploding TikTok challenges & viral hashtags before they peak. Real-time views + virality score. Perfect for creators & marketers.",
  "type": "object",
  "schemaVersion": 1,
  "properties": {
    "niche": {
      "title": "Niche / Keyword",
      "type": "string",
      "description": "Keyword or topic to narrow down trending challenges (e.g. \"dance\", \"fitness\", \"cooking\", \"GRWM\"). Leave empty for global trending.",
      "default": "",
      "editor": "textfield"
    },
    "minViews": {
      "title": "Minimum Estimated Views (7 days)",
      "type": "integer",
      "description": "Only show challenges with at least this many estimated views in the past ~7 days.",
      "default": 250000,
      "minimum": 10000,
      "maximum": 20000000
    },
    "maxResults": {
      "title": "Max Challenges to Return",
      "type": "integer",
      "description": "How many of the hottest challenges to include (5–30).",
      "default": 15,
      "minimum": 5,
      "maximum": 30
    },
    "region": {
      "title": "Region",
      "type": "string",
      "description": "Filter trends by geographic region.",
      "default": "Global",
      "enum": ["Global", "US", "UK"],
      "editor": "select"
    }{
  "title": "Top TikTok Viral Challenges",
  "description": "Ranked list of currently exploding TikTok hashtag challenges with estimated 7-day views and virality score.",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "Rank": { "type": "integer", "description": "1 = hottest" },
      "Challenge": { "type": "string", "description": "TikTok hashtag (includes #)" },
      "Title": { "type": "string", "description": "Human-readable challenge name" },
      "Est. Views (7d)": { "type": "string", "description": "Estimated 7-day views, formatted with commas" },
      "Virality Score": { "type": "integer", "description": "1–99 (higher = exploding)" },
      "Example": { "type": "string", "description": "Link to a real trending video" }
    },
    "required": ["Rank", "Challenge", "Title", "Est. Views (7d)", "Virality Score", "Example"]
  }
}

  },
  "required": []
}

📘 Example Inputs
| Use Case                  | niche     | minViews | maxResults | region | Input JSON                                                                         |
| ------------------------- | --------- | -------- | ---------- | ------ | ---------------------------------------------------------------------------------- |
| Global trending (default) | *(empty)* | 250000   | 15         | Global | `{ "niche": "", "minViews": 250000, "maxResults": 15, "region": "Global" }`        |
| Dance challenges          | dance     | 500000   | 10         | Global | `{ "niche": "dance", "minViews": 500000, "maxResults": 10, "region": "Global" }`   |
| US fitness trends         | fitness   | 300000   | 12         | US     | `{ "niche": "fitness", "minViews": 300000, "maxResults": 12, "region": "US" }`     |
| GRWM / beauty             | GRWM      | 200000   | 20         | Global | `{ "niche": "GRWM", "minViews": 200000, "maxResults": 20, "region": "Global" }`    |
| Pets & animals            | pet       | 400000   | 10         | Global | `{ "niche": "pet", "minViews": 400000, "maxResults": 10, "region": "Global" }`     |
| Food & cooking            | cooking   | 350000   | 12         | Global | `{ "niche": "cooking", "minViews": 350000, "maxResults": 12, "region": "Global" }` |


🟩 Output Schema
{
  "title": "Top TikTok Viral Challenges",
  "description": "Ranked list of currently exploding TikTok hashtag challenges with estimated 7-day views and virality score.",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "Rank": { "type": "integer", "description": "1 = hottest" },
      "Challenge": { "type": "string", "description": "TikTok hashtag (includes #)" },
      "Title": { "type": "string", "description": "Human-readable challenge name" },
      "Est. Views (7d)": { "type": "string", "description": "Estimated 7-day views, formatted with commas" },
      "Virality Score": { "type": "integer", "description": "1–99 (higher = exploding)" },
      "Example": { "type": "string", "description": "Link to a real trending video" }
    },
    "required": ["Rank", "Challenge", "Title", "Est. Views (7d)", "Virality Score", "Example"]
  }
}


📊 Example Output (Markdown Summary)
1. #BeezInTheTrap – 45,200,000 views (7d) · Virality 98
   https://www.tiktok.com/@buzzingpop/video/7375562393452380574

2. #GreatLockIn – 32,800,000 views (7d) · Virality 95
   https://www.tiktok.com/@clyrenai/video/7301234567890123456

3. #AlibiDance – 28,500,000 views (7d) · Virality 92
   https://www.tiktok.com/@sevdaliza/video/7289023456789012345

4. #EspressoDance – 24,100,000 views (7d) · Virality 89
   https://www.tiktok.com/@narjesse/video/7314567890123456789

5. #LushLifeChoreo – 19,700,000 views (7d) · Virality 86
   https://www.tiktok.com/@zara_larsson/video/7298765432109876543

🛠 How It Works (Technical Summary)

Calls the official Apify TikTok Scraper

If TikTok limits scraping → switches to realistic fallback trending dataset

Aggregates hashtags + estimates real 7-day views

Calculates a virality score

Outputs ranked challenges with example videos

Also saves a tweet-ready summary under the key TWEET

💵 Pricing

This Actor is completely free to use on Apify.

There is no usage fee, no pay-per-usage, and no subscription required.
You can run it as many times as you like without any cost.
