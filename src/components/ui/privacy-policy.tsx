'use client'

import React from 'react';
import { Printer } from 'lucide-react';
import { Modal } from './modal';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  const printAction = (
    <button
      onClick={() => window.print()}
      className="p-2 text-white/50 hover:text-white transition-colors"
      aria-label="Print Privacy Policy"
      title="Print"
    >
      <Printer size={18} />
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy" headerActions={printAction}>
      <div className="text-white/80 space-y-6 text-sm leading-relaxed">
        <p className="text-white/50 text-xs">Last updated: January 2025</p>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">1. Introduction</h3>
          <p>Devex Global Consult (&quot;DGC&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">2. Information We Collect</h3>
          <p className="mb-2">We may collect information about you in a variety of ways including:</p>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Personal data you provide directly (name, email, organisation, message)</li>
            <li>Usage data collected automatically when you visit our site</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">3. How We Use Your Information</h3>
          <p className="mb-2">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Respond to your enquiries and provide our consultancy services</li>
            <li>Send newsletters and updates you have subscribed to</li>
            <li>Improve our website and service offerings</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">4. Sharing Your Information</h3>
          <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as necessary to provide our services, comply with the law, or protect our rights.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">5. Data Retention</h3>
          <p>We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including satisfying any legal, accounting, or reporting requirements.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">6. Your Rights</h3>
          <p className="mb-2">Depending on your location, you may have rights including the right to:</p>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">7. Cookies</h3>
          <p>We use cookies to enhance your experience on our website. You can choose to disable cookies through your browser settings, though this may affect some functionality.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">8. Third-Party Services</h3>
          <p>We may use third-party services such as email delivery providers (Brevo) and analytics tools (Google Analytics). These services have their own privacy policies governing the use of your information.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">9. Security</h3>
          <p>We implement appropriate technical and organisational measures to protect your personal information against accidental or unlawful destruction, loss, alteration, and unauthorised disclosure or access.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">10. Children&apos;s Privacy</h3>
          <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">11. Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with a revised date.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">12. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at: <span className="text-dgc-blue-1">info@devexglobal.com</span></p>
          <p className="mt-1 text-white/60">The Mint Hub, Westlands, Nairobi, Kenya</p>
        </section>
      </div>
    </Modal>
  );
}
