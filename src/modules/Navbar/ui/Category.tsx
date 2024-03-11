import React from "react";
import { useCategory } from "../hooks/useCategory";
import { NavLink } from "react-router-dom";

interface IProps {
  collectionId: string | null;
}

const Category: React.FC<IProps> = ({ collectionId }) => {
  const { data } = useCategory({ collectionId });

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>
          <NavLink
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-white-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
            to={`/catalog/${item.id}`}
          >
            <span className="text-gray-700 dark:text-gray-400">
              {item.title}
            </span>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Category;
