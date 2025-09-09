import Hero from "@/components/hero";
import Features from "@/components/Features";
import Integrations from "@/components/Integration";
import CTA from "@/components/CTX";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Integrations />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
