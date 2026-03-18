import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DGC Beacon",
  description: "Devex Global Consult admin area",
  robots: { index: false, follow: false },
};

/**
 * Beacon uses its own layout — no public header/footer.
 */
export default function BeaconLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
