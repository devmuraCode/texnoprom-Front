import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useCollectionNavbar } from "../hooks/useCollectionNavbar";
import { Dropdown } from "antd";
import { useCategory } from "../hooks/useCategory";
import cls from "./Navbar.module.scss";

import { useBrandCategory } from "@/modules/Brands/hooks/useBrandCategory";

const Category: FC = () => {
  // @ts-ignore
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  // @ts-ignore
  const [brandId, setBrandId] = useState<string | null>(null);
  const { data: collection } = useCollectionNavbar();
  const { data: category } = useCategory({ collectionId });
  // @ts-ignore
  const { data: brands } = useBrandCategory({ categoryId });

  const SubMenuCollection: FC = () => {
    return (
      <div
        style={{ height: "100vh", overflowY: "auto" }} 
        className="grid grid-cols-3"
      >
        {category?.map((item) => (
          <div key={item.category_id} className="bg-teal-500 text-white p-5">
            <p className="font-semibold">{item.category_title}</p>
            <div>
              <ul>
                {item.children.map((brand) => (
                  <Link
                    to={`/catalog/${brand.brand_id}`}
                    onClick={() => setBrandId(brand.brand_id)}
                    key={brand.brand_id}
                  >
                    <li>{brand.brand_title}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`${cls.collection} h-screen`} style={{ width: "100%" }}>
      {collection?.map((item) => (
        <div key={item.id} className="bg-teal-500 w-full">
          <Dropdown
            overlay={<SubMenuCollection />}
            // @ts-ignore
            placement="left"
            trigger={["click"]}
          >
            <div
              onClick={() => setCollectionId(item.id)}
              // @ts-ignore
              className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-700 text-white hover:bg-white hover:text-black cursor-pointer"
            >
              {item.title}
            </div>
          </Dropdown>
        </div>
      ))}
    </div>
  );
};

export default Category;
