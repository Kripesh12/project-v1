import ContactUs from "../components/ContactUs";
import { Faq } from "../components/Faq";
import { Features } from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavbarSection from "../components/Navbar";
function LandingPageLayout() {
  return (
    <>
      <NavbarSection />
      <Hero />
      <Features />
      <Faq />
      <ContactUs />
      <Footer />
    </>
  );
}

export default LandingPageLayout;
