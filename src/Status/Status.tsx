import { useEffect, useState } from "react";
import { useStatus } from "./hooks/useStatus";
import styles from "./Status.module.scss";
import Container from "@/components/Container/Container";

const Status = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const { data: status, isLoading, error } = useStatus();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка при загрузке данных</div>;
  }

  if (!status || status.length === 0) {
    return <div>Нет данных</div>;
  }

  const order = status[0];

  const formattedDate = order.created_at
    ? new Date(order.created_at).toLocaleString()
    : "Не указано";

  const paymentStatus = order.is_paid ? "Оплачен" : "Не оплачен";

  return (
    <div className={styles.status}>
      <Container>
        <div className={styles.orderDetails}>
          <h2 className={styles.title}>Заказ пользователя {userId}</h2>

          <div className={styles.orderStatus}>
            <div className={styles.orderHeader}>
              <span>ID заказа: {order.id}</span>
              <span>Обновлен: {formattedDate}</span>
            </div>

            <div className={styles.orderInfo}>
              <span>
                Дата доставки: {order.delivery_address || "Не указана"}
              </span>
              <span>Телефон: {order.phone_number || "Не указан"}</span>
            </div>

            <div className={styles.orderFooter}>
              <span>Сумма заказа: {order.amount?.toLocaleString()} сум</span>
              <span>Статус: {paymentStatus}</span>
            </div>

            <div className={styles.products}>
              <h4>Продукты в заказе:</h4>
              {order.products?.length > 0 ? (
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              ) : (
                <p>Нет товаров в заказе</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Status;
