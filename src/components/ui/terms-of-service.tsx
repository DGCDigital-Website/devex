'use client'

import React from 'react';
import { Printer } from 'lucide-react';
import { Modal } from './modal';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfService({ isOpen, onClose }: TermsOfServiceProps) {
  const printAction = (
    <button
      onClick={() => window.print()}
      className="p-2 text-white/50 hover:text-white transition-colors"
      aria-label="Print Terms of Service"
      title="Print"
    >
      <Printer size={18} />
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service" headerActions={printAction}>
      <div className="text-white/80 space-y-6 text-sm leading-relaxed">
        <p className="text-white/50 text-xs">Last updated: January 2025</p>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">1. Acceptance of Terms</h3>
          <p>By accessing and using the Devex Global Consult (&quot;DGC&quot;) website and services, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">2. Services Description</h3>
          <p>DGC provides professional consultancy services including organisational strengthening, capacity strengthening, system strengthening, and safety &amp; security system strengthening for NGOs, government agencies, and international development organisations.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">3. Use of Website</h3>
          <p className="mb-2">You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Use the website in any way that violates applicable laws or regulations</li>
            <li>Transmit unsolicited commercial communications</li>
            <li>Attempt to gain unauthorised access to any part of the website</li>
            <li>Reproduce or distribute content without prior written permission</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">4. Intellectual Property</h3>
          <p>All content on this website, including text, graphics, logos, and images, is the property of DGC and is protected by applicable intellectual property laws. You may not use, reproduce, or distribute this content without our explicit written permission.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">5. Consultancy Engagements</h3>
          <p>Specific terms governing consultancy engagements, including scope, deliverables, timelines, and fees, will be set out in separate written agreements between DGC and each client. These Terms of Service govern website use only and do not constitute a consultancy agreement.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">6. Confidentiality</h3>
          <p>DGC takes confidentiality seriously. Any information shared with us through our contact forms or during client engagements will be treated with the highest degree of professional confidentiality.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">7. Disclaimers</h3>
          <p>The information on this website is provided for general informational purposes only. DGC makes no warranties, expressed or implied, about the completeness, accuracy, or reliability of this information. Specific professional advice should be sought for your particular situation.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">8. Limitation of Liability</h3>
          <p>To the maximum extent permitted by law, DGC shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or reliance on any information provided herein.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">9. Governing Law</h3>
          <p>These Terms of Service shall be governed by and construed in accordance with the laws of Kenya. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.</p>
        </section>

        <section>
          <h3 className="text-white font-semibold text-base mb-2">10. Contact Us</h3>
          <p>If you have any questions about these Terms of Service, please contact us at: <span className="text-dgc-blue-1">info@devexglobal.com</span></p>
          <p className="mt-1 text-white/60">The Mint Hub, Westlands, Nairobi, Kenya</p>
        </section>
      </div>
    </Modal>
  );
}
