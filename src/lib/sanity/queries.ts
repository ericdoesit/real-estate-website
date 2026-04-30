// Blog queries
export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author,
    category,
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
    category,
    coverImage,
    body,
    seo,
  }
`

// Neighborhood queries
export const NEIGHBORHOODS_QUERY = `
  *[_type == "neighborhoodGuide"] | order(name asc) {
    _id,
    name,
    slug,
    tagline,
    heroImage,
    marketStats,
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
    marketStats,
    lifestyleHighlights,
    seo,
    aiSummary,
  }
`

// Property queries
export const FEATURED_PROPERTIES_QUERY = `
  *[_type == "property" && isFeatured == true] | order(soldDate desc)[0..5] {
    _id,
    address,
    slug,
    listPrice,
    soldPrice,
    beds,
    baths,
    sqft,
    heroImage,
    status,
  }
`

export const ALL_PROPERTIES_QUERY = `
  *[_type == "property"] | order(soldDate desc) {
    _id,
    address,
    slug,
    listPrice,
    soldPrice,
    beds,
    baths,
    sqft,
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
    listPrice,
    soldPrice,
    soldDate,
    beds,
    baths,
    sqft,
    lotSize,
    yearBuilt,
    propertyType,
    heroImage,
    gallery,
    description,
    features,
  }
`
