import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <div className="">
      <Header />

      <div className="">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
