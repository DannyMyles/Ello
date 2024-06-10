import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <div className="mx-auto min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;