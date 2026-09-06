"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

const STORAGE_KEY = "isg-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const nextDark = document.documentElement.getAttribute("data-theme") !== "dark";
    if (nextDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(STORAGE_KEY, nextDark ? "dark" : "light");
    } catch {
      // لا يتوفر localStorage في بعض أوضاع الخصوصية: نكتفي بالجلسة الحالية.
    }
    setIsDark(nextDark);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
      title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
    >
      <span className="theme-toggle-icon theme-toggle-moon">
        <Icon name="moon" size={19} />
      </span>
      <span className="theme-toggle-icon theme-toggle-sun">
        <Icon name="sun" size={19} />
      </span>
    </button>
  );
}