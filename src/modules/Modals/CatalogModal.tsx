import { useState, useEffect } from "react";
import { useCategory } from "../Navbar/hooks/useCategory";
import { useCollectionNavbar } from "../Navbar/hooks/useCollectionNavbar";
import styles from "./CatalogModal.module.scss";
import useCatalogModal from "./hooks/useCatalogModal";
import { useBrandCategory } from "../Brands/hooks/useBrandCategory";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";  // Подключаем react-responsive

const CatalogModal = () => {
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [brandId, setBrandId] = useState<string | null>(null);
  const { onClose, isOpen } = useCatalogModal();
  const { data: collections } = useCollectionNavbar();
  const { data: categories } = useCategory({ collectionId });
  const { data: brands } = useBrandCategory({ categoryId });

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Проверка мобильной версии

  // Оставляем поведение для десктопа без изменений
  useEffect(() => {
    if (!isMobile && isOpen && collections && collections.length > 0 && !collectionId) {
      setCollectionId(collections[0].id);
    }
  }, [isOpen, collections, collectionId, isMobile]);

  // Мобильная версия: категории фильтруются по коллекции
  useEffect(() => {
    if (isMobile && collectionId && categories && categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].category_id);
    }
  }, [collectionId, categories, categoryId, isMobile]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          <nav className={styles.sidebar}>
            <ul>
              {collections?.map((item) => (
                <li
                  onClick={() => setCollectionId(item.id)}
                  key={item.id}
                  className={collectionId === item.id ? styles.active : ""}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </nav>

          {/* Для мобильной версии выводим только выбранную коллекцию */}
          {isMobile ? (
            <div className={styles.content}>
              <div className={styles.grid}>
                {categories?.map((item) => (
                  <div key={item.category_id}>
                    <h3
                      onClick={() => setCategoryId(item.category_id)}
                      className={categoryId === item.category_id ? styles.active : ""}
                    >
                      {item.category_title}
                    </h3>
                    <div>
                      <ul>
                        {item.children.map((brand) => (
                          <Link
                            to={`/catalog/${brand.brand_id}`}
                            onClick={() => {
                              setBrandId(brand.brand_id);
                              onClose();
                            }}
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
          ) : (
            // Десктоп версия: все коллекции и категории
            <div className={styles.content}>
              <div className={styles.grid}>
                {categories?.map((item) => (
                  <div key={item.category_id}>
                    <h3>{item.category_title}</h3>
                    <div>
                      <ul>
                        {item.children.map((brand) => (
                          <Link
                            to={`/catalog/${brand.brand_id}`}
                            onClick={() => {
                              setBrandId(brand.brand_id);
                              onClose();
                            }}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogModal;
