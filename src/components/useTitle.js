import { useEffect } from "react";

const SITE = "William Dunn — Senior Service Designer & CX Strategist";

/** Sets the browser tab title for a page; the home page keeps the site title. */
export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — William Dunn` : SITE;
  }, [title]);
}
