import AboutUs from "@/components/AboutUs";
import Brand from "@/components/Brands/ui/Brand";
import News from "@/components/News/ui/News";
import Slider from "@/modules/Carousel/ui/Slider";
import CollectionsCard from "@/modules/CollectionsCard/ui/CollectionsCard";

const MainPage = () => {
  return (
    <div>
      <Slider />
      <CollectionsCard />
      <News />
      <AboutUs />
      <Brand />
    </div>
  );
};

export default MainPage;
