/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/store/store";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  updateInstallment,
} from "../../features/ShoppingSlice/CartSlice";
import "./index.css";
import useLoginModal from "@/modules/Modals/hooks/useLoginModal";

interface Product {
  id: string;
  title: string;
  description: string;
  mainimg: string;
  price: number;
}

interface CartItem extends Product {
  cartQuantity: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const loginModal = useLoginModal();
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();
  const user = localStorage.getItem("token");

  const [installmentPlans, setInstallmentPlans] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleDecreaseCart = (cartItem: CartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleInstallmentChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    cartItemId: string,
    monthlyPayment: number
  ) => {
    setInstallmentPlans({
      ...installmentPlans,
      [cartItemId]: parseInt(e.target.value),
    });

    dispatch(
      updateInstallment({
        id: cartItemId,
        installment: parseInt(e.target.value),
        monthly_payment: monthlyPayment,
      })
    );
  };

  const formatPrice = (price: number, quantity?: number) => {
    return (
      new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "UZS",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(quantity ? price * quantity! : price)
        .replace("UZS", "")
        .trim() + " сум"
    );
  };

  const formatInstallmentPrice = (
    price: number,
    months: number,
    quantity: number
  ) => {
    return formatPrice(price, quantity) + ` / месяц x ${months}`;
  };

  const handleCheckout = () => {
    if (!user) {
      loginModal.onOpen();
    } else {
      navigate("/payment");
    }
  };

  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Ваша корзина на данный момент пуста</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Начать покупки</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Продукт</h3>
            <h3 className="price">Цена</h3>
            <h3 className="quantity">Количество</h3>
            <h3 className="installment">Рассрочка</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.mainimg} alt={cartItem.title} />
                  <div>
                    <h3>{cartItem.title}</h3>
                    {/* @ts-ignore */}
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Удалить
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">
                  {formatPrice(cartItem.price, cartItem.cartQuantity)}
                </div>
                <div className="cart-product-quantity">
                  {/* @ts-ignore */}
                  <button onClick={() => handleDecreaseCart(cartItem)}>
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  {/* @ts-ignore */}
                  <button onClick={() => handleAddToCart(cartItem)}>+</button>
                </div>
                <div className="cart-product-installment">
                  <select
                    value={
                      installmentPlans[cartItem.id] || cartItem.installment
                    }
                    onChange={(e) =>
                      handleInstallmentChange(
                        e,
                        cartItem.id,
                        cartItem.installmentService?.monthly_payment!
                      )
                    }
                  >
                    <option value={0}>Без рассрочки</option>
                    {[3, 6, 9, 12, 15, 18, 24].map((months) => (
                      <option key={months} value={months}>
                        {months} месяцев
                      </option>
                    ))}
                  </select>
                  {installmentPlans[cartItem.id] > 0 && (
                    <div>
                      {formatInstallmentPrice(
                        cartItem.installmentService?.monthly_payment!,
                        installmentPlans[cartItem.id],
                        cartItem.cartQuantity
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={handleClearCart}>
              Очистить
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Промежуточный итог</span>
                <span className="amount">
                  {formatPrice(cart.cartTotalAmount)}
                </span>
              </div>
              <p>Налоги и доставка рассчитываются при оформлении заказа</p>
              <button onClick={handleCheckout}>Оформить заказ</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Продолжить покупки</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
