import Container from "@/components/Container/Container";
import { useAllCategory } from "@/modules/Catalog/hooks/useAllCategory";
import CollectionCardItem from "@/components/CardCollection/CollectionCardItem";

const CollectionsCard = () => {
  const { data: collection } = useAllCategory();

  return (
    <Container>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-4 py-10">
        {collection?.slice(0,4).map((collection) => (
          <CollectionCardItem collection={collection} key={collection.id} />
        ))}
      </div>
    </Container>
  );
};

export default CollectionsCard;
