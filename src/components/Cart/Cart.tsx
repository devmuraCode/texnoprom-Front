import Container from "@/components/Container/Container";
import { FC, useState } from "react";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";

const Cart: FC = () => {
  const { items } = useCart();
  console.log(items);

  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  const [quantity, setQuantity] = useState<number>(1); // начальное количество

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const resetQuantity = () => {
    setQuantity(1);
  };

  const calculateTotalPrice = () => {
    const pricePerUnit = 123.0; // цена за единицу товара
    return (quantity * pricePerUnit).toFixed(2);
  };

  return (
    <Container>
      <div className="py-24 font-poppins">
        <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
          <div>
            <h2 className="mb-8 text-4xl font-bold text-black">
              Содержимое корзины
            </h2>
            <div className="inline-flex items-center gap-5 p-4 font-semibold bg-gray-700 text-white border border-gray-200 rounded-md dark:border-gray-700 mb-8">
              <button onClick={redirectToHome}>Продолжить покупки</button>
            </div>
            <div className="p-6 mb-8 dark:border-gray-800">
              <div className="flex flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
                <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                  <h2 className="font-bold text-black">Название продукта</h2>
                </div>
                <div className="hidden px-4 lg:block lg:w-2/12">
                  <h2 className="font-bold text-black">Цена</h2>
                </div>
                <div className="w-auto px-4 md:w-1/6 lg:w-2/12">
                  <h2 className="font-bold text-black">Количество</h2>
                </div>
                <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12">
                  <h2 className="font-bold text-black">Итого</h2>
                </div>
              </div>
              {items.map((item) => (
                <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                    <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0 flex items-center">
                      <div className="w-24 h-24 mr-4">
                        <img
                          src=""
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h2 className="mb-2 text-xl font-bold text-black">
                          Название продукта
                        </h2>
                        <p className="font-400 text-black-300 pt-3 font-sm text-sm">
                          Описание продукта
                        </p>
                      </div>
                    </div>
                    <div className="hidden px-4 lg:block lg:w-2/12">
                      <p className="font-400 text-black-300 pt-3 font-sm text-sm leading-7">
                        $ 123
                      </p>
                    </div>
                    <div className="w-auto px-4 md:w-1/6 lg:w-2/12">
                      <div className="inline-flex items-center gap-5 p-4 font-semibold text-black border border-gray-200 rounded-md dark:border-gray-700">
                        <button onClick={handleDecrement}>-</button>
                        {quantity}
                        <button onClick={handleIncrement}>+</button>
                      </div>
                    </div>
                    <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12">
                      <p className="font-bold text-black">
                        ${calculateTotalPrice()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                    {/* кантент под картинкой*/}
                  </div>
                </div>
              ))}
              <div className="p-6 mb-8 dark:border-gray-800">
                <div className="flex flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-2 justify-between">
                  <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                    <h2 className="font-bold text-gray-400 text-2xl">
                      Итоговая стоимость
                    </h2>
                  </div>
                  <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12">
                    <p className="font-bold text-black">
                      ${calculateTotalPrice()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 mb-8 dark:border-gray-800">
                <div className="flex flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-2 justify-between">
                  {/* Кнопки слева */}
                  <div className="flex items-center gap-5">
                    <div className="inline-flex items-center gap-5 p-4 font-semibold bg-gray-700 text-white border-gray-200 rounded-md dark:border-gray-700">
                      <button onClick={redirectToHome}>
                        Продолжить покупки
                      </button>
                    </div>
                    <div className="inline-flex items-center gap-5 p-4 font-semibold bg-gray-700 text-black border bg-stone-50 border-gray-200 rounded-md dark:border-gray-700">
                      <button onClick={resetQuantity}>
                        Очистить корзину
                      </button>
                    </div>
                  </div>

                  {/* Кнопка справа */}
                  <div className="inline-flex items-center gap-5 p-4 font-semibold bg-gray-700 text-white bg-blue-600 border-gray-200 rounded-md dark:border-gray-700">
                    <button onClick={redirectToHome}>Оформить заказ</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              {/* кантент ниже карточки  */}

              
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
