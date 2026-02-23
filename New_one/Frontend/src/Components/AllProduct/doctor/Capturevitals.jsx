// // // CaptureVitals.jsx
// // // Requires: npm i react-icons
// // // TailwindCSS required
// // // Notes:
// // // - No navbar / sidebar / footer
// // // - Removed AI voice assistant + voice capture sections (as requested)
// // // - Workable model: capture vitals form + proceed button (simple validation)

// // import React, { useMemo, useState } from "react";
// // import { FiUser, FiActivity, FiCheck, FiArrowLeft } from "react-icons/fi";

// // const PAGE_BG = "#FEFCE8";

// // const Label = ({ children }) => (
// //   <div className="text-[11px] font-extrabold text-black/70 uppercase mb-1">{children}</div>
// // );

// // const Field = ({ value, onChange, placeholder, leftIcon }) => (
// //   <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center gap-2">
// //     {leftIcon ? <div className="text-black/60">{leftIcon}</div> : null}
// //     <input
// //       value={value}
// //       onChange={(e) => onChange(e.target.value)}
// //       placeholder={placeholder}
// //       className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
// //     />
// //   </div>
// // );

// // export default function CaptureVitals() {
// //   const [patientName, setPatientName] = useState("");

// //   const [vitals, setVitals] = useState({
// //     height: "",
// //     weight: "",
// //     bp: "",
// //     temp: "",
// //     pulse: "",
// //   });

// //   const canProceed = useMemo(() => {
// //     return patientName.trim() && vitals.height.trim() && vitals.weight.trim() && vitals.bp.trim();
// //   }, [patientName, vitals]);

// //   const proceed = () => {
// //     if (!canProceed) {
// //       alert("Please fill Patient Name, Height, Weight, and Blood Pressure.");
// //       return;
// //     }
// //     alert(`✅ Proceeding to consultation for ${patientName}`);
// //   };

// //   return (
// //     <div
// //       className="min-h-screen font-sans"
// //       style={{
// //         backgroundColor: PAGE_BG,
// //         fontFamily:
// //           "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
// //       }}
// //     >
// //       <main className="mx-auto max-w-[1100px] px-6 py-7">
// //         {/* Header */}
// //         <div className="flex items-start justify-between gap-4">
// //           <div>
// //             <h1 className="text-3xl font-extrabold text-black tracking-tight">CAPTURE VITALS</h1>
// //             <p className="text-sm text-black/55 mt-1">Use voice or type to capture patient vitals</p>
// //           </div>

// //           <button
// //             type="button"
// //             onClick={() => window.history.back()}
// //             className="h-9 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm inline-flex items-center gap-2"
// //           >
// //             <FiArrowLeft />
// //             BACK
// //           </button>
// //         </div>

// //         {/* Patient name box (big) */}
// //         <div className="mt-6 border-2 border-black bg-white rounded-md p-5">
// //           <Label>Patient Name *</Label>
// //           <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center gap-2">
// //             <FiUser className="text-black/60" />
// //             <input
// //               value={patientName}
// //               onChange={(e) => setPatientName(e.target.value)}
// //               placeholder="Enter patient name"
// //               className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
// //             />
// //           </div>
// //         </div>

// //         {/* Vitals section */}
// //         <div className="mt-6 border-2 border-[#00B8DB] bg-white rounded-md overflow-hidden">
// //           <div className="p-5 border-b border-black/10 flex items-center gap-3">
// //             <div className="h-12 w-12 border-2 border-black rounded-md bg-[#00B8DB] flex items-center justify-center">
// //               <FiActivity className="text-black text-xl" />
// //             </div>
// //             <div>
// //               <div className="font-extrabold text-sm text-black uppercase">Vital Signs</div>
// //             </div>
// //           </div>

// //           <div className="p-5">
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //               <div>
// //                 <Label>Height * *</Label>
// //                 <Field
// //                   value={vitals.height}
// //                   onChange={(v) => setVitals((p) => ({ ...p, height: v }))}
// //                   placeholder="e.g., 175 cm"
// //                 />
// //               </div>

// //               <div>
// //                 <Label>Weight * *</Label>
// //                 <Field
// //                   value={vitals.weight}
// //                   onChange={(v) => setVitals((p) => ({ ...p, weight: v }))}
// //                   placeholder="e.g., 70 kg"
// //                 />
// //               </div>

// //               <div>
// //                 <Label>Blood Pressure * *</Label>
// //                 <Field
// //                   value={vitals.bp}
// //                   onChange={(v) => setVitals((p) => ({ ...p, bp: v }))}
// //                   placeholder="e.g., 120/80"
// //                 />
// //               </div>

