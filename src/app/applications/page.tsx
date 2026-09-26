import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { ApplicationsSection } from "@/components/Applications/ApplicationsSection";
import styles from "./applications.module.css";
import { generateMetadata } from "@/utils/seo";
import { Button } from "@/components/Button/Button";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { generateGeneralEnquiryUrl } from "@/utils/whatsapp";

export const metadata: Metadata = generateMetadata({
  title: "Wood Applications | Furniture, Doors, Construction",
  description: "Find the right timber for your specific application. We supply wood for furniture, doors, windows, interiors, and construction.",
  path: "/applications",
});

export default function ApplicationsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <ApplicationsSection />

        <section className={styles.ctaSection}>
          <div className={`container ${styles.ctaContainer}`}>
            <h2>Need something specific?</h2>
            <p>Tell us your requirement and we can help you identify suitable timber for your project.</p>
            <div className={styles.actions}>
              <Link href="/quote" tabIndex={-1}>
                <Button variant="primary">GET A QUOTE</Button>
              </Link>
              <a href={generateGeneralEnquiryUrl()} target="_blank" rel="noreferrer" tabIndex={-1}>
                <Button variant="whatsapp">
                  WHATSAPP US
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
