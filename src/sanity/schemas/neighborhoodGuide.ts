import { defineType, defineField } from 'sanity'

export const neighborhoodGuide = defineType({
  name: 'neighborhoodGuide',
  title: 'Neighborhood Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Neighborhood Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g. "Where old Hollywood meets new luxury"',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'marketStats',
      title: 'Market Statistics',
      type: 'object',
      fields: [
        defineField({
          name: 'medianPrice',
          title: 'Median Price (USD)',
          type: 'number',
        }),
        defineField({
          name: 'avgDaysOnMarket',
          title: 'Average Days on Market',
          type: 'number',
        }),
        defineField({
          name: 'activeListings',
          title: 'Active Listings',
          type: 'number',
        }),
        defineField({
          name: 'pricePerSqFt',
          title: 'Price Per Sq Ft (USD)',
          type: 'number',
        }),
        defineField({
          name: 'yoyPriceChange',
          title: 'Year-over-Year Price Change (%)',
          type: 'number',
        }),
        defineField({
          name: 'lastUpdated',
          title: 'Last Updated',
          type: 'date',
        }),
      ],
    }),
    defineField({
      name: 'lifestyleHighlights',
      title: 'Lifestyle Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: ['Dining', 'Shopping', 'Parks', 'Fitness', 'Arts', 'Nightlife'],
              },
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI Summary',
      type: 'text',
      rows: 5,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'heroImage',
    },
  },
})