// //               <div>
// //                 <Label>Temperature</Label>
// //                 <Field
// //                   value={vitals.temp}
// //                   onChange={(v) => setVitals((p) => ({ ...p, temp: v }))}
// //                   placeholder="e.g., 98.6°F"
// //                 />
// //               </div>

// //               <div>
// //                 <Label>Pulse Rate</Label>
// //                 <Field
// //                   value={vitals.pulse}
// //                   onChange={(v) => setVitals((p) => ({ ...p, pulse: v }))}
// //                   placeholder="e.g., 72 bpm"
// //                 />
// //               </div>
// //             </div>

// //             <div className="mt-6 flex justify-end">
// //               <button
// //                 type="button"
// //                 onClick={proceed}
// //                 disabled={!canProceed}
// //                 className={[
// //                   "h-10 px-6 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center gap-2",
// //                   canProceed ? "bg-[#00B8DB] text-black" : "bg-[#BFEFFF] text-black/50 cursor-not-allowed",
// //                 ].join(" ")}
// //               >
// //                 <FiCheck />
// //                 PROCEED TO CONSULTATION
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// // CaptureVitals.jsx
// // Requires: npm i react-icons
// // TailwindCSS required (TailwindCSS required)
// // Notes:
// // - No navbar / sidebar / footer
// // - Removed AI voice assistant + voice capture sections
// // - Proceed button validates + navigates to Consultation page
// //
// // Assumption: react-router-dom v6+
// // Consultation route assumed as: /consultation
// // (If you want /consultation/:patientId or something else, tell me the route and I’ll adjust.)

// import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiUser, FiActivity, FiCheck, FiArrowLeft } from "react-icons/fi";

// const PAGE_BG = "#FEFCE8";

// const Label = ({ children }) => (
//   <div className="text-[11px] font-extrabold text-black/70 uppercase mb-1">{children}</div>
// );

// const Field = ({ value, onChange, placeholder, leftIcon }) => (
//   <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center gap-2">
//     {leftIcon ? <div className="text-black/60">{leftIcon}</div> : null}
//     <input
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
//     />
//   </div>
// );

// export default function CaptureVitals() {
//   const navigate = useNavigate();

//   const [patientName, setPatientName] = useState("");

//   const [vitals, setVitals] = useState({
//     height: "",
//     weight: "",
//     bp: "",
//     temp: "",
//     pulse: "",
//   });

//   const canProceed = useMemo(() => {
//     return patientName.trim() && vitals.height.trim() && vitals.weight.trim() && vitals.bp.trim();
//   }, [patientName, vitals]);

//   const proceed = () => {
//     if (!canProceed) {
//       alert("Please fill Patient Name, Height, Weight, and Blood Pressure.");
//       return;
//     }

//     // Optional: store data for the consultation page (demo-friendly)
//     // On Consultation page you can read:
//     // const data = JSON.parse(sessionStorage.getItem("consultationDraft") || "{}");
//     const payload = {
//       patientName: patientName.trim(),
//       vitals: {
//         height: vitals.height.trim(),
//         weight: vitals.weight.trim(),
//         bp: vitals.bp.trim(),
//         temp: vitals.temp.trim(),
//         pulse: vitals.pulse.trim(),
//       },
//       capturedAt: new Date().toISOString(),
//     };
//     try {
//       sessionStorage.setItem("consultationDraft", JSON.stringify(payload));
//     } catch (e) {
//       // ignore storage errors
//     }

//     // ✅ Navigate to consultation page
//     navigate("/consultation");
//   };

//   return (
//     <div
//       className="min-h-screen font-sans"
//       style={{
//         backgroundColor: PAGE_BG,
//         fontFamily:
//           "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
//       }}
//     >
//       <main className="mx-auto max-w-[1100px] px-6 py-7">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-extrabold text-black tracking-tight">CAPTURE VITALS</h1>
//             <p className="text-sm text-black/55 mt-1">Type to capture patient vitals</p>
//           </div>

//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="h-9 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm inline-flex items-center gap-2"
//           >
//             <FiArrowLeft />
//             BACK
//           </button>
//         </div>

//         {/* Patient name box (big) */}
//         <div className="mt-6 border-2 border-black bg-white rounded-md p-5">
//           <Label>Patient Name *</Label>
//           <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center gap-2">
//             <FiUser className="text-black/60" />
//             <input
//               value={patientName}
//               onChange={(e) => setPatientName(e.target.value)}
//               placeholder="Enter patient name"
//               className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
//             />
//           </div>
//         </div>

