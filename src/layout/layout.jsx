import NavBar from "@/components/common/NavBar";
import { Outlet } from "react-router-dom";
function Latout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
export default Latout;
