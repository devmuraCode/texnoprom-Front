import { FC } from "react";
import { ICollection } from "@/modules/CollectionsCard/hooks/useCollectionsCard";
import cls from "./CardCollection.module.scss";

interface IProps {
  collection: ICollection;
}

const CollectionCardItem: FC<IProps> = ({ collection }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105">
      <div className={cls.imageContainerCollection}>
        <img
          className="object-cover w-full h-full"
          src={collection.img}
          alt={collection.title}
          id={cls.imageCollection}
        />
      </div>
      <div className={cls.textContainer}>
        <h4 className="mb-1 text-lg font-semibold tracking-tight text-white">
          {collection.title}
        </h4>
        <p className="text-sm leading-normal text-gray-200">{collection.description}</p>
      </div>
    </div>
  );
};

export default CollectionCardItem;
