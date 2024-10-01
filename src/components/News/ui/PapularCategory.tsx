import Container from "@/components/Container/Container";
import { useAllPapulerCategory } from "@/modules/ProductItem/hooks/useAllPapulerCategory";
import { FC } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const PapularCategory: FC = () => {
  const { data: papularCategory } = useAllPapulerCategory();
  console.log(papularCategory);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Container>
        <h1 className="font-bold text-2xl text-black pb-7 pt-9">
          Популярные категории
        </h1>

        <Slider {...settings}>
          {papularCategory?.map((category) => (
            <Link to={`/catalog/brandId/${category.id}`} key={category.id}>
            <div
              key={category.id}
              className="flex flex-col direction-col items-center"
            >
              <img
                src={category.img}
                alt={category.title}
                className="object-cover rounded-lg mb-4"
              />
              <span className="text-lg font-semibold">{category.title}</span>
            </div>
            </Link>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default PapularCategory;
