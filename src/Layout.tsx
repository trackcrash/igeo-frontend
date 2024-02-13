import { Outlet } from "react-router-dom";

import Header from "layout/header/Header";
import Footer from "layout/footer/Footer";

export function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
