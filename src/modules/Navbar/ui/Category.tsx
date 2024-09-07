import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCollectionNavbar } from "../hooks/useCollectionNavbar";
import { useCategory } from "../hooks/useCategory";
import cls from "./Category.module.scss";
import { useBrandCategory } from "@/modules/Brands/hooks/useBrandCategory";

const Category: FC = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [brandId, setBrandId] = useState<string | null>(null);

  const { data: collection } = useCollectionNavbar();
  const { data: category } = useCategory({ collectionId });
  const { data: brands } = useBrandCategory({ categoryId });

  useEffect(() => {
    if (collection && collection.length > 0) {
      setCollectionId(collection[0].id);
    }
  }, [collection]);

  return (
    <div className={cls.container}>
      <div className={cls.collection}>
        {collection?.map((item) => (
          <div key={item.id} className={cls.collectionItem}>
            <div
              onClick={() => setCollectionId(item.id)}
              className={`${cls.collectionLink} flex items-center gap-x-3.5 py-2 px-3 cursor-pointer`}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
      <div className={cls.categoryContainer}>
        {category?.map((item) => (
          <div key={item.category_id} className={cls.categoryItem}>
            <p className="font-bold text-center">{item.category_title}</p>
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
    </div>
  );
};

export default Category;
