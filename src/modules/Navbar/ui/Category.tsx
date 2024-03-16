import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCollectionNavbar } from "../hooks/useCollectionNavbar";
import { Dropdown } from "antd";
import { useCategoryNav } from "../hooks/useCategoryNav";
import { useBrands } from "@/modules/Brands/hooks/useBrands";

const Category: FC = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const { data: collection } = useCollectionNavbar();
  const { data: category } = useCategoryNav();
  const { data: brands } = useBrands({ categoryId });

  const SubMenuBrand: FC = () => {
    return (
      <div>
        {brands?.map((brand) => (
          <div className="p-3 bg-blue-500">
            <NavLink
              key={brand.id}
              className="flex items-center gap-x-3.5 px-3 text-sm text-white hover:text-black"
              to={`/catalog/${brand.id}`}
            >
              {brand.title}
            </NavLink>
          </div>
        ))}
      </div>
    );
  };

  const SubMenuCollection: FC = () => {
    return (
      <div>
        {category?.map((item) => (
          <div key={item.id} className="bg-white flex">
            <Dropdown
              overlay={<SubMenuBrand />}
              // @ts-ignore
              placement="right"
              trigger={["click"]}
            >
              <div
                onClick={() => setCategoryId(item.id)}
                className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
              >
                {item.title}
              </div>
            </Dropdown>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {collection?.map((item) => (
        <div key={item.id} className="bg-white">
          <Dropdown
            overlay={<SubMenuCollection />}
            // @ts-ignore
            placement="left"
            trigger={["hover"]}
          >
            <div className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer">
              {item.title}
            </div>
          </Dropdown>
        </div>
      ))}
    </div>
  );
};

export default Category;
