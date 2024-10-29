import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/components/Container/Container";
import { useAllBrands } from "@/modules/Brands/hooks/useAllBrands";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductByBrand } from "@/modules/ProductItem/hooks/useProductByBrand";
import cls from './Brand.module.scss'

function Responsive() {
  const [brandSlug, setBrandSlug] = useState<string | undefined>();
  const { data: brands, isLoading, error } = useAllBrands();
  
  const { data: product } = useProductByBrand({ brandSlug });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false, // Hide dots for mobile
        },
      },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brands</div>;

  const Brand = () => {
    return (
      <div className="slider-container object-cover mb-10">
        <Container>
          <h1 className="font-bold text-2xl text-black pb-4">Бренды</h1>
          <Slider {...settings}>
            {brands?.map((brand) => (
              <Link to={`/catalog/${brand.slug}`} state={{ type: "brand" }} onClick={() => setBrandSlug(brand.slug)} key={brand.id}>
                <div>
                  <img
                    className={cls.brand_image}
                    src={brand.logo}
                    alt={brand.title}
                  />
                </div>
              </Link>
            ))}
          </Slider>
          
          
        </Container>
      </div>
    );
  };

  return <Brand />;
}

export default Responsive;
