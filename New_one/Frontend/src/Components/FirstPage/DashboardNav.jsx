import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    // clear auth state
    logout();

    // optional: clear localStorage if you used it earlier
    localStorage.removeItem("isAuthenticated");

    // redirect to public home
    navigate("/");
  };

  return (
    <nav className="bg-black border-b border-cyan-400 px-6 py-4 flex justify-between items-center">
      {/* LOGO */}
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-cyan-400 text-black font-bold px-2 py-1">W</div>
        <span className="text-white font-bold">WYN_AI</span>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="border border-cyan-400 text-cyan-400 px-4 py-1 hover:bg-cyan-400 hover:text-black transition"
        >
          Dashboard
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="border border-cyan-400 text-cyan-400 px-4 py-1 hover:bg-cyan-400 hover:text-black transition"
        >
          Logout
        </button>

       
      </div>
    </nav>
  );
}
