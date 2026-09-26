// @ts-nocheck
import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Button } from "@/components/Button/Button";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { getProductBySlug, getRelatedProducts, PRODUCTS } from "@/data/products";
import { generateProductEnquiryUrl } from "@/utils/whatsapp";
import { BUSINESS } from "@/constants/business";
import { generateMetadata as generateSEOMetadata } from "@/utils/seo";
import { FaWhatsapp, FaPhone, FaCut } from "react-icons/fa";
import styles from "./product-detail.module.css";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const product = getProductBySlug(params.slug);
  
  if (!product) return {};
  
  return generateSEOMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);

  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroImageWrapper}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={`container ${styles.heroContent}`}>
            <span className={styles.categoryBadge}>{product.category}</span>
            <h1 className={styles.heroTitle}>{product.name}</h1>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={`container ${styles.grid}`}>
            <div className={styles.mainCol}>
              <div className={styles.descriptionBox}>
                <h2>About {product.name}</h2>
                <p>{product.description}</p>
              </div>

              <div className={styles.featuresList}>
                {product.availableForms && product.availableForms.length > 0 && (
                  <div className={styles.featureItem}>
                    <h3>Available Forms</h3>
                    <ul>
                      {product.availableForms.map((form, i) => (
                        <li key={i}>{form}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className={styles.featureItem}>
                  <h3>Suitable For</h3>
                  <ul>
                    {product.applications.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.infoRow}>
                <h3>Size</h3>
                <p>{product.sizeNote}</p>
              </div>

              <div className={styles.infoRow}>
                <h3>Price & Availability</h3>
                <p>{product.priceNote} Contact us for current stock availability.</p>
              </div>

              {product.customCutting && (
                <div className={styles.customBox}>
                  <div className={styles.customIcon}><FaCut size={24} /></div>
                  <div className={styles.customContent}>
                    <h3>Custom Cutting Available</h3>
                    <p>We can cut this timber to your specific dimensions. Let us know the exact length, width, and thickness you need.</p>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.sidebarCol}>
              <div className={styles.actionCard}>
                <h3>Interested in this timber?</h3>
                <p>Contact us to check current availability and get pricing based on your required quantity.</p>
                
                <div className={styles.actionButtons}>
                  <a href={generateProductEnquiryUrl(product.name)} target="_blank" rel="noreferrer" tabIndex={-1}>
                    <Button variant="whatsapp" className={styles.fullButton}>
                      ASK PRICE ON WHATSAPP
                    </Button>
                  </a>
                  
                  {product.customCutting && (
                    <Link href={`/custom-size?wood=${encodeURIComponent(product.name)}`} tabIndex={-1}>
                      <Button variant="primary" className={styles.fullButton}>
                        REQUEST CUSTOM SIZE
                      </Button>
                    </Link>
                  )}
                  
                  <a href={BUSINESS.phoneHref} tabIndex={-1}>
                    <Button variant="outline" className={styles.fullButton}>
                      <FaPhone size={16} /> CALL NOW
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <div className="container">
              <h2 className={styles.relatedTitle}>Related Timber</h2>
              <div className={styles.relatedGrid}>
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
