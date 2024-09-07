import Container from "@/components/Container/Container";
import { useAllPapulerCategory } from "@/modules/ProductItem/hooks/useAllPapulerCategory";
import { FC } from "react";
import Slider from "react-slick";
const PapularCategory: FC = () => {
  const { data: papularCategory } = useAllPapulerCategory();
  console.log(papularCategory);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
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
    <div className="py-12">
      <Container>
        <h1 className="font-bold text-2xl text-black pb-7 pt-9">
          Популярные категории
        </h1>
        <Slider {...settings}>
          {papularCategory?.map((category) => (
            <div
              key={category.id}
              className="flex flex-col direction-col items-center"
            >
              <img
                src={category.img}
                alt={category.title}
                className="h-28 w-28 object-cover rounded-lg mb-4"
              />
              <span className="text-lg font-semibold">{category.title}</span>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default PapularCategory;
