import { defineType, defineField } from 'sanity'

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'address' },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'pending', 'sold', 'off-market'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'listPrice',
      title: 'List Price (USD)',
      type: 'number',
    }),
    defineField({
      name: 'soldPrice',
      title: 'Sold Price (USD)',
      type: 'number',
      description: 'Fill when status = sold',
    }),
    defineField({
      name: 'soldDate',
      title: 'Sold Date',
      type: 'date',
    }),
    defineField({
      name: 'beds',
      title: 'Bedrooms',
      type: 'number',
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms',
      type: 'number',
    }),
    defineField({
      name: 'sqft',
      title: 'Square Feet',
      type: 'number',
    }),
    defineField({
      name: 'lotSize',
      title: 'Lot Size',
      type: 'string',
      description: 'e.g. "0.25 acres"',
    }),
    defineField({
      name: 'yearBuilt',
      title: 'Year Built',
      type: 'number',
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Land'],
      },
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
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points: hardwood floors, chef kitchen, pool, etc.',
    }),
    defineField({
      name: 'idxListingId',
      title: 'IDX Listing ID',
      type: 'string',
      description: 'MLS/IDX ID if this also appears in IDX feed',
    }),
  ],
  orderings: [
    {
      title: 'Sold Date (Newest)',
      name: 'soldDateDesc',
      by: [{ field: 'soldDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'address',
      subtitle: 'status',
      media: 'heroImage',
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      media,
      subtitle: subtitle?.toUpperCase(),
    }),
  },
})
