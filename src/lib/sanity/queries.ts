// Blog queries
export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author,
    coverImage,
  }
`

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    author,
    excerpt,
    coverImage,
    body,
    seo,
  }
`

export const ALL_BLOG_SLUGS_QUERY = `
  *[_type == "blogPost"]{ "slug": slug.current, title }
`

// Neighborhood queries
export const NEIGHBORHOODS_QUERY = `
  *[_type == "neighborhoodGuide"] | order(order asc, name asc) {
    _id,
    name,
    slug,
    tagline,
    heroImage,
  }
`

export const NEIGHBORHOOD_BY_SLUG_QUERY = `
  *[_type == "neighborhoodGuide" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    tagline,
    heroImage,
    overview,
    lifestyleHighlights,
    seo,
    aiSummary,
  }
`

export const ALL_NEIGHBORHOOD_SLUGS_QUERY = `
  *[_type == "neighborhoodGuide"]{ "slug": slug.current, name }
`

// Property queries
export const FEATURED_PROPERTIES_QUERY = `
  *[_type == "property" && isFeatured == true] | order(soldDate desc)[0..5] {
    _id,
    address,
    slug,
    beds,
    baths,
    sqft,
    price,
    city,
    heroImage,
    status,
  }
`

export const ALL_PROPERTIES_QUERY = `
  *[_type == "property"] | order(soldDate desc) {
    _id,
    address,
    slug,
    beds,
    baths,
    sqft,
    price,
    city,
    heroImage,
    status,
  }
`

export const PROPERTY_BY_SLUG_QUERY = `
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    address,
    slug,
    status,
    soldDate,
    beds,
    baths,
    sqft,
    price,
    city,
    propertyType,
    heroImage,
    gallery,
    description,
    features,
  }
`

export const ALL_PROPERTY_SLUGS_QUERY = `
  *[_type == "property"]{ "slug": slug.current, address }
`

// Review queries
export const FEATURED_REVIEWS_QUERY = `
  *[_type == "review"] | order(date desc)[0..23] {
    _id,
    name,
    source,
    rating,
    text,
    date,
    subtitle,
  }
`
