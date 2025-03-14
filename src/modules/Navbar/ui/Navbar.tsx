import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import styles from "./Navbar.module.scss";
import { CiClock1, CiShoppingCart, CiUser } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Input } from "antd";
import { Link } from "react-router-dom";
import useRegisterModal from "@/modules/Modals/hooks/useRegisterModal";
import useCatalogModal from "@/modules/Modals/hooks/useCatalogModal";
import CatalogModal from "@/modules/Modals/CatalogModal";
import { useMediaQuery } from "react-responsive";
import { useAllProducts } from "@/modules/ProductItem/hooks/useAllProducts";

const Navbar = () => {
  // @ts-ignore
  const [menuOpen, setMenuOpen] = useState(false);
  // @ts-ignore
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const registerModal = useRegisterModal();
  const catalogModal = useCatalogModal();
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  // @ts-ignore
  const { data: productData = [] } = useAllProducts();
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!token) return;

    const checkPremiumStatus = async () => {
      try {
        const response = await fetch("/premium/my-subscriptions/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Ошибка проверки премиум-статуса");

        const data = await response.json();
        setIsPremium(data.is_premium);
      } catch (error) {
        console.error("Ошибка получения премиума:", error);
      }
    };

    checkPremiumStatus();
  }, [token]);

  const handleCatalogToggle = () => {
    if (menuOpen) {
      catalogModal.onClose();
    } else {
      catalogModal.onOpen();
    }
    setMenuOpen((prev) => !prev);
  };

  const deleteUserToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.reload();
  };

  return (
    <div className={styles.container}>
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
              {menuOpen ? <AiOutlineCloseSquare /> : <GiHamburgerMenu />}{" "}
              Каталог
            </button>
          </div>

          <div className={styles.searchContainer}>
            <Input
              className={styles.header__input}
              placeholder="Поиск товара"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                isPremium ? (
                  <button className={styles.premiumButton}>Премиум</button>
                ) : (
                  <button onClick={deleteUserToken}>Выйти</button>
                )
              ) : (
                <button onClick={registerModal.onOpen}>Войти</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <CatalogModal />
    </div>
  );
};

export default Navbar;
