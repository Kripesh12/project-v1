import { Faq } from "../components/Faq";
import { Features } from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
function LandingPageLayout() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </>
  );
}

export default LandingPageLayout;
