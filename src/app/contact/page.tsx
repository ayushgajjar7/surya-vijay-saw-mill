import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { LocationMap } from "@/components/LocationMap/LocationMap";
import { BUSINESS } from "@/constants/business";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import styles from "./contact.module.css";
import { generateMetadata } from "@/utils/seo";

export const metadata: Metadata = generateMetadata({
  title: "Contact Us",
  description: "Get in touch with Surya Vijay Saw Mill for timber and wood requirements in Ahmedabad.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Contact Us</h1>
            <p className={styles.heroSubtitle}>We're here to help with your timber requirements.</p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={`container ${styles.grid}`}>
            <div className={styles.formCol}>
              <SectionTitle eyebrow="Send a Message" heading="Get In Touch" align="left" />
              <div className={styles.formWrapper}>
                <ContactForm />
              </div>
            </div>

            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h3>{BUSINESS.name}</h3>
                <p className={styles.owner}>Owned & Managed by {BUSINESS.owner}</p>

                <div className={styles.infoList}>
                  <a href={BUSINESS.phoneHref} className={styles.infoItem}>
                    <FaPhone className={styles.icon} />
                    <div>
                      <strong>Phone</strong>
                      <p>+91 {BUSINESS.phone}</p>
                    </div>
                  </a>
                  
                  <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noreferrer" className={styles.infoItem}>
                    <FaWhatsapp className={styles.icon} />
                    <div>
                      <strong>WhatsApp</strong>
                      <p>+91 {BUSINESS.whatsapp}</p>
                    </div>
                  </a>

                  <a href={`mailto:${BUSINESS.email}`} className={styles.infoItem}>
                    <FaEnvelope className={styles.icon} />
                    <div>
                      <strong>Email</strong>
                      <p>{BUSINESS.email}</p>
                    </div>
                  </a>

                  <div className={styles.infoItem}>
                    <FaMapMarkerAlt className={styles.icon} />
                    <div>
                      <strong>Address</strong>
                      <p>{BUSINESS.address.line1}<br/>{BUSINESS.address.line2}<br/>Ahmedabad, Gujarat - {BUSINESS.address.pincode}</p>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <FaClock className={styles.icon} />
                    <div>
                      <strong>Working Hours</strong>
                      <p>Please contact us for current availability and timings.</p>
                    </div>
                  </div>
                </div>

                <div className={styles.gstBox}>
                  <strong>GST No:</strong> {BUSINESS.gst}
                </div>
              </div>
            </div>
          </div>
        </section>

        <LocationMap />
      </main>
      <Footer />
    </>
  );
}
