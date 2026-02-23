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

function Layout() {
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
      <Route element={<Layout />}>
        <Route index element={<DoctorDashboard />} />

        {/* ✅ relative paths */}
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="billing" element={<Billing />} />
        <Route path="capture" element={<CaptureVitals />} />
        <Route path="followups" element={<Followups />} />
        <Route path="patients" element={<Patients />} />
        <Route path="settings" element={<Settings />} />
        <Route path="socialmedia" element={<SocialMedia/>}/>
         <Route path="/capture/:patientId" element={<CaptureVitals />} />
         <Route path="/consultation" element={<Consultation/>}/>

        {/* ✅ fallback */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}
