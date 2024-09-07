import { useParams } from "react-router-dom";
import { IProduct, useProductDetail } from "./hooks/useProductDetail";
import Container from "@/components/Container/Container";
import ProductDetails from "../ProductDetails/ui/ProductDetails";
import { useAppDispatch } from "@/store/store";
import { addToCart } from "@/features/ShoppingSlice/CartSlice";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();

  const { data: product, isLoading, isError } = useProductDetail({ productId: productId || '' });
console.log(product);

  const handleAddToCart = (product: IProduct) => {
    // @ts-ignore
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  if (isError || !product) {
    return (
      <div className="text-center text-2xl">Error loading product details.</div>
    );
  }

  return (
    <Container>
      {/* @ts-ignore */}
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </Container>
  );
};

export default ProductDetail;
