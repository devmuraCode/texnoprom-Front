import { Link, NavLink } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import Dropdown from "@/components/Dropdawn/Dropdown";
import Category from "./Category";
import logo from "@/assets/logo1.svg";
import cls from "./Navbar.module.scss";
import useRegisterModal from "@/modules/Modals/hooks/useRegisterModal";
import { useState } from "react";
import { useAllProducts } from "@/modules/ProductItem/hooks/useAllProducts";
import { useProductDetail } from "@/modules/ProductDetail/hooks/useProductDetail";
import { useAllCategory } from "@/modules/Catalog/hooks/useAllCategory";
import { useProductByCategory } from "@/modules/ProductItem/hooks/useProductByCategory";

const Navbar = () => {
  const registerModal = useRegisterModal();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const { data: products = [] } = useAllProducts();
  const { data: category } = useAllCategory();
  const [productId, setProductId] = useState<string | null>(null);
  // @ts-ignore
  const { data: productsDetail } = useProductDetail({ productId });
  // @ts-ignore
  const {data: categoryid} = useProductByCategory({categoryId});

  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleProductClick = () => {
    setSearchTerm("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cls.wrapper}>
      <nav className="w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img src={logo} className="w-40 h-20" alt="Flowbite Logo" />
          </Link>
          {category?.slice(0, 5).map((category) => (
            <NavLink
              key={category.id}
              to={`/catalog/${category.id}`}
              onClick={() => setCategoryId(category.id)}
              className="text-white font-bold block hidden sm:block"
            >
              {category.title}
            </NavLink>
          ))}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href="tel:+998712345678" className="text-white font-bold">
              +998900222323
            </a>
          </div>
        </div>
      </nav>
      <nav className={cls.content}>
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between py-4 pl-4">
          <Dropdown dropdownRender={() => <Category />} trigger={["click"]}>
            <Space>Каталог товаров</Space>
          </Dropdown>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse lg:pb-0">
            <div className="font-bold items-center py-2 px-4 border-0 bg-inherit flex gap-5 text-xl">
              {!token ? (
                <div
                  className={cls.exit}
                  onClick={() => registerModal.onOpen()}
                >
                  <div className="flex gap-2">
                    <UserOutlined />
                    <h1 className=" text-base lg:block hidden">Войти</h1>
                  </div>
                </div>
              ) : (
                <div className={cls.exit} onClick={handleLogout}>
                  <div className="flex gap-2">
                    <UserOutlined />
                    <h1 className=" text-base lg:block hidden">Выйти</h1>
                  </div>
                </div>
              )}
              <NavLink to="/cart" className={cls.cart}>
                <ShoppingCartOutlined />
                <h1 className=" text-base lg:block hidden">Корзина</h1>
              </NavLink>
            </div>
          </div>
          <div className="md:flex w-full md:w-auto md:order-1">
            <Input
              className={cls.input}
              placeholder="Search product"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {searchTerm && (
          <div className="max-w-screen-xl mx-auto p-4">
            <ul className={cls.searchResults}>
              {filteredProducts.map((product) => (
                <div className="flex gap-3 items-stretch">
                  <Link
                    to={`/detail/${product.id}`}
                    onClick={() => {
                      setProductId(product.id);
                      handleProductClick();
                    }}
                    key={product.id}
                    className={cls.searchResultItem}
                  >
                    {product.title} - ${product.price}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
