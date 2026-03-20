# Hostinger DNS → Vercel Setup

## Prerequisites

- Domain `rokvilla.com` purchased on Hostinger
- Project deployed to Vercel (auto-deploys from `main` branch)

## Step 1: Add Domain in Vercel

1. Go to your Vercel project **Settings > Domains**
2. Add `rokvilla.com`
3. Vercel will show the DNS records you need to create

Vercel typically requires:

| Type  | Name | Value              |
|-------|------|--------------------|
| A     | @    | `76.76.21.21`      |
| CNAME | www  | `cname.vercel-dns.com` |

> The A record IP may differ — always use the value Vercel shows you.

## Step 2: Configure DNS in Hostinger

1. Log in to [Hostinger](https://hpanel.hostinger.com)
2. Go to **Domains > rokvilla.com > DNS / Nameservers**
3. Select **Manage DNS Records** (keep Hostinger nameservers)
4. Delete any existing A records for `@` that point to Hostinger's default IP
5. Add the records from Step 1:
   - **A record**: Name `@`, Points to `76.76.21.21`, TTL 3600
   - **CNAME record**: Name `www`, Points to `cname.vercel-dns.com`, TTL 3600
6. Save changes

### Alternative: Use Vercel Nameservers

If you prefer to delegate DNS entirely to Vercel:

1. In Hostinger, go to **Domains > rokvilla.com > DNS / Nameservers**
2. Select **Change nameservers**
3. Replace Hostinger nameservers with Vercel's:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
4. Save — propagation takes up to 48 hours

## Step 3: Verify

1. Wait for DNS propagation (usually 5-30 minutes, up to 48 hours)
2. Check propagation: `dig rokvilla.com +short` should return `76.76.21.21`
3. Vercel will automatically provision an SSL certificate once DNS resolves
4. Verify both `https://rokvilla.com` and `https://www.rokvilla.com` load correctly
5. Vercel auto-redirects `www` → apex (or vice versa) based on your preferred domain setting

## Step 4: Verify Redirects

The Next.js middleware handles `www.rokvilla.com → rokvilla.com` redirects. After DNS is live:

```bash
curl -I https://www.rokvilla.com
# Should return 308 redirect to https://rokvilla.com
```

## Troubleshooting

- **SSL certificate pending**: Vercel can't provision SSL until DNS resolves. Wait and retry.
- **ERR_TOO_MANY_REDIRECTS**: Check that Hostinger isn't also forcing HTTPS redirects — disable any Hostinger SSL/redirect settings since Vercel handles this.
- **DNS not propagating**: Try `dig rokvilla.com @8.8.8.8 +short` to check via Google DNS. Some ISPs cache aggressively.
