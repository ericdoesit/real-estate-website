# Hello LA Home - Setup & Development Guide

## Quick Start

### Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to view the site.

### Production Build
```bash
npm run build
npm start
```

---

## Site Architecture

### Pages Built
- **Homepage** (`/`) - HeroEditorial, FeaturedListings, AboutSnippet, NeighborhoodTeaser, CTABanner
- **About** (`/about`) - Agent bio, credentials, philosophy, approach
- **Services** (`/services`) - Buy/Sell process steps, additional services
- **Neighborhoods** (`/neighborhoods`) - Grid of neighborhood guides with links to details
- **Neighborhoods Detail** (`/neighborhoods/[slug]`) - Market stats, lifestyle highlights, overview
- **Properties** (`/properties`) - Featured and sold listings grid
- **Property Detail** (`/properties/[id]`) - Full property details, features, contact CTA
- **Blog** (`/blog`) - Blog post index
- **Blog Detail** (`/blog/[slug]`) - Individual blog post with metadata
- **Contact** (`/contact`) - Contact form with validation
- **Sanity Studio** (`/studio`) - CMS for managing content

---

## Adding Content to Sanity

### 1. Access Sanity Studio
Go to `http://localhost:3000/studio`

### 2. Create Neighborhood Guides
**Type:** `neighborhoodGuide`

**Required Fields:**
- `name` - Neighborhood name
- `slug` - URL slug (auto-generate from name)
- `tagline` - Short one-liner
- `overview` - Rich text description
- `marketStats` - Object with:
  - `medianPrice` - Number
  - `avgDaysOnMarket` - Number
  - `activeListings` - Number
  - `pricePerSqFt` - Number
  - `yoyPriceChange` - Percentage
  - `lastUpdated` - Date

**Optional Fields:**
- `lifestyleHighlights` - Array of category/name/note items
- `heroImage` - Feature image
- `seo` - SEO metadata

### 3. Create Properties
**Type:** `property`

**Required Fields:**
- `address` - Property address
- `slug` - URL slug
- `status` - active/pending/sold/off-market
- `beds` - Number of bedrooms
- `baths` - Number of bathrooms
- `sqft` - Square footage
- `propertyType` - House/Condo/Townhouse, etc.

**Pricing Fields:**
- `listPrice` - Current list price (if active)
- `soldPrice` - Price when sold
- `soldDate` - Date property sold

**Optional Fields:**
- `isFeatured` - Boolean (shows on homepage when true)
- `description` - Full property description
- `features` - Array of feature strings
- `heroImage` - Main property image
- `gallery` - Multiple images

### 4. Create Blog Posts
**Type:** `blogPost`

**Required Fields:**
- `title` - Post title
- `slug` - URL slug
- `excerpt` - Short summary
- `author` - Author name
- `publishedAt` - Publication date
- `category` - Market Update/Buying Guide/Selling Tips/Neighborhood Spotlight/Legislation
- `body` - Rich text content

**Optional Fields:**
- `coverImage` - Feature image
- `seo` - SEO metadata
- `aiSummary` - Plain-language summary for AI agents

---

## Content Strategy

### Homepage Featured Properties
Properties marked with `isFeatured: true` appear on the homepage. Update `FeaturedListings` component slug to reflect current featured properties.

### Neighborhood Data
The site works best with at least these 6 neighborhoods:
1. Mid City
2. Eagle Rock
3. Highland Park
4. West Adams
5. Venice
6. Silver Lake

Each neighborhood should have:
- Market stats (pulled from MLS/local data)
- 3-5 lifestyle highlights
- Brief overview description

### Blog Content Strategy
1. **Market Updates** - Quarterly updates on LA market conditions
2. **Buying Guides** - How to find homes, what to look for
3. **Selling Tips** - Staging, pricing, marketing strategies
4. **Neighborhood Spotlights** - Deep dives into specific areas
5. **Legislation** - SB9, Prop 13, other relevant laws

---

## Customization

### Brand Colors
Edit `src/tailwind.config.ts` to update the color palette:
```javascript
colors: {
  wheat: '#e5d3aa',
  'dark-green': '#4a6741',
  goldenrod: '#daa520',
  crimson: '#a84a3e',
  charcoal: '#1c1c1c',
}
```

### Contact Form
Edit `/src/app/api/contact/route.ts` to integrate with email service (Resend, SendGrid, etc.).

Currently it just logs submissions. Add email integration for production.

### Navigation Links
Edit `src/components/layout/Nav.tsx` and `MobileMenu.tsx` to add/remove nav links.

---

## Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Optional:
```
SANITY_API_TOKEN=your_write_token  (for seed script)
```

---

## Deployment

### Vercel
1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with `git push`

### Custom Domain
1. Point DNS to Vercel
2. Update domain in Vercel dashboard
3. Wait for SSL certificate

---

## Next Steps

### High Priority
1. [ ] Add professional headshot to About page
2. [ ] Add property photos for featured listings
3. [ ] Create Sanity documents for 6 key neighborhoods
4. [ ] Add sold properties as proof of track record
5. [ ] Integrate contact form with email service

### Medium Priority
6. [ ] Add blog posts with market insights
7. [ ] Create neighborhood detail pages with images
8. [ ] Optimize images with Next.js Image component
9. [ ] Add JSON-LD structured data for SEO
10. [ ] Create public/llms.txt for AI agents

### Lower Priority
11. [ ] Add IDX integration for live MLS search
12. [ ] Implement property image galleries
13. [ ] Add testimonials section
14. [ ] Create calculator tools (ROI, mortgage)
15. [ ] Add video tours support

---

## Troubleshooting

### Dev Server Won't Start
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run dev
```

### Sanity Studio Not Loading
- Verify env vars are set
- Check Sanity project ID is correct
- Clear browser cache

### Build Errors
```bash
npm run build
```
Check the full output for TypeScript errors. Fix types as needed.

---

## Performance Tips

1. **Images** - Use Next.js Image component with proper sizing
2. **Fonts** - Already optimized with next/font
3. **Analytics** - Add Vercel Analytics in production
4. **Caching** - Revalidate paths after Sanity updates

---

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
