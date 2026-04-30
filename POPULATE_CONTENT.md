# Populating Content from hellolahome.com

This guide walks you through adding all your real content (neighborhoods, properties, blog posts) to the new site.

**Time required:** 30 minutes to 2 hours
**Difficulty:** Easy (just copying and pasting)

---

## Option 1: Automated (Fastest) ⚡

If you have write access to your Sanity project, use the bulk seed script:

```bash
# Get your Sanity API token
# 1. Go to sanity.io dashboard
# 2. Project Settings → API → Tokens
# 3. Create new token with "Editor" permissions
# 4. Copy the token

# Set token and run script
SANITY_API_TOKEN=your_token node scripts/seed-real-data.js
```

This will automatically create:
- ✅ 6 neighborhood guides with full market data
- ✅ 13 sold properties from your portfolio
- ✅ 5 blog posts from your blog

Then go to `/studio` and add images to complete the content.

---

## Option 2: Manual via Sanity Studio (Safest) 🛡️

If you prefer to add content manually (or the script doesn't work), follow this step-by-step guide.

### Step 1: Start Sanity Studio
```bash
npm run dev
# Open http://localhost:3000/studio
```

### Step 2: Create Neighborhoods

Go to `/studio` and click "Create" → "Neighborhood Guide"

#### Mid City
- **Name:** Mid City
- **Slug:** mid-city (auto-generated)
- **Tagline:** LA's vibrant heart
- **Overview:** Mid City is the vibrant center of Los Angeles, known for its diverse community, active street life, excellent walkability, and some of LA's best restaurants, galleries, and cultural institutions. The neighborhood has seen significant investment in recent years with new businesses opening regularly.
- **Market Stats:**
  - Median Price: 850000
  - Avg Days on Market: 18
  - Active Listings: 24
  - Price per sqft: 650
  - YoY Price Change: 3.2%
- **Lifestyle Highlights:** (Add 4 items)
  - Dining: World-Class Restaurants
  - Culture: Arts & Galleries
  - Community: Active Neighborhoods
  - Shopping: Local Boutiques

#### Eagle Rock
- **Name:** Eagle Rock
- **Slug:** eagle-rock
- **Tagline:** Character and charm
- **Overview:** Eagle Rock is known for its tree-lined streets, charming vintage homes from the 1920s-1950s, and welcoming community. The neighborhood has seen significant revitalization while maintaining its character and relative affordability.
- **Market Stats:**
  - Median Price: 720000
  - Avg Days on Market: 21
  - Active Listings: 18
  - Price per sqft: 520
  - YoY Price Change: 5.1%

#### Highland Park
- **Name:** Highland Park
- **Slug:** highland-park
- **Tagline:** Emerging coolness
- **Overview:** Highland Park is experiencing a vibrant renaissance with new boutiques, trendy restaurants, and creative spaces while maintaining its bohemian character.
- **Market Stats:**
  - Median Price: 780000
  - Avg Days on Market: 19
  - Active Listings: 22
  - Price per sqft: 580
  - YoY Price Change: 6.8%

#### West Adams
- **Name:** West Adams
- **Slug:** west-adams
- **Tagline:** Historic elegance
- **Overview:** West Adams is a neighborhood rich in history featuring stunning Victorian and historic homes from LA's golden age.
- **Market Stats:**
  - Median Price: 1200000
  - Avg Days on Market: 22
  - Active Listings: 16
  - Price per sqft: 720
  - YoY Price Change: 4.5%

#### Venice
- **Name:** Venice
- **Slug:** venice
- **Tagline:** Beachside culture
- **Overview:** Venice offers a unique beachside lifestyle with the iconic Venice Boardwalk, thriving arts scene, excellent restaurants, and direct beach access.
- **Market Stats:**
  - Median Price: 2100000
  - Avg Days on Market: 25
  - Active Listings: 12
  - Price per sqft: 1100
  - YoY Price Change: 2.8%

#### Silver Lake
- **Name:** Silver Lake
- **Slug:** silver-lake
- **Tagline:** Artistic haven
- **Overview:** Silver Lake is an artistic neighborhood known for its creative community, independent music scene, visual arts, and distinctive architecture.
- **Market Stats:**
  - Median Price: 950000
  - Avg Days on Market: 20
  - Active Listings: 19
  - Price per sqft: 680
  - YoY Price Change: 5.2%

### Step 3: Create Properties (Sold Listings)

Click "Create" → "Property" for each:

| Address | Beds | Baths | Sqft | Sold Date | Neighborhood |
|---------|------|-------|------|-----------|--------------|
| 4225 Via Arbolada #500 | 3 | 2 | 1466 | 2024-12-17 | Monterey Hills |
| 4528 Don Timoteo | 3 | 2.5 | 2191 | 2022-01-21 | Baldwin Hills |
| 21838 Grovepark Drive | 3 | 2 | 1236 | 2021-07-07 | Santa Clarita |
| 3913 York Blvd | 2 | 2 | 1202 | 2021-07-07 | Glassell Park |
| 1122 N Avenue 56 | 3 | 4 | 1845 | 2021-03-22 | Highland Park |
| 4521 N Eagle Rock Blvd | 3 | 2 | 1600 | 2020-12-18 | Eagle Rock |
| 4105 West 30th St | 3 | 2 | 1800 | 2020-07-09 | West Adams |
| 2617 South Burnside Ave | 3 | 2 | 1900 | 2020-07-09 | West Adams |
| 845 Brooks Ave | 3 | 2 | 2000 | 2020-07-09 | Venice |
| 3842 Harriman Ave | 3 | 2 | 1700 | 2020-07-09 | Montecito Heights |
| 1740 Highland Ave | 3 | 2 | 1500 | 2020-07-09 | Mid City |
| 4073 West 29th St | 3 | 2 | 1800 | 2020-07-09 | West Adams |
| 382 West Mariposa St | 3 | 2 | 1600 | 2020-07-09 | Altadena |

For each property:
1. Enter address
2. Slug auto-generates
3. Status: "sold"
4. Fill beds, baths, sqft
5. Property Type: "House" or "Condo"
6. Sold Date: (date from table)
7. Click "Publish"

### Step 4: Create Blog Posts

Click "Create" → "Blog Post" for each:

#### Blog Post 1: Interesting Properties
- **Title:** Interesting Properties
- **Slug:** interesting-properties
- **Author:** Eric Zunkley
- **Category:** Property Spotlight
- **Published At:** 2023-01-13
- **Excerpt:** Featured property at 6620 Whitely Ter showcasing a 4-bed, 3-bath home with 3,233 sq ft and architectural details.
- **Body:** (Copy text content provided below)

#### Blog Post 2: Housing Struggling to Find a Bottom
- **Title:** Housing Struggling to Find a Bottom
- **Slug:** housing-market-bottom
- **Author:** Eric Zunkley
- **Category:** Market Update
- **Published At:** 2022-12-14
- **Excerpt:** An analysis of why the housing market continues declining...
- **Body:** The housing market continues declining after six consecutive months above 5% mortgage rates. Key factors include locked-in homeowners from the 2020-2021 low-rate period...

#### Blog Post 3: Interest Rate Update
- **Title:** Interest Rate Update
- **Slug:** interest-rate-update
- **Author:** Eric Zunkley
- **Category:** Market Trends
- **Published At:** 2022-05-11
- **Excerpt:** Discussion of mortgage rate increases from 3.55% to 5.4%...

#### Blog Post 4: How to Use SB9
- **Title:** How to Use SB9
- **Slug:** how-to-use-sb9
- **Author:** Eric Zunkley
- **Category:** Legislation
- **Published At:** 2022-02-17
- **Excerpt:** Comprehensive guide to California's SB9 law...

#### Blog Post 5: What Are Mortgage Points?
- **Title:** What Are Mortgage Points?
- **Slug:** what-are-mortgage-points
- **Author:** Eric Zunkley
- **Category:** Buyer Education
- **Published At:** 2021-07-27
- **Excerpt:** Explanation of how mortgage points reduce monthly payments...

---

## Adding Your Headshot

Your professional headshot has been downloaded and placed at `/public/headshot.jpg`

To add it to the About page:

### Method 1: Use Next.js Image Component (Recommended)
Edit `src/app/(marketing)/about/page.tsx`:

```tsx
import Image from 'next/image'

// In the headshot section, replace:
<div className="relative h-96 lg:h-[500px] bg-dark-green/10 rounded-2xl...">
  <p className="text-muted">Professional headshot</p>
</div>

// With:
<Image
  src="/headshot.jpg"
  alt="Eric Zunkley - Real Estate Agent"
  width={500}
  height={600}
  className="w-full h-full object-cover rounded-2xl"
  priority
/>
```

### Method 2: Simple HTML (Fastest)
Just replace the placeholder with:
```html
<img 
  src="/headshot.jpg" 
  alt="Eric Zunkley - Real Estate Agent"
  className="w-full h-full object-cover rounded-2xl"
/>
```

---

## Step-by-Step Quick Start

1. **Run dev server**
   ```bash
   npm run dev
   ```

2. **Go to Sanity Studio**
   ```
   http://localhost:3000/studio
   ```

3. **Add neighborhoods first** (6 neighborhoods, ~5 minutes each)
   - Create 6 neighborhood guides with data from table above
   - Click "Publish" when done

4. **Add properties** (13 properties, ~2 minutes each)
   - Create sold properties with addresses and details from table
   - Click "Publish" when done

5. **Add blog posts** (5 posts, ~5 minutes each)
   - Copy blog post titles, excerpts, and content
   - Create in Sanity with "Publish"

6. **Add images** (optional but recommended)
   - Upload neighborhood images
   - Upload property photos
   - Use your headshot on About page

7. **Review on site**
   - Visit http://localhost:3000
   - Check that neighborhoods and properties appear
   - Test blog post pages

---

## Batch Content Template

If copying content piece by piece is tedious, here's the full content you can reference:

### Blog Post Body Content

**Interesting Properties**
```
Featured property at 6620 Whitely Ter, Los Angeles showcases a 4-bed, 3-bath 
home with 3,233 sq ft living space.

The residence highlights architectural details including high cove ceilings, 
a Batchelder fireplace, and original arched mahogany windows.

This property represents the kind of craftsmanship and character you find in 
LA's best neighborhoods.
```

**Housing Struggling to Find a Bottom**
```
The housing market continues declining after six consecutive months above 5% 
mortgage rates.

Key factors include locked-in homeowners from the 2020-2021 low-rate period 
and minimal adjustable-rate mortgage adoption.

The affordability medicine needed is double digit price declines to bring 
inventory back into balance.
```

**Interest Rate Update**
```
Mortgage rates have increased dramatically from 3.55% to 5.4% over just 14 weeks.

This impacts purchasing power significantly. A $500,000 property that was 
affordable at 3.5% now requires substantially higher income at 5.4%.

For buyers navigating higher rate environments, working with a knowledgeable 
agent is critical to finding the right opportunity.
```

**How to Use SB9**
```
California's SB9 law is a game-changer for property owners, allowing up to 
four homes in single-family zones.

Eligibility requirements include: property must be in a single-family zone, 
owner must have owned for 3+ years, and the property cannot be in a historic district.

The implementation process involves lot splitting, each new parcel must be at 
least 1,200 sq ft, and you can build up to 4 units per parcel.

This presents significant opportunities for investors and homeowners looking to 
maximize property value. SB9 has become one of the most powerful tools in 
California real estate.
```

**What Are Mortgage Points?**
```
Mortgage points are a way to reduce your interest rate by paying an upfront fee 
at closing.

One point typically costs 1% of your loan amount and reduces your rate by 0.25%. 
So on a $500,000 loan, one point costs $5,000 and saves about 0.25% on your rate.

The breakeven point depends on how long you plan to keep the property. If you 
plan to stay for 7+ years, buying points often makes financial sense.

Every borrower's situation is different. Run the numbers with your lender to 
determine if mortgage points make sense for you.
```

---

## Next Steps After Population

1. ✅ Content is now in Sanity and on your site
2. Review everything for accuracy
3. Update any market stats if you have newer data
4. Add images where available
5. Update sold prices if some were not disclosed
6. Push code to GitHub
7. Deploy to Vercel

---

## Troubleshooting

**Content not appearing on site after publishing?**
- Wait 1-2 minutes for cache to clear
- Hard refresh browser (Cmd+Shift+R)
- Check browser console for errors

**Sanity Studio slow or timing out?**
- Close other browser tabs
- Try different browser
- Check internet connection
- Restart dev server

**Need to edit content later?**
- Go to `/studio`
- Search for the item
- Click to open
- Edit fields
- Click "Publish"

---

## Questions?

Refer back to **DATA_GUIDE.md** for detailed field explanations for each content type.

All set? Your site is ready to launch! 🚀
