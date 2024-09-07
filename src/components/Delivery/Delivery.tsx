import Container from "../Container/Container";
import styles from "./Delivery.module.scss";
import { IoCheckboxOutline } from "react-icons/io5";

const Delivery = () => {
  return (
    <div className={styles.deliveryWrapper}>
      <Container>
        <div className={styles.deliverySection}>
          <div className="flex justify-center items-center">
            <div>
              <h1 className={styles.deliveryTitle}>
                Покупай и выбирайудобный способполучения заказа!
              </h1>
              <p className={styles.deliveryText}>
                Доставка курьером, самовывоз — основные условия
              </p>
            </div>
            <img src="	https://mediapark.uz/images/floor.svg" alt="" />
          </div>
        </div>
        <div className="flex justify-around py-14">
          <img src="	https://mediapark.uz/images/delivery2.svg" alt="" />
          <div>
            <h1 className={styles.deliveryTitle}>
              Экспресс-доставка от 2 часов
            </h1>
            <br />
            <p className="">
              {" "}
              При заказе до 20:00 Быстрая доставка — оперативное <br />{" "}
              получение нужной техники в особых случаях.
            </p>
            <br />
            <h2 className={styles.deliveryTitle}>
              Получи заказ максимально быстро:
            </h2>
            <div className="flex">
              <IoCheckboxOutline color="red" size={20} />
              <p>
                Добавь товары в корзину, а при оформлении заказа выбери <br />
                «Экспресс-доставку от 2 часов»
              </p>
            </div>
            <br /> 
            <div className="flex">
              <IoCheckboxOutline color="red" size={20} />
              <p>
                Добавь товары в корзину, а при оформлении заказа выбери <br />
                «Экспресс-доставку от 2 часов»
              </p>
            </div>
            <br />
            <div className="flex align-items-center">
              <IoCheckboxOutline color="red" size={20} />
              <p>
                Добавь товары в корзину, а при оформлении заказа выбери <br />
                «Экспресс-доставку от 2 часов»
              </p>
            </div>
          </div>
        </div>
      </Container>
      <br />
      <br />
    </div>
  );
};

export default Delivery;
