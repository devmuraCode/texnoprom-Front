import Container from "../Container/Container";
import AccordionItem from "../Accardion/AccordionItem";

const Payment = () => {

  return (
    <div>
      <Container>
        <div>
          <h1 className="text-3xl font-bold py-5">Оформить заказ</h1>
          <div>
            <form>
              <div className="grid flex items-center gap-2 mb-6 md:grid-cols-3">
                <h6 className="text-xl font-bold">Доставка</h6>
                <div className="mb-6">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Область/район
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="cities"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Город
                  </label>
                  <select
                    id="cities"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a city</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
                <h6 className="text-xl font-bold mb-6">Покупатель</h6>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Имя
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123-45-678"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <h1 className="text-black text-xl font-bold ">
                  Адрес доставки
                </h1>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="street"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Улица
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="podezd"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Подъезд
                </label>
                <input
                  type="text"
                  name="podezd"
                  id="podezd"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="oridezd"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Ориентир
                </label>
                <input
                  type="text"
                  name="oridezd"
                  id="oridezd"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="house"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Дом
                </label>
                <input
                  type="text"
                  name="house"
                  id="house"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="kvartira"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Квартира
                </label>
                <input
                  type="text"
                  name="kvartira"
                  id="kvartira"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </form>
          </div>
          <div className="flex gap-3 items-center">
            <div>
              <form
                id="form-payme"
                method="POST"
                action="https://checkout.paycom.uz/"
              >
                <input
                  type="hidden"
                  name="merchant"
                  value={"6631ecc52eb76ec81b69f5c7"}
                />
                <input
                  type="hidden"
                  name="account[oreder_id]"
                  value="123"
                />
                <input type="hidden" name="amount" value="560" />
                <input type="hidden" name="lang" value="ru" />
                <input
                  type="hidden"
                  name="button"
                  data-type="svg"
                  value="colored"
                />
                <div id="button-container"></div>
              </form>
            </div>
          </div>
          <div className="my-3">
            <AccordionItem
              img="https://elmakon.uz/images/logos/8/elmakon.png"
              content={
                <>
                  <form></form>
                </>
              }
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
