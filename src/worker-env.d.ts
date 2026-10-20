// Secrets configured out-of-band via `wrangler secret put` — names only, values
// live in the Cloudflare account and are never committed.
interface Env {
  DISCORD_WEBHOOK_URL: string;
  STREAMLABS_TOKEN: string;
}

declare namespace Cloudflare {
  interface Env {
    DISCORD_WEBHOOK_URL: string;
    STREAMLABS_TOKEN: string;
  }
}
