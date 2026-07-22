import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// The main church site (/home and sub-routes) — smooth scroll + navbar/footer
// chrome. The root "/" coming-soon page lives outside this group so it renders
// bare (no navbar/footer).
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
