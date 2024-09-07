import { FC, Suspense } from "react";
import FooterApp from "../../Footer/ui/Footer";
import Navbar from "@/modules/Navbar/ui/Navbar";
import { Outlet } from "react-router-dom";
import RegisterModal from "@/modules/Modals/RegisterModal";
import LoginModal from "@/modules/Modals/LoginModal";
import UzumModal from "@/modules/Modals/UzumModal";
import ToasterProvider from "@/providers/ToasterProvider";

const Main: FC = () => {
  return (
    <div className="flex-col h-screen">
      <Navbar />
      <div className="grow">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
      <FooterApp />
      <RegisterModal />
      <ToasterProvider/>
      <LoginModal/>
      <UzumModal />
    </div>
  );
};

export default Main;
