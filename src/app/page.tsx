// @ts-nocheck
import React from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { WoodFinder } from "@/components/WoodFinder/WoodFinder";
import { CustomCutting } from "@/components/CustomCutting/CustomCutting";
import { WhyChooseUs } from "@/components/WhyChooseUs/WhyChooseUs";
import { ApplicationsSection } from "@/components/Applications/ApplicationsSection";
import { TimberYard } from "@/components/TimberYard/TimberYard";
import { B2BSection } from "@/components/B2BSection/B2BSection";
import { ProcessTimeline } from "@/components/ProcessTimeline/ProcessTimeline";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { FAQAccordion } from "@/components/FAQAccordion/FAQAccordion";
import { LocationMap } from "@/components/LocationMap/LocationMap";
import { ScrollProgress } from "@/components/ScrollProgress/ScrollProgress";
import { Cursor } from "@/components/Cursor/Cursor";
import { BackToTop } from "@/components/BackToTop/BackToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton/WhatsAppButton";
import { MobileBottomBar } from "@/components/MobileBottomBar/MobileBottomBar";
import { PopupForm } from "@/components/PopupForm/PopupForm";
import { FAQS } from "@/data/faqs";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { Loader } from "@/components/Loader/Loader";

export default function Home() {
  const topFaqs = FAQS.slice(0, 5);

  return (
    <>
      <Loader />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      
      <main id="main-content">
        <Hero />
        <WoodFinder />
        <CustomCutting />
        <WhyChooseUs />
        <ApplicationsSection />
        <TimberYard />
        <B2BSection />
        <ProcessTimeline />
        
        <section style={{ padding: "var(--spacing-4xl) 0", backgroundColor: "var(--color-bg)" }}>
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2xl)" }}>
            <SectionTitle 
              eyebrow="Questions?" 
              heading="Frequently Asked Questions" 
              subheading="Common questions about our products and services." 
              align="center" 
            />
            <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
              <FAQAccordion faqs={topFaqs} />
            </div>
          </div>
        </section>

        <LocationMap />
        <FinalCTA />
      </main>

      <Footer />
      
      <WhatsAppButton />
      <MobileBottomBar />
      <BackToTop />
      <PopupForm />
    </>
  );
}
