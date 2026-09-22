import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { QuoteForm } from "@/components/QuoteForm/QuoteForm";
import styles from "./quote.module.css";
import { generateMetadata } from "@/utils/seo";

export const metadata: Metadata = generateMetadata({
  title: "Get a Quote",
  description: "Request a quote for timber and wood requirements from Surya Vijay Saw Mill.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Tell Us What You Need</h1>
            <p className={styles.heroSubtitle}>
              Fill in your requirement below. No online payment — we will contact you regarding pricing and availability.
            </p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={`container ${styles.container}`}>
            <QuoteForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
