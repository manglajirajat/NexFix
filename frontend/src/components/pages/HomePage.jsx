import HeroCarousel from "../HeroCarousel.jsx";
import TrustBadge from "../TrustBadge.jsx";
import { CategoriesGrid } from "../CategoriesGrid.jsx";
import { HotProducts } from "../HotProducts.jsx";
import { SpecialOffers } from "../SpecialOffers.jsx";
import { FeaturedProducts } from "../FeaturedProducts.jsx";
import { BrandShowcase } from "../BrandShowcase.jsx";

export default function HomePage(){
    return(
        <div>
            <HeroCarousel />
            <TrustBadge />
            <CategoriesGrid />
            <HotProducts />
            <SpecialOffers />
            <FeaturedProducts />
            <BrandShowcase />
        </div>
    )
}