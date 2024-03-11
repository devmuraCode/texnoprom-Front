import Container from "@/components/Container/Container";
import { Input } from "antd";

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
        <div className="grid lg:grid-cols-2 gap-2">
          <div className="bg-gray-100 text-center p-10 leading-10">
            <h1 className="text-bold text-xl text-black font-bold">
              Оставайтесь на связи
            </h1>

            <p className="text-gray-400 font-normal">
              Подпишитесь на наши новости и будьте в курсе эксклюзивных акций!
            </p>
            <div className="flex">
              <Input placeholder="E-mail" />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded">
                Подпишитесь
              </button>
            </div>
          </div>
          <div className="bg-gray-100 text-center p-10 leading-10">
            <h1 className="text-bold text-xl text-black font-bold">
              Присоединяйтесь!
            </h1>

            <p className="text-gray-400 font-normal">
              Вступайте к нам в группу и узнавайте первыми все акции и
              предложения!
            </p>
            <div className="flex justify-center">
              <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold px-4 rounded">
                Подпишитесь
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
