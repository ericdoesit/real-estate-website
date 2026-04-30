# Hello LA Home - Content & Data Guide

## Overview

This guide explains how to populate your site with content. The site pulls all content from Sanity CMS, not from code.

---

## Three Ways to Add Content

### 1. **Sanity Studio UI** (Easiest)
- Go to `http://localhost:3000/studio`
- Click "Create" button in the left sidebar
- Select the content type (Property, Blog Post, Neighborhood Guide)
- Fill in fields
- Click "Publish"

### 2. **Bulk Upload via CSV** (If available)
- Some Sanity plans support CSV import
- Check your Sanity project dashboard

### 3. **API Script** (Advanced)
See `scripts/seed-sanity.js` for example. Requires write token.

---

## Content Types & Fields

### NEIGHBORHOOD GUIDE

**What it is:** A detailed guide to a specific LA neighborhood

**Where it appears:**
- Homepage neighborhood teaser grid
- `/neighborhoods` - neighborhood index
- `/neighborhoods/[slug]` - detail page

**Fields to fill:**

| Field | Type | Required | Example |
|-------|------|----------|---------|
| name | String | Yes | "Mid City" |
| slug | Slug | Yes | "mid-city" (auto-generated) |
| tagline | String | Yes | "LA's vibrant heart" |
| overview | Rich Text | Yes | Detailed neighborhood description |
| heroImage | Image | No | Large header image |
| marketStats | Object | Yes | See below |
| lifestyleHighlights | Array | No | See below |
| seo | Object | No | SEO meta fields |

**Market Stats Object:**
```json
{
  "medianPrice": 850000,
  "avgDaysOnMarket": 18,
  "activeListings": 24,
  "pricePerSqFt": 650,
  "yoyPriceChange": 3.2,
  "lastUpdated": "2024-04-29"
}
```

**Lifestyle Highlights Array** (multiple items):
```json
{
  "category": "Dining",
  "name": "World-Class Restaurants",
  "note": "Home to some of LA's most acclaimed chefs"
}
```

---

### PROPERTY

**What it is:** A real estate listing (active or sold)

**Where it appears:**
- `/properties` - property listing page
- `/properties/[id]` - detail page
- Homepage FeaturedListings (if marked as featured)

**Fields to fill:**

| Field | Type | Required | Example |
|-------|------|----------|---------|
| address | String | Yes | "4225 Via Arbolada #500" |
| slug | Slug | Yes | "4225-via-arbolada-500" |
| status | Select | Yes | active/pending/sold/off-market |
| beds | Number | Yes | 3 |
| baths | Number | Yes | 2.5 |
| sqft | Number | Yes | 2100 |
| propertyType | String | Yes | House/Condo/Townhouse |
| listPrice | Number | If active | 2450000 |
| soldPrice | Number | If sold | 2100000 |
| soldDate | Date | If sold | 2024-02-15 |
| isFeatured | Boolean | No | true (shows on homepage) |
| description | Rich Text | No | Full property description |
| features | Array | No | ["Hardwood Floors", "City Views"] |
| heroImage | Image | No | Main property photo |
| gallery | Image Array | No | Multiple property photos |

**Sold Portfolio Strategy:**
- Create all 13+ sold properties as "sold" status
- Add soldPrice and soldDate
- Add property descriptions
- Add heroImage (at least one photo per property)
- This builds trust showing your track record

**Featured Properties:**
- Set `isFeatured: true` for 3-5 current/recent listings
- These appear on homepage
- Rotate frequently to keep homepage fresh

---

### BLOG POST

**What it is:** Educational content: market updates, guides, tips, analysis

**Where it appears:**
- `/blog` - blog index
- `/blog/[slug]` - individual post

**Fields to fill:**

| Field | Type | Required | Example |
|-------|------|----------|---------|
| title | String | Yes | "Understanding SB9" |
| slug | Slug | Yes | "understanding-sb9" |
| excerpt | String | Yes | "California SB9 is changing the landscape..." |
| publishedAt | Date | Yes | 2024-03-15 |
| author | String | Yes | "Eric Zunkley" |
| category | Select | Yes | See below |
| body | Rich Text | Yes | Full post content |
| coverImage | Image | No | Featured image |
| seo | Object | No | SEO metadata |

**Categories:**
- Market Update
- Buying Guide
- Selling Tips
- Neighborhood Spotlight
- Legislation

**Content Ideas:**

1. **Market Update** (Monthly/Quarterly)
   - LA market snapshot
   - Price trends
   - Inventory levels
   - Days on market stats
   - Predictions for next quarter

2. **Buying Guide** (Evergreen)
   - How to find homes
   - What to look for in LA
   - Neighborhoods for first-time buyers
   - Investment opportunities
   - Pre-approval tips

