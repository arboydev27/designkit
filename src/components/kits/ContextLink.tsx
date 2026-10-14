"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { withReturnPath } from "../../lib/navigation";
import useUrlQuery from "./useUrlQuery";
export default function ContextLink({
  href,
  fallback,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  fallback: string;
}) {
  const { currentPath } = useUrlQuery();
  const returnTo = currentPath || fallback;
  return <Link {...props} href={withReturnPath(href, returnTo)} />;
}
