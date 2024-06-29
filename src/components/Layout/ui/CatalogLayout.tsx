import { FC  } from "react";
import { Breadcrumb, Layout, Pagination, theme } from "antd";
import Container from "@/components/Container/Container";
import { NavLink, useParams } from "react-router-dom";
import ProductItem from "@/modules/ProductItem";
import { useProduct } from "@/modules/ProductItem/hooks/useProduct";
import CollectionsCard from "@/modules/CollectionsCard";
import { useProductByBrand } from "@/modules/ProductItem/hooks/useProductByBrand";

const { Content } = Layout;

const CatalogLayout: FC = () => {
  const { brandId } = useParams<string>();
  const { data: products } = useProductByBrand({ brandId });
  console.log(products);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


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
            {products?.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Content>
        </Layout>
      </Layout>
      <Pagination
        className="flex justify-center"
        defaultCurrent={1}
        total={50}
      />
      <CollectionsCard />
    </Container>
  );
};

export default CatalogLayout;
