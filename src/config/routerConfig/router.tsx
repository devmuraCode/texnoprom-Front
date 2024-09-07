import AboutPage from "@/Pages/About/AboutPage";
import CartPage from "@/Pages/CartPage/CartPage";
import Catalog from "@/Pages/Catalog/Catalog";
import DeliveryPage from "@/Pages/DeliveryPage/DeliveryPage";
import MainPage from "@/Pages/MainPage/MainPage";
import PaymentPage from "@/Pages/PaymentPage/PaymentPage";
import User from "@/Pages/User/ui/User";
import MainLayout from "@/components/Layout/ui/MainLayout";
import ProductDetail from "@/modules/ProductDetail/ProductDetail";
import { createBrowserRouter } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  CATALOG = "/catalog",
  CART = "/cart",
  DETAIL = "/detail",
  PROFILE = "/profile",
  PAYMENT = "/payment",
  ABOUT = "/about",
  DELIVERY = "/delivery",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.CATALOG]: "/catalog/:brandId",
  [AppRoutes.CART]: "/cart",
  [AppRoutes.DETAIL]: "/detail/:productId",
  [AppRoutes.PROFILE]: "/profile" ,
  [AppRoutes.PAYMENT]: "/payment",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.DELIVERY]: "/delivery",
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: RoutePath.main,
        element: <MainPage />,
      },
      {
        path: RoutePath["/catalog"],
        element: <Catalog />,
      },
      {
        path: RoutePath["/cart"],
        element: <CartPage />,
      },
      {
        path: RoutePath["/detail"],
        element: <ProductDetail />,
      },
      {
        path: RoutePath["/profile"],
        element: <User />,
      },
      {
        path: RoutePath["/payment"],
        element: <PaymentPage />,
      },
      {
        path: RoutePath["/about"],
        element: <AboutPage />,
      },
      {
        path: RoutePath["/delivery"],
        element: <DeliveryPage />,
      },
    ],
  },
]);
