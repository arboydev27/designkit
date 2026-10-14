import Link from "next/link";
import type { ReactNode } from "react";
import ThemeToggle from "../ThemeToggle";

const links = [
  ["Styles", "/"],
  ["Examples", "/examples"],
  ["Components", "/components"],
  ["Boards", "/boards"],
  ["For agents", "/agents"],
];
export default function KitShell({
  children,
  active,
}: {
  children: ReactNode;
  active: string;
}) {
  return (
    <div className="kit-shell">
      <a className="skip-link" href="#kit-main">
        Skip to content
      </a>
      <header className="topbar kit-shell-header">
        <Link className="brand" href="/" aria-label="DesignKit home">
          <img src="/icon.svg" alt="" width={30} height={30} />
          <span>DesignKit</span>
        </Link>
        <nav className="desktop-navigation" aria-label="DesignKit">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={active === label ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <details className="kit-mobile-navigation">
          <summary>
            Browse <span aria-hidden="true">⌄</span>
          </summary>
          <nav aria-label="DesignKit mobile">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={active === label ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
        </details>
        <ThemeToggle />
      </header>
      <main id="kit-main" className="kit-main" tabIndex={-1}>
        {children}
      </main>
      <footer className="kit-site-footer">
        <Link href="/" className="brand">
          <span>DesignKit</span>
        </Link>
        <p>Original directions. Useful decisions. Yours to make.</p>
        <Link href="/agents">Take a kit into your project ↗</Link>
      </footer>
    </div>
  );
}
