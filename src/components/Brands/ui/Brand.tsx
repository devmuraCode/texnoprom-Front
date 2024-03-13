import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/components/Container/Container";
function Responsive() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const Brand = () => {
    return (
      <>
        <div className="slider-container">
          <Container>
            <h1 className="font-bold text-2xl text-black pb-4">Бренды</h1>
          <Slider {...settings}>
            <div>
              <img src="https://elmakon.uz/images/thumbnails/150/150/feature_variant/18/pngwing.com__2_.png" className="h-40" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://filearchive.cnews.ru/img/book/2022/06/20/lg_free-.png" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://olcha.uz/uploads/images/manufacturer/KK/KK/d_/1645257501.jpg" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://logovector.net/wp-content/uploads/2014/02/samsung-logo-preview.png" alt="" />
            </div>
            <div>
             <img className="h-40" src="https://minora.uz/upload/iblock/11f/9ldzdf6u79rhrhxnpxyu07wawun4eh5r/c76c5eafa36bd8246a62ae5fef50b334.png" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/2048px-Xiaomi_logo_%282021-%29.svg.png" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://i.pinimg.com/originals/a1/97/d7/a197d7e6a0112631e47a54961e7f987e.png" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dyson_logo.svg/1280px-Dyson_logo.svg.png" alt="" />
            </div>
          </Slider>
          </Container>
        </div>
      </>
    )
  }

  return <Brand />;
}

export default Responsive;
