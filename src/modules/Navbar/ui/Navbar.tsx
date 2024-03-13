
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useCategoryNav } from "../hooks/useCategoryNav";



import Dropdown from "@/components/Dropdawn/Dropdown";
import Category from "./Category";
import { Input } from "antd";
import { useCollectionNavbar } from "../hooks/useCollectionNavbar";

const Navbar: React.FC = () => {
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const { data: collection } = useCollectionNavbar();
  
  const navigate = useNavigate();

  const redirectToCard = () => {
    navigate("/cart");
  };
  const { data: category } = useCategoryNav();
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
          <Dropdown dropdownRender={() => <Category />} trigger={["click"]} className="cursor-pointer">
            Каталог таваров
          </Dropdown>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="font-bold items-center py-2 px-4 border-0 bg-inherit text-white flex gap-5 text-3xl">
              <div className="flex gap-2">
              <UserOutlined />
              <h1 className="text-white text-xl cursor-pointer">Войти</h1>
              </div>
              <div className="flex gap-2 " onClick={redirectToCard}>
              <ShoppingCartOutlined />
                <h1 className="text-white text-xl cursor-pointer">Корзина</h1>
              </div>
              
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