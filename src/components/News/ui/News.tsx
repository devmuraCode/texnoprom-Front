import Container from "@/components/Container/Container";
import { useAllProducts } from "@/modules/ProductItem/hooks/useAllProducts";
import ProductItem from "@/modules/ProductItem/ui/ProductItem";

const News = () => {
  const {data: products} = useAllProducts()
  return (
    <Container>
      <h1 className="font-bold text-2xl text-black pb-4">Новинки</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 p-0 gap-3 py-5">
        {products?.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </Container>
  );
};

export default News;
