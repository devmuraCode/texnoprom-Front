import { FC, useState } from "react";
import { Link } from "react-router-dom";
import cls from "./CardCollection.module.scss";
import { ICollection } from "@/modules/CollectionsCard/hooks/useCollectionsCard";
import { useProductByCategory } from "@/modules/ProductItem/hooks/useProductByCategory";

interface IProps {
  collection: ICollection;
}

const CollectionCardItem: FC<IProps> = ({ collection }) => {
  const [productId, setProductId] = useState<string | null>(null);
      // @ts-ignore
      const { data: products } = useProductByCategory({ productId });

  return (
    <Link to={`/catalog/${collection.id}`} onClick={() => setProductId(collection.id)} className={cls.card}>
        <div className={cls.imageContainer}>
          <img
            className={cls.image}
            src={collection.img}
            alt="product image"
          />
        </div>
      <div className={cls.content}>
        <div>
        <h3 className={cls.title}>{collection.title}</h3>
        <p className={cls.description}>{collection.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCardItem;
