import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/Container/Container";
import logo from "@/assets/logo1.svg";
import "./Footer.scss";
import { useProductByBrand } from "@/modules/ProductItem/hooks/useProductByBrand";
import { useAllBrands } from "@/modules/Brands/hooks/useAllBrands";

const Footer = () => {
  // @ts-ignore
  const { data: brands } = useAllBrands();
   // @ts-ignore
  const [brandSlug, setBrandSlug] = useState<string | undefined>();
  // @ts-ignore
  const { data: products = [] } = useProductByBrand({ brandSlug });

  return (
    <div className="footer">
      <Container>
        <div className="footer__content">
          <div className="footer__logo">
            <Link to="/">
              <img src={logo} alt="Logo" className="footer__logo-img" />
            </Link>
          </div>

          <div className="footer__links">
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
          </div>

          <div className="footer__contacts">
            <h2 className="footer__contacts-title">Контакты</h2>
            <a href="#" className="footer__contact-link">
              Узбекистан, г. Ташкент
            </a>
            <a href="tel:+998938480008" className="footer__contact-link">
              +998938480008
            </a>
            <a href="tel:+998946279592" className="footer__contact-link">
              +998946279592
            </a>
            <p className="footer__contact-info">Пн-Вс 9.00 - 18.00</p>
            <a
              href="mailto:info@texnoprom.net.uz"
              className="footer__contact-link"
            >
              info@texnoprom.net.uz
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
