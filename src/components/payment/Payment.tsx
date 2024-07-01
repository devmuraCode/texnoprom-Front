/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useState, useEffect, FormEvent } from "react";
import { useAppSelector } from "@/store/store";
import Container from "../Container/Container";
import http from "@/services/http";
import { useMask } from "@react-input/mask";
import useUzumModal from "@/modules/Modals/hooks/useUzumModa";
import axios from "axios";
import { IProductExt } from "@/modules/ProductDetails/ui/ProductDetails";

const districts = [
  "Алмазарский район",
  "Бектемирский район",
  "Мирабадский район",
  "Мирзо-Улугбекский район",
  "Сергелийский район",
  "Чиланзарский район",
  "Шайхантаурский район",
  "Юнусабадский район",
  "Яккасарайский район",
  "Яшнабадский район",
  "Учтепинский район",
];

const Payment = () => {
  const uzumModal = useUzumModal();
  const user_id = localStorage.getItem("user_id");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [payLink, setPayLink] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const { cartItems, cartTotalAmount } = useAppSelector((state) => state.cart);
  const id = cartItems.map((item) => item.id);

  const inputRef = useMask({
    mask: "+998_________",
    replacement: { _: /\d/ },
  });

  useEffect(() => {
    const savedDistrict = localStorage.getItem("selectedDistrict");
    if (savedDistrict) {
      setSelectedDistrict(savedDistrict);
    }
  }, []);

  const handlePaymeForm = async () => {
    const token = localStorage.getItem("token");

    const orderData = {
      amount: Math.round(cartTotalAmount * 100),
      user: user_id,
      delivery_address: deliveryAddress,
      phone_number: phone,
      district: selectedDistrict,
      products: id,
    };

    try {
      const res = await http.request.post(`/orders/`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayLink(res.data);
      return res.data;
    } catch (err) {
      console.error("Error creating order:", err);
      throw err;
    }
  };

  // @ts-expect-error abc
  const handlePaymeFormOrder = async (orderData) => {
    const token = localStorage.getItem("token");

    const bodyLink = {
      order_id: orderData.id,
      amount: orderData.amount,
    };

    try {
      const res = await http.request.post(`/pay-link/`, bodyLink, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.href = res.data.pay_link;
    } catch (err) {
      console.error("Error creating payment link:", err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      localStorage.setItem("selectedDistrict", selectedDistrict);
      const orderData = await handlePaymeForm();
      await handlePaymeFormOrder(orderData);
    } catch (err) {
      console.error("Error processing payment:", err);
    }
  };

  const handleInstallment = async () => {
    if (!selectedDistrict && !deliveryAddress && !phone) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    const filteredItems = cartItems.filter((item) => "installment" in item);

    const { data: userData } = await http.request.get(`/users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axios.post(
      `https://api.telegram.org/bot${
        import.meta.env.VITE_BOT_TOKEN
      }/sendMessage`,
      {
        chat_id: import.meta.env.VITE_CHAT_ID,
        text: `Имя: ${
          userData.username
        }\nРайон: ${selectedDistrict}\nАдрес: ${deliveryAddress}\nНомер: ${phone}\nВид оплаты: Рассрочка\n\n${filteredItems
          .map(
            // @ts-expect-error abc
            (item: IProductExt) =>
              `${item.title}\nКоличество: ${item.cartQuantity}\nРассрочка: ${
                item.installmentService?.title
              } ${item.installment} мес. ${(
                item.installmentService?.monthly_payment! * item.cartQuantity!
              ).toLocaleString()} сум\n\n`
          )
          .join("")}`,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Container>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold py-5 text-center">
            Оформить заказ
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="street"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Улица
              </label>
              <input
                type="text"
                name="street"
                id="street"
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="district"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Район
              </label>
              <select
                id="district"
                required
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="" disabled>
                  Выберите район
                </option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Телефон
              </label>
              <input
                ref={inputRef}
                type="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="text-center flex gap-2">
              <button
                type="submit"
                className="inline-block hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                <img
                  className="w-40 mx-auto"
                  src="https://uzpay.bitrix24.site/upload/sale/paysystem/logotip/c38/payme_01.png"
                  alt="Payme"
                />
              </button>
              <button
                onClick={() => uzumModal.onOpen()}
                className="inline-block hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                <img
                  className="w-40 mx-auto"
                  src="https://docs.click.uz/wp-content/themes/click_help/assets/images/logo.png"
                  alt="Uzum"
                />
              </button>
              <button type="button" onClick={handleInstallment}>
                Рассрочка
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
