// @ts-nocheck
import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Gallery } from "@/components/Gallery/Gallery";
import { Images } from "@/constants/images";
import styles from "./portfolio.module.css";
import { generateMetadata } from "@/utils/seo";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";

export const metadata: Metadata = generateMetadata({
  title: "Gallery & Portfolio",
  description: "View our timber and wood gallery. Examples of applications, cuts and products.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Wood in Action</h1>
            <p className={styles.heroSubtitle}>
              Images are for illustrative purposes only.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className="container">
            <Gallery images={Images.gallery} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
