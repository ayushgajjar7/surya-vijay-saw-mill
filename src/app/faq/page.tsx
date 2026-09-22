import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { FAQAccordion } from "@/components/FAQAccordion/FAQAccordion";
import { FAQS } from "@/data/faqs";
import styles from "./faq.module.css";
import { generateMetadata } from "@/utils/seo";
import { Button } from "@/components/Button/Button";
import Link from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { BUSINESS } from "@/constants/business";
import { generateGeneralEnquiryUrl } from "@/utils/whatsapp";

export const metadata: Metadata = generateMetadata({
  title: "FAQ | Timber Supply Questions",
  description: "Frequently asked questions about timber, custom sizes, cutting services, and delivery at Surya Vijay Saw Mill.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
            <p className={styles.heroSubtitle}>
              Common questions about our products, services and process.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className="container">
            <div className={styles.faqWrapper}>
              <FAQAccordion faqs={FAQS} />
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={`container ${styles.ctaContainer}`}>
            <h2>Still have questions?</h2>
            <div className={styles.actions}>
              <Link href="/contact" tabIndex={-1}>
                <Button variant="primary">CONTACT US</Button>
              </Link>
              <a href={generateGeneralEnquiryUrl()} target="_blank" rel="noreferrer" tabIndex={-1}>
                <Button variant="whatsapp">
                  <FaWhatsapp size={20} /> WHATSAPP US
                </Button>
              </a>
              <a href={BUSINESS.phoneHref} tabIndex={-1}>
                <Button variant="outline">
                  <FaPhone size={16} /> CALL NOW
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
