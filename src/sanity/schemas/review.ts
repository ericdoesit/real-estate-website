import { defineType, defineField } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Zillow', value: 'zillow' },
          { title: 'Yelp', value: 'yelp' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g. "Sold a Single Family home in Silver Lake" or "5 reviews · 2 photos"',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'source',
    },
  },
})
