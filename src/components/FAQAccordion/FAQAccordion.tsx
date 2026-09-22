// @ts-nocheck
"use client";

import React, { useState, useId, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import type { FAQ } from "@/types";
import styles from "./FAQAccordion.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FAQAccordionProps {
  faqs: FAQ[];
  /** Allow multiple items to be open at once. Default: false */
  allowMultiple?: boolean;
  className?: string;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const contentVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
  },
};

const iconVariants = {
  closed: { rotate: 0 },
  open: { rotate: 45, transition: { duration: 0.22 } },
};

// ─── Single FAQ Item ──────────────────────────────────────────────────────────

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: (id: string) => void;
  headingId: string;
  contentId: string;
}

function FAQItem({ faq, isOpen, onToggle, headingId, contentId }: FAQItemProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle(faq.id);
      }
    },
    [faq.id, onToggle]
  );

  return (
    <div
      className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
      data-open={isOpen}
    >
      {/* Question / Header */}
      <div
        id={headingId}
        className={styles.question}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => onToggle(faq.id)}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.questionText}>{faq.question}</span>
        <motion.span
          className={styles.icon}
          aria-hidden="true"
          animate={isOpen ? "open" : "closed"}
          variants={iconVariants}
          initial="closed"
        >
          {isOpen ? <FiMinus /> : <FiPlus />}
        </motion.span>
      </div>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headingId}
            className={styles.answerWrapper}
            key="answer"
            variants={contentVariants}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            style={{ overflow: "hidden" }}
          >
            <div className={styles.answer}>
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Category Filter Tabs ─────────────────────────────────────────────────────

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="FAQ categories">
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={`${styles.tab} ${active === cat ? styles.tabActive : ""}`}
          onClick={() => onChange(cat)}
          type="button"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FAQAccordion({
  faqs,
  allowMultiple = false,
  className = "",
}: FAQAccordionProps) {
  const uid = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Derive unique categories (only if at least one FAQ has a category)
  const hasCategories = faqs.some((f) => Boolean(f.category));
  const categories: string[] = hasCategories
    ? Array.from(new Set(faqs.map((f) => f.category).filter(Boolean) as string[]))
    : [];

  // Filtered list
  const visible =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setOpenIds(new Set()); // collapse all on category switch
  };

  return (
    <div className={`${styles.root} ${className}`}>
      {/* Category tabs — only render when categories exist */}
      {hasCategories && categories.length > 0 && (
        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={handleCategoryChange}
        />
      )}

      {/* FAQ List */}
      <div className={styles.list} role="list">
        <AnimatePresence mode="popLayout">
          {visible.map((faq, idx) => {
            const headingId = `${uid}-q-${faq.id}`;
            const contentId = `${uid}-a-${faq.id}`;
            return (
              <motion.div
                key={faq.id}
                role="listitem"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openIds.has(faq.id)}
                  onToggle={toggle}
                  headingId={headingId}
                  contentId={contentId}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {visible.length === 0 && (
          <p className={styles.empty}>No FAQs found in this category.</p>
        )}
      </div>
    </div>
  );
}
