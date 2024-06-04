import { Link, NavLink } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

import Dropdown from "@/components/Dropdawn/Dropdown";
import Category from "./Category";
import logo from "@/assets/logo1.svg";
import cls from "./Navbar.module.scss";
import useRegisterModal from "@/modules/Modals/hooks/useRegisterModal";

const Navbar = () => {
  const registerModal = useRegisterModal();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={cls.wrapper}>
      <nav className="w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img src={logo} className="w-40 h-20" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href="tel:+998712345678" className="text-black font-bold">
              +998712345678
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
            <div className="font-bold items-center py-2 px-4 border-0 bg-inherit text-white flex gap-5 text-xl">
              {!token ? (
                <div className={cls.exit} onClick={() => registerModal.onOpen()}>
                  <div className="flex gap-2">
                    <UserOutlined />
                    <h1 className="text-white text-base lg:block hidden">Войти</h1>
                  </div>
                </div>
              ) : (
                <div className={cls.exit} onClick={handleLogout}>
                  <div className="flex gap-2">
                    <UserOutlined />
                    <h1 className="text-white text-base lg:block hidden">Выйти</h1>
                  </div>
                </div>
              )}
              <NavLink to="/cart" className={cls.cart}>
                <ShoppingCartOutlined />
                <h1 className="text-white text-base lg:block hidden">Корзина</h1>
              </NavLink>
            </div>
          </div>
          <div className="md:flex w-full md:w-auto md:order-1">
            <Input className={cls.input} placeholder="Search product" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
