import AboutUs from "@/components/AboutUs";
import Brand from "@/components/Brands/ui/Brand";
import News from "@/components/News/ui/News";
import Slider from "@/modules/Carousel/ui/Slider";
import CollectionsCard from "@/modules/CollectionsCard/ui/CollectionsCard";
import LoginModal from "@/modules/Modals/LoginModal";
import RegisterModal from "@/modules/Modals/RegisterModal";

const MainPage = () => {
  return (
    <div>
      <RegisterModal />
      <LoginModal/>
      <Slider />
      <CollectionsCard />
      <News />
      <AboutUs />
      <Brand />
    </div>
  );
};

export default MainPage;
