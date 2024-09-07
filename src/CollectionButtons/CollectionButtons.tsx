import Container from "@/components/Container/Container";
import styles from "./CollectionButton.module.scss";
import Slider from "react-slick";
const CollectionButtons = () => {
  var settings = {
    dots: false,
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.container}>
      <Container>
        <div className="slider-container">
          <Slider {...settings}>
            <div className={styles.button_6}>
              Авторизуйтесь, чтобы применить Бонусные рубли
            </div>
            <div className={styles.button_6}>
              Закажи и забери заказ через 15 минут
            </div>
            <div className={styles.button_6}>Экспресс-доставка от 2 часов</div>
            <div className={styles.button_6}>Работа в М.Видео</div>
            <div className={styles.button_6}>
              30 дней на обмен или возврат товара
            </div>
            <div className={styles.button_6}>Мои финансы</div>
            <div className={styles.button_6}>
              Trade-in. Получи скидку
              <br />
              за старый девайс
            </div>
            <div className={styles.button_6}>
              Открытые магазины в вашем городе
            </div>
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default CollectionButtons;
