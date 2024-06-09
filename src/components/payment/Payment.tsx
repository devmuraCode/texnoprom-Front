import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Container from "../Container/Container";
import { httpsClient } from "@/services/httpClient";
import { useMask } from "@react-input/mask";
import useUzumModal from "@/modules/Modals/hooks/useUzumModa";

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
  // @ts-ignore
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
      const res = await httpsClient.post(`/orders/`, orderData, {
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

  // @ts-ignore
  const handlePaymeFormOrder = async (orderData) => {
    const token = localStorage.getItem("token");

    const bodyLink = {
      order_id: orderData.id,
      amount: orderData.amount,
    };

    try {
      const res = await httpsClient.post(`/pay-link/`, bodyLink, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.href = res.data.pay_link;
    } catch (err) {
      console.error("Error creating payment link:", err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      localStorage.setItem("selectedDistrict", selectedDistrict);
      const orderData = await handlePaymeForm();
      await handlePaymeFormOrder(orderData);
    } catch (err) {
      console.error("Error processing payment:", err);
    }
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="text-center flex gap-2">
              <button
                type="submit"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                <img
                  className="w-40 mx-auto"
                  src="https://uzpay.bitrix24.site/upload/sale/paysystem/logotip/c38/payme_01.png"
                  alt="Payme"
                />
              </button>
              <button
              onClick={() => uzumModal.onOpen()}
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              <img
                className="w-40 mx-auto"
                src="https://images.seeklogo.com/logo-png/53/1/uzum-nasiya-logo-png_seeklogo-532666.png?v=638500244860000000"
                alt="Uzum"
              />
            </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
