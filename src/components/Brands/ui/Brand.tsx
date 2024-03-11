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
              <img src="https://mbluxury1.s3.amazonaws.com/2022/02/25172616/chanel-1.jpg" className="h-40" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://uploads-ssl.webflow.com/6296aec5884dc4c8a90970a6/639b46bbfb45ca2f356a33f1_dolce__gabbana_logomark-logo_brandlogos.net_6c78j.png" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS0hBK78jmy5Jz3KreKYPs0rvaBSsv30Fx_bE08YLK-X6PhZxaS0TZ9J3te8llVCH9p8Y&usqp=CAU" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/Adidas.png" alt="" />
            </div>
            <div>
             <img className="h-40" src="https://res.cloudinary.com/zenbusiness/image/upload/v1670445040/logaster/logaster-2019-11-nike-1024x640.jpg" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://qph.cf2.quoracdn.net/main-qimg-c9ec6c9863c0acbc176634217864b939-lq" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/10190851/Louis-Vuitton-1.png" alt="" />
            </div>
            <div>
              <img className="h-40" src="https://mbluxury1.s3.amazonaws.com/2022/02/25172711/versace.jpg" alt="" />
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
