import { FC, useState } from "react";
import { Breadcrumb, Layout, Pagination, theme } from "antd";
import Container from "@/components/Container/Container";
import { NavLink, useLocation, useParams } from "react-router-dom";
import ProductItem from "@/modules/ProductItem";
import { useProductByCategory } from "@/modules/ProductItem/hooks/useProductByCategory";
import { useProductByBrandCategory } from "@/modules/ProductItem/hooks/useProductsByBrandCategory";
import { useProductByBrand } from "@/modules/ProductItem/hooks/useProductByBrand";

const { Content } = Layout;

const CatalogLayout: FC = () => {
  const { slug } = useParams<string>();
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let products = [];
  let totalProducts = 0;

  // Fetch products based on the "type" in the state
  switch (state?.type) {
    case "category": {
      const { data: categoryData } = useProductByCategory({
        categorySlug: slug,
        page: currentPage,
      });
      products = categoryData?.results || [];
      totalProducts = categoryData?.count || 0;
      break;
    }
    case "brand": {
      const { data: brandCategoryData } = useProductByBrandCategory({
        brandSlug: slug,
        page: currentPage,
      });
      const { data: brandData } = useProductByBrand({
        brandSlug: slug,
        page: currentPage,
      });
      products = [...(brandCategoryData || []), ...(brandData || [])];
      totalProducts = products.length;
      break;
    }
    default:
      break;
  }
  const { data: brandData } = useProductByCategory({ categorySlug: slug });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <h1 className="font-bold text-2xl text-black pb-4 pt-10">Название категории</h1>

      <Layout>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          {/* Breadcrumb for navigation */}
          <Breadcrumb
            items={[
              { title: <NavLink to={"/"}>Главная</NavLink> },
              { title: <NavLink to={"/"}>Категории</NavLink> },
              { title: "Товары" },
            ]}
          />
          {/* Product Content */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Render each product */}
            {products.map((product: any) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Content>
        </Layout>
      </Layout>

      {/* Pagination */}
      <Pagination
        className="flex justify-center"
        current={currentPage}
        pageSize={pageSize}
        total={totalProducts} // Total products
        onChange={handlePageChange}
      />
      {/* Related Brand Data */}
      {brandData && brandData.length > 0 && (
        <div className="mt-8">
          <h2 className="font-bold text-xl text-black pb-4">Похожие товары</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            {brandData.map((product:any) => (
              // @ts-ignore
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default CatalogLayout;
