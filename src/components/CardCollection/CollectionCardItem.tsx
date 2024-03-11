import { ICollection } from "@/modules/CollectionsCard/hooks/useCollectionsCard";
import { FC } from "react";

interface IProps {
    collection: ICollection;
}
const CollectionCardItem: FC<IProps> = (props) => {
    const {collection} = props

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
      <img
        className="object-cover w-full h-48"
        src={collection.img}
        alt="Flower and sky"
      />

      <div className="absolute top-0 left-0 px-6 py-4">
        <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
          {collection.title}
        </h4>
        <p className="leading-normal text-gray-100">
          {collection.description}
        </p>
      </div>
    </div>
  );
};

export default CollectionCardItem;
