import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Button } from "@/components/Button/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={`container ${styles.container}`}>
          <div className={styles.content}>
            <h1 className={styles.heading}>404</h1>
            <p className={styles.subheading}>Looks like this path got lost in the timber yard.</p>
            <p className={styles.text}>The page you are looking for does not exist or has been moved.</p>
            <div className={styles.actions}>
              <Link href="/">
                <Button variant="primary">Back to Home</Button>
              </Link>
              <Link href="/products">
                <Button variant="outline">View Products</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
