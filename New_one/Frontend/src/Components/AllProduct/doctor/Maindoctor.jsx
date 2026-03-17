import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Appointment from "./Appointment";
import Billing from "./Billing";
import CaptureVitals from "./Capturevitals";
import DoctorDashboard from "./DoctorDashboard";
import Followups from "./Followups";
import Patients from "./Patients";
import Settings from "./Settings";
import SocialMedia from "./SocialMedia";
import Consultation from "./Consultation";
import ScheduledUp from './ScheduledUp';
import DoctorLogin from "./DoctorLogin";

// Protected Layout - checks if user is logged in
function ProtectedLayout() {
  const isLoggedIn = localStorage.getItem("doctorLoggedIn") === "true";
  
  if (!isLoggedIn) {
    return <Navigate to="/maindoctor/login" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default function MainDoctor() {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="login" element={<DoctorLogin />} />

      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* ✅ relative paths */}
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="billing" element={<Billing />} />
        <Route path="capture" element={<CaptureVitals />} />
        <Route path="followups" element={<Followups />} />
        <Route path="patients" element={<Patients />} />
        <Route path="settings" element={<Settings />} />
        <Route path="socialmedia" element={<SocialMedia/>}/>
        <Route path="socialmedia/scheduled" element={<ScheduledUp />} />
         <Route path="/capture/:patientId" element={<CaptureVitals />} />
         <Route path="/consultation" element={<Consultation/>}/>

        {/* ✅ fallback */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}
