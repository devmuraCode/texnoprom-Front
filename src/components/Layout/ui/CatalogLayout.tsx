import { FC, useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, Pagination, theme } from "antd";
import Container from "@/components/Container/Container";
import { NavLink, useParams } from "react-router-dom";
import ProductItem from "@/modules/ProductItem";
import { useProduct } from "@/modules/ProductItem/hooks/useProduct";
import { useCategoryNav } from "@/modules/Navbar/hooks/useCategoryNav";
import CollectionsCard from "@/modules/CollectionsCard";



const { Content, Sider } = Layout;

const CatalogLayout: FC = () => {
  const { brandId } = useParams<string>();
  const { data: products } = useProduct({ brandId });
  const { data: brand } = useProduct({ brandId });
  const { data: category } = useCategoryNav();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  useEffect(() => {
    if (brand && brand.length > 0) {
      const current = brand.find(item => item.id === brandId);
      if (current) setCurrentCategory(current.title);
    }
  }, [brand, brandId]);
  return (
    <Container>
      <h1 className="font-bold text-2xl text-black pb-4 pt-10">
        Название категории
      </h1>
      
   
      {/* <h1 className="font-bold text-2xl text-black pb-4">
        {category?.map((item) => (
          <div key={item.id} className="bg-white">
            <div className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
              {item.title}
            </div>
          </div>
        ))}
      </h1> */}

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
            style={{ height: "100%", borderRight: 0, backgroundColor: "#eee" }}
          >
            {brand?.map((item) => (
              <Menu.Item
                key={item.id}
                style={{ borderBottom: "1px solid #919191", borderRadius: "0" }}
              >
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <Breadcrumb
    items={[
      {
        title: <NavLink to={'/'}>Главная</NavLink>,
      },
      {
        title: <NavLink to={'/'}>Категории</NavLink>,
      },
      {
        title: 'Товары',
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
              <ProductItem  key={product.id} product={product}/>
            ))}
          </Content>
        </Layout>
      </Layout>
      <Pagination className="flex justify-center" defaultCurrent={1} total={50}  />
      <CollectionsCard/>
    </Container>
  );
};

export default CatalogLayout;
