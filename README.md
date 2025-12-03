# TikTok Viral Challenge Finder

**Find exploding TikTok challenges & viral hashtags BEFORE they peak.**  
Real-time 7-day view estimates, virality scores, and top example videos — the ultimate early-warning radar for creators, marketers, and trend hunters.

One click → get the top 5–30 fastest-growing challenges with ready-to-post Markdown summaries.

**Actor URL:** https://apify.com/badruddeen/tiktok-viral-challenge-finder

### Features
- Real-time detection of the fastest-growing TikTok hashtag challenges
- Estimated 7-day view counts + growth velocity
- Virality Score (1–99) — higher = exploding faster right now
- Direct link to a real trending example video for each challenge
- Niche filtering (dance, fitness, GRWM, pets, cooking, beauty, prank, etc.)
- Region support: **Global** · **US** · **UK**
- Clean JSON + copy-paste-ready Markdown output
- No TikTok API key required

### Input Schema (INPUT_SCHEMA.json)

```json
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
      "prefill": "",
      "editor": "textfield"
    },
    "minViews": {
      "title": "Minimum Estimated Views (7 days)",
      "type": "integer",
      "description": "Only show challenges with at least this many estimated views in the past ~7 days.",
      "default": 250000,
      "minimum": 10000,
      "maximum": 20000000,
      "unit": "views",
      "editor": "number"
    },
    "maxResults": {
      "title": "Max Challenges to Return",
      "type": "integer",
      "description": "How many of the hottest challenges to include (5–30).",
      "default": 15,
      "minimum": 5,
      "maximum": 30,
      "editor": "number"
    },
    "region": {
      "title": "Region",
      "type": "string",
      "description": "Filter trends by geographic region.",
      "default": "Global",
      "enum": ["Global", "US", "UK"],
      "editor": "select"
    }
  },
  "required": []
}

// 1. Global trending (default & most popular)
{
  "niche": "",
  "minViews": 250000,
  "maxResults": 15,
  "region": "Global"
}

// 2. Dance challenges only
{
  "niche": "dance",
  "minViews": 500000,
  "maxResults": 10,
  "region": "Global"
}

// 3. US fitness & workout trends
{
  "niche": "fitness",
  "minViews": 300000,
  "maxResults": 12,
  "region": "US"
}

// 4. GRWM / Get Ready With Me (beauty & fashion)
{
  "niche": "GRWM",
  "minViews": 200000,
  "maxResults": 20,
  "region": "Global"
}

// 5. Pet & animal content only
{
  "niche": "pet",
  "minViews": 400000,
  "maxResults": 10,
  "region": "Global"
}


{
  "title": "Top TikTok Viral Challenges",
  "description": "Ranked list of currently exploding TikTok hashtag challenges with estimated 7-day views and virality score.",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "Rank": {
        "title": "Rank",
        "type": "integer",
        "description": "Position in the current trending list (1 = hottest)"
      },
      "Challenge": {
        "title": "Hashtag",
        "type": "string",
        "description": "The TikTok hashtag (includes the #)"
      },
      "Title": {
        "title": "Challenge Title",
        "type": "string",
        "description": "Human-readable name of the challenge"
      },
      "Est. Views (7d)": {
        "title": "Est. Views (7d)",
        "type": "string",
        "description": "Estimated total views in the last ~7 days, formatted with commas"
      },
      "Virality Score": {
        "title": "Virality Score",
        "type": "integer",
        "description": "1–99 score (higher = exploding faster right now)"
      },
      "Example": {
        "title": "Example Video URL",
        "type": "string",
        "description": "Direct link to a real trending video using this hashtag"
      }
    },
    "required": [
      "Rank",
      "Challenge",
      "Title",
      "Est. Views (7d)",
      "Virality Score",
      "Example"
    ]
  }
}


1. #BeezInTheTrap – 45,200,000 views (7d) · Virality 98  
   → https://www.tiktok.com/@buzzingpop/video/7375562393452380574

2. #GreatLockIn – 32,800,000 views (7d) · Virality 95  
   → https://www.tiktok.com/@clyrenai/video/7301234567890123456

3. #AlibiDance – 28,500,000 views (7d) · Virality 92  
   → https://www.tiktok.com/@sevdaliza/video/7289023456789012345

4. #EspressoDance – 24,100,000 views (7d) · Virality 89  
   → https://www.tiktok.com/@narjesse/video/7314567890123456789

5. #LushLifeChoreo – 19,700,000 views (7d) · Virality 86  
   → https://www.tiktok.com/@zara_larsson/video/7298765432109876543
...

