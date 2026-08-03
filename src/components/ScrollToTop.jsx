import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Client-side navigation keeps the old scroll position by default, which feels
 * broken when moving between case studies. This resets to the top on route
 * change (but leaves in-page #anchor links alone).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, hash]);

  return null;
}
