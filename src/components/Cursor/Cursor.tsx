// @ts-nocheck
"use client";

import React, { useEffect, useRef, useCallback } from "react";
import styles from "./Cursor.module.css";

const HOVER_SELECTORS = "a, button, [role='button'], img, label, input, textarea, select";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Current real pointer position
  const pointerPos = useRef({ x: -100, y: -100 });
  // Ring position (lagged)
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);
  const isHovering = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Dot snaps instantly
    dot.style.transform = `translate(${pointerPos.current.x - 4}px, ${pointerPos.current.y - 4}px)`;

    // Ring follows with lag
    ringPos.current.x = lerp(ringPos.current.x, pointerPos.current.x, 0.14);
    ringPos.current.y = lerp(ringPos.current.y, pointerPos.current.y, 0.14);

    const size = isHovering.current ? 40 : 28;
    const offset = size / 2;
    ring.style.transform = `translate(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px)`;
    ring.style.width = `${size}px`;
    ring.style.height = `${size}px`;

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Detect touch device — disable cursor on touch
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Make elements visible
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    function onMouseMove(e: MouseEvent) {
      pointerPos.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest(HOVER_SELECTORS)) {
        isHovering.current = true;
        ring.classList.add(styles.ringHover);
      }
    }

    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest(HOVER_SELECTORS)) {
        isHovering.current = false;
        ring.classList.remove(styles.ringHover);
      }
    }

    function onMouseEnter() {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    }

    function onMouseLeave() {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <>
      <div
        ref={dotRef}
        className={styles.dot}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={styles.ring}
        aria-hidden="true"
      />
    </>
  );
}
