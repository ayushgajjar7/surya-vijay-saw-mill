"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import styles from "./TimberYard.module.css";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { Images } from "@/constants/images";
import { Button } from "@/components/Button/Button";

export function TimberYard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className={styles.section} id="timber-yard">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <SectionTitle
            eyebrow="Our Timber Range"
            heading="Explore Our Timber Range"
            subheading="Images are for illustrative purposes. Real photos coming soon."
            align="left"
          />
          <div className={styles.action}>
            <Link href="/portfolio" tabIndex={-1}>
              <Button variant="outline">SEE FULL GALLERY</Button>
            </Link>
          </div>
        </div>

        <div className={styles.grid} ref={ref}>
          {Images.timberYard.map((src, index) => (
            <motion.div
              key={index}
              className={styles.imageWrapper}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Image
                src={src}
                alt="Timber yard stock"
                fill
                className={styles.image}
              />
              <div className={styles.overlay}>
                <div className={styles.zoomIcon}>+</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
