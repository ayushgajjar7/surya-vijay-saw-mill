import React from "react";
import styles from "./loading.module.css";
import Image from "next/image";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}>
        <Image
          src="/assets/images/logo.svg"
          alt="Surya Vijay Saw Mill"
          width={140}
          height={40}
          priority
        />
        <div className={styles.progress}>
          <div className={styles.bar}></div>
        </div>
      </div>
    </div>
  );
}
