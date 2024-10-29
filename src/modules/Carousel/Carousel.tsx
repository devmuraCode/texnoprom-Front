import { useBanners } from "@/hooks/banners/useBanners";
import Slider from "react-slick";
import Container from "@/components/Container/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Button, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useGetDayProduct } from "./hooks/useGetDayProduct";

function Carousel() {
  const { data: banners } = useBanners();
  const {data: dayproduct} = useGetDayProduct()
  
  // Ловим размеры экрана
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  // @ts-ignore
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1024px)",
  });

  //@ts-ignore
  const NextArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "10px",
        zIndex: 1,
        color: "#ff0000",
        fontSize: "30px",
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
        display: "block",
        left: "10px",
        zIndex: 1,
        color: "#ff0000",
        fontSize: "30px",
      }}
      onClick={onClick}
    />
  );

  const bannerSliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    //@ts-ignore
    nextArrow: <NextArrow />,
    //@ts-ignore
    prevArrow: <PrevArrow />,
  };

  const cardSliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    // slidesToShow: isMobile ? 1 : isTablet ? 2 : 3, // Изменяем количество слайдов в зависимости от экрана
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    arrows: true,
    //@ts-ignore
    nextArrow: <NextArrow />,
    //@ts-ignore
    prevArrow: <PrevArrow />,
  };

  const bannerStyle: React.CSSProperties = {
    height: isMobile ? "200px" : "300px",
    width: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const cardStyle: React.CSSProperties = {
    border: "none",
  };

  const cardImageStyle: React.CSSProperties = {
    height: isMobile ? "150px" : "150px",
    objectFit: "contain",
    borderRadius: "8px 8px 0 0",
  };

  const formatPrice = (price: string) => {
    return (
      new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "UZS",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(Number(price))
        .replace("UZS", "")
        .trim() + " сум"
    );
  };


  return (
    <div style={{ paddingBottom: "20px" }}>
      <Container>
        <div className="grid grid-cols-12 gap-6 flex items-center">
          <div
            className={isMobile ? "col-span-12" : "col-span-8 slider-container"}
          >
            <Slider {...bannerSliderSettings}>
              {banners?.map((banner, index) => (
                <div key={index}>
                  <img src={banner.img} alt="" style={bannerStyle} />
                </div>
              ))}
            </Slider>
          </div>

          {!isMobile && (
            <div className="col-span-4 slider-container">
              <Slider {...cardSliderSettings}>
                {dayproduct?.map((product, index) => (
                  <div key={index}>
                    <Card
                      style={{
                        ...cardStyle,
                        height: isMobile ? "auto" : "auto", // Keeping it flexible for mobile view
                      }}
                      title={"Товар дня"}
                      bordered
                      cover={
                        <img
                          alt={product.title}
                          src={product.mainimg}
                          style={cardImageStyle}
                        />
                      }
                    >
                      <div style={{ marginBottom: "10px" }}>
                        <Tag color="green" style={{ fontSize: "14px" }}>
                          Скидка {product.discount_percent}%
                        </Tag>
                        <div style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "24px" }}>
                          <span>{formatPrice(product.discounted_price)}</span>
                          <br />
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#888",
                            }}
                          >
                           {formatPrice(product.price)} 
                          </span>
                        </div>
                      </div>

                      <Button
                        icon={<ShoppingCartOutlined />}
                        style={{ width: "100%", borderRadius: "8px", background: "red", color: "white" }}
                      >
                        В корзину
                      </Button>
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Carousel;

