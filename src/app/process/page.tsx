import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { ProcessTimeline } from "@/components/ProcessTimeline/ProcessTimeline";
import styles from "./process.module.css";
import { generateMetadata } from "@/utils/seo";

export const metadata: Metadata = generateMetadata({
  title: "Our Process | How We Work",
  description: "Simple steps from requirement to timber. Learn how to order custom cut wood from Surya Vijay Saw Mill.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>How It Works</h1>
            <p className={styles.heroSubtitle}>
              From sharing your requirement to taking delivery of your custom cut timber, our process is simple and straightforward.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <ProcessTimeline />
        </section>
      </main>
      <Footer />
    </>
  );
}
