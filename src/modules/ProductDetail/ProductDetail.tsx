import { useParams } from "react-router-dom";
import { useProductDetail } from "./hooks/useProductDetail";
import Container from "@/components/Container/Container";
import ProductItem from "../ProductItem";
import { useAppDispatch } from "@/store/store";
import { addToCart } from "@/features/ShoppingSlice/CartSlice";

const ProductDetail = () => {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useAppDispatch();

    // @ts-ignore
    const { data: product, isLoading, isError } = useProductDetail({ productId });

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !product) {
        return <div>Error loading product details.</div>;
    }
    
    return (  
        <Container>
            <div>
                <ProductItem product={product} onAddToCart={() => handleAddToCart(product)} />
            </div>
        </Container>
    );
};

export default ProductDetail;
