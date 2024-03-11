import { FC, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Container from "@/components/Container/Container";
import { useBrands } from "@/modules/Brands/hooks/useBrands";
import { useParams } from "react-router-dom";
import ProductItem from "@/modules/ProductItem";
import { useProduct } from "@/modules/ProductItem/hooks/useProduct";

const { Content, Sider } = Layout;

const CatalogLayout: FC = () => {
  const categoryId = useParams<string>();
  const [brandId, setBrandId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { data: products } = useProduct(categoryId);
  const { data: brand } = useBrands(categoryId);
  console.log(products);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Container>
      <Layout>
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          breakpoint="lg"
          collapsedWidth="0"
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
          onBreakpoint={(broken) => {
            if (!broken) {
              setCollapsed(true);
            }
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {brand?.map((item) => (
              <Menu.Item onClick={() => setBrandId(item.id)} key={item.id}>
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
              
          </Breadcrumb>
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
    </Container>
  );
};

export default CatalogLayout;
