import Container from "@/components/Container/Container";
import './Footer.scss'
const Footer = () => {
  return (
    <div className="footer w-full">
      <Container>
        <div className="px-5 sm:flex flex-col">
          <div className="flex flex-wrap  justify-around mt-9 text-white">
            <div className="mb-6 w-full sm:w-auto text-start">
              <h2 className="font-black text-lg">Моя учетная запись</h2>
              <a href="#" className="text-sm block">
                Войти или зарегистрироваться
              </a>
            </div>
            <div className="mb-6 w-full sm:w-auto text-start ">
              <h2 className="font-black text-lg">Интернет-магазины</h2>
              <a href="#" className="text-sm block">
                О нас
              </a>
              <a href="#" className="text-sm block">
                Жалобы и предложения
              </a>
              <a href="#" className="text-sm block">
                Торговые предложения
              </a>
              <a href="#" className="text-sm block">
                Карта сайта
              </a>
              <a href="#" className="text-sm block">
                Блог
              </a>
            </div>
            <div className="mb-6 w-full sm:w-auto text-start ">
              <h2 className="font-black text-lg">Покупатель сервис</h2>
              <a href="#" className="text-sm block">
                Ваши магазины
              </a>
              <a href="#" className="text-sm block">
                Отложенные
              </a>
              <a href="#" className="text-sm block">
                Список сравнения
              </a>
              <a href="#" className="text-sm block">
                Статус рассрочки
              </a>
              <a href="#" className="text-sm block">
                Подарочные сертификаты
              </a>
              <a href="#" className="text-sm block">
                Программа лояльности клиентов
              </a>
            </div>
            <div className="mb-6 w-full sm:w-auto text-start ">
              <h2 className="font-black text-lg">Информация</h2>
              <a href="#" className="text-sm block">
                Адрес магазина
              </a>
              <a href="#" className="text-sm block">
                Оплата и доставка
              </a>
              <a href="#" className="text-sm block">
                Условия рассрочки
              </a>
              <a href="#" className="text-sm block">
                О персональных данных
              </a>
              <a href="#" className="text-sm block">
                Возврат и обмен товаров
              </a>
              <a href="#" className="text-sm block">
                Cashback
              </a>
              <a href="#" className="text-sm block">
                Оферта
              </a>
            </div>
            <div className="mb-6 w-full sm:w-auto text-start ">
              <h2 className="font-black text-lg">Контакты</h2>
              <a href="#" className="text-sm block">
                г. Ташкент, Абдулла Кодирий 36Б
              </a>
              <a href="tel:+998-71-203-1203" className="text-sm block">
                +998-71-203-1203
              </a>
              <a href="mailto:admin@elmakon.uz" className="text-sm block">
                Пн-Вс 9.00 - 18.00
              </a>
              <a href="mailto:admin@elmakon.uz" className="text-sm block">
                admin@elmakon.uz
              </a>
              <a href="#" className="text-sm block">
                Посмотреть на карте
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
