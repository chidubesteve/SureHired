"use client";
import {
  CTA,
  Features,
  FeaturedJobs,
  Footer,
  Header,
  HeroSection,
} from "@/components";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main className="flex-1">
          <HeroSection />
          <FeaturedJobs />
          <Features />
          <CTA />
        </main>
        <Footer />
      </Provider>
    </>
  );
}
