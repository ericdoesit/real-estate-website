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
