import { useBanners } from "@/hooks/banners/useBanners";
import Slider from "react-slick";
import Container from "@/components/Container/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Button, Tag, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

function Carousel() {
  const { data: banners } = useBanners();

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
    slidesToShow: 1,
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
    height: "300px",
    width: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "8px",
  };

  const cardImageStyle: React.CSSProperties = {
    height: "300px",
    objectFit: "contain",
    borderRadius: "8px 8px 0 0",
  };
  const product = {
    title: "Набор ручного инструмента GOODKING C",
    price: 1590,
    oldPrice: 2590,
    discount: 39,
    rating: 4.8,
    reviews: 34,
    img: "https://elmakon.uz/images/thumbnails/250/250/detailed/36/43au7500-3.jpg",
    timeLeft: "2 дня 10 часов",
  };

  const product2 = {
    title: "Набор ручного инструмента GOODKING C",
    price: 1590,
    oldPrice: 2590,
    discount: 39,
    rating: 4.8,
    reviews: 34,
    img: "https://cms.mvideo.ru/magnoliaPublic/.imaging/webp/dam/a6214d60-4c8e-436d-9fe4-496c45a0bdd2",
    timeLeft: "2 дня 10 часов",
  };

  const product3 = {
    title: "Набор ручного инструмента GOODKING C",
    price: 1590,
    oldPrice: 2590,
    discount: 39,
    rating: 4.8,
    reviews: 34,
    img: "https://img.mvideo.ru/Pdb/small_pic/200/400156148b.jpg",
    timeLeft: "2 дня 10 часов",
  };


  return (
    <div style={{ paddingBottom: "20px" }}>
      <Container>
        <div className="grid grid-cols-12 gap-6 flex items-center">
          <div className="col-span-8 slider-container">
            <Slider {...bannerSliderSettings}>
              {banners?.map((banner, index) => (
                <div key={index}>
                  <img src={banner.img} alt="" style={bannerStyle} />
                </div>
              ))}
            </Slider>
          </div>

          <div className="col-span-4 slider-container">
            <Slider {...cardSliderSettings}>
              <div>
                <Card
                  hoverable
                  style={{ width: 300, height: 300, borderRadius: "8px" }}
                  title={"Товар дня"}
                  cover={
                    <img
                      alt={product.title}
                      src={product.img}
                      style={{
                        height: 100,
                        objectFit: "contain",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  }
                >
                  
                  <div style={{ marginBottom: "10px" }}>
                    <Tag color="green" style={{ fontSize: "14px" }}>
                      Скидка {product.discount}%
                    </Tag>
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {product.price.toLocaleString()} сум{" "}
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#888",
                        }}
                      >
                        {product.oldPrice.toLocaleString()} сум
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    {product.timeLeft}
                  </div>

                

                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    style={{ width: "100%", borderRadius: "8px" }}
                  >
                    В корзину
                  </Button>
                </Card>
              </div>
              <div>
                <Card
                  hoverable
                  style={{ width: 300, height: 300, borderRadius: "8px" }}
                  title={"Товар дня"}
                  cover={
                    <img
                      alt={product2.title}
                      src={product2.img}
                      style={{
                        height: 100,
                        objectFit: "contain",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  }
                >
                  
                  <div style={{ marginBottom: "10px" }}>
                    <Tag color="green" style={{ fontSize: "14px" }}>
                      Скидка {product2.discount}%
                    </Tag>
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {product2.price.toLocaleString()} сум{" "}
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#888",
                        }}
                      >
                        {product2.oldPrice.toLocaleString()} сум
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    {product2.timeLeft}
                  </div>

                

                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    style={{ width: "100%", borderRadius: "8px" }}
                  >
                    В корзину
                  </Button>
                </Card>
              </div>
              <div>
                <Card
                  hoverable
                  style={{ width: 300, height: 300, borderRadius: "8px" }}
                  title={"Товар дня"}
                  cover={
                    <img
                      alt={product3.title}
                      src={product3.img}
                      style={{
                        height: 100,
                        objectFit: "contain",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  }
                >
                  
                  <div style={{ marginBottom: "10px" }}>
                    <Tag color="green" style={{ fontSize: "14px" }}>
                      Скидка {product.discount}%
                    </Tag>
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {product3.price.toLocaleString()} сум{" "}
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#888",
                        }}
                      >
                        {product3.oldPrice.toLocaleString()} сум
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    {product3.timeLeft}
                  </div>

                

                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    style={{ width: "100%", borderRadius: "8px" }}
                  >
                    В корзину
                  </Button>
                </Card>
              </div>
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Carousel;
