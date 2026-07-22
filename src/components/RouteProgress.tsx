"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteProgress() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.removeAttribute("data-route-loading");

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;

      document.documentElement.setAttribute("data-route-loading", "true");
      window.setTimeout(() => document.documentElement.removeAttribute("data-route-loading"), 8000);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return <div className="route-progress" aria-hidden="true" />;
}
