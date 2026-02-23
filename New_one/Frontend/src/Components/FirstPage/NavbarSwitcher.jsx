import Navbar from "./Navbar";
import DashboardNavbar from "./DashboardNav";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

export default function NavbarSwitcher() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // ❌ Hide navbar on login/signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  // ✅ Switch navbar automatically
  return isLoggedIn ? <DashboardNavbar /> : <Navbar />;
}
