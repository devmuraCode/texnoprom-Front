import styles from "./Status.module.scss";
import Container from "@/components/Container/Container";

const Status = () => {
  return (
    <div className={styles.status}>
      <Container>
        <div className={styles.orderDetails}>
          <h2 className={styles.title}>Джасур Файзуллаев</h2>
          <div className={styles.orderStatus}>
            <div className={styles.orderHeader}>
              <span>ID заказа 36103185</span>
              <span>Обновлен 6 октября 2024 г. в 18:44</span>
            </div>
            <div className={styles.orderInfo}>
              <span>Дата доставки: понедельник, 7 октября</span>
              <span>
                Пункт выдачи: г. Ташкент, массив Городок Тракторостроителей,
                дом 22
              </span>
            </div>
            <div className={styles.orderFooter}>
              <span>3 товара</span>
              <span>Итого: 26 000 сум</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Status;
