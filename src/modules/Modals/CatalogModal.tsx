import { useState, useEffect } from 'react';
import { useCategory } from '../Navbar/hooks/useCategory';
import { useCollectionNavbar } from '../Navbar/hooks/useCollectionNavbar';
import styles from './CatalogModal.module.scss';
import useCatalogModal from './hooks/useCatalogModal';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Collapse } from 'antd';

const CatalogModal = () => {
  const [collectionSlug, setCollectionSlug] = useState<string | undefined>();
  const { onClose, isOpen } = useCatalogModal();
  const { data: collections } = useCollectionNavbar();
  const { data: categories } = useCategory({ collectionSlug });

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Открытие первой коллекции по умолчанию на десктопе
  useEffect(() => {
    // Если модальное окно открыто блокируем скроллинг
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    if (!isMobile && isOpen && collections?.length && !collectionSlug) {
      setCollectionSlug(collections[0].slug);
    }

    // При размонтировании компонента разрешаем скролл
    return () => {
      document.body.removeAttribute('style');
    };
  }, [isOpen, collections, collectionSlug, isMobile]);

  const handleCollectionClick = (slug: string) => {
    setCollectionSlug(slug);
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
                        state={{ type: 'category' }}
                        onClick={onClose}
                      >
                        <h3>{category.category_title}</h3>
                      </Link>
                      {/* Отображение дочерних брендов */}
                      <ul>
                        {category.children.map((brand) => (
                          <Link
                            to={`/catalog/${brand.brand_slug}`}
                            state={{ type: 'brand' }}
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
                style={{ backgroundColor: 'white' }}
                bordered={false}
              />
            ) : (
              <ul>
                {collections?.map((item) => (
                  <li
                    onClick={() => handleCollectionClick(item.slug)}
                    key={item.id}
                    className={
                      collectionSlug === item.slug ? styles.active : ''
                    }
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {!isMobile && collectionSlug && (
            // Десктоп версия
            <div className={styles.content}>
              <div className={styles.grid}>
                {categories?.map((category) => (
                  <div key={category.category_id}>
                    <Link to={`/catalog/${category.category_slug}`} state={{ type: 'category' }}>
                      <h3>{category.category_title}</h3>
                    </Link>
                    <ul>
                      {category.children.map((brand) => (
                        <li key={brand.brand_id}>
                          <Link
                            to={`/catalog/${brand.brand_slug}`}
                            state={{ type: 'brand' }}
                            onClick={onClose}
                          >
                            {brand.brand_title}
                          </Link>
                        </li>
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
