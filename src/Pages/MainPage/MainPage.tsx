import CollectionButtons from "@/CollectionButtons/CollectionButtons";
import Brand from "@/components/Brands/ui/Brand";
import News from "@/components/News/ui/News";
import PapularCategory from "@/components/News/ui/PapularCategory";
import Carousel from "@/modules/Carousel/Carousel";
import CarouselCategory from "@/modules/Carousel/CarouselCategory";

const MainPage = () => {
  return (
    <div>
      <CarouselCategory />
      <Carousel />
      <CollectionButtons />
      <News />
      <PapularCategory/>
      <Brand />
    </div>
  );
};

export default MainPage;
