import Slider from "react-slick";
import { useAllCategory } from "../Catalog/hooks/useAllCategory";
import Container from "@/components/Container/Container";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./CarouselCategory.scss"; 

const CarouselCategory= () => {
  // @ts-ignore
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const { data: category } = useAllCategory();
  console.log(category);
  
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: 7,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };
  
  return (
    <Container>
      <div className="slider-container">
        <Slider {...settings}>
          {category?.map((item) => (
            <div key={item.id}>
              <Link to={`/catalog/brandId/${item.id}`}> 
                <h3 className="cursor-pointer">{item.title}</h3>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
}

export default CarouselCategory;
