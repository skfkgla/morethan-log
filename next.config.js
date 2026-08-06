module.exports = {
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
    // Next.js's image optimizer sends no User-Agent, which Notion's Cloudflare WAF
    // blocks with 403. Let the browser fetch Notion images directly instead.
    unoptimized: true,
  },
}
