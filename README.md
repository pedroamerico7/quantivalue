# QuantiValue — Cloudflare Pages, Public Counter and D1 Offers

## Build settings
- Framework preset: None or Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: blank

## Existing public counter
KV binding:
- Variable name: `VISITS`
- Namespace: `quantivalue-visits`

## Create the offers database
1. In Cloudflare, go to **Storage & Databases → D1 SQL Database**.
2. Create a database named `quantivalue-offers`.
3. Open the database and go to **Console**.
4. Copy the contents of `schema.sql`, paste them into the console, and run the SQL.
5. Open **Workers & Pages → quantivalue-refined → Settings → Bindings**.
6. Add a **D1 database** binding:
   - Variable name: `OFFERS_DB`
   - Database: `quantivalue-offers`
7. Save the binding for **Production**.
8. Retry the latest deployment or create a new commit.

## View offers
Run:

```sql
SELECT id, name, company, email, amount_usd, message, country, status, created_at
FROM offers
ORDER BY id DESC;
```

The form includes server-side validation, a parameterized query, and a honeypot field.
