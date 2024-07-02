import { FC, useState } from "react";
import { useProductDetail } from "@/modules/ProductDetail/hooks/useProductDetail";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToCart } from "@/features/ShoppingSlice/CartSlice";
import cls from "./ProductItem.module.scss";
import { IProduct } from "../hooks/useAllProducts";

interface IProps {
  product: IProduct;
}

const ProductItem: FC<IProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const { cartItems } = useAppSelector((state) => state.cart);
  const [productId, setProductId] = useState<string | null>(null);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  // @ts-ignore
  const { data: products } = useProductDetail({ productId });

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setIsAddedToCart(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const formatPrice = (price: number) => {
    return (
      new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "UZS",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(price)
        .replace("UZS", "")
        .trim() + " сум"
    );
  };

  return (
    <div className="w-full  bg-white border border-x-gray-200 rounded-md	 duration-100 hover:shadow dark:bg-white dark:border-x-gray-300">
      <NavLink
        to={`/detail/${product.id}`}
        onClick={() => setProductId(product.id)}
      >
        <div className={cls.imageContainer}>
          <img
            className={cls.image}
            src={product.mainimg}
            alt="product image"
          />
        </div>
      </NavLink>

      <div className="px-5 pb-5">
        <NavLink to={`/detail/${product.id}`}>
          <p className="text-slate-600 h-20 font-normal tracking-tight dark:text-grey-900 py-5">
            {product.title}
          </p>
        </NavLink>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 dark:text-black">
            {/* @ts-ignore */}
            {formatPrice(product.price)}
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-black">
            {product.priceusd} $
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleAddToCart(product)}
            className={`${cls.button} ${isAddedToCart ? cls.buttonAdded : ""} ${
              isAnimating ? cls.buttonBounce : ""
            }`}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? "Добавлено" : "Добавить в корзину"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
