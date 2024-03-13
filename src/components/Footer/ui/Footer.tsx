import Container from "@/components/Container/Container";

const Footer = () => {
  return (
    <div className="px-10 bg-sky-600 w-full">
      <Container>
        <div className="flex py-20 justify-between mt-9 text-white">
          <ul className=" text-start">
            <a href="#" className=" flex font-black">
              Моя учетная запись
            </a>
            <a href="#">Войти или зарегистрироватся</a>
          </ul>
          <ul className="text-start">
            <li className=" flex font-black">Интернет-магазины</li>
            <a href="#">О нас </a>
            <a href="#">Жалобы и предложения </a>
            <a href="#">Торговые предложения </a>
            <a href="#">Карта сайта </a>
            <a href="#">Блог</a>
          </ul>
          <ul className="text-start">
            <a href="#" className=" flex font-black">
              Покупатель сервис{" "}
            </a>
            <a href="#">Ваши магазины </a>
            <a href="#">Отложеные </a>
            <a href="#">Спиоск сравнения </a>
            <a href="#">Статус рассрочки </a>
            <a href="#">Подаречные сертефикаты </a>
            <a href="#">Программа лояльности клиентов </a>
          </ul>
          <ul className="text-start">
            <a href="#" className=" flex font-black">
              Информация
            </a>
            <a href="#">Адрес магазины </a>
            <a href="#">Оптала и доставка</a>
            <a href="#">Условия рассрочки </a>
            <a href="#">О персональных данных </a>
            <a href="#">Возврат и обмен товаров </a>
            <a href="#">Cashback</a>
            <a href="#">Оферта</a>
          </ul>
          <ul className="text-start">
            <a href="#" className=" flex font-black">
              Контакты
            </a>
            <a href="#">г. Ташкент, Абдулла Кодирий 36Б</a>
            <a href="tel:+998-71-203-1203">+998-71-203-1203</a>
            <a href="mailto:admin@elmakon.uz">Пн-Вс 9.00 - 18.00</a>
            <a href="mailto:admin@elmakon.uz">admin@elmakon.uz</a>
            <a href="#">Посмотреть на карте</a>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
