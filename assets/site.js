(() => {
  const measurementId = window.SITE_CONFIG?.gaMeasurementId ?? "";
  const validMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId);
  const consentKey = "dreamers-den-analytics-consent";
  const banner = document.querySelector("#cookie-banner");
  const acceptButton = document.querySelector("#accept-analytics");
  const rejectButton = document.querySelector("#reject-analytics");

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

  function saveConsent(value) {
    try {
      window.localStorage.setItem(consentKey, value);
    } catch (error) {
      console.warn("Analytics consent could not be saved in this browser; the choice applies only until this page is closed.", error);
    }

    if (banner) banner.hidden = true;
    if (value === "accepted") loadAnalytics();
  }

  if (validMeasurementId && banner) {
    let consent = null;
    try {
      consent = window.localStorage.getItem(consentKey);
    } catch (error) {
      console.warn("Analytics consent cannot be read from this browser; analytics will remain off unless allowed during this visit.", error);
    }

    if (consent === "accepted") loadAnalytics();
    else if (consent !== "rejected") banner.hidden = false;

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
