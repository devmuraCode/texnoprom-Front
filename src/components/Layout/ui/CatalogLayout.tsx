import { FC, useState } from "react";
import { Breadcrumb, Layout, Pagination, theme } from "antd";
import Container from "@/components/Container/Container";
import { NavLink, useLocation, useParams } from "react-router-dom";
import ProductItem from "@/modules/ProductItem";
import { useProductByBrand } from "@/modules/ProductItem/hooks/useProductByBrand";
import { useProductByBrandCategory } from "@/modules/ProductItem/hooks/useProductsByBrandCategory";
import { useProductByCategory } from "@/modules/ProductItem/hooks/useProductByCategory";

const { Content } = Layout;

const CatalogLayout: FC = () => {
  const { slug } = useParams<string>();
  const { state } = useLocation();

  const fetchProducts = () => {
    switch (state.type) {
      case "category":
        const { data } = useProductByCategory({ categorySlug: slug });
        return [...(data || [])];
      case "brand":
        const { data: data1 } = useProductByBrandCategory({ brandSlug: slug });
        const { data: data2 } = useProductByBrand({ brandSlug: slug });
        return [...(data1 || []), ...(data2 || [])];
      default:
        return [];
    }
  };

  const { data: brandData } = useProductByCategory({ categorySlug: slug });

  const products = fetchProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = products?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Container>
      <h1 className="font-bold text-2xl text-black pb-4 pt-10">
        Название категории
      </h1>

      <Layout>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <Breadcrumb
            items={[
              {
                title: <NavLink to={"/"}>Главная</NavLink>,
              },
              {
                title: <NavLink to={"/"}>Категории</NavLink>,
              },
              {
                title: "Товары",
              },
            ]}
          />
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
            {paginatedProducts?.map((product) => (
              // @ts-ignore
              <ProductItem key={product.id} product={product} />
            ))}
          </Content>
        </Layout>
      </Layout>
      <Pagination
        className="flex justify-center"
        current={currentPage}
        pageSize={pageSize}
        total={products?.length || 0}
        onChange={handlePageChange}
      />

      {/* Вывод похожих товаров */}
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
            {brandData.map((product) => (
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
