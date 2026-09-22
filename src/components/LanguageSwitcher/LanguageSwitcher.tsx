"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/types";
import styles from "./LanguageSwitcher.module.css";

interface LanguageOption {
  code: Language;
  label: string;
  ariaLabel: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "EN", ariaLabel: "Switch to English" },
  { code: "gu", label: "ગુ", ariaLabel: "ગુજરાતીમાં બદલો" },
  { code: "hi", label: "हि", ariaLabel: "हिंदी में बदलें" },
];

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={[styles.switcher, className].filter(Boolean).join(" ")}
      role="group"
      aria-label="Language selection"
    >
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <motion.button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={[styles.pill, isActive ? styles.active : ""].filter(Boolean).join(" ")}
            aria-label={lang.ariaLabel}
            aria-pressed={isActive}
            whileHover={isActive ? {} : { scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {lang.label}
          </motion.button>
        );
      })}
    </div>
  );
}
