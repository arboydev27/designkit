export function safeReturnPath(
  value: string | null | undefined,
  fallback = "/",
) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\u0000-\u001f\u007f]/.test(value)
  )
    return fallback;
  try {
    const parsed = new URL(value, "https://designkit.local");
    return parsed.origin === "https://designkit.local" &&
      !parsed.pathname.startsWith("//")
      ? `${parsed.pathname}${parsed.search}${parsed.hash}`
      : fallback;
  } catch {
    return fallback;
  }
}
export function withReturnPath(path: string, returnTo: string) {
  const url = new URL(path, "https://designkit.local");
  url.searchParams.set("return", safeReturnPath(returnTo));
  return `${url.pathname}${url.search}${url.hash}`;
}