//         {/* Vitals section */}
//         <div className="mt-6 border-2 border-[#00B8DB] bg-white rounded-md overflow-hidden">
//           <div className="p-5 border-b border-black/10 flex items-center gap-3">
//             <div className="h-12 w-12 border-2 border-black rounded-md bg-[#00B8DB] flex items-center justify-center">
//               <FiActivity className="text-black text-xl" />
//             </div>
//             <div>
//               <div className="font-extrabold text-sm text-black uppercase">Vital Signs</div>
//             </div>
//           </div>

//           <div className="p-5">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <Label>Height *</Label>
//                 <Field
//                   value={vitals.height}
//                   onChange={(v) => setVitals((p) => ({ ...p, height: v }))}
//                   placeholder="e.g., 175 cm"
//                 />
//               </div>

//               <div>
//                 <Label>Weight *</Label>
//                 <Field
//                   value={vitals.weight}
//                   onChange={(v) => setVitals((p) => ({ ...p, weight: v }))}
//                   placeholder="e.g., 70 kg"
//                 />
//               </div>

//               <div>
//                 <Label>Blood Pressure *</Label>
//                 <Field
//                   value={vitals.bp}
//                   onChange={(v) => setVitals((p) => ({ ...p, bp: v }))}
//                   placeholder="e.g., 120/80"
//                 />
//               </div>

//               <div>
//                 <Label>Temperature</Label>
//                 <Field
//                   value={vitals.temp}
//                   onChange={(v) => setVitals((p) => ({ ...p, temp: v }))}
//                   placeholder="e.g., 98.6°F"
//                 />
//               </div>

//               <div>
//                 <Label>Pulse Rate</Label>
//                 <Field
//                   value={vitals.pulse}
//                   onChange={(v) => setVitals((p) => ({ ...p, pulse: v }))}
//                   placeholder="e.g., 72 bpm"
//                 />
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 type="button"
//                 onClick={proceed}
//                 disabled={!canProceed}
//                 className={[
//                   "h-10 px-6 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center gap-2",
//                   canProceed ? "bg-[#00B8DB] text-black" : "bg-[#BFEFFF] text-black/50 cursor-not-allowed",
//                 ].join(" ")}
//               >
//                 <FiCheck />
//                 PROCEED TO CONSULTATION
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { FiUser, FiActivity, FiCheck, FiArrowLeft, FiHash } from "react-icons/fi";

// const PAGE_BG = "#FEFCE8";

// const Label = ({ children }) => (
//   <div className="text-[11px] font-extrabold text-black/70 uppercase mb-1">{children}</div>
// );

// const Field = ({ value, onChange, placeholder, leftIcon, readOnly = false }) => (
//   <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center gap-2">
//     {leftIcon ? <div className="text-black/60">{leftIcon}</div> : null}
//     <input
//       value={value}
//       onChange={(e) => onChange?.(e.target.value)}
//       placeholder={placeholder}
//       readOnly={readOnly}
//       className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
//     />
//   </div>
// );

// export default function CaptureVitals() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { patientId } = useParams();

//   const [patientName, setPatientName] = useState("");

//   const [vitals, setVitals] = useState({
//     height: "",
//     weight: "",
//     bp: "",
//     temp: "",
//     pulse: "",
//   });

//   // ✅ AUTO-FILL Patient Name
//   useEffect(() => {
//     // 1) from Patients.jsx navigate state
//     const stateName = location?.state?.patientName;

//     // 2) fallback: from sessionStorage
//     let storageName = "";
//     try {
//       const raw = sessionStorage.getItem("capturePatient");
//       const parsed = raw ? JSON.parse(raw) : null;
//       storageName = parsed?.patientName || "";
//     } catch (e) {
//       storageName = "";
//     }

//     const finalName = stateName || storageName;

//     // only auto-fill if empty (doctor can still edit)
//     if (finalName && !patientName.trim()) {
//       setPatientName(finalName);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location?.state]);

//   const canProceed = useMemo(() => {
//     return patientName.trim() && vitals.height.trim() && vitals.weight.trim() && vitals.bp.trim();
//   }, [patientName, vitals]);

//   const proceed = () => {
//     if (!canProceed) {
//       alert("Please fill Patient Name, Height, Weight, and Blood Pressure.");
//       return;
//     }

//     // store draft for consultation page
//     const payload = {
//       patientId: patientId || location?.state?.patientId || "",
//       patientName: patientName.trim(),
//       vitals: {
//         height: vitals.height.trim(),
//         weight: vitals.weight.trim(),
//         bp: vitals.bp.trim(),
//         temp: vitals.temp.trim(),
//         pulse: vitals.pulse.trim(),
//       },
//       capturedAt: new Date().toISOString(),
//     };

