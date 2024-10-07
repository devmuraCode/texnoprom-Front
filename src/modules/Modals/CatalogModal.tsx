import { useState, useEffect } from "react";
import { useCategory } from "../Navbar/hooks/useCategory";
import { useCollectionNavbar } from "../Navbar/hooks/useCollectionNavbar";
import styles from "./CatalogModal.module.scss";
import useCatalogModal from "./hooks/useCatalogModal";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Collapse } from "antd";

const CatalogModal = () => {
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const { onClose, isOpen } = useCatalogModal();
  const { data: collections } = useCollectionNavbar();
  const { data: categories } = useCategory({ collectionId });

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Открытие первой коллекции по умолчанию на десктопе
  useEffect(() => {
    // Если модальное окно открыто блокируем скроллинг
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    if (!isMobile && isOpen && collections?.length && !collectionId) {
      setCollectionId(collections[0].id);
    }

    // При размонтировании компонента разрешаем скролл
    return () => {
      document.body.removeAttribute("style");
    };
  }, [isOpen, collections, collectionId, isMobile]);

  const handleCollectionClick = (id: string) => {
    setCollectionId(id);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          <nav className={styles.sidebar}>
            {isMobile ? (
              <Collapse
                accordion
                items={collections?.map((collection) => ({
                  key: collection.id,
                  label: collection.title,
                  children: categories?.map((category) => (
                    <div key={category.category_id}>
                      <Link
                        to={`/catalog/${category.category_id}`}
                        onClick={onClose}
                      >
                        <h3>{category.category_title}</h3>
                      </Link>
                      {/* Отображение дочерних брендов */}
                      <ul>
                        {category.children.map((brand) => (
                          <Link
                            to={`/catalog/${brand.brand_id}`}
                            onClick={onClose}
                            key={brand.brand_id}
                          >
                            <li>{brand.brand_title}</li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  )),
                }))}
                onChange={(key) => handleCollectionClick(key[0])}
                style={{ backgroundColor: "white" }}
                bordered={false}
              />
            ) : (
              <ul >
                {collections?.map((item) => (
                  <li
                    onClick={() => handleCollectionClick(item.id)}
                    key={item.id}
                    className={collectionId === item.id ? styles.active : ""}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {!isMobile && collectionId && (
            // Десктоп версия
            <div className={styles.content}>
              <div className={styles.grid}>
                {categories?.map((category) => (
                  <div key={category.category_id}>
                    <h3>{category.category_title}</h3>
                    <ul>
                      {category.children.map((brand) => (
                        <Link
                          to={`/catalog/${brand.brand_id}`}
                          onClick={onClose}
                          key={brand.brand_id}
                        >
                          <li>{brand.brand_title}</li>
                        </Link>
                      ))}
                    </ul>
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
