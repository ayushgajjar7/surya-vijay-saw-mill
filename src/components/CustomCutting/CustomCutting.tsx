// @ts-nocheck
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/Button/Button";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import styles from "./CustomCutting.module.css";

// ─── Steps data ───────────────────────────────────────────────────────────────

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Share Your Requirement",
    description: "Tell us wood type, dimensions and quantity via WhatsApp, call or form.",
    icon: "📋",
  },
  {
    number: "02",
    title: "Confirm Timber & Dimensions",
    description: "We confirm the right timber type and exact dimensions for your project.",
    icon: "📐",
  },
  {
    number: "03",
    title: "Cutting",
    description: "Your timber is cut precisely to your confirmed dimensions at our mill.",
    icon: "🪚",
  },
  {
    number: "04",
    title: "Collection / Delivery",
    description: "Collect from our yard in Ahmedabad or arrange delivery if available.",
    icon: "🚚",
  },
];

// ─── Step card ────────────────────────────────────────────────────────────────

interface StepCardProps {
  step: Step;
  index: number;
  isLast: boolean;
}

function StepCard({ step, index, isLast }: StepCardProps) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.li
      ref={ref}
      className={styles.step}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.stepLeft}>
        <div className={styles.stepNumber} aria-hidden="true">
          {step.number}
        </div>
        {!isLast && <div className={styles.stepLine} aria-hidden="true" />}
      </div>
      <div className={styles.stepBody}>
        <div className={styles.stepIconWrap} aria-hidden="true">
          {step.icon}
        </div>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDesc}>{step.description}</p>
      </div>
    </motion.li>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CustomCutting() {
  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" });

  return (
    <section className={styles.section} aria-label="Custom Cutting Service">
      <div className={styles.container}>
        {/* Left column */}
        <motion.div
          ref={leftRef}
          className={styles.left}
          initial={{ opacity: 0, x: -48 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionTitle
            eyebrow="Custom Cutting"
            heading="Cut to the Size You Need"
            subheading="Need a specific dimension? Share your requirement with us — wood type, length, width and thickness. We'll cut it precisely to your specs."
            align="left"
            as="h2"
          />

          <p className={styles.bodyText}>
            Whether you&apos;re a carpenter, furniture maker, contractor or home owner —
            our custom cutting service saves you time and waste. Share your requirement and we'll check the available options. Send us your dimensions and we&apos;ll confirm availability and pricing.
          </p>

          <div className={styles.ctaGroup}>
            <Button variant="primary" size="lg" href="/custom-size">
              REQUEST CUSTOM SIZE
            </Button>
          </div>
        </motion.div>

        {/* Right column — steps */}
        <div className={styles.right}>
          <ol className={styles.stepsList} aria-label="Custom cutting process steps">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
