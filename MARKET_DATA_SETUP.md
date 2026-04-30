# Quarterly Market Data Updates Setup

This guide walks you through setting up automatic quarterly market data updates from RentCast API.

## Step 1: Get RentCast API Key (Free)

1. Go to https://www.rentcast.io/api
2. Sign up for a free account
3. Get your free API key (50 calls/month is plenty for 13 neighborhoods × quarterly)
4. Save your API key

## Step 2: Add Secrets to GitHub

1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Add the following secrets:

| Secret Name | Value |
|---|---|
| `RENTCAST_API_KEY` | Your RentCast API key |
| `SANITY_PROJECT_ID` | From your `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`) |
| `SANITY_DATASET` | From your `.env.local` (`NEXT_PUBLIC_SANITY_DATASET`) |
| `SANITY_API_TOKEN` | From your `.env.local` (`SANITY_API_TOKEN`) |

## Step 3: Verify Neighborhood Zip Codes

The script maps neighborhoods to zip codes. Check these are accurate for your use case:

```javascript
// In scripts/update-neighborhood-market-data.js
const NEIGHBORHOOD_ZIPS = {
  'Atwater Village': '90039',
  'Beverly Grove': '90036',
  'Culver City': '90230',
  'Echo Park': '90026',
  // ... etc
}
```

Adjust zip codes if needed based on your target areas.

## Step 4: Test Locally (Optional)

```bash
# Add to your .env.local
RENTCAST_API_KEY=your_api_key_here

# Run the script manually
node scripts/update-neighborhood-market-data.js
```

## Automatic Schedule

The workflow runs automatically on the first day of each quarter at 9 AM UTC:
- January 1
- April 1
- July 1
- October 1

To run manually:
1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Quarterly Market Data Update**
4. Click **Run workflow**

## Data Updated

Each quarterly run updates:
- Median home price
- Average days on market
- Active listings count
- Price per square foot
- Year-over-year price change (calculated from previous quarter)
- Last updated timestamp

## Notes

- RentCast's free tier allows 50 API calls/month, which is plenty (13 neighborhoods = 13 calls per run)
- Data is pulled for the primary zip code of each neighborhood
- For multi-zip neighborhoods, you can add multiple zip codes and average the results if needed
- Historical data is automatically compared to calculate year-over-year changes
