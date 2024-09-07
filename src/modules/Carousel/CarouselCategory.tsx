import Slider from "react-slick";
import { useAllCategory } from "../Catalog/hooks/useAllCategory";
import Container from "@/components/Container/Container";

function CarouselCategory() {
  const { data: category } = useAllCategory();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Container>
      <div className="slider-container" style={{ padding: "30px 0" }}>
        <Slider {...settings}>
          {category?.map((item) => (
            <div key={item.id}> 
              <h3>{item.title}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
}

export default CarouselCategory;
