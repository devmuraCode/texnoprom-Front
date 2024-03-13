import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCollectionNavbar } from "@/modules/Navbar/hooks/useCollectionNavbar";
import Dropdown from "@/components/Dropdawn/Dropdown";
import Category from "./Category";

const Navbar: React.FC = () => {
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
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {collection?.map((collectionItem) => (
              <Dropdown
                key={collectionItem.id}
                dropdownRender={() => <Category />}
                trigger={["click"]}
              >
                {collectionItem.title}
              </Dropdown>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
