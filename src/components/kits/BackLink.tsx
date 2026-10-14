"use client";
import Link from "next/link";
import { safeReturnPath } from "../../lib/navigation";
import useUrlQuery from "./useUrlQuery";
export default function BackLink({
  fallback,
  children,
}: {
  fallback: string;
  children: React.ReactNode;
}) {
  const { params } = useUrlQuery();
  return (
    <Link
      href={safeReturnPath(params.get("return"), fallback)}
      className="kit-example-return"
    >
      {children}
    </Link>
  );
}
