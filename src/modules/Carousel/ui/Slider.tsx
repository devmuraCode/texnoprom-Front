import { FC } from "react";
import { Carousel } from "antd";
import { useBanners } from "@/hooks/banners/useBanners";

const Slider: FC = () => {
  

  const { data: banner } = useBanners();

  const contentStyle: React.CSSProperties = {
    height: "40vh",
    width: "100%",
  };

  return (
      <Carousel autoplay>
        {banner &&
          banner.map((banner) => (
            <div key={banner.id}>
              <img src={banner.img} alt="" style={contentStyle} />
            </div>
          ))}
      </Carousel>
  );
};

export default Slider;
