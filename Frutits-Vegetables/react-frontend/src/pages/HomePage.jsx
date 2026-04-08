import Home from "../components/Home";
import AboutSection from "../components/AboutSection";
import ProductsSection from "../components/ProductsSection";
import Using from "../components/Using";
import Gallery from "../components/GallerySection";
import ContactSection from "../components/ContactSection";

function HomePage() {
  return (
    <>
      <Home />
      <AboutSection />
      <ProductsSection />
      <Using />
      <Gallery />
      <ContactSection />
    </>
  );
}

export default HomePage;
