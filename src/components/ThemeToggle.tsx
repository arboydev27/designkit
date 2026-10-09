"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "designkit:theme";

function parseTheme(value: string | null): Theme {
  return value === "light" || value === "dark" ? value : "system";
}

function applyTheme(theme: Theme) {
  if (theme === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.dataset.theme = theme;
  }
}

export default function ThemeToggle() {
  // Keep server output and the first client render identical.
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    let saved: Theme = "system";
    try {
      saved = parseTheme(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      // System appearance remains usable when storage is unavailable.
    }
    setTheme(saved);
    applyTheme(saved);

    function syncTheme(event: StorageEvent) {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      let storage: Storage;
      try {
        storage = window.localStorage;
      } catch {
        return;
      }
      if (event.storageArea !== storage) return;
      const next = parseTheme(event.newValue);
      setTheme(next);
      applyTheme(next);
    }

    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  function changeTheme(value: string) {
    const next = parseTheme(value);
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Apply the choice for this session even when it cannot be saved.
    }
  }

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <label className="theme-control">
      <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
      <select
        aria-label="Color theme"
        value={theme}
        onChange={(event) => changeTheme(event.currentTarget.value)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
