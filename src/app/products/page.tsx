"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import styles from "./products.module.css";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Explore Our Timber</h1>
            <p className={styles.heroSubtitle}>
              We supply a wide range of timber for different applications and requirements.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className="container">
            <div className={styles.filtersWrapper}>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Search timber..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.categories}>
                <button
                  className={`${styles.categoryButton} ${activeCategory === "All" ? styles.active : ""}`}
                  onClick={() => setActiveCategory("All")}
                >
                  All
                </button>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.categoryButton} ${activeCategory === cat ? styles.active : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={styles.grid}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <h3>No timber found</h3>
                <p>Try adjusting your search or contact us for specific requirements.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
