// @ts-nocheck
"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useId,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { GalleryImage } from "@/types";
import styles from "./Lightbox.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.18 },
  },
};

// ─── Focus trap hook ──────────────────────────────────────────────────────────

function useFocusTrap(ref: React.RefObject<HTMLDivElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;

    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    first?.focus();
    el.addEventListener("keydown", trap);
    return () => el.removeEventListener("keydown", trap);
  }, [active, ref]);
}

// ─── Lightbox Component ───────────────────────────────────────────────────────

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [imgKey, setImgKey] = useState(currentIndex);
  const touchStartX = useRef<number | null>(null);
  const uid = useId();

  // Track direction for slide animation
  const prevIndexRef = useRef(currentIndex);
  useEffect(() => {
    if (currentIndex !== prevIndexRef.current) {
      setDirection(currentIndex > prevIndexRef.current ? 1 : -1);
      setImgKey(currentIndex);
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  // Focus trap
  useFocusTrap(panelRef, true);

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrev();
          break;
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
  };

  const image = images[currentIndex];
  if (!image) return null;

  const imageVariants = {
    enter: { x: direction * 60, opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: direction * -60,
      opacity: 0,
      transition: { duration: 0.18 },
    },
  };

  const titleId = `${uid}-title`;

  const content = (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-labelledby={titleId}
      >
        {/* Panel */}
        <motion.div
          ref={panelRef}
          className={styles.panel}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close lightbox"
            type="button"
          >
            <FiX />
          </button>

          {/* Counter */}
          <div className={styles.counter} aria-live="polite">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image container */}
          <div className={styles.imageContainer}>
            {/* Prev arrow */}
            <button
              className={`${styles.navBtn} ${styles.navBtnPrev}`}
              onClick={onPrev}
              aria-label="Previous image"
              type="button"
              disabled={images.length <= 1}
            >
              <FiChevronLeft />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={imgKey}
                className={styles.imageWrapper}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 85vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Next arrow */}
            <button
              className={`${styles.navBtn} ${styles.navBtnNext}`}
              onClick={onNext}
              aria-label="Next image"
              type="button"
              disabled={images.length <= 1}
            >
              <FiChevronRight />
            </button>
          </div>

          {/* Caption */}
          <div className={styles.caption}>
            <p id={titleId} className={styles.captionTitle}>
              {image.alt}
            </p>
            {image.category && (
              <span className={styles.captionCategory}>{image.category}</span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}