//     sessionStorage.setItem("consultationDraft", JSON.stringify(payload));

//     // ✅ go to consultation page
//     navigate("/consultation", { state: payload });
//   };

//   return (
//     <div
//       className="min-h-screen font-sans"
//       style={{
//         backgroundColor: PAGE_BG,
//         fontFamily:
//           "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
//       }}
//     >
//       <main className="mx-auto max-w-[1100px] px-6 py-7">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-extrabold text-black tracking-tight">CAPTURE VITALS</h1>
//             <p className="text-sm text-black/55 mt-1">Type to capture patient vitals</p>
//           </div>

//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="h-9 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm inline-flex items-center gap-2"
//           >
//             <FiArrowLeft />
//             BACK
//           </button>
//         </div>

//         {/* ✅ Patient box */}
//         <div className="mt-6 border-2 border-black bg-white rounded-md p-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label>Patient ID</Label>
//               <Field value={patientId || ""} readOnly placeholder="Patient ID" leftIcon={<FiHash />} />
//             </div>

//             <div>
//               <Label>Patient Name *</Label>
//               <Field
//                 value={patientName}
//                 onChange={setPatientName}
//                 placeholder="Enter patient name"
//                 leftIcon={<FiUser />}
//               />
//               <div className="text-[11px] text-black/50 mt-1">Auto-filled from Patients page</div>
//             </div>
//           </div>
//         </div>

//         {/* Vitals */}
//         <div className="mt-6 border-2 border-[#00B8DB] bg-white rounded-md overflow-hidden">
//           <div className="p-5 border-b border-black/10 flex items-center gap-3">
//             <div className="h-12 w-12 border-2 border-black rounded-md bg-[#00B8DB] flex items-center justify-center">
//               <FiActivity className="text-black text-xl" />
//             </div>
//             <div>
//               <div className="font-extrabold text-sm text-black uppercase">Vital Signs</div>
//             </div>
//           </div>

//           <div className="p-5">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <Label>Height *</Label>
//                 <Field value={vitals.height} onChange={(v) => setVitals((p) => ({ ...p, height: v }))} placeholder="e.g., 175 cm" />
//               </div>

//               <div>
//                 <Label>Weight *</Label>
//                 <Field value={vitals.weight} onChange={(v) => setVitals((p) => ({ ...p, weight: v }))} placeholder="e.g., 70 kg" />
//               </div>

//               <div>
//                 <Label>Blood Pressure *</Label>
//                 <Field value={vitals.bp} onChange={(v) => setVitals((p) => ({ ...p, bp: v }))} placeholder="e.g., 120/80" />
//               </div>

//               <div>
//                 <Label>Temperature</Label>
//                 <Field value={vitals.temp} onChange={(v) => setVitals((p) => ({ ...p, temp: v }))} placeholder="e.g., 98.6°F" />
//               </div>

//               <div>
//                 <Label>Pulse Rate</Label>
//                 <Field value={vitals.pulse} onChange={(v) => setVitals((p) => ({ ...p, pulse: v }))} placeholder="e.g., 72 bpm" />
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 type="button"
//                 onClick={proceed}
//                 disabled={!canProceed}
//                 className={[
//                   "h-10 px-6 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center gap-2",
//                   canProceed ? "bg-[#00B8DB] text-black" : "bg-[#BFEFFF] text-black/50 cursor-not-allowed",
//                 ].join(" ")}
//               >
//                 <FiCheck />
//                 PROCEED TO CONSULTATION
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiUser, FiActivity, FiCheck, FiArrowLeft, FiHash } from "react-icons/fi";

const PAGE_BG = "#FEFCE8";
const DOCTOR_BASE = "/maindoctor"; // ✅ important

const Label = ({ children }) => (
  <div className="text-[11px] font-extrabold text-black/70 uppercase mb-1">
    {children}
  </div>
);

const Field = ({ value, onChange, placeholder, leftIcon, readOnly = false }) => (
  <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center gap-2">
    {leftIcon ? <div className="text-black/60">{leftIcon}</div> : null}
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
    />
  </div>
);

