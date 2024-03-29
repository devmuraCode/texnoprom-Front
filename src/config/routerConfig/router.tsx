import { CartPage } from "@/Pages/CartPage/CartPage.async";
import Catalog from "@/Pages/Catalog/Catalog";
import { MainPage } from "@/Pages/MainPage/MainPage.async";
import User from "@/Pages/User/ui/User";
import MainLayout from "@/components/Layout/ui/MainLayout";
import ProductDetail from "@/modules/ProductDetail/ProductDetail";
import { createBrowserRouter } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  CATALOG = "/catalog",
  CART = "/cart",
  DETAIL = "/detail",
  PROFILE = "/profile"
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.CATALOG]: "/catalog/:brandId",
  [AppRoutes.CART]: "/cart",
  [AppRoutes.DETAIL]: "/detail/:productId",
  [AppRoutes.PROFILE]: "/profile" 
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
      }
    ],
  },
]);
