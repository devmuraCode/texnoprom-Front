import { Link, NavLink } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

import Dropdown from "@/components/Dropdawn/Dropdown";
import Category from "./Category";
import { Input, Space } from "antd";
import UserList from "./UserList";

const Navbar: React.FC = () => {
  return (
    <div>
      <nav className="bg-white w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img
              src="https://elmakon.uz/images/logos/8/elmakon.png"
              className="w-40"
              alt="Flowbite Logo"
            />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href="tel:+998712345678" className="text-black font-bold">
              +998712345678
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-blue-600 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between align-middle mx-auto py-4">
          <Dropdown dropdownRender={() => <Category />} trigger={["click"]}>
            <Space>Каталог таваров</Space>
          </Dropdown>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse lg:pb-0 pb-3">
            <div className="font-bold items-center py-2 px-4 border-0 bg-inherit text-white flex gap-5 text-xl">
              <Dropdown dropdownRender={() => <UserList />} trigger={["click"]}>
                <div className="flex gap-2">
                  <UserOutlined />
                  <h1 className="text-white text-xl lg:block hidden">Войти</h1>
                </div>
              </Dropdown>
              <NavLink to={"/cart"} className="flex gap-2">
                <ShoppingCartOutlined />
                <h1 className="text-white lg:text-xl lg:block hidden">
                  Корзина
                </h1>
              </NavLink>
            </div>
          </div>
          <div
            className="md:flex w-full md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <Input className="lg:w-[30rem] h-10" placeholder="Search product" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
