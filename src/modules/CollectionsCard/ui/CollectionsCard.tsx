import CollectionCardItem from "@/components/CardCollection/CollectionCardItem";
import { useCollectionsCard } from "../hooks/useCollectionsCard";
import Container from "@/components/Container/Container";

const CollectionsCard = () => {
  const { data: collection } = useCollectionsCard();
  return (
    <Container>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-4 py-10">
        {collection?.map((collection) => (
          <CollectionCardItem collection={collection} key={collection.id} />
        ))}
      </div>
    </Container>
  );
};

export default CollectionsCard;
