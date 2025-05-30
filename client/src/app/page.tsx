import { CTA, Features, FeaturedJobs, Footer, Header, HeroSection } from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedJobs />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
