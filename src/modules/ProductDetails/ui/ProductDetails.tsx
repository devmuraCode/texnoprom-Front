import { FC, useState } from "react";
import { IProduct } from "../../ProductItem/hooks/useProduct";
import cls from "./ProductDetails.module.scss";
import { useCharacteristics } from "../hooks/useCharacteristics";
import { useParams } from "react-router-dom";
import Characteristics from "./Characteristics";

interface ProductDetailsProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product, onAddToCart }) => {
  const { productId } = useParams<{ productId: string }>();
  const { data: characteristics } = useCharacteristics({ productId });

  const [state, setState] = useState(true);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('UZS', '').trim() + ' сум';
  };

  const markers = [
    { left: '-4px', top: '-3px', color: 'rgb(217, 46, 21)', number: 3 },
    { left: '50px', top: '-3px', color: 'rgb(217, 46, 21)', number: 6 },
    { left: '105px', top: '-3px', color: 'rgb(217, 46, 21)', number: 9 },
    { left: '155px', top: '-3px', color: 'rgb(245, 245, 246)', number: 12 },
    { left: '205px', top: '-3px', color: 'rgb(245, 245, 246)', number: 15 },
    { left: '255px', top: '-3px', color: 'rgb(245, 245, 246)', number: 18 },
    { left: '315px', top: '-3px', color: 'rgb(245, 245, 246)', number: 24 }
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
              {/* @ts-ignore */}
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
              {/* @ts-ignore */}
              <span className={cls.currentPrice}>{formatPrice(product.price)}</span>
              <span className={cls.monthlyPrice}>363,000 сум/мес.</span>
              <span className={cls.oldPrice}>3,599,000 сум</span>
              <span>{product.description}</span>
            </div>
          </div>
        </div>

        <div className={cls.priceCard}>
          <div className="w-full rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <h2>Цена товара</h2>
              <br />
              {/* @ts-ignore */}
              <h1 className="font-bold text-xl">{formatPrice(product.price)}</h1>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white w-full font-bold py-2 px-4 rounded"
                onClick={() => onAddToCart(product)}
              >
                В Корзину
              </button>
            </div>
          </div>

          <div className="w-full rounded overflow-hidden shadow-lg mt-2">
            <div className="px-6 py-4">
              <h2>Варианты рассрочки</h2>
              <br />
              <div className="relative w-full">
                <div className="flex justify-center flex-wrap">
                  <div className="mt-4 transform scale-100 cursor-pointer h-3.5 flex w-full">
                    <div
                      className="h-0.5 w-full"
                      style={{
                        background:
                          'linear-gradient(to right, rgb(217, 46, 21) 0%, rgb(217, 46, 21) 33%, rgb(245, 245, 246) 12.5%, rgb(245, 245, 246) 100%)',
                        alignSelf: 'center'
                      }}
                    >
                      {markers.map((marker, index) => (
                        <div key={index} className="relative">
                          <div
                            className="absolute"
                            style={{
                              left: marker.left,
                              marginTop: marker.top,
                              height: '8px',
                              width: '8px',
                              borderRadius: '50%',
                              backgroundColor: marker.color
                            }}
                          >
                            <div className="absolute top-[-25px] left-0 translate-x-[-29%]">
                              {marker.number}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div
                        tabIndex={0}
                        aria-valuemax={7}
                        aria-valuemin={1}
                        aria-valuenow={1}
                        draggable={false}
                        role="slider"
                        className="absolute z-0 cursor-grab user-select-none touch-action-none h-3.5 w-3.5 rounded-full bg-white flex justify-center items-center border-4 border-[#d92e15] outline-none"
                        style={{ transform: 'translate(100px, -6px)' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="border hover:border-red-700 text- w-full font-bold py-2 px-4 rounded flex between items-center">
                <img
                  src="https://cdn.mediapark.uz/imgs/e9eead05-96c8-4edf-8ee7-4980a87deb66_Frame-(3).svg"
                  alt=""
                />
                553 000 сум
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto">
          <div className="flex space-x-4">
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
              } border border-t-0 border-l-0 border-r-0 border-b-2  font-medium text-lg w-full py-3 flex justify-center items-center`}
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

          <div className="mt-8 text-lg">
            {state && <p className="leading-loose mb-4">{product.description}</p>}
            {state2 && (
              <div className="leading-loose mb-4">
                {characteristics?.map((item) => (
                  <Characteristics key={item.id} characteristics={item} />
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
