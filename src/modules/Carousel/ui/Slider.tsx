import { FC } from "react";
import { Carousel } from "antd";
import { useBanners } from "@/hooks/banners/useBanners";

const Slider: FC = () => {
  

  const { data: banner } = useBanners();

  const contentStyle: React.CSSProperties = {
    height: "60vh",
    width: "100%",
    objectFit: "cover",
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
