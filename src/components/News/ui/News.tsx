import Container from "@/components/Container/Container";
import { useAllProducts } from "@/modules/ProductItem/hooks/useAllProducts";
import ProductItem from "@/modules/ProductItem/ui/ProductItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from './News.module.scss'
import { usePapulerProduct } from "@/modules/ProductItem/hooks/usePapulerProduct";
// @ts-ignore
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "block",
      right: "10px",
      zIndex: 2,
      color: "#ff0000",
      fontSize: "30px",
      backgroundColor: "black",
      border: "1px solid #ff0000",
    }}
    onClick={onClick}
  />
);
//@ts-ignore
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      left: "10px",
      zIndex: 2,
      fontSize: "30px",
      backgroundColor: "black",
      border: "1px solid #ff0000",
    }}
    onClick={onClick}
  />
);

const News = () => {
  const { data: products } = usePapulerProduct();

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // @ts-ignore
    nextArrow: <NextArrow />,
    //@ts-ignore
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
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

  return (
    <div className={styled.container}>
      <Container>
        <h1 className="font-bold text-2xl text-black pb-4 pt-9">Хиты продаж</h1>

        <div className={styled.slider_container}>
          <Slider {...settings}>
            {products?.map((product) => (
              <div key={product.id} className="flex gap-4">
                <ProductItem product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default News;
