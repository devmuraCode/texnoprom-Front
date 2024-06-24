import { FC } from "react";
import { ICollection } from "@/modules/CollectionsCard/hooks/useCollectionsCard";
import cls from "./CardCollection.module.scss";

interface IProps {
  collection: ICollection;
}

const CollectionCardItem: FC<IProps> = ({ collection }) => {
  return (
    <div className={cls.card}>
      <img src={collection.img} alt={collection.title} className={cls.image} />
      <div className={cls.content}>
        <div>
        <h3 className={cls.title}>{collection.title}</h3>
        <p className={cls.description}>{collection.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionCardItem;
