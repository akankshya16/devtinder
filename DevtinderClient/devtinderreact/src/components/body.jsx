import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
