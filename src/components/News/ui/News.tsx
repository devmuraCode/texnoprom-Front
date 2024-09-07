import Container from "@/components/Container/Container";
import { useAllProducts } from "@/modules/ProductItem/hooks/useAllProducts";
import ProductItem from "@/modules/ProductItem/ui/ProductItem";
import Slider from "react-slick";
import styles from "./News.module.scss";

// @ts-ignore
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "block",
      right: "10px",
      zIndex: 2, // Увеличен z-index
      color: "#ff0000",
      fontSize: "30px",
      backgroundColor: "black", // Добавлен фон
      border: "1px solid #ff0000", // Добавлена граница
    }}
    onClick={onClick}
  />
);
// @ts-ignore
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      // display: "block",
      left: "10px",
      zIndex: 2, // Увеличен z-index
      fontSize: "30px",
      backgroundColor: "black", // Добавлен фон
      border: "1px solid #ff0000", // Добавлена граница
    }}
    onClick={onClick}
  />
);

const News = () => {
  const { data: products } = useAllProducts();

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
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // For mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For very small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Container>
        <h1 className="font-bold text-2xl text-black pb-4 pt-9">Хиты продаж</h1>
        <Slider {...settings}>
          {products?.map((product) => (
            <div key={product.id} className="flex gap-4">
              <ProductItem product={product} />
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default News;
