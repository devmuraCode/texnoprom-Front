import { FC, useState } from "react";
import { IProduct } from "../hooks/useProduct";
import { useProductDetail } from "@/modules/ProductDetail/hooks/useProductDetail";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToCart } from "@/features/ShoppingSlice/CartSlice";
import cls from "./ProductItem.module.scss";

interface IProos {
  product: IProduct;
}

const ProductItem: FC<IProos> = (props) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const [productId, setProductId] = useState<string | null>(null);
  // @ts-ignore
  const { data: products } = useProductDetail({ productId });

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-full bg-white border-t border-x border-x-gray-200 duration-100 hover:shadow dark:bg-white dark:border-x-gray-200">
      <NavLink
        to={`/detail/${props.product.id}`}
        onClick={() => setProductId(props.product.id)}
      >
        <div className={cls.imageContainer}>
          <img
            className={cls.image}
            src={props.product.mainimg}
            alt="product image"
          />
        </div>
      </NavLink>

      <div className="px-5 pb-5">
        <a href="#">
          <p className="text-slate-600 font-normal tracking-tight dark:text-grey-900 py-5">
            {props.product.title}
          </p>
        </a>
        <div className="column items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-black">
            ${props.product.price}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:bg-red-600 font-medium rounded-lg text-sm px-2 mb-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">
            Цена в рассрочку
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleAddToCart(props.product)}
            className={cls.button}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
