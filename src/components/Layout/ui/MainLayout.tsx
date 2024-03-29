import { FC, Suspense } from "react";
import FooterApp from "../../Footer/ui/Footer";
import Navbar from "@/modules/Navbar/ui/Navbar";
import { Outlet } from "react-router-dom";

const Main: FC = () => {
  return (
    <div className=" flex-col h-screen">
      <Navbar />
        <div className="grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      <FooterApp/>
    </div>
  );
};

export default Main;
