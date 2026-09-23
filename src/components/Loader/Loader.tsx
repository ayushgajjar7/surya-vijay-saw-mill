"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Images } from "@/constants/images";
import styles from "./Loader.module.css";

const SESSION_KEY = "svsm-loaded-wood";
const LOADER_DURATION_MS = 2400; // Longer for dramatic effect

export function Loader() {
  const [show, setShow] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem(SESSION_KEY);
    if (alreadyLoaded) {
      return;
    }

    setShow(true);

    // Trigger door opening
    const t1 = setTimeout(() => setOpening(true), LOADER_DURATION_MS - 800);
    
    // Remove from DOM and set session storage so it doesn't run again
    const t2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, LOADER_DURATION_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className={styles.loaderContainer} aria-hidden="true">
          {/* Left Door */}
          <motion.div
            className={`${styles.door} ${styles.doorLeft}`}
            initial={{ x: "0%" }}
            animate={{ x: opening ? "-100%" : "0%" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* Right Door */}
          <motion.div
            className={`${styles.door} ${styles.doorRight}`}
            initial={{ x: "0%" }}
            animate={{ x: opening ? "100%" : "0%" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* Center Content */}
          <AnimatePresence>
            {!opening && (
              <motion.div
                className={styles.centerContent}
                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 4, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className={styles.logoWrapper}>
                  <Image
                    src={Images.logo}
                    alt="Surya Vijay Saw Mill"
                    width={160}
                    height={160}
                    priority
                    className={styles.logo}
                  />
                </div>
                <div className={styles.loadingLine}>
                  <motion.div
                    className={styles.loadingProgress}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
