"use client";

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LivePipelineStrip from "@/components/landing/LivePipelineStrip";
import ThreatLandscape from "@/components/landing/ThreatLandscape";
import InsightArchitecture from "@/components/landing/InsightArchitecture";
import CapabilitiesSection from "@/components/landing/CapabilitiesSection";
import Differentiation from "@/components/landing/Differentiation";
import RiskConfidenceMatrix from "@/components/landing/RiskConfidenceMatrix";
import InvestigatorExperience from "@/components/landing/InvestigatorExperience";
import DoctrineDisclaimer from "@/components/landing/DoctrineDisclaimer";
import OfflineArchitecture from "@/components/landing/OfflineArchitecture";
import CallToAction from "@/components/landing/CallToAction";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-slate-700 selection:text-white relative">
      
      {/* 1. Global Defense Header */}
      <Navbar />

      {/* 2. Hero Section with Live Canvas & CTAs */}
      <HeroSection />

      {/* 3. Continuous Intelligence Pipeline Strip */}
      <LivePipelineStrip />

      {/* 4. Threat Reality ($154B+, <1%, ₹640 Cr, FIU-India) */}
      <ThreatLandscape />

      {/* 5. Core Insight: Transaction is an Event, Network is Evidence */}
      <InsightArchitecture />

      {/* 6. Capabilities: Connect -> Detect -> Explain -> Investigate */}
      <CapabilitiesSection />

      {/* 7. Differentiation: Built for the Investigation, Not the Spreadsheet */}
      <Differentiation />

      {/* 8. 2D Risk vs Confidence Matrix (Never Suppress High Risk) */}
      <RiskConfidenceMatrix />

      {/* 9. Investigator Experience: One Lead. Four Questions. */}
      <InvestigatorExperience />

      {/* 10. Doctrine: Intelligence, Not Accusation */}
      <DoctrineDisclaimer />

      {/* 11. Offline Architecture & Execution Pipeline */}
      <OfflineArchitecture />

      {/* 12. Command Center CTA & Footer */}
      <CallToAction />

    </main>
  );
}