3. **Selling Tips** (Evergreen)
   - Staging your home
   - Pricing strategy
   - Marketing your property
   - Negotiation tactics
   - Timing the market

4. **Neighborhood Spotlight**
   - Deep dive into specific area
   - History and character
   - Notable properties sold
   - Schools and amenities
   - Investment potential

5. **Legislation**
   - SB9 (duplex conversion)
   - Prop 13 (property tax)
   - Local rent control
   - ADU regulations
   - Tax benefits

---

## Content Calendar Recommendations

### Month 1 (Setup Phase)
- [ ] 6 Neighborhood Guides (Mid City, Eagle Rock, Highland Park, West Adams, Venice, Silver Lake)
- [ ] 10-15 Sold Properties (your portfolio)
- [ ] 2 Blog Posts (Welcome post, recent market update)

### Ongoing (Monthly)
- [ ] 1 Market Update blog post (1st week)
- [ ] Update 1-2 neighborhood market stats (if data available)
- [ ] Add new property listing or update sold properties
- [ ] 1 How-to or educational blog post

### Quarterly
- [ ] Add 2-3 new property listings
- [ ] Write major market analysis post
- [ ] Review and update all neighborhood stats
- [ ] Check and fix any outdated information

---

## Data Sources for Market Stats

**Where to get accurate neighborhood data:**

1. **MLS Data** - Your brokerage eXp Realty provides this
2. **Zillow/Redfin API** - If subscribed
3. **CBRE/CBRE Research** - Commercial real estate reports
4. **LAO (LA Office of Finance)** - Public real estate data
5. **Local Property Records** - County assessor office
6. **Your Personal Transaction History** - Use recent closings

**What to update regularly:**
- Median prices (monthly if possible)
- Days on market (monthly)
- Active listings count (monthly)
- Price per sqft (quarterly)
- Year-over-year changes (yearly)

---

## SEO Best Practices

### For Each Neighborhood
- Title: "{Neighborhood} Real Estate & Neighborhood Guide"
- Description: "Explore {Neighborhood}, LA. Learn about the market, lifestyle, and opportunities."

### For Each Blog Post
- Title: "Post title - Hello LA Home"
- Description: 160 chars summarizing the post

### For Each Property
- Title: "{Address} - {Beds}bd {Baths}ba - Hello LA Home"
- Description: Address, beds, baths, price, type

**Internal Linking:**
- Link neighborhoods from blog posts
- Link blog posts from neighborhood pages
- Cross-link related properties
- Use descriptive anchor text

---

## Image Guidelines

### Required
- **Neighborhood heroImage** - 1200x600px minimum
- **Property heroImage** - 1200x800px minimum (landscape)
- **Blog coverImage** - 1200x630px minimum

### Recommended
- **Property gallery** - 5+ images per property
- **Blog posts** - 1-2 inline images
- **About page** - Professional headshot (400x500px)

### Best Practices
- Use high-quality professional photos
- Optimize for web (compress to <200KB each)
- Use descriptive filenames
- Alt text for accessibility

---

## Publishing Workflow

### Before Publishing

1. **Check all fields are filled**
   - All required fields have values
   - No typos in key fields
   - Slug is URL-friendly

2. **Verify links**
   - Blog posts link to related neighborhoods
   - Properties link to contact page
   - Navigation has correct URLs

3. **Quality check**
   - Read description for typos
   - Check market stats are realistic
   - Verify dates are correct

4. **Test**
   - Preview in Sanity
   - Check site at localhost:3000
   - Test on mobile

### Publishing

1. Click "Publish" in Sanity Studio
2. Site auto-updates within 60 seconds
3. Check live site to verify

---

## Editing Existing Content

1. Go to Sanity Studio
2. Find the document type (Neighborhoods, Properties, Blog Posts)
3. Search by name/title
4. Click to open
5. Edit fields
6. Click "Publish" (or "Save" if not ready)

**Note:** Published changes appear on the live site within 1 minute.

---

## Troubleshooting

### Content not appearing on site
- Confirm it's "Published" in Sanity (not just Draft)
- Wait 1-2 minutes for cache to clear
- Clear browser cache (Cmd+Shift+R)
- Check the URL slug is correct

### Images not showing
- Verify image was uploaded successfully
- Check file size is under 5MB
- Try a different image format (JPG vs PNG)

### Typos in published content
- Edit in Sanity Studio
- Click "Publish" again
- Changes will appear shortly

---

## Next Steps

1. **Start with neighborhoods** - Create the 6 key neighborhoods first
2. **Add sold properties** - Build credibility with track record
3. **Write blog posts** - Establish authority and SEO
4. **Keep updated** - Fresh content keeps site relevant
5. **Monitor & optimize** - Check Google Analytics for what resonates

