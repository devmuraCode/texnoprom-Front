import { useState } from "react";
import { useAppSelector } from "@/store/store";
import Container from "../Container/Container";
import { httpsClient } from "@/services/httpClient";

import { useMask } from "@react-input/mask";

const Payment = () => {
  const user_id = localStorage.getItem("user_id");
  
  const [payLink, setPayLink] = useState(null);

  const inputRef = useMask({
    mask: "+998_________",
    replacement: { _: /\d/ },
  });

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { cartItems, cartTotalAmount } = useAppSelector(
    (state) => state.cart
  );

  const id = cartItems.map((item) => item.id);


  const handlePaymeForm = async () => {
    const token = localStorage.getItem("token");

    const orderData = {
      amount: cartTotalAmount,
      user: user_id,
      delivery_address: deliveryAddress,
      phone_number: phone,
      products: id
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
      const orderData = await handlePaymeForm();
      await handlePaymeFormOrder(orderData);
    } catch (err) {
      console.error("Error processing payment:", err);
    }
  };

  return (
    <div>
      <Container>
        <div>
          <h1 className="text-3xl font-bold py-5">Оформить заказ</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h1 className="text-black text-xl font-bold">Адрес доставки</h1>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="street"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Улица
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <br />
                <input
                  ref={inputRef}
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
              >
                <img className="w-40" src="https://uzpay.bitrix24.site/upload/sale/paysystem/logotip/c38/payme_01.png" alt="" />
              </button>
              
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
