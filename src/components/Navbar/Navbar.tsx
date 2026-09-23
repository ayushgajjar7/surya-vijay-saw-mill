// @ts-nocheck
"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useId,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

import { NAV_ITEMS, type NavItem } from "@/constants/navigation";
import { BUSINESS } from "@/constants/business";
import { Images } from "@/constants/images";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { Button } from "@/components/Button/Button";
import styles from "./Navbar.module.css";

/* ---- Dropdown animation variants ---- */
const dropdownVariants = {
  hidden: { opacity: 0, y: -8, x: "-50%", scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    x: "-50%",
    scale: 1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    x: "-50%",
    scale: 0.97,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

/* ---- Mobile menu animation ---- */
const mobileMenuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

/* ---- Dropdown item ---- */
interface DropdownProps {
  item: NavItem;
  isActive: boolean;
  dropdownId: string;
}

function NavDropdown({ item, isActive, dropdownId }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <li
      ref={ref}
      className={styles.navItem}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        className={[styles.navLink, isActive ? styles.navLinkActive : ""].filter(Boolean).join(" ")}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={dropdownId}
        onClick={() => setOpen(false)}
      >
        {item.label}
        <motion.span
          className={styles.chevron}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <FaChevronDown />
        </motion.span>
      </Link>

      <AnimatePresence>
        {open && item.children && (
          <motion.ul
            id={dropdownId}
            className={styles.dropdown}
            role="menu"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {item.children.map((child) => (
              <li key={child.href} role="none">
                <Link
                  href={child.href}
                  className={styles.dropdownItem}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ---- Main Navbar ---- */
export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const uid = useId();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // Check immediately on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.classList.toggle("no-scroll", mobileOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [mobileOpen]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={[
          styles.navbar,
          scrolled ? styles.scrolled : (pathname === "/" ? styles.transparent : styles.scrolled),
        ].join(" ")}
        role="banner"
      >
        <div className={styles.inner}>
          {/* ---- Logo ---- */}
          <Link href="/" className={styles.logo} aria-label="Surya Vijay Saw Mill — Home">
            <Image
              src={Images.logo}
              alt="Surya Vijay Saw Mill"
              width={160}
              height={160}
              priority
              className={styles.logoImg}
              style={{ width: "auto", height: "60px", objectFit: "contain" }}
            />
          </Link>

          {/* ---- Desktop Nav ---- */}
          <nav
            className={styles.desktopNav}
            aria-label="Main navigation"
          >
            <ul className={styles.navList} role="list">
              {NAV_ITEMS.map((item) => {
                if (item.children?.length) {
                  return (
                    <NavDropdown
                      key={item.href}
                      item={item}
                      isActive={isLinkActive(item.href)}
                      dropdownId={`${uid}-dropdown-${item.href.replace(/\//g, "-")}`}
                    />
                  );
                }
                return (
                  <li key={item.href} className={styles.navItem}>
                    <Link
                      href={item.href}
                      className={[
                        styles.navLink,
                        isLinkActive(item.href) ? styles.navLinkActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ---- Desktop Actions ---- */}
          <div className={styles.actions}>
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href={BUSINESS.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waIconBtn}
              aria-label="Chat on WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
            <Button variant="primary" size="sm" href="/quote">
              {t.nav.getQuote}
            </Button>
          </div>

          {/* ---- Mobile Hamburger ---- */}
          <button
            ref={hamburgerRef}
            type="button"
            className={styles.hamburger}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <FaTimes />
                </motion.span>
              ) : (
                <motion.span
                  key="bars"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <FaBars />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ---- Mobile Menu ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              id="mobile-menu"
              ref={mobileMenuRef}
              className={styles.mobileMenu}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav aria-label="Mobile navigation">
                <ul className={styles.mobileNavList} role="list">
                  {NAV_ITEMS.map((item) => {
                    if (item.children?.length) {
                      const isExpanded = mobileExpanded === item.href;
                      return (
                        <li key={item.href} className={styles.mobileNavItem}>
                          <div className={styles.mobileNavGroup}>
                            <Link
                              href={item.href}
                              className={[
                                styles.mobileNavLink,
                                isLinkActive(item.href)
                                  ? styles.mobileNavLinkActive
                                  : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              onClick={closeMobile}
                            >
                              {item.label}
                            </Link>
                            <button
                              type="button"
                              className={styles.mobileChevronBtn}
                              aria-expanded={isExpanded}
                              onClick={(e) => {
                                e.preventDefault();
                                setMobileExpanded(isExpanded ? null : item.href);
                              }}
                              aria-label="Toggle sub-menu"
                            >
                              <motion.span
                                className={styles.mobileChevron}
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                aria-hidden="true"
                              >
                                <FaChevronDown />
                              </motion.span>
                            </button>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.ul
                                className={styles.mobileSubList}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                style={{ overflow: "hidden" }}
                              >
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className={styles.mobileSubItem}
                                      onClick={closeMobile}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }

                    return (
                      <li key={item.href} className={styles.mobileNavItem}>
                        <Link
                          href={item.href}
                          className={[
                            styles.mobileNavLink,
                            isLinkActive(item.href)
                              ? styles.mobileNavLinkActive
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={closeMobile}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Mobile utility controls */}
              <div className={styles.mobileControls}>
                <div className={styles.mobileControlRow}>
                  <span className={styles.mobileControlLabel}>Theme</span>
                  <ThemeToggle />
                </div>
                <div className={styles.mobileControlRow}>
                  <span className={styles.mobileControlLabel}>Language</span>
                  <LanguageSwitcher />
                </div>
              </div>

              {/* Mobile CTA buttons */}
              <div className={styles.mobileCtas}>
                <Button
                  variant="whatsapp"
                  size="md"
                  href={BUSINESS.whatsappHref}
                  target="_blank"
                  className={styles.mobileCtaFull}
                >
                  {t.cta.whatsapp}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  href="/quote"
                  className={styles.mobileCtaFull}
                  onClick={closeMobile}
                >
                  {t.nav.getQuote}
                </Button>
                <Button
                  variant="call"
                  size="md"
                  href={BUSINESS.phoneHref}
                  className={styles.mobileCtaFull}
                >
                  {t.cta.callNow}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
