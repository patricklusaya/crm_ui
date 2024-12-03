import React from "react";
import Navbar from "./navbar/Navbar";
import CallToAction from "./CallToAction/CallToAction";
import Info from "./Info/Info";
import Perks from "./Perks/Perks";
import Testimonials from "./Testimonials/Testimonials";
import Pricing from "./Pricing/Pricing";
import Footer from "./Footer/Footer";

export default function LandingPage() {
  return (
    <div>
      <div className="bg-white-500 text-white p-4">
        <section class="w-full px-8 text-gray-700 bg-white">
          <Navbar />
        </section>

        <section class="px-2 py-32 bg-white md:px-0">
          <CallToAction />
        </section>

        <section class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
          <Info />
        </section>

        <section class="py-20 bg-gray-50">
          <Perks />
        </section>

        <section class="bg-white">
          <Footer />
        </section>
      </div>
    </div>
  );
}
