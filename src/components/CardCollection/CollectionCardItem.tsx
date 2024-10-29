import { FC, useState } from "react";
import { Link } from "react-router-dom";
import cls from "./CardCollection.module.scss";
import { ICollection } from "@/modules/CollectionsCard/hooks/useCollectionsCard";
import { useProductByCategory } from "@/modules/ProductItem/hooks/useProductByCategory";

interface IProps {
  collection: ICollection;
}

const CollectionCardItem: FC<IProps> = ({ collection }) => {
  const [categorySlug, setCategorySlug] = useState<string | undefined>();
  const { data: products } = useProductByCategory({ categorySlug });

  return (
    <Link to={`/catalog/${collection.slug}`} state={{ type: "category" }} onClick={() => setCategorySlug(collection.slug)} className={cls.card}>
      <div className={cls.imageContainer}>
        <img
          className={cls.image}
          src={collection.img}
          alt="product image"
        />
      </div>
      <div className={cls.content}>

        <h3 className={cls.title}>{collection.title}</h3>
        <p className={cls.description}>{collection.description}</p>

      </div>
    </Link>
  );
};

export default CollectionCardItem;
