import { FC, useState } from "react";
import { IProduct } from "../hooks/useProduct";
import { useProductDetail } from "@/modules/ProductDetail/hooks/useProductDetail";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
interface IProos {
  product: IProduct;
}
const ProductItem: FC<IProos> = (props) => {
  const dispatch = useAppDispatch()
  const {items} = useAppSelector(state => state.shoppingCart)
  console.log(items);
  
  const [productId, setProductId] = useState<string | null>(null);
  const { data: products } = useProductDetail({ productId });
  
  return (
    <div>
      <div className="w-full bg-white border-t border-x border-x-gray-200 duration-100  hover:shadow dark:bg-white dark:border-x-gray-200">
        <NavLink
          to={`/detail/${props.product.id}`}
          onClick={() => setProductId(props.product.id)}
        >
          <img
            // className="rounded-t-lg"
            src={props.product.mainimg}
            alt="product image"
          />
        </NavLink>

        <div className="px-5 pb-5">
          <a href="#">
            <p className="text-slate-600 font-normal tracking-tight dark:text-grey-900 py-5">
              {props.product.title}
            </p>
          </a>
          <div className="column items-center justify-between ">
            <span className="text-lg font-bold text-gray-900 dark:text-black">
              ${props.product.price}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:bg-red-600 font-medium rounded-lg text-sm px-2 mb-5 text-center dark:bg-red-600 dark:hover:bbg-red-700 dark:focus:ring-blue-800">
              Цена в рассрочку
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => dispatch({type: 'shoppingCart/addItem', payload: props.product})} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
