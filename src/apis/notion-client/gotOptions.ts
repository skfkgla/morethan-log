// Notion's Cloudflare WAF blocks requests carrying got's default User-Agent, returning 403.
// Spoofing a browser User-Agent avoids the block.
export const NOTION_GOT_OPTIONS = {
  headers: {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  },
}
