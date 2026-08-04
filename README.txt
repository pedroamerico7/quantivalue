QUANTIVALUE — SPRINT 13

Substitute these files in the repository:
- src/App.jsx
- src/styles.css
- functions/api/views.js

Changes:
1. Visitor counter now always displays at least 1,070+ even if the Cloudflare KV binding is temporarily unavailable.
2. The API returns a safe fallback instead of an HTTP 500 when VISITS is not configured.
3. Offer amount placeholder increased from 25,000 to 50,000 USD.
4. Minimum offer set to 50,000 USD, with increments of 1,000.
5. Added: “Suggested opening proposal: US$50,000 or above.”

For a persistent real counter, Cloudflare Pages still needs a KV binding named VISITS.
Suggested commit:
fix: restore visitor counter and raise offer floor
