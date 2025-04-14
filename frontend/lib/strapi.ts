import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occurred please try again`)
  }
  const data = await response.json()
  return data
}

/**
 * Get blog posts from Strapi
 * @returns Array of blog posts
 */
export async function getBlogPosts() {
  const data = await fetchAPI("/blog-posts", {
    populate: "*",
    sort: ["date:desc"],
  })
  return data.data
}

/**
 * Get a specific blog post by slug
 * @param {string} slug The slug of the blog post
 * @returns Blog post data
 */
export async function getBlogPostBySlug(slug: string) {
  const data = await fetchAPI("/blog-posts", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: "*",
  })
  return data.data[0]
}

// Add this function to preview draft content
export async function getPreviewBlogPost(slug: string, token: string) {
  const data = await fetchAPI(
    "/blog-posts",
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      publicationState: "preview",
      populate: "*",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data.data[0]
}

/**
 * Get group companies from Strapi
 * @returns Array of group companies
 */
export async function getGroupCompanies() {
  const data = await fetchAPI("/group-companies", {
    populate: "*",
  })
  return data.data
}

/**
 * Get services from Strapi
 * @returns Array of services
 */
export async function getServices() {
  const data = await fetchAPI("/services", {
    populate: "*",
  })
  return data.data
}

