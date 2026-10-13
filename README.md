# The Dreamer's Den

An unofficial, responsive Shadow Slave fan hub with original reader prompts and commentary. The site does not reproduce official chapters or artwork and is not affiliated with the author, publisher, or reading platforms.

Live site: <https://aditya-kumar110.github.io/shadow-slave-vibecode/>

## SEO and publishing

- Each page has its own title, description, canonical URL, Open Graph/Twitter metadata, and relevant JSON-LD.
- Social preview cards use the original 1200×630 PNG in `assets/dreamers-den-social.png`; `assets/dreamers-den-social.svg` is used as the site icon.
- `robots.txt` and `sitemap.xml` are published at the site root. Resubmit `https://aditya-kumar110.github.io/shadow-slave-vibecode/sitemap.xml` in Google Search Console after changes.
- Search Console verification is account-specific. In Search Console, add the URL-prefix property `https://aditya-kumar110.github.io/shadow-slave-vibecode/`, choose the HTML-tag verification method, and copy the exact `<meta name="google-site-verification" content="...">` tag Google gives you into the `<head>` of `index.html`. Do not use another site's verification value.
- GitHub Pages serves this site over HTTPS. Check the live homepage and each `.html` URL over `https://` after deployment.
- GitHub Actions deploys `main` automatically. To publish local changes:

  ```sh
  git add .
  git commit -m "Describe the site update"
  git push origin main
  ```

## Google Analytics 4 and consent

Analytics is deliberately disabled until the site owner supplies a real GA4 Measurement ID and a visitor opts in.

1. Create a GA4 property and web data stream, then copy its `G-...` Measurement ID.
2. Set `gaMeasurementId` in `assets/site-config.js` to that ID and publish.
3. Verify the consent banner appears on all pages. Configured Google scripts load only after “Allow optional services”; “Reject optional services” keeps them off. Consent is saved in local storage, not a cookie. Clear the site's browser storage to reset the choice.
4. Update `privacy.html` and review consent/disclosure requirements for the regions you serve before enabling tracking.

Do not put a GA ID, verification token, password, or private key in a public repository unless it is intended to be public. A GA measurement ID and Search Console verification token are site identifiers, not account passwords, but must be your own.

## Monetization: realistic next steps

This fan-information site is **not a store**. It does not directly collect payments. Optional monetization placements are hidden or remain placeholders until you have the required approved account and identifiers.

### 1. Retail affiliate links (best first step)

Apply to a book retailer's affiliate program available in your country. Recommend legal editions of books the audience may genuinely enjoy, and follow the program's content, link-format, disclosure, and traffic rules. Approval is not guaranteed.

After approval, edit `assets/site-config.js` and add only the exact HTTPS Special Links issued by that retailer. Example format:

```js
affiliateRecommendations: [
  {
    title: "A book you genuinely recommend",
    description: "Why readers of dark fantasy may enjoy it.",
    url: "https://retailer.example/your-approved-special-link"
  }
]
```

The site generates `rel="sponsored"` links and an affiliate disclosure when at least one valid entry is configured. Do not invent tracking tags or convert the existing Webnovel/WorldCat links into affiliate links without an approved program link. Never sell or promote unlicensed Shadow Slave chapters, character art, logos, or merchandise.

### 2. Display ads (AdSense or another approved network)

Apply directly to an ad network and wait for site and account approval. A placeholder ad is not an ad account and earns nothing. After AdSense approval, create a responsive display ad unit and set both returned identifiers in `assets/site-config.js`:

```js
adsensePublisherId: "ca-pub-YOUR_PUBLISHER_NUMBER",
adsenseSlotId: "YOUR_AD_UNIT_NUMBER"
```

The ad script is injected into the homepage placement only after the visitor allows optional services. Replace the placeholders with the exact identifiers from AdSense before publishing. Then create the root `ads.txt` file using the seller relationship Google gives your account, usually in this format:

```text
google.com, pub-YOUR_PUBLISHER_NUMBER, DIRECT, f08c47fec0942fa0
```

Do not publish a made-up seller record. Review current Google consent/CMP requirements for your audience and country—especially before serving personalized ads. The simple opt-in banner here is an implementation hook, not a guarantee that a CMP meets every jurisdiction or network requirement. For a different network, integrate its approved code and consent tooling separately; do not paste arbitrary ad scripts into the public page.

### 3. Reader support (Ko-fi, Buy Me a Coffee, Patreon, etc.)

Create an account on a third-party creator-support platform, configure your payout and tax information there, then set `supportUrl` to your public HTTPS creator page in `assets/site-config.js`. This reveals the support CTA. Describe support as funding your independent fan commentary/site costs—not as an official Shadow Slave donation. If offering paid memberships, provide only original benefits you have rights to make and publish clear renewal/cancellation terms before promoting them.

### 4. Sponsorships and original products

Sponsorships can be considered after you have real readership and a clear media kit; disclose paid placements and reject misleading or unauthorized promotions. A static site has no private lead form or payment processor. Stripe/PayPal are not configured. Only consider a payment checkout for original products/services you have the rights to sell; use a hosted checkout from the payment provider rather than collecting card details in this site. Do not sell Shadow Slave story text, characters, branding, artwork, or unlicensed merchandise.

Affiliate links and support URLs are rendered from `assets/site-config.js`. A real `G-...` GA4 Measurement ID and optional consent are still needed for analytics. Keep financial credentials, payout account details, API keys, and passwords out of the repository; none are needed in the website config. Public publisher IDs, slots, affiliate Special Links, and support URLs are identifiers/URLs, but configure only accounts you own and are approved to use.

Revenue, approval, search ranking, and traffic are not guaranteed. Eligibility, available programs, payout methods, and legal requirements vary by country and change over time. Review the privacy, terms, and refund notices and seek local legal/tax advice before monetizing.

## Contact and legal information

- `contact.html` prepares a **public GitHub issue**. Visitors are warned not to include private details; they must review and submit the issue on GitHub themselves.
- `privacy.html` describes GitHub Pages hosting, the optional consent-gated analytics setup, and third-party links.
- `terms.html` identifies the site as an unofficial fan community.
- `refunds.html` accurately states that the site currently sells nothing and accepts no payments.

These pages are starter disclosures, not legal advice or a guarantee of compliance. The owner should review them for their jurisdiction and revise them before adding analytics, ads, mailing lists, affiliate tracking, accounts, or paid offerings.
