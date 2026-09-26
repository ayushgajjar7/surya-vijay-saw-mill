"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/Button/Button";
import { FaWhatsapp } from "react-icons/fa";
import { generateGeneralEnquiryUrl } from "@/utils/whatsapp";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Something went wrong.</h1>
          <p className={styles.text}>
            We encountered an unexpected error. Please try again or contact us directly on WhatsApp.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" onClick={() => reset()}>
              Try Again
            </Button>
              <Button
                variant="whatsapp"
                onClick={() => window.open(generateGeneralEnquiryUrl(), "_blank")}
              >
                WhatsApp Us
              </Button>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
