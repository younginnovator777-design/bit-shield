"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, ArrowRight, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Threat Intelligence", href: "/threat-intelligence" },
    { name: "Investigations",      href: "/investigations" },
    { name: "Risk Matrix",         href: "/risk-matrix" },
    { name: "Capabilities",        href: "/capabilities" },
    { name: "Architecture",        href: "/architecture" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-main)] bg-[var(--bg-header)] backdrop-blur-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-xs transition group-hover:border-slate-400 dark:group-hover:border-slate-600">
            <Shield className="w-4.5 h-4.5 text-slate-900 dark:text-slate-100" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-[var(--bg-header)]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-black tracking-widest text-slate-900 dark:text-white uppercase">BIT-SHIELD</span>
              <span className="text-[9px] font-mono tracking-widest bg-[var(--bg-surface)] text-slate-700 dark:text-slate-300 border border-[var(--border-main)] px-2 py-0.5 rounded-md font-bold">
                TRAFFIC INTEL
              </span>
            </div>
            <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400 tracking-wider hidden sm:block">
              OFFLINE BITCOIN TRAFFIC INTELLIGENCE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono tracking-wider">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 py-1 border-b-2 font-medium ${
                  isActive
                    ? "border-slate-900 text-slate-900 dark:border-white dark:text-white font-bold"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA + Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Link
            href="/command-center"
            className="hidden sm:inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-wider bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>COMMAND CENTER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-slate-700 dark:text-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border-main)] bg-[var(--bg-surface)] px-4 pt-3 pb-5 space-y-3 font-mono text-xs animate-fade-in-up">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg border transition ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold border-slate-900 dark:border-white"
                    : "border-[var(--border-main)] text-slate-700 dark:text-slate-300 hover:bg-[var(--bg-card)]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/command-center"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center space-x-2 w-full text-xs font-bold font-mono tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-4 py-2.5 rounded-lg shadow-sm pt-2"
          >
            <span>LAUNCH COMMAND CENTER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}
