import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { QuoteForm } from "@/components/QuoteForm/QuoteForm";
import styles from "./custom-size.module.css";
import { generateMetadata } from "@/utils/seo";

export const metadata: Metadata = generateMetadata({
  title: "Custom Size Timber",
  description: "Cut to your requirement. Request custom size timber from Surya Vijay Saw Mill.",
  path: "/custom-size",
});

export default function CustomSizePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.eyebrow}>CUSTOM CUTTING</span>
            <h1 className={styles.heroTitle}>Your Size. Our Cut.</h1>
            <p className={styles.heroSubtitle}>
              Tell us the timber type, dimensions and quantity you need.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={`container ${styles.grid}`}>
            <div className={styles.formCol}>
              <QuoteForm isCustomSize={true} />
            </div>
            
            <div className={styles.infoCol}>
              <div className={styles.infoBox}>
                <h3>How It Works</h3>
                <ol className={styles.steps}>
                  <li>
                    <strong>Share Requirement</strong>
                    <p>Enter your wood type, dimensions, and quantity.</p>
                  </li>
                  <li>
                    <strong>We Check Availability</strong>
                    <p>We'll verify stock and calculate the price.</p>
                  </li>
                  <li>
                    <strong>Confirm & Cut</strong>
                    <p>Once you confirm, we cut the timber to your exact size.</p>
                  </li>
                  <li>
                    <strong>Delivery or Pickup</strong>
                    <p>Collect from our yard or request delivery.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
