import Container from "@/components/Container/Container";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="footer__block_1">
          <ul>
            <li>
              <p>Покупательский сервис</p>
            </li>
            <li>
              <a href="/cart">Ваши заказы</a>
            </li>
            <li>
              <a href="/telefon_gadjet_aksessuar"></a>Смартфоны
            </li>
            <li>
              <a href="/noutbook"></a>Ноутбуки
            </li>
            <li>
              <a href="/televizor"></a>Телевизоры
            </li>
            <li>
              <a href="/avto"></a>Авто товары
            </li>
          </ul>
          <ul>
            <li>
              <p>Контакты</p>
            </li>
            <li>г. Ташкент, Абдулла Кодирий 36Б</li>
            <li>
              <a href="tel:+998-71-203-1203">+998-71-203-1203</a>
            </li>
            <li>Пн-Вс 9.00 - 18.00</li>
            <li>admin@elmakon.uz</li>
            <li>Посмотреть на карте</li>
          </ul>
        </div>
        <p>© 2017 - 2023 OOO "BM ELMAKON". Elmakon</p>
      </Container>
    </footer>
  );
};

export default Footer;
