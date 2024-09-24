import { FC, useState } from "react";
import { Breadcrumb, Layout, Pagination, theme } from "antd";
import Container from "@/components/Container/Container";
import { NavLink, useParams } from "react-router-dom";
import ProductItem from "@/modules/ProductItem";
import CollectionsCard from "@/modules/CollectionsCard";
import { useProductByBrand } from "@/modules/ProductItem/hooks/useProductByBrand";
import { useProductByBrandCategory } from "@/modules/ProductItem/hooks/useProductsByBrandCategory";
import { useProductByCategory } from "@/modules/ProductItem/hooks/useProductByCategory";

const { Content } = Layout;

const CatalogLayout: FC = () => {
  const { categoryId } = useParams<string>();
  const { brandId , } = useParams<string>();

  console.log("brandId:", brandId);

  const { data: productsByBrandCategory } = useProductByBrandCategory({
    brandId,
  });

  const { data: productsByBrand } = useProductByBrand({ brandId });

  const { data: productsByCategory } = useProductByCategory({ categoryId });

  console.log("productsByBrandCategory:", productsByBrandCategory);
  console.log("productsByBrand:", productsByBrand);
  console.log("productsByCategory:", productsByCategory);

  const products = [
    ...(productsByCategory || []),
    ...(productsByBrand || []),
    ...(productsByBrandCategory || []),
  ];

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
      <CollectionsCard />
    </Container>
  );
};

export default CatalogLayout;
