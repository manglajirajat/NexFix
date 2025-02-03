import { AnnouncementBar } from "../components/AnnouncementBar";
import { NavigationMenu } from "../components/NavigationMenu";
import { HeroCarousel } from "../components/HeroCarousel";
import { CategoriesGrid } from "../components/CategoriesGrid";
import { HotProducts } from "../components/HotProducts";
import { SpecialOffers } from "../components/SpecialOffers";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { BrandShowcase } from "../components/BrandShowcase";
import Footer from "../components/Footer"; // ✅ Added missing import

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <NavigationMenu />
      <HeroCarousel />
      <CategoriesGrid />
      <HotProducts />
      <SpecialOffers />
      <FeaturedProducts />
      <BrandShowcase />
      <Footer />
    </div>
  );
}
