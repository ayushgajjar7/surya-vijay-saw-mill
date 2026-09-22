// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Images } from "@/constants/images";
import styles from "./Loader.module.css";

const SESSION_KEY = "svsm-loaded";
const LOADER_DURATION_MS = 1800;

export function Loader() {
  const [show, setShow] = useState(false);
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    // Only show on first visit within session
    const alreadyLoaded = sessionStorage.getItem(SESSION_KEY);
    if (alreadyLoaded) {
      return;
    }

    setShow(true);
    // Mark session immediately so navigations within session skip it
    sessionStorage.setItem(SESSION_KEY, "1");

    // Animate bar in two stages: quick to 70%, then fill to 100%
    const t1 = setTimeout(() => setBarProgress(70), 80);
    const t2 = setTimeout(() => setBarProgress(100), LOADER_DURATION_MS - 300);
    const t3 = setTimeout(() => setShow(false), LOADER_DURATION_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-hidden="true"
          role="status"
          aria-label="Loading Surya Vijay Saw Mill"
        >
          <div className={styles.content}>
            {/* Logo */}
            <motion.div
              className={styles.logoWrapper}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <Image
                src={Images.logo}
                alt="Surya Vijay Saw Mill"
                width={140}
                height={140}
                priority
                className={styles.logo}
              />
            </motion.div>

            {/* Business name */}
            <motion.p
              className={styles.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Surya Vijay Saw Mill
            </motion.p>

            {/* Loading bar */}
            <div className={styles.barTrack} role="progressbar" aria-valuenow={barProgress} aria-valuemin={0} aria-valuemax={100}>
              <motion.div
                className={styles.barFill}
                initial={{ width: "0%" }}
                animate={{ width: `${barProgress}%` }}
                transition={{
                  duration: barProgress === 70 ? 0.9 : 0.5,
                  ease: barProgress === 70 ? "easeOut" : "easeIn",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
