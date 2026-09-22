import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { WhyChooseUs } from "@/components/WhyChooseUs/WhyChooseUs";
import { LocationMap } from "@/components/LocationMap/LocationMap";
import { BUSINESS } from "@/constants/business";
import styles from "./about.module.css";
import { generateMetadata } from "@/utils/seo";

export const metadata: Metadata = generateMetadata({
  title: "About Us | 15+ Years of Timber Supply",
  description: "Surya Vijay Saw Mill is an established timber supplier serving customers across Ahmedabad with quality wood and custom sizes.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.eyebrow}>ABOUT US</span>
            <h1 className={styles.heroTitle}>15+ Years of Working with Wood</h1>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={`container ${styles.grid}`}>
            <div className={styles.storyContent}>
              <h2>Established Timber Supply in Ahmedabad</h2>
              <p>
                Surya Vijay Saw Mill is an established timber supplier serving customers across Ahmedabad with different wood requirements. Owned and managed by {BUSINESS.owner}, we have been supplying timber to carpenters, furniture manufacturers, builders, contractors and individual customers for over 15 years.
              </p>
              <p>
                Our focus is on providing quality timber in the sizes and quantities our customers need — with honest advice and reliable supply. We understand that every project is different, which is why we offer custom cutting services to meet your specific dimensions.
              </p>
              
              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <span className={styles.metricNumber}>15+</span>
                  <span className={styles.metricLabel}>Years Experience</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricNumber}>100%</span>
                  <span className={styles.metricLabel}>Custom Cutting</span>
                </div>
              </div>
            </div>
            
            <div className={styles.storyImage}>
              {/* Using a generic wood image from unsplash as placeholder */}
              <div className={styles.imagePlaceholder} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611726051745-983362a22f30?w=800&q=80')" }}>
                <div className={styles.ownerBadge}>
                  Owned & Managed by<br/><strong>{BUSINESS.owner}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <LocationMap />
      </main>
      <Footer />
    </>
  );
}
