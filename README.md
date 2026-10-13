# The Dreamer's Den

An unofficial, responsive Shadow Slave fan hub with original reader prompts and commentary. The site does not reproduce official chapters or artwork and is not affiliated with the author, publisher, or reading platforms.

Live site: <https://aditya-kumar110.github.io/shadow-slave-vibecode/>

## SEO and publishing

- Each page has its own title, description, canonical URL, Open Graph/Twitter metadata, and relevant JSON-LD.
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
3. Verify the consent banner appears on all pages. The Google script loads only after “Allow analytics”; “Reject” keeps it off. Consent is saved in local storage, not a cookie. Clear the site's browser storage to reset the choice.
4. Update `privacy.html` and review consent/disclosure requirements for the regions you serve before enabling tracking.

Do not put a GA ID, verification token, password, or private key in a public repository unless it is intended to be public. A GA measurement ID and Search Console verification token are site identifiers, not account passwords, but must be your own.

## Monetization: realistic next steps

The site is a fan-information project, not a store. It currently has no checkout, paid product, newsletter signup backend, or active affiliate links.

1. **Best low-friction fit:** apply to reputable book retailer affiliate programs available in your region. Recommend legally published dark-fantasy books, use only links allowed by each program, and add `rel="sponsored"` to paid links. Put a plain-language affiliate disclosure beside the recommendations before publishing affiliate links. Do not imply an official relationship with Shadow Slave or sell unlicensed fan merchandise.
2. **Ads:** apply to an ad network only when the site meets its current content, traffic, and policy requirements. The existing ad block is a visual placeholder, not an ad integration. Add only the network's approved code after acceptance and review its privacy/consent obligations.
3. **Payments:** Stripe/PayPal are not appropriate until there is a legitimate product or service the site owner has the rights to sell. Do not sell chapters, characters, logos, artwork, or other rights-holder material. No payment details are collected by this static site.

Revenue, approval, search ranking, and traffic are not guaranteed. Affiliate and ad availability depends on program rules, geography, audience, and the site's content.

## Contact and legal information

- `contact.html` prepares a **public GitHub issue**. Visitors are warned not to include private details; they must review and submit the issue on GitHub themselves.
- `privacy.html` describes GitHub Pages hosting, the optional consent-gated analytics setup, and third-party links.
- `terms.html` identifies the site as an unofficial fan community.
- `refunds.html` accurately states that the site currently sells nothing and accepts no payments.

These pages are starter disclosures, not legal advice or a guarantee of compliance. The owner should review them for their jurisdiction and revise them before adding analytics, ads, mailing lists, affiliate tracking, accounts, or paid offerings.
