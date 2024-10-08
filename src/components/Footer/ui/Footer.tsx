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
  const [brandId, setBrandId] = useState<string | null>(null);
  // @ts-ignore
  const { data: products = [] } = useProductByBrand({ brandId });

  return (
    <div className="footer w-full">
      <Container>
        <div className="sm:flex flex-col">
          <div className="flex flex-wrap justify-around text-white">
            <div className="mb-6 w-full sm:w-auto text-start">
              <Link to="/">
                <img src={logo} className="w-40 h-20" alt="Flowbite Logo" />
              </Link>
            </div>

            <div className="mb-6 w-full sm:w-auto text-start">
              {/* content */}
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

            <div className="mb-6 w-full sm:w-auto text-start">
              <h2 className="font-black text-lg">Контакты</h2>
              <a href="#" className="text-sm block">
                Узбекистан, г. Ташкент
              </a>
              <a href="tel:+998938480008" className="text-sm block">
                +998938480008
              </a>
              <a href="tel:+998946279592" className="text-sm block">
                +998946279592
              </a>
              <a href="mailto:admin@elmakon.uz" className="text-sm block">
                Пн-Вс 9.00 - 18.00
              </a>
              <a href="mailto:admin@elmakon.uz" className="text-sm block">
                info@texnoprom.net.uz
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
