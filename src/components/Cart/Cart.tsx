import Container from "@/components/Container/Container";
import { FC } from "react";
import { useCart } from "react-use-cart";

const Cart: FC = () => {
  const { items } = useCart();
console.log(items);

  return (
    <Container>
      <div className="py-24 font-poppins">
        <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
          <div>
            <h2 className="mb-8 text-4xl font-bold text-black">
              Содержимое корзины
            </h2>
            <div className="p-6 mb-8 border dark:border-gray-800">
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
                        <button>-</button>3<button>+</button>
                      </div>
                    </div>
                    <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12">
                      <p className="font-bold text-black">$99.00</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                    {/* кантент */}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-between">
              {/* кантент */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