export default function CaptureVitals() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId: patientIdParam } = useParams();

  const [patientName, setPatientName] = useState("");

  const [vitals, setVitals] = useState({
    height: "",
    weight: "",
    bp: "",
    temp: "",
    pulse: "",
  });

  // ✅ Resolve PatientId + Name from params OR navigate state OR session storage
  const [resolvedPatientId, setResolvedPatientId] = useState(patientIdParam || "");

  useEffect(() => {
    // 1) from Patients.jsx navigate state
    const stateName = location?.state?.patientName || "";
    const stateId = location?.state?.patientId || "";

    // 2) fallback from sessionStorage
    let storageName = "";
    let storageId = "";
    try {
      const raw = sessionStorage.getItem("capturePatient");
      const parsed = raw ? JSON.parse(raw) : null;
      storageName = parsed?.patientName || "";
      storageId = parsed?.patientId || "";
    } catch {
      storageName = "";
      storageId = "";
    }

    const finalName = stateName || storageName;
    const finalId = patientIdParam || stateId || storageId || "";

    if (finalId && !resolvedPatientId) setResolvedPatientId(finalId);

    // only auto-fill if empty (doctor can still edit)
    if (finalName && !patientName.trim()) {
      setPatientName(finalName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state, patientIdParam]);

  const canProceed = useMemo(() => {
    return (
      patientName.trim() &&
      vitals.height.trim() &&
      vitals.weight.trim() &&
      vitals.bp.trim()
    );
  }, [patientName, vitals]);

  const proceed = () => {
    if (!canProceed) {
      alert("Please fill Patient Name, Height, Weight, and Blood Pressure.");
      return;
    }

    const payload = {
      patientId: resolvedPatientId || "",
      patientName: patientName.trim(),
      vitals: {
        height: vitals.height.trim(),
        weight: vitals.weight.trim(),
        bp: vitals.bp.trim(),
        temp: vitals.temp.trim(),
        pulse: vitals.pulse.trim(),
      },
      capturedAt: new Date().toISOString(),
    };

    sessionStorage.setItem("consultationDraft", JSON.stringify(payload));

    // ✅ FIXED: go to doctor module consultation page
    navigate(`${DOCTOR_BASE}/consultation`, { state: payload });
  };

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: PAGE_BG,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      }}
    >
      <main className="mx-auto max-w-[1100px] px-6 py-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black tracking-tight">
              CAPTURE VITALS
            </h1>
            <p className="text-sm text-black/55 mt-1">
              Type to capture patient vitals
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-9 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm inline-flex items-center gap-2"
          >
            <FiArrowLeft />
            BACK
          </button>
        </div>

        {/* Patient box */}
        <div className="mt-6 border-2 border-black bg-white rounded-md p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Patient ID</Label>
              <Field
                value={resolvedPatientId || ""}
                readOnly
                placeholder="Patient ID"
                leftIcon={<FiHash />}
              />
            </div>

            <div>
              <Label>Patient Name *</Label>
              <Field
                value={patientName}
                onChange={setPatientName}
                placeholder="Enter patient name"
                leftIcon={<FiUser />}
              />
              <div className="text-[11px] text-black/50 mt-1">
                Auto-filled from Patients page
              </div>
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className="mt-6 border-2 border-[#00B8DB] bg-white rounded-md overflow-hidden">
          <div className="p-5 border-b border-black/10 flex items-center gap-3">
            <div className="h-12 w-12 border-2 border-black rounded-md bg-[#00B8DB] flex items-center justify-center">
              <FiActivity className="text-black text-xl" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-black uppercase">
                Vital Signs
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Height *</Label>
                <Field
                  value={vitals.height}
                  onChange={(v) => setVitals((p) => ({ ...p, height: v }))}
                  placeholder="e.g., 175 cm"
                />
              </div>

              <div>
                <Label>Weight *</Label>
                <Field
                  value={vitals.weight}
                  onChange={(v) => setVitals((p) => ({ ...p, weight: v }))}
                  placeholder="e.g., 70 kg"
                />
              </div>

              <div>
                <Label>Blood Pressure *</Label>
                <Field
                  value={vitals.bp}
                  onChange={(v) => setVitals((p) => ({ ...p, bp: v }))}
                  placeholder="e.g., 120/80"
                />
              </div>

              <div>
                <Label>Temperature</Label>
                <Field
                  value={vitals.temp}
                  onChange={(v) => setVitals((p) => ({ ...p, temp: v }))}
                  placeholder="e.g., 98.6°F"
                />
              </div>

              <div>
                <Label>Pulse Rate</Label>
                <Field
                  value={vitals.pulse}
                  onChange={(v) => setVitals((p) => ({ ...p, pulse: v }))}
                  placeholder="e.g., 72 bpm"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={proceed}
                disabled={!canProceed}
                className={[
                  "h-10 px-6 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center gap-2",
                  canProceed
                    ? "bg-[#00B8DB] text-black"
                    : "bg-[#BFEFFF] text-black/50 cursor-not-allowed",
                ].join(" ")}
              >
                <FiCheck />
                PROCEED TO CONSULTATION
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
