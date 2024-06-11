import { FC } from "react";
import { IProduct } from "../../ProductItem/hooks/useProduct";
import cls from "./ProductDetails.module.scss";

interface ProductDetailsProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product, onAddToCart }) => {
  return (
    <div className={cls.productDetailPage}>
      <div className={cls.breadcrumbs}>
        <a href="/">Главная</a> / <a href="/products">Телефоны, гаджеты, аксессуары</a> / {product.title}
      </div>
      <div className={cls.productDetailContainer}>
        <div className={cls.imageContainer}>
          <img className={cls.mainImage} src={product.mainimg} alt={product.title} />
          <div className={cls.thumbnailContainer}>
            {/* @ts-ignore */}
            {product.images?.map((img, index) => (
              <img key={index} className={cls.thumbnail} src={img} alt={`${product.title} thumbnail ${index}`} />
            ))}
          </div>
        </div>
        <div className={cls.infoContainer}>
          <h1 className={cls.title}>{product.title}</h1>
          
          <div className={cls.priceContainer}>
            <span className={cls.currentPrice}>{product.price} UZS</span>
            <span className={cls.monthlyPrice}>363,000 сум/мес.</span>
            <span className={cls.oldPrice}>3,599,000 UZS</span>
            <span className={cls.discount}>Вы экономите: 600,000 UZS</span>
          </div>
          <div className={cls.availability}>
            Наличие в магазинах: <span className={cls.store}>Ташкент</span> В наличии в 1 магазине
          </div>
          <div className={cls.buttons}>
            <button className={cls.addToCartButton} onClick={() => onAddToCart(product)}>В КОРЗИНУ</button>
            <button className={cls.installmentButton}>В РАССРОЧКУ</button>
          </div>
          <div className={cls.contact}>
            Продавец: <span className={cls.seller}>ТЕХНОПРОМ</span> <a href="tel:+998712031203">+998-71-203-1203</a>
          </div>
        </div>
      </div>
      <div className={cls.description}>
        {product.description}
      </div>
    </div>
  );
};

export default ProductDetails;
