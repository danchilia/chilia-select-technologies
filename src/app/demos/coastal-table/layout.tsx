import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Coastal Table Restaurant" },
  robots: { index: false, follow: false },
};

export default function CoastalTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
