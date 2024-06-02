import Container from "@/components/Container/Container";

const AboutUs = () => {
  return (
    <div className="py-14">
      <Container>
        <div className="pb-4">
          <h1 className="font-bold text-2xl text-black pb-4">О компании</h1>
          <p className="font-sm font-normal text-black">
            Сайт, торгующий товарами в Интернете. Позволяет пользователям
            сформировать заказ на покупку, выбрать способ оплаты и доставки
            заказа в сети Интернет. Выбрав необходимые товары или услуги,
            пользователь обычно имеет возможность тут же на сайте выбрать метод
            оплаты и доставки.
          </p>
          <p className="font-sm font-normal text-black">
            Основное отличие Интернет-магазина от традиционного — в типе
            торговой площадки. Обычному магазину нужен торговый зал, витрины,
            ценники, а также продавцы, кассиры и опытные консультанты, у
            онлайн-магазина же вся инфраструктура реализована программно.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
