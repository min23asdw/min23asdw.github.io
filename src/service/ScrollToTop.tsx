import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SectionProvider } from "../context/SectionContext";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <SectionProvider>
      <Outlet />
    </SectionProvider>
  );
}
