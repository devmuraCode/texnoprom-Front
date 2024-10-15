import { useState } from "react";
import logo from "@/assets/logo.png";
import styles from "./Navbar.module.scss";
import { BiMenuAltRight } from "react-icons/bi";
import { CiClock1, CiShoppingCart, CiUser } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineCloseSquare } from "react-icons/ai";

import { Input } from "antd";
import { Link } from "react-router-dom";
import useRegisterModal from "@/modules/Modals/hooks/useRegisterModal";
import useCatalogModal from "@/modules/Modals/hooks/useCatalogModal";
import CatalogModal from "@/modules/Modals/CatalogModal";
import { useMediaQuery } from "react-responsive";
import { useAllProducts } from "@/modules/ProductItem/hooks/useAllProducts";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const registerModal = useRegisterModal();
  const catalogModal = useCatalogModal();
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { data: productData = [] } = useAllProducts();
  const user_id = localStorage.getItem("user_id");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = () => {
    setSearchTerm("");
  };

  const handleCatalogToggle = () => {
    if (menuOpen) {
      catalogModal.onClose();
    } else {
      catalogModal.onOpen();
    }
    setMenuOpen((prev) => !prev);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const deleteUserToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.top__navbar}>
        <div className={styles.top__navbar__text__container}>
          <a href="tel:+998712033333" className={styles.top__navbar__text}>
            <span>
              <MdOutlinePhone />
            </span>{" "}
            +998 71 203 33 33
          </a>
          <Link to="/about" className={styles.top__navbar__text}>
            <span>
              <IoLocationOutline />
            </span>{" "}
            Ташкент
          </Link>
        </div>

        {!isMobile && (
          <div className={styles.desktopOnly}>
            <ul className={styles.top__navbar__catalog}>
              <li>
                <Link to="/about">О нас</Link>
              </li>
              <li>
                <Link to="/delivery">Доставка</Link>
              </li>
              <li>Магазины</li>
              <li>Связаться с нами!</li>
            </ul>
          </div>
        )}
      </div>

      <div className={styles.header}>
        <div className={styles.header__content}>
          <div className={styles.header__left}>
            {!isMobile && (
              <Link to="/">
                <img src={logo} className={styles.header__logo} alt="Logo" />
              </Link>
            )}
            <button
              className={styles.header__button}
              onClick={handleCatalogToggle}
            >
              {menuOpen ? <AiOutlineCloseSquare /> : <GiHamburgerMenu />}
              Каталог
            </button>
          </div>

          {/* Поиск товара */}
          <div className={styles.searchContainer}>
            <Input
              className={styles.header__input}
              placeholder="Поиск товара"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && filteredProducts.length > 0 && (
              <div className={styles.searchResults}>
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/detail/${product.id}`}
                    className={styles.searchResultItem}
                    onClick={handleProductClick}
                  >
                    {product.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className={styles.header__button__container}>
            <div className={styles.header__button__status}>
              <CiClock1 />
              <Link to={"/status"}>Статус заказа</Link>
            </div>
            <div className={styles.header__button__status}>
              <CiShoppingCart />
              <Link to="/cart">Корзина</Link>
            </div>
            <div className={styles.header__button__status}>
              <CiUser />
              {user_id ? (
                <button onClick={deleteUserToken}>Выйти</button>
              ) : (
                <button onClick={registerModal.onOpen}>Войти</button>
              )}
            </div>
          </div>

          {isMobile && (
            <button
              className={styles.header__toggler}
              onClick={handleMobileMenuToggle}
            >
              {!mobileMenuOpen ? <BiMenuAltRight /> : <AiOutlineCloseSquare />}
            </button>
          )}
        </div>
      </div>

      {isMobile && mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link to="/about">О нас</Link>
              </li>
              <li>
                <Link to="/delivery">Доставка</Link>
              </li>
              <li>Магазины</li>
              <li>Связаться с нами!</li>
            </ul>
          </nav>
          <div className={styles.header__button__container}>
            <div className={styles.header__button__status}>
              <CiClock1 />
              <Link to={"/status"}>Статус заказа</Link>
            </div>
            <div className={styles.header__button__status}>
              <CiShoppingCart />
              <Link to="/cart">Корзина</Link>
            </div>
            <div className={styles.header__button__status}>
              <CiUser />
              <button onClick={registerModal.onOpen}>Войти</button>
            </div>
          </div>
        </div>
      )}

      <CatalogModal />
    </div>
  );
};

export default Navbar;
