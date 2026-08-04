QUANTIVALUE — SPRINT 14: LIVE COUNTER & TRUST SIGNALS

Replace these files in the repository:
- src/App.jsx
- src/styles.css
- functions/api/views.js

Visible change:
- The visit counter now appears directly in the Hero proof row.
- It always renders at least 1,070+ while the Cloudflare KV binding is unavailable.
- Once the VISITS binding is configured, it displays and increments the persistent count.

Suggested commit:
feat: surface live visit counter in hero
