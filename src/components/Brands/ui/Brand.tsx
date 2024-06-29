import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/components/Container/Container";
import { useAllBrands } from "@/modules/Brands/hooks/useAllBrands";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductByBrand } from "@/modules/ProductItem/hooks/useProductByBrand";
function Responsive() {
  const [brandId, setBrandId] = useState<string | null>(null);
  const { data: brands, isLoading, error } = useAllBrands();
  // @ts-ignore
  const { data: product } = useProductByBrand({ brandId });
  var settings = {
    dots: true,
    infinite: false,
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
              <Link to={`/catalog/${brand.id}`} onClick={() => setBrandId(brand.id)} key={brand.id}>
                <div>
                <img
                  className="h-20"
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
