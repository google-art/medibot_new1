import { useEffect } from "react";
import { io } from "socket.io-client";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

/* ================= CONTEXT ================= */
import { AuthProvider } from "./context/AuthContext";

/* ================= NAVBAR ================= */
import NavbarSwitcher from "./Components/FirstPage/NavbarSwitcher";

/* ================= FOOTER ================= */
import Footer from "./Components/ThirdSection/Footer";

/* ================= AUTH & HOME ================= */
import HeroPage from "./Pages/HereoPage";
import Login from "./Components/FirstPage/LoginForm";
import Signup from "./Components/FirstPage/SignUpPage";

/* ================= DASHBOARD ================= */
import Dashboard from "./Components/Dashboard/DashboardPage";

/* ================= INDUSTRIES ================= */
import Industry from "./Components/ThirdSection/Industry";
import DrivingSchool from "./Components/IndustrySection/Driving/DrivingSchool";
import DrivingPage from "./Components/IndustrySection/Driving/DrivingPage";
import MedicalProduct from "./Components/IndustrySection/Medical/MedicalProduct";
import MedicalPage from "./Components/IndustrySection/Medical/MedicalPage";
import MediBotPage from "./Components/IndustrySection/Medical/MedicalBot";
import RestaurantProduct from "./Components/IndustrySection/Restaurant/RestaurantProduct";
import SalonsProduct from "./Components/IndustrySection/Saloon/SaloonProduct";
import RetailStores from "./Components/IndustrySection/Retails/RetailStores";
import HR from "./Components/IndustrySection/Hr/HrProduct";
import MarketingAgencies from "./Components/MarketingAgencies/MarketingProduct";
import AdminLegal from "./Components/IndustrySection/Admin/AdminProduct";
import ITWebAgencies from "./Components/IndustrySection/IT/ItProduct";
import Solopreneurs from "./Components/IndustrySection/Solopreners/SoloprenersProduct";
import RealEstateAgents from "./Components/IndustrySection/RetailAgent/RetailAgentProduct";
import EdTechProviders from "./Components/IndustrySection/Edtech/EdtechProduct";
import ScrollToTop from "./Components/scrolltop";
import StartTrial from "./Components/checkout/starttrial";
import DoctorDashboard from "./Components/IndustrySection/Medical/DoctorDashboard";
import Autopost from "./Components/AllProduct/Autopost";
import Docgen from "./Components/AllProduct/Document";
import Invoice from "./Components/AllProduct/Invoice";
import LeadFlow from "./Components/AllProduct/LeadWorkFlow";
import SalonBooking from "./Components/AllProduct/Saloon";
import Slogan from "./Components/AllProduct/Slogan";
import { TechStackPage } from "./Components/AllProduct/Techstack";
import ClinNoteAI from "./Components/AllProduct/VoicetoText";
import MainDoctor from "./Components/AllProduct/doctor/Maindoctor";


/* ================= FOOTER LOGIC ================= */
function FooterController() {
  const location = useLocation();

  // ❌ Hide footer on dashboard & auth pages
  if (
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/signup"
  ) {
    return null;
  }

  return <Footer />;
}
const socket = io("http://localhost:3001");
/* ================= APP ================= */

export default function App() {

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🔌 Connected to backend:", socket.id);
    });

    socket.on("new-booking", (data) => {
      console.log("🔔 Booking Notification:", data);
      alert(`New Appointment for ${data.patientName}`);
    });

    return () => {
      socket.off("new-booking");
    };
  }, []);

  return (
    
    <AuthProvider>
      <Router>
        <ScrollToTop/>
        {/* 🔥 AUTO NAVBAR SWITCH */}
        <NavbarSwitcher />

        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* INDUSTRIES */}
          <Route path="/industry" element={<Industry />} />
          <Route path="/driving" element={<DrivingSchool />} />
          <Route path="/drivingpage" element={<DrivingPage />} />

          <Route path="/MedicalProduct" element={<MedicalProduct />} />
          <Route path="/MedicalPage" element={<MedicalPage />} />
          <Route path="/MediBotPage" element={<MediBotPage />} />

          <Route path="/restaurants" element={<RestaurantProduct />} />
          <Route path="/salonProduct" element={<SalonsProduct />} />

          <Route path="/retail" element={<RetailStores />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/marketing" element={<MarketingAgencies />} />
          <Route path="/admin" element={<AdminLegal />} />
          <Route path="/it" element={<ITWebAgencies />} />

          <Route path="/solopreneurs" element={<Solopreneurs />} />
          <Route path="/real-estate" element={<RealEstateAgents />} />
          <Route path="/edtech" element={<EdTechProviders />} />
          <Route path="/starttrial" element={<StartTrial/>}/>
          <Route path="/doctordashboard" element={<DoctorDashboard/>}/>

          <Route path="/autopost" element={<Autopost/>}/>
          <Route path="/document" element={<Docgen/>}/>
          <Route path="/invoice" element={<Invoice/>}/>
          <Route path="/leadworkflow" element={<LeadFlow/>}/>
          <Route path="/saloon" element={<SalonBooking/>}/>
          <Route path="/slogan" element={<Slogan/>}/>
          <Route path="/techstack" element={<TechStackPage/>}/>
          <Route path="/voicetotext" element={<ClinNoteAI/>}/>

          
          
         <Route path="/maindoctor/*" element={<MainDoctor/>}/>


          {/* 404 */}
          <Route
            path="*"
            element={<h1 className="p-10 text-xl">Page Not Found</h1>}
          />
        </Routes>

        {/* FOOTER */}
        <FooterController />
      </Router>
    </AuthProvider>
  );
}
