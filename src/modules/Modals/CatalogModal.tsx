import { useState, useEffect } from "react";
import { useCategory } from "../Navbar/hooks/useCategory";
import { useCollectionNavbar } from "../Navbar/hooks/useCollectionNavbar";
import styles from "./CatalogModal.module.scss";
import useCatalogModal from "./hooks/useCatalogModal";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Collapse } from "antd";
import { FaAngleDown } from "react-icons/fa6";
const ITEMS_PER_LOAD = 5;

const CatalogModal = () => {
  const [collectionSlug, setCollectionSlug] = useState<string | undefined>();
  const [visibleItems, setVisibleItems] = useState<Record<string, number>>({});
  const { onClose, isOpen } = useCatalogModal();
  const { data: collections } = useCollectionNavbar();
  const { data: categories } = useCategory({ collectionSlug });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    if (!isMobile && isOpen && collections?.length && !collectionSlug) {
      setCollectionSlug(collections[0].slug);
    }

    return () => {
      document.body.removeAttribute("style");
    };
  }, [isOpen, collections, collectionSlug, isMobile]);

  useEffect(() => {
    // Инициализация количества видимых элементов для каждой категории
    if (categories) {
      const initialVisibleItems: Record<string, number> = {};
      categories.forEach((category) => {
        initialVisibleItems[category.category_id] = ITEMS_PER_LOAD;
      });
      setVisibleItems(initialVisibleItems);
    }
  }, [categories]);

  const handleCollectionClick = (slug: string) => {
    setCollectionSlug(slug);
  };
  useEffect(() => {
    console.log("Полученные категории:", categories);
  }, [categories]);
  const handleShowMore = (categoryId: string) => {
    setVisibleItems((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || ITEMS_PER_LOAD) + ITEMS_PER_LOAD,
    }));
  };

  const handleShowLess = (categoryId: string) => {
    setVisibleItems((prev) => ({
      ...prev,
      [categoryId]: ITEMS_PER_LOAD,
    }));
  };
  // @ts-ignore
  const renderBrandsList = (category: any, isCollapse = false) => {
    const visibleBrands = category.children.slice(
      0,
      visibleItems[category.category_id]
    );
    const hasMoreItems =
      category.children.length > visibleItems[category.category_id];
    const isExpanded = visibleItems[category.category_id] < ITEMS_PER_LOAD;

    return (
      <>
        <ul>
          {visibleBrands.map((brand: any) => (
            <Link
              to={`/catalog/${brand.brand_slug}`}
              state={{ type: "brand" }}
              onClick={onClose}
              key={brand.brand_id}
            >
              <li>{brand.brand_title}</li>
            </Link>
          ))}
        </ul>
        {hasMoreItems && !isExpanded && (
          <button
            onClick={() => handleShowMore(category.category_id)}
            className={styles.showMoreButton}
          >
            Еще
            <FaAngleDown style={{ fontWeight: "bold" }} />
          </button>
        )}
        {isExpanded && (
          <button
            onClick={() => handleShowLess(category.category_id)}
            className={styles.showLessButton}
          >
            Свернуть
          </button>
        )}
      </>
    );
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
                  key: collection.slug,
                  label: collection.title,
                  children: categories?.map((category) => (
                    <div key={category.category_id}>
                      <Link
                        to={`/catalog/${category.category_slug}`}
                        state={{ type: "category" }}
                        onClick={onClose}
                      >
                        <h3>{category.category_title}</h3>
                      </Link>
                      {renderBrandsList(category, true)}
                    </div>
                  )),
                }))}
                onChange={(key) => handleCollectionClick(key[0])}
                style={{ backgroundColor: "white" }}
                bordered={false}
              />
            ) : (
              <ul>
                {collections?.map((item) => (
                  <li
                    onClick={() => handleCollectionClick(item.slug)}
                    key={item.id}
                    className={
                      collectionSlug === item.slug ? styles.active : ""
                    }
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {!isMobile && collectionSlug && (
            <div className={styles.content}>
              <div className={styles.grid}>
                {categories?.map((category) => (
                  <div key={category.category_id}>
                    <Link
                      to={`/catalog/${category.category_slug}`}
                      onClick={onClose}
                      state={{ type: "category" }}
                    >
                      <h3>{category.category_title}</h3>
                    </Link>
                    {renderBrandsList(category)}
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
