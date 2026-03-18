/* eslint-disable @next/next/next-script-for-ga */
import "./globals.css";
import "./fonts.css";
import type { Metadata } from "next";
import { Layout } from "@/components";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Devex Global Consult - Powerful Insights | Proven Delivery",
  description:
    "Devex Global Consult (DGC) - Expert consultancy for NGOs, government agencies, and international development organisations. Organisational strengthening, capacity building, and MEL across Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      {/* Google Analytics placeholder — replace G-XXXXXXXXXX with DGC's GA4 measurement ID */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
      <body className="font-neometric">
        <Layout>
          {children}
        </Layout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
