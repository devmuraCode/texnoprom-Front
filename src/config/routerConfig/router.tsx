  import AboutPage from "@/Pages/About/AboutPage";
  import CartPage from "@/Pages/CartPage/CartPage";
  import Catalog from "@/Pages/Catalog/Catalog";
  import DeliveryPage from "@/Pages/DeliveryPage/DeliveryPage";
  import MainPage from "@/Pages/MainPage/MainPage";
  import PaymentPage from "@/Pages/PaymentPage/PaymentPage";
  import StatusPage from "@/Pages/Status/StatusPage";
  import User from "@/Pages/User/ui/User";
  import MainLayout from "@/components/Layout/ui/MainLayout";
  import ProductDetail from "@/modules/ProductDetail/ProductDetail";
  import { createBrowserRouter } from "react-router-dom";

  export enum AppRoutes {
    MAIN = "main",
    CATALOG = "catalog",
    CART = "cart",
    DETAIL = "detail",
    PROFILE = "profile",
    PAYMENT = "payment",
    ABOUT = "about",
    DELIVERY = "delivery",
    STATUS = "status",
  }

  export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.CATALOG]: "/catalog/:slug",
    [AppRoutes.CART]: "/cart",
    [AppRoutes.DETAIL]: "/detail/:productSlug",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.PAYMENT]: "/payment",
    [AppRoutes.ABOUT]: "/about",
    [AppRoutes.DELIVERY]: "/delivery",
    [AppRoutes.STATUS]: "/status",
  };

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: RoutePath[AppRoutes.MAIN],
          element: <MainPage />,
        },
        {
          path: RoutePath[AppRoutes.CATALOG],
          element: <Catalog />,
        },
        {
          path: RoutePath[AppRoutes.CART],
          element: <CartPage />,
        },
        {
          path: RoutePath[AppRoutes.DETAIL],
          element: <ProductDetail />,
        },
        {
          path: RoutePath[AppRoutes.PROFILE],
          element: <User />,
        },
        {
          path: RoutePath[AppRoutes.PAYMENT],
          element: <PaymentPage />,
        },
        {
          path: RoutePath[AppRoutes.ABOUT],
          element: <AboutPage />,
        },
        {
          path: RoutePath[AppRoutes.DELIVERY],
          element: <DeliveryPage />,
        },
        {
          path: RoutePath[AppRoutes.STATUS],
          element: <StatusPage />,
        },
      ],
    },
  ]);
