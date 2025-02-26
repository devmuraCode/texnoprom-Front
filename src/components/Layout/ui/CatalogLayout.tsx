import { FC, useState, useEffect } from "react";
import { Breadcrumb, Layout, Pagination, Radio, theme } from "antd";
import Container from "@/components/Container/Container";
import { useLocation, useParams } from "react-router-dom";
import ProductItem from "@/modules/ProductItem";
import { useProductByCategory } from "@/modules/ProductItem/hooks/useProductByCategory";
import { useProductByBrandCategory } from "@/modules/ProductItem/hooks/useProductsByBrandCategory";
import { useProductByBrand } from "@/modules/ProductItem/hooks/useProductByBrand";
import { useBrandCategory } from "@/modules/Brands/hooks/useBrandCategory";

const { Content, Sider } = Layout;

const priceRanges = [
  { label: "Все", value: "all" },
  { label: "До 1000", value: "0-1000" },
  { label: "1000 - 5000", value: "1000-5000" },
  { label: "5000 - 10000", value: "5000-10000" },
  { label: "Больше 10000", value: "10000-" },
];

const CatalogLayout: FC = () => {
  const { slug } = useParams<string>();
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const pageSize = 5;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data: brandCategories } = useBrandCategory({ categorySlug: slug });
  const activeSlug = selectedCollection || slug;

  console.log("State:", state);
  console.log("Active slug:", activeSlug);

  let products = [];
  let totalProducts = 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCollection]);

  const isCategory = state?.type === "category";
  const isBrand = state?.type === "brand" || selectedCollection;

  if (isCategory) {
    const { data: categoryData } = useProductByCategory({
      categorySlug: activeSlug,
      page: currentPage,
    });
    products = categoryData?.results || [];
    totalProducts = categoryData?.count || 0;
  } else if (isBrand) {
    const { data: brandCategoryData } = useProductByBrandCategory({
      brandSlug: activeSlug,
      page: currentPage,
    });
    const { data: brandData } = useProductByBrand({
      brandSlug: activeSlug,
      page: currentPage,
    });
    products = [
      ...(brandCategoryData?.results || []),
      ...(brandData?.results || []),
    ];
    products = Array.from(new Map(products.map((p) => [p.id, p])).values());
    totalProducts = products.length;
  }

  const handleCollectionClick = (collectionSlug: string) => {
    console.log(collectionSlug);
    setSelectedCollection(collectionSlug);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePriceFilterChange = (e: any) => {
    setSelectedPriceRange(e.target.value);
  };

  const filteredProducts = products.filter((product: any) => {
    if (selectedPriceRange === "all") return true;
    const [min, max] = selectedPriceRange.split("-").map(Number);
    return max
      ? product.price >= min && product.price <= max
      : product.price >= min;
  });

  return (
    <Container>
      <h1 className="font-bold text-2xl text-black pb-4 pt-10">
        Название категории
      </h1>
      <Layout>
        <Sider width={250} style={{ background: "#fff", padding: "24px" }}>
          <h2 className="font-bold text-xl text-black pb-4">Фильтр по цене</h2>
          <Radio.Group
            onChange={handlePriceFilterChange}
            value={selectedPriceRange}
          >
            <div className="flex flex-col space-y-2">
              {priceRanges.map((range) => (
                <Radio key={range.value} value={range.value}>
                  {range.label}
                </Radio>
              ))}
            </div>
          </Radio.Group>
          <h2 className="font-bold text-xl text-black pb-4 mt-6">Коллекции</h2>
          <ul className="space-y-3">
            {brandCategories?.map((category: any) => (
              <li key={category.id}>
                <button
                  className={`font-bold ${
                    selectedCollection === category.slug ? "text-blue-500" : ""
                  }`}
                  onClick={() => handleCollectionClick(category.slug)}
                >
                  {category.title}
                </button>
              </li>
            ))}
          </ul>
        </Sider>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <Breadcrumb
            items={[
              { title: "Главная" },
              { title: "Категории" },
              { title: "Товары" },
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
            {filteredProducts.map((product: any) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Content>
        </Layout>
      </Layout>
      <Pagination
        className="flex justify-center"
        current={currentPage}
        pageSize={pageSize}
        total={totalProducts}
        onChange={handlePageChange}
      />
    </Container>
  );
};

export default CatalogLayout;
