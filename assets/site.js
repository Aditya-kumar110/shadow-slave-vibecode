(() => {
  const config = window.SITE_CONFIG ?? {};
  const measurementId = config.gaMeasurementId ?? "";
  const validMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId);
  const publisherId = config.adsensePublisherId ?? "";
  const slotId = config.adsenseSlotId ?? "";
  const validAdConfig = /^ca-pub-\d+$/.test(publisherId) && /^\d+$/.test(slotId);
  const consentKey = "dreamers-den-optional-services-consent";
  const banner = document.querySelector("#cookie-banner");
  const acceptButton = document.querySelector("#accept-analytics");
  const rejectButton = document.querySelector("#reject-analytics");

  function getSafeHttpsUrl(value, label) {
    try {
      const url = new URL(value);
      if (url.protocol === "https:") return url;
    } catch (error) {
      console.error(`${label} must be a valid HTTPS URL.`, error);
      return null;
    }

    console.error(`${label} must use HTTPS.`);
    return null;
  }

  function loadAnalytics() {
    if (!validMeasurementId || document.querySelector("#google-analytics")) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);

    const script = document.createElement("script");
    script.id = "google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
  }

  function loadAds() {
    const placement = document.querySelector("#ad-placement");
    if (!validAdConfig || !placement || placement.dataset.loaded === "true") return;

    const script = document.createElement("script");
    script.id = "google-adsense";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`;
    script.addEventListener("load", () => {
      placement.dataset.loaded = "true";
      placement.replaceChildren();
      const ad = document.createElement("ins");
      ad.className = "adsbygoogle";
      ad.style.display = "block";
      ad.dataset.adClient = publisherId;
      ad.dataset.adSlot = slotId;
      ad.dataset.adFormat = "auto";
      ad.dataset.fullWidthResponsive = "true";
      placement.append(ad);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("Google AdSense could not initialize this ad unit.", error);
      }
    });
    script.addEventListener("error", () => {
      console.error("Google AdSense failed to load. Verify approval, publisher ID, ad unit, consent configuration, and network access.");
    });
    document.head.append(script);
  }

  function renderMonetizationLinks() {
    const recommendations = document.querySelector("#affiliate-recommendations");
    const disclosure = document.querySelector("#affiliate-disclosure");
    const affiliateLinks = Array.isArray(config.affiliateRecommendations)
      ? config.affiliateRecommendations
      : [];
    let renderedAffiliates = 0;

    if (recommendations) {
      for (const recommendation of affiliateLinks) {
        if (!recommendation || typeof recommendation.title !== "string" || typeof recommendation.description !== "string") {
          console.error("Skipping an affiliate recommendation with missing title or description.");
          continue;
        }

        const url = getSafeHttpsUrl(recommendation.url, `Affiliate link for "${recommendation.title}"`);
        if (!url) continue;

        const article = document.createElement("article");
        article.className = "rec-card";
        const icon = document.createElement("div");
        icon.className = "rec-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "✦";
        const content = document.createElement("div");
        const heading = document.createElement("h3");
        heading.textContent = recommendation.title;
        const description = document.createElement("p");
        description.textContent = recommendation.description;
        const link = document.createElement("a");
        link.className = "text-link";
        link.href = url.href;
        link.target = "_blank";
        link.rel = "sponsored noopener noreferrer";
        link.textContent = "View at retailer ↗";
        const label = document.createElement("span");
        label.className = "affiliate-label";
        label.textContent = "Affiliate link";
        content.append(heading, description, label, link);
        article.append(icon, content);
        recommendations.append(article);
        renderedAffiliates += 1;
      }
    }

    if (renderedAffiliates && disclosure) disclosure.hidden = false;

    const supportSection = document.querySelector("#support-section");
    const supportLink = document.querySelector("#support-link");
    if (supportSection && supportLink && config.supportUrl) {
      const url = getSafeHttpsUrl(config.supportUrl, "Creator-support link");
      if (url) {
        supportLink.href = url.href;
        supportSection.hidden = false;
      }
    }
  }

  function saveConsent(value) {
    try {
      window.localStorage.setItem(consentKey, value);
    } catch (error) {
      console.warn("Analytics consent could not be saved in this browser; the choice applies only until this page is closed.", error);
    }

    if (banner) banner.hidden = true;
    if (value === "accepted") {
      loadAnalytics();
      loadAds();
    }
  }

  renderMonetizationLinks();

  if ((validMeasurementId || validAdConfig) && banner) {
    let consent = null;
    try {
      consent = window.localStorage.getItem(consentKey);
    } catch (error) {
      console.warn("Analytics consent cannot be read from this browser; analytics will remain off unless allowed during this visit.", error);
    }

    if (consent === "accepted") {
      loadAnalytics();
      loadAds();
    } else if (consent !== "rejected") {
      banner.hidden = false;
    }

    acceptButton?.addEventListener("click", () => saveConsent("accepted"));
    rejectButton?.addEventListener("click", () => saveConsent("rejected"));
  }

  const feedbackForm = document.querySelector("#feedback-form");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!feedbackForm.reportValidity()) return;

      const formData = new FormData(feedbackForm);
      const title = String(formData.get("title")).trim();
      const message = String(formData.get("message")).trim();
      const issueUrl = new URL("https://github.com/Aditya-kumar110/shadow-slave-vibecode/issues/new");
      issueUrl.searchParams.set("title", title);
      issueUrl.searchParams.set("body", `${message}\n\n---\nSubmitted through the Dreamer’s Den feedback form.`);

      const issueLink = document.querySelector("#issue-link");
      issueLink.href = issueUrl.toString();
      issueLink.hidden = false;
      issueLink.focus();
      document.querySelector("#feedback-status").textContent = "Your public GitHub issue draft is ready. Review it and choose Submit new issue on GitHub to send it.";
      window.open(issueUrl, "_blank", "noopener,noreferrer");
    });
  }
})();
