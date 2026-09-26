// @ts-nocheck
"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/Button/Button";
import { BUSINESS } from "@/constants/business";
import { Images } from "@/constants/images";
import { generateGeneralEnquiryUrl } from "@/utils/whatsapp";
import styles from "./Hero.module.css";

// ─── Particle canvas ─────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaDir: number;
}

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const PARTICLE_COUNT = 30;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.1,
      alphaDir: Math.random() > 0.5 ? 0.003 : -0.003,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir;
        if (p.alpha <= 0.05 || p.alpha >= 0.7) p.alphaDir *= -1;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(194, 154, 91, ${p.alpha})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);
}

// ─── Trust strip items ────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  { label: "15+ Years Experience", icon: "🏆" },
  { label: "Custom Cutting Available", icon: "✂️" },
  { label: "Wide Range of Timber", icon: "🪵" },
  { label: "Delivery Available", icon: "🚚" },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariant = {
  hidden: { opacity: 0, scale: 0.8, x: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useParticleCanvas(canvasRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const whatsappUrl = generateGeneralEnquiryUrl();

  const handleScrollDown = useCallback(() => {
    const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-label="Hero – Surya Vijay Saw Mill"
    >
      {/* Background image with parallax */}
      <motion.div
        className={styles.bgWrapper}
        style={{ y: bgY }}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={Images.hero.main}
          alt=""
          className={styles.bgImage}
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className={styles.gradientOverlay} aria-hidden="true" />

      {/* Wood grain texture overlay */}
      <div className={styles.grainOverlay} aria-hidden="true" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      {/* Floating years badge */}
      <motion.div
        className={styles.badge}
        variants={badgeVariant}
        initial="hidden"
        animate="visible"
        aria-label="15+ years of experience"
      >
        <span className={styles.badgeNumber}>15+</span>
        <span className={styles.badgeLabel}>YEARS</span>
      </motion.div>

      {/* Hero content */}
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p className={styles.eyebrow} variants={fadeUpVariant}>
            {BUSINESS.name.toUpperCase()}
          </motion.p>

          {/* Main heading */}
          <motion.h1 className={styles.heading} variants={fadeUpVariant}>
            WOOD. CUT TO YOUR REQUIREMENT.
          </motion.h1>

          {/* Subheading */}
          <motion.p className={styles.subheading} variants={fadeUpVariant}>
            {BUSINESS.heroSubheading}
          </motion.p>

          {/* CTA buttons */}
          <motion.div className={styles.buttons} variants={fadeUpVariant}>
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappUrl}
              target="_blank"
              aria-label="WhatsApp us"
            >
              WHATSAPP ENQUIRY
            </Button>
            <Button variant="primary" size="lg" href="/products">
              EXPLORE TIMBER
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href={BUSINESS.phoneHref}
              aria-label="Call us now"
            >
              CALL NOW
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust strip */}
      <div className={styles.trustStrip} role="list" aria-label="Key highlights">
        {TRUST_ITEMS.map((item) => (
          <div key={item.label} className={styles.trustItem} role="listitem">
            <span className={styles.trustIcon} aria-hidden="true">
              {item.icon}
            </span>
            <span className={styles.trustLabel}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <button
        className={styles.scrollIndicator}
        onClick={handleScrollDown}
        aria-label="Scroll to explore"
        type="button"
      >
        <span className={styles.scrollLabel}>Scroll to Explore</span>
        <motion.span
          className={styles.scrollArrow}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          ↓
        </motion.span>
      </button>
    </section>
  );
}
