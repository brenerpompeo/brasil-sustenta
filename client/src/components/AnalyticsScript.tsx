import { useEffect } from "react";

const ANALYTICS_SCRIPT_ID = "brasil-sustenta-analytics";

export default function AnalyticsScript() {
  const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();

  useEffect(() => {
    if (!analyticsEndpoint || !websiteId) {
      return;
    }

    const existingScript = document.getElementById(ANALYTICS_SCRIPT_ID);
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.id = ANALYTICS_SCRIPT_ID;
    script.defer = true;
    script.src = `${analyticsEndpoint.replace(/\/$/, "")}/umami`;
    script.dataset.websiteId = websiteId;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [analyticsEndpoint, websiteId]);

  return null;
}
