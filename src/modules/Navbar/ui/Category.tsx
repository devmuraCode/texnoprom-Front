import React from "react";
import { NavLink } from "react-router-dom";
import { useCollectionNavbar } from "../hooks/useCollectionNavbar";


const Category: React.FC = () => {
  const { data: collection } = useCollectionNavbar();
  return (
    <div>
      {collection?.map((item) => (
        <div key={item.id} className="bg-white">
          <NavLink
            className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
            to={`/catalog/${item.id}`}
          >
            {item.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Category;
