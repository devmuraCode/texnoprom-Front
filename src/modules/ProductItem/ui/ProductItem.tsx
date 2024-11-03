import { FC, useState } from "react";
import { useProductDetail } from "@/modules/ProductDetail/hooks/useProductDetail";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToCart } from "@/features/ShoppingSlice/CartSlice";
import cls from "./ProductItem.module.scss";
import { IProduct } from "../hooks/usePapulerProduct";

interface IProps {
  product: IProduct;
}

const ProductItem: FC<IProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const { cartItems } = useAppSelector((state) => state.cart);
  const [productSlug, setProductSlug] = useState<string | undefined>();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  // @ts-ignore
  const { data: products } = useProductDetail({ productSlug });

  const handleAddToCart = (product: IProduct) => {
    // @ts-ignore
    dispatch(addToCart(product));
    setIsAddedToCart(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const formatPrice = (price: string) => {
    return (
      new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "UZS",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(Number(price))
        .replace("UZS", "")
        .trim() + " сум"
    );
  };

  return (
    <div className="w-full bg-white rounded-md duration-100 hover:shadow dark:bg-white dark:border-x-gray-300">
      <NavLink
        to={`/detail/${product.slug}`}
        state={{ productId: product.id }}
        onClick={() => setProductSlug(product.slug)}
      >
        <div className={cls.imageContainer}>
          <img
            className={cls.image}
            src={product.mainimg}
            alt={product.title}
          />
        </div>
      </NavLink>

      <div className="px-5 pb-5">
        <NavLink to={`/detail/${product.slug}`} state={{ productId: product.id }}>
          <p className="text-slate-600 font-normal h-14 text-sm tracking-tight dark:text-grey-900 pt-5">
            {product.title}
          </p>
        </NavLink>
        <div className="flex flex-col py-2 h-24">
          {product.discounted_price &&
          Number(product.discounted_price) < Number(product.price) ? (
            <>
              <span className={`${cls.originalPrice} text-gray-900 text-sm dark:text-black line-through`}>
                {formatPrice(product.price)}
              </span>
              {" "}
              <span className={`${cls.discountedPrice} text-red-500`}>
                {formatPrice(product.discounted_price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900 dark:text-black">
              {formatPrice(product.price)}
            </span>
          )}
          {/* {product.discount_percent && Number(product.discount_percent) > 0 && (
            <span className="text-xs text-red-500">
              Скидка: {product.discount_percent}%
            </span>
          )} */}
         
          {product.installment && (
            <div className="text-sm text-gray-700 dark:text-gray-900 mt-2">
              Рассрочка: от {formatPrice(product.installment)} / мес
            </div>
          )}

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
