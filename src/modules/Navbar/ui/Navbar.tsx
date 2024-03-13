
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useCategoryNav } from "../hooks/useCategoryNav";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCollectionNavbar } from "@/modules/Navbar/hooks/useCollectionNavbar";

import Dropdown from "@/components/Dropdawn/Dropdown";
import Category from "./Category";
import { Input } from "antd";

const Navbar: React.FC = () => {

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

  const [collectionId, setCollectionId] = useState<string | null>(null);
  const { data: collection } = useCollectionNavbar();
  
  const navigate = useNavigate();

  const redirectToCard = () => {
    navigate("/cart");
  };

  return (
    <nav className="bg-white w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <img
            src="https://elmakon.uz/images/logos/8/elmakon.png"
            className="w-40"
            alt="Flowbite Logo"
          />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div onClick={redirectToCard} className="font-bold items-center py-2 px-4 border-0 bg-inherit text-black flex gap-1 text-xl" >
            <ShoppingCartOutlined />
            Cart

          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              
              {/* КОНТЕНТ */}
              {/* {category?.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={`/catalog/${item.id}`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-900 dark:text-white"
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </nav>
      <nav className="bg-blue-600 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between align-middle mx-auto py-4">
          <Dropdown dropdownRender={() => <Category />} trigger={["click"]}>
            Каталог таваров
          </Dropdown>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="font-bold items-center py-2 px-4 border-0 bg-inherit text-white flex gap-5 text-3xl">
              <div className="flex gap-2">
              <UserOutlined />
              <h1 className="text-white text-xl">Войти</h1>
              </div>
              <div className="flex gap-2">
              <ShoppingCartOutlined />
                <h1 className="text-white text-xl">Корзина</h1>
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