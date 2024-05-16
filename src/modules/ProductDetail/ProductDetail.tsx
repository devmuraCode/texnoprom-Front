import { useParams } from "react-router-dom";
import { useProductDetail } from "./hooks/useProductDetail";
import Container from "@/components/Container/Container";
import ProductItem from "../ProductItem";


const ProductDetail = () => {
    const productId = useParams<string>();
    // @ts-ignore
    const {data: product} = useProductDetail(productId)
    console.log(product);
    
  return (
    <Container>
      {/* @ts-ignore */}
        {product && <ProductItem product={product} />}
    </Container>
  )
}

export default ProductDetail