/**
 * DGC Footer Component
 *
 * Features:
 * - Newsletter subscription form
 * - DGC branding and social links
 * - Carbon footprint rating
 * - Organised navigation sections
 * - Professional legal links and copyright
 * - Rounded corners and elevated positioning
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { DotLottieReact, setWasmUrl } from "@lottiefiles/dotlottie-react";

// Serve the WASM file from public/ to enable streaming compile in Next.js
setWasmUrl("/dotlottie-player.wasm");
import { NewsletterSubscriptionForm } from "./ui/newsletter-subscription-form";
import { TermsOfService } from "./ui/terms-of-service";
import { PrivacyPolicy } from "./ui/privacy-policy";
import { EmailPreview } from "./ui/email-preview";
import { Container } from "./ui/container";

const CONTACT = {
  address: "The Mint Hub, Westlands, Nairobi, Kenya",
  phone: "+254 752 889 900",
  email: "info@devexglobal.com",
  hours: "Mon–Fri: 9AM–5PM | Sat: 9AM–1PM",
  social: {
    linkedin: "https://www.linkedin.com/company/devexglobal",
    twitter: "https://twitter.com/devexglobal",
    facebook: "https://www.facebook.com/devexglobal",
  },
} as const;

export function Footer() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState(false);

  return (
    <section className="w-full pt-6 sm:pt-8 pb-10 sm:pb-14">
      <Container>
        <footer className="dgc-footer bg-dgc-dark-blue-1 text-white shadow-2xl overflow-hidden text-[13px] sm:text-sm">
          {/* Top Section: Resources and Insights */}
          <div className="py-6 sm:py-8 px-4 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <h3 className="text-dgc-blue-1 text-lg sm:text-xl font-semibold mb-3">
                  Resources and Insights
                </h3>
                <p className="body-text-dark">
                  Stay informed with the latest development sector insights, consultancy updates, and resources designed to strengthen your programmes and impact.
                </p>
              </div>
              <div className="lg:col-span-7">
                <NewsletterSubscriptionForm />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-dgc-blue-1 to-transparent opacity-60"></div>

          {/* Bottom Section: Main Footer Content */}
          <div className="py-6 sm:py-8 px-4 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Company Information */}
              <div className="lg:col-span-3">
                <div className="flex items-center mb-4">
                  <Image
                    src="/logo-dark.svg"
                    alt="Devex Global Consult Logo"
                    width={150}
                    height={50}
                    className="h-12 w-auto"
                  />
                </div>
                <p className="body-text-dark mb-6 max-w-sm">
                  Devex Global Consult delivers powerful insights and proven delivery to NGOs, government agencies, and international development organisations across Africa and beyond.
                </p>
                <div className="flex items-center gap-2.5 pt-1">
                  <a
                    href={CONTACT.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-dgc-blue-1 hover:border-dgc-blue-1/40 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={CONTACT.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-dgc-blue-1 hover:border-dgc-blue-1/40 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={CONTACT.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-dgc-blue-1 hover:border-dgc-blue-1/40 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="w-px h-full mx-auto bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-90" />
              </div>

              {/* Carbon + Navigation + Contact */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)_1px_minmax(0,1fr)] gap-y-8 md:gap-y-0 md:gap-x-0 items-stretch">
                  <div className="min-w-0 md:pr-10">
                    <h4 className="text-dgc-blue-1 font-semibold text-base sm:text-lg mb-4">
                      Carbon Footprint Rating
                    </h4>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12">
                        <DotLottieReact
                          src="https://lottie.host/afed7f34-5ac7-4030-aef0-f2c47b511a04/w3Iylhkz22.lottie"
                          loop
                          autoplay
                        />
                      </div>
                      <div>
                        <div className="text-dgc-blue-1 font-semibold text-base leading-snug">
                          Only <strong>0.25g</strong> of CO₂ per visit
                        </div>
                        <div className="text-white/70 text-sm leading-relaxed mt-1">
                          Running on sustainable energy
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block w-[1px] justify-self-center self-stretch bg-gradient-to-b from-transparent via-white/25 to-transparent opacity-100" />

                  <div className="min-w-0 md:px-10">
                    <h4 className="text-dgc-blue-1 font-semibold text-base sm:text-lg mb-4">
                      Navigation
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#about"
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById("about")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-white/80 hover:text-white transition-colors cursor-pointer"
                        >
                          About
                        </a>
                      </li>
                      <li>
                        <a
                          href="#services"
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById("services")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-white/80 hover:text-white transition-colors cursor-pointer"
                        >
                          Services
                        </a>
                      </li>
                      <li>
                        <a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById("contact")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-white/80 hover:text-white transition-colors cursor-pointer"
                        >
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="hidden md:block w-[1px] justify-self-center self-stretch bg-gradient-to-b from-transparent via-white/25 to-transparent opacity-100" />

                  <div className="min-w-0 md:pl-10">
                    <h4 className="text-dgc-blue-1 font-semibold text-base sm:text-lg mb-4">
                      Contact
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5 text-white/80">
                        <MapPin className="w-4 h-4 text-dgc-blue-1 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{CONTACT.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-white/80">
                        <Phone className="w-4 h-4 text-dgc-blue-1 shrink-0" />
                        <a
                          href={`tel:${CONTACT.phone}`}
                          className="hover:text-white transition-colors"
                        >
                          {CONTACT.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5 text-white/80">
                        <Mail className="w-4 h-4 text-dgc-blue-1 shrink-0" />
                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="hover:text-white transition-colors"
                        >
                          {CONTACT.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5 text-white/80">
                        <Clock className="w-4 h-4 text-dgc-blue-1 shrink-0" />
                        <span>{CONTACT.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottommost Section: Copyright and Legal Links */}
          <div className="h-px bg-gradient-to-r from-transparent via-dgc-blue-1 to-transparent opacity-60"></div>
          <div className="py-3 px-4 sm:px-8 lg:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              {/* Copyright */}
              <div className="text-white/60 text-xs">
                © 2026 Devex Global Consult. All rights reserved.
              </div>

              {/* Right cluster */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">

                {/* Privacy Policy */}
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>

                <div className="w-px h-3.5 bg-white/20 hidden sm:block" />

                {/* Terms of Use */}
                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Terms of Use
                </button>

                <div className="w-px h-3.5 bg-white/20 hidden sm:block" />

                {/* DGC Beacon — no dot */}
                <Link
                  href="/beacon/login"
                  className="text-white/50 hover:text-dgc-light transition-colors"
                >
                  DGC Beacon
                </Link>

                <div className="w-px h-3.5 bg-white/20 hidden sm:block" />

                {/* System status */}
                <div className="flex items-center gap-1.5 text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>All systems operational</span>
                </div>

              </div>
            </div>
          </div>
        </footer>
      </Container>
        {/* Modal Components */}
        <TermsOfService
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
        />
        <PrivacyPolicy
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />
        <EmailPreview
          isOpen={isEmailPreviewOpen}
          onClose={() => setIsEmailPreviewOpen(false)}
        />
    </section>
  );
}
