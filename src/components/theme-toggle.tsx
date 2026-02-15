"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "lebob-theme";
const THEME_CHANGE_EVENT = "lebob-theme-change";

function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

function getStoredTheme(): Theme | null {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isTheme(savedTheme)) {
    return savedTheme;
  }

  return null;
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getPreferredTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function getThemeFromDom(): Theme {
  const domTheme = document.documentElement.getAttribute("data-theme");

  if (isTheme(domTheme)) {
    return domTheme;
  }

  const theme = getPreferredTheme();
  applyTheme(theme);

  return theme;
}

function subscribe(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleThemeChange = () => {
    onStoreChange();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) {
      return;
    }

    applyTheme(getPreferredTheme());
    onStoreChange();
  };

  const handleSystemThemeChange = () => {
    if (getStoredTheme() !== null) {
      return;
    }

    applyTheme(getPreferredTheme());
    onStoreChange();
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  window.addEventListener("storage", handleStorage);
  mediaQuery.addEventListener("change", handleSystemThemeChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleStorage);
    mediaQuery.removeEventListener("change", handleSystemThemeChange);
  };
}

function getClientSnapshot(): Theme {
  return getThemeFromDom();
}

function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(theme: Theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const isDarkMode = theme === "dark";
  const nextTheme: Theme = isDarkMode ? "light" : "dark";

  const handleToggle = () => {
    setTheme(nextTheme);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="theme-toggle-button"
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {isDarkMode ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      {isDarkMode ? "Light mode" : "Dark mode"}
    </Button>
  );
}
