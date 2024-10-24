import { FC, Suspense } from "react";
import FooterApp from "../../Footer/ui/Footer";
import Navbar from "@/modules/Navbar/ui/Navbar";
import { Outlet } from "react-router-dom";
import RegisterModal from "@/modules/Modals/RegisterModal";
import LoginModal from "@/modules/Modals/LoginModal";
import UzumModal from "@/modules/Modals/UzumModal";
import ToasterProvider from "@/providers/ToasterProvider";
import Send_Reset_Code_Modal from "@/modules/Modals/Send_Reset_Code_Modal";
import Reset_Password_Modal from "@/modules/Modals/Reset_Password_Modal";
import Verify_phoneModal from "@/modules/Modals/Verify_phoneModal";
import WelcomeModal from "@/modules/Modals/WelcomeModal";

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
      <ToasterProvider />
      <LoginModal />
      <UzumModal />
      <Send_Reset_Code_Modal />
      <Reset_Password_Modal />
      <Verify_phoneModal />
      <WelcomeModal/>
    </div>
  );
};

export default Main;
