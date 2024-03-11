import { FC, useState } from "react";
import { IProduct } from "../hooks/useProduct";
import { useProductDetail } from "@/modules/ProductDetail/hooks/useProductDetail";
import { NavLink } from "react-router-dom";
interface IProos {
  product: IProduct;
}
const ProductItem: FC<IProos> = (props) => {
  const [productId, setProductId] = useState<string | null>(null);
  const { data: products } = useProductDetail({ productId });
  return (
    <NavLink to={`/detail/${props.product.id}`} onClick={() => setProductId(props.product.id)}>
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={props.product.mainimg}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white py-5">
            {props.product.title}
          </h5>
        </a>
        <div className="flex items-center justify-between">
          <span className="text-md font-bold text-gray-900 dark:text-white">
            ${props.product.price}
          </span>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
    </NavLink>
  );
};

export default ProductItem;
