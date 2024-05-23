import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/components/Container/Container";
import { useAllBrands } from "@/modules/Brands/hooks/useAllBrands";
function Responsive() {
  const { data: brands } = useAllBrands();

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const Brand = () => {
    return (
      <>
        <div className="slider-container object-cover mb-10">
          <Container>
            <h1 className="font-bold text-2xl text-black pb-4">Бренды</h1>
            <Slider {...settings} autoplay>
              {brands?.map((brand) => (
                <div>
                  <img
                    className="h-20"
                    src={brand.logo}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </Container>
        </div>
      </>
    );
  };

  return <Brand />;
}

export default Responsive;
