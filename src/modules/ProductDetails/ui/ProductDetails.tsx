/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { FC, useState, useEffect } from "react";
import cls from "./ProductDetails.module.scss";
import { useCharacteristics } from "../hooks/useCharacteristics";
import { Link, useParams } from "react-router-dom";
import Characteristics from "./Characteristics";
import { useInstallment } from "@/hooks/installment/useInstallment";
import { IProduct } from "@/modules/ProductItem/hooks/useAllProducts";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToCart } from "@/features/ShoppingSlice/CartSlice";

interface IProductExt extends IProduct {
  images?: string[];
  installment?: number;
  installmentService?: { title: string; monthly_payment: number };
  cartQuantity?: number;
}

interface ProductDetailsProps {
  product: IProductExt;
  onAddToCart: (product: IProductExt) => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product, onAddToCart }) => {
  console.log(product);
  
  const { productId } = useParams<{ productId: string }>();
  const { data: characteristics } = useCharacteristics({ productId });

  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector((state) => state.cart);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const [state, setState] = useState(true);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);

  const [selectedInstallment, setSelectedInstallment] = useState<number>(6);
  const { data: installment, refetch } = useInstallment({
    productId,
    months: selectedInstallment,
  });

  const [installmentService, setInstallmentService] = useState<
    Partial<IProductExt["installmentService"]>
  >({});

  useEffect(() => {
    refetch();
  }, [selectedInstallment, refetch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setIsAddedToCart(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

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

  const markers = [
    { left: "-4px", top: "-3px", color: "rgb(217, 46, 21)", number: 3 },
    { left: "50px", top: "-3px", color: "rgb(217, 46, 21)", number: 6 },
    { left: "105px", top: "-3px", color: "rgb(217, 46, 21)", number: 9 },
    { left: "155px", top: "-3px", color: "rgb(245, 245, 246)", number: 12 },
    { left: "205px", top: "-3px", color: "rgb(245, 245, 246)", number: 15 },
    { left: "255px", top: "-3px", color: "rgb(245, 245, 246)", number: 18 },
    { left: "315px", top: "-3px", color: "rgb(245, 245, 246)", number: 24 },
  ];

  return (
    <div className={cls.productDetailPage}>
      <div className={cls.breadcrumbs}>
        <a href="/">Главная</a> /{" "}
        <a href="/products">Телефоны, гаджеты, аксессуары</a> / {product.title}
      </div>

      <div className={`${cls.flexContainer} mt-8`}>
        <div className={cls.productDetailContainer}>
          <div className={cls.imageContainer}>
            <img
              className={cls.mainImage}
              src={product.mainimg}
              alt={product.title}
            />
            <div className={cls.thumbnailContainer}>
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  className={cls.thumbnail}
                  src={img}
                  alt={`${product.title} thumbnail ${index}`}
                />
              ))}
            </div>
          </div>

          <div className={cls.infoContainer}>
            <h1 className={cls.title}>{product.title}</h1>
            <div className={cls.priceContainer}>
              <span className={cls.currentPrice}>
                {/* @ts-ignore */}
                {formatPrice(product.price)}
              </span>
              <span className={cls.usd}>{product.priceusd} $</span>
              <span>{product.description}</span>
            </div>
          </div>
        </div>

        <div className={cls.priceCard}>
          <div className="w-full rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl">Цена товара</h2>
              <br />
              <h1 className="font-bold text-xl">
                {formatPrice(+product.price)}
              </h1>
            </div>
            <div className="px-6 pt-4 pb-2">
            <button
                onClick={() => handleAddToCart(product)}
                className={`${cls.button} ${
                  isAddedToCart ? cls.buttonAdded : ""
                } ${isAnimating ? cls.buttonBounce : ""}`}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? "Добавлено" : "Добавить в корзину"}
              </button>
            </div>
          </div>

          <div className="w-full rounded overflow-hidden shadow-lg mt-2">
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl">Варианты рассрочки</h2>
              <br />
              <div className="flex flex-row gap-9">
                {markers.map((marker, index) => (
                  <label
                    key={index}
                    className="flex flex-col items-center cursor-pointer mb-4"
                  >
                    <span className="text-gray-700 mb-2">{marker.number}</span>
                    <input
                      type="radio"
                      name="installment"
                      value={marker.number}
                      checked={selectedInstallment === marker.number}
                      onChange={() => setSelectedInstallment(marker.number)}
                      className="form-radio h-4 w-4 text-red-600 transition duration-150 ease-in-out"
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="px-6 pt-4 pb-2">
            {installment?.map((installment, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border hover:border-red-700 mb-1 font-bold py-2 px-4 rounded gap-8 pointer"
                >
                  <img src={installment.logo} className=" h-10" alt="s" />
                  <span className="font-normal text-sm">
                    {formatPrice(installment.monthly_payment)}/мес
                  </span>
                </div>
              ))}

              <button
                className="bg-red-500 hover:bg-red-700 text-white w-full font-bold py-2 px-4 rounded"
                onClick={() =>
                  onAddToCart({
                    ...product,
                    installment: selectedInstallment,
                    installmentService: {
                      title: installmentService?.title!,
                      monthly_payment: installmentService?.monthly_payment!,
                    },
                  })
                }
              >
                <Link to={"/cart"}>Подтвердить</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto">
          <div className="flex">
            <button
              onClick={() => {
                setState(true);
                setState2(false);
                setState3(false);
              }}
              className={`${
                state
                  ? "text-yellow-400 border-b-yellow-400"
                  : "text-gray-400 border-b-gray-300"
              } border border-t-0 border-l-0 border-r-0 border-b-2 font-medium text-lg w-full py-3 flex justify-center items-center`}
            >
              Описание
            </button>
            <button
              onClick={() => {
                setState(false);
                setState2(true);
                setState3(false);
              }}
              className={`${
                state2
                  ? "text-yellow-400 border-b-yellow-400"
                  : "text-gray-400 border-b-gray-300"
              } border border-t-0 border-l-0 border-r-0 border-b-2 font-medium text-lg w-full py-3 flex justify-center items-center`}
            >
              Характеристики
            </button>
            <button
              onClick={() => {
                setState(false);
                setState2(false);
                setState3(true);
              }}
              className={`${
                state3
                  ? "text-yellow-400 border-b-yellow-400"
                  : "text-gray-400 border-b-gray-300"
              } border border-t-0 border-l-0 border-r-0 border-b-2 font-medium text-lg w-full py-3 flex justify-center items-center`}
            >
              Отзывы
            </button>
          </div>

          <div className="text-lg">
            {state && (
              <p className="leading-loose mb-4">{product.description}</p>
            )}
            {state2 && (
              <div
              className={cls.leading_loose}
              style={{ columnCount: 2 }}
            >
              {characteristics?.map((item) => (
                <div className={cls.centeredCharacteristics}>
                  <Characteristics key={item.id} characteristics={item} />
                </div>
              ))}
              </div>
            )}
            {state3 && <p className="leading-loose mb-4">d</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;