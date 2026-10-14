"use client";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { urlStateStore } from "../../lib/url-state";
function RouterObserver() {
  const pathname = usePathname();
  const query = useSearchParams();
  useEffect(() => urlStateStore.refresh(), [pathname, query]);
  return null;
}
export default function UrlStateBridge() {
  return (
    <Suspense fallback={null}>
      <RouterObserver />
    </Suspense>
  );
}
