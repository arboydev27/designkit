"use client";
import Link from "next/link";
import { useSyncExternalStore, type ComponentProps } from "react";
import { withReturnPath } from "../../lib/navigation";
function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener("hashchange", listener);
  window.addEventListener("designkit:query-change", listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener("hashchange", listener);
    window.removeEventListener("designkit:query-change", listener);
  };
}
const currentPath = () =>
  `${location.pathname}${location.search}${location.hash}`;
export default function ContextLink({
  href,
  fallback,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  fallback: string;
}) {
  const returnTo = useSyncExternalStore(subscribe, currentPath, () => fallback);
  return <Link {...props} href={withReturnPath(href, returnTo)} />;
}
