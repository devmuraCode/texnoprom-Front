import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useCollectionNavbar } from "../hooks/useCollectionNavbar";
import { Dropdown } from "antd";
import { useBrands } from "@/modules/Brands/hooks/useBrands";
import { useCategory } from "../hooks/useCategory";
import cls from './Navbar.module.scss'
const Category: FC = () => {
  // @ts-ignore
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  // @ts-ignore
  const [brandId, setBrandId] = useState<string | null>(null);
  const { data: collection } = useCollectionNavbar();
  const { data: category } = useCategory({ collectionId });
  // @ts-ignore
  const { data: brands } = useBrands({ categoryId });

  const SubMenuCollection: FC = () => {
    return (
      <div >
        {category?.map((item) => (
          <div key={item.category_id} className="bg-black text-white p-5">
            <p className="font-semibold">{item.category_title}</p>
            <div>
              <ul>
                {item.children.map((brand) => (
                  <Link to={`/catalog/${brand.brand_id}`} onClick={() => setBrandId(brand.brand_id)}><li key={brand.brand_id}>{brand.brand_title}</li></Link>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cls.collection}>
      {collection?.map((item) => (
        <div key={item.id} className="bg-black">
          <Dropdown
            overlay={<SubMenuCollection />}
            // @ts-ignore
            placement="left"
            trigger={["click"]}
          >
            <div
              onClick={() => setCollectionId(item.id)}
              className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-700 text-white hover:bg-white hover:text-black cursor-pointer "
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
