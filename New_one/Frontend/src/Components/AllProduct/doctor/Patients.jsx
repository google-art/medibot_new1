

// import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiUser,
//   FiFileText,
//   FiPlus,
//   FiSearch,
//   FiPhone,
//   FiMail,
//   FiMapPin,
//   FiActivity,
//   FiClock,
//   FiX,
// } from "react-icons/fi";

// const PAGE_BG = "#FEFCE8";

// const StatCard = ({ title, value, subtitle, border, iconBg, icon }) => {
//   return (
//     <div className={`border-2 ${border} bg-white rounded-md p-5 flex items-start justify-between`}>
//       <div>
//         <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">{title}</div>
//         <div className="mt-2 text-4xl font-extrabold text-black leading-none">{value}</div>
//         <div className="mt-2 text-sm text-black/60">{subtitle}</div>
//       </div>

//       <div className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${iconBg}`}>
//         <div className="text-black text-xl">{icon}</div>
//       </div>
//     </div>
//   );
// };

// const PrimaryButton = ({ children, onClick, className = "", leftIcon }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={[
//       "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
//       "bg-[#00B8DB] text-black hover:brightness-95 active:brightness-90",
//       className,
//     ].join(" ")}
//   >
//     {leftIcon}
//     {children}
//   </button>
// );

// const SecondaryButton = ({ children, onClick, className = "", leftIcon }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={[
//       "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
//       "bg-[#F0B100] text-black hover:brightness-95 active:brightness-90",
//       className,
//     ].join(" ")}
//   >
//     {leftIcon}
//     {children}
//   </button>
// );

// const IconSquare = ({ children, bg = "bg-[#00B8DB]" }) => (
//   <div className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${bg}`}>
//     <div className="text-black text-xl">{children}</div>
//   </div>
// );

// const Modal = ({ open, title, children, onClose, widthClass = "max-w-[820px]" }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 bg-black/35 flex items-center justify-center p-4">
//       <div className={`w-full ${widthClass} bg-white border-2 border-black rounded-md overflow-hidden`}>
//         <div className="p-4 border-b border-black/10 flex items-center justify-between">
//           <div className="font-extrabold text-sm uppercase text-black">{title}</div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
//             aria-label="Close"
//           >
//             <FiX className="text-black" />
//           </button>
//         </div>
//         <div className="p-4">{children}</div>
//       </div>
//     </div>
//   );
// };

// const Tag = ({ children, bg = "bg-white" }) => (
//   <span className={`inline-flex items-center h-6 px-2 border-2 border-black rounded-sm text-[11px] font-extrabold ${bg}`}>
//     {children}
//   </span>
// );

// const PatientCard = ({ p, onNewConsult, onOpenReport }) => {
//   return (
//     <div className="border-2 border-[#00B8DB] bg-white rounded-md p-5">
//       <div className="flex items-start gap-4">
//         <IconSquare bg="bg-[#00B8DB]">
//           <FiUser />
//         </IconSquare>

//         <div className="flex-1">
//           <div className="flex flex-wrap items-center gap-2">
//             <div className="font-extrabold text-lg text-black">{p.name}</div>
//             <Tag bg="bg-white">ID: {p.id}</Tag>
//             <Tag bg="bg-[#EAFBFF]">{p.age} years</Tag>
//           </div>

//           <div className="mt-3 text-sm text-black/70 space-y-1">
//             <div className="flex items-center gap-2">
//               <FiPhone className="text-black/60" /> <span>{p.phone}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FiMail className="text-black/60" /> <span>{p.email}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FiMapPin className="text-black/60" /> <span>{p.location}</span>
//             </div>
//           </div>

//           <div className="mt-4 border-t border-black/10 pt-3 text-xs text-black/55">
//             Last visit: <span className="text-black/70 font-semibold">{p.lastVisit}</span> •{" "}
//             <span className="text-black/70 font-semibold">{p.totalVisits} total visits</span>
//           </div>

//           <div className="mt-4 flex flex-wrap items-center gap-3">
//             <button
//               type="button"
//               onClick={() => onNewConsult(p)}
//               className="h-9 min-w-[260px] flex-1 md:flex-none px-4 border-2 border-black rounded-sm bg-[#00B8DB] text-black font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2"
//             >
//               <FiActivity />
//               NEW CONSULTATION
//             </button>

//             <button
//               type="button"
//               onClick={() => onOpenReport(p)}
//               className="h-9 w-10 border-2 border-black rounded-sm bg-[#F0B100] flex items-center justify-center"
//               title="View report history"
//             >
//               <FiFileText className="text-black" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// function HistoryItem({ item }) {
//   return (
//     <div className="border-2 border-[#00B8DB] rounded-md bg-white p-4">
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <div className="font-extrabold text-sm text-black">{item.title}</div>
//           <div className="text-xs text-black/60 mt-1">
//             {item.date} • {item.time} • {item.reportId}
//           </div>
//         </div>
//         <div className="text-[11px] font-extrabold border-2 border-black rounded-sm px-2 py-1 bg-[#EAFBFF]">
//           {item.type.toUpperCase()}
//         </div>
//       </div>

//       <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
//         <MiniVital label="HEIGHT" value={item.vitals.height} />
//         <MiniVital label="WEIGHT" value={item.vitals.weight} />
//         <MiniVital label="BP" value={item.vitals.bp} />
//       </div>

//       <div className="mt-4 space-y-3">
//         <ReportBlock title="CHIEF COMPLAINT" value={item.chiefComplaint} />
//         <ReportBlock title="DIAGNOSIS" value={item.diagnosis} />
//         <ReportBlock title="PRESCRIPTION" value={item.prescription} />
//       </div>
//     </div>
//   );
// }

// function MiniVital({ label, value }) {
//   return (
//     <div className="border-2 border-[#00B8DB] bg-[#EAFBFF] rounded-sm p-3">
//       <div className="text-[10px] font-extrabold text-black/60 uppercase">{label}</div>
//       <div className="mt-1 text-sm font-extrabold text-black">{value}</div>
//     </div>
//   );
// }

// function ReportBlock({ title, value }) {
//   return (
//     <div>
//       <div className="text-[11px] font-extrabold text-black/60 uppercase">{title}</div>
//       <div className="mt-1 text-sm text-black">{value}</div>
//     </div>
//   );
// }

// export default function Patients() {
//   const navigate = useNavigate();

//   const [query, setQuery] = useState("");
//   const [showReports, setShowReports] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const [patients] = useState([
//     {
//       id: "P001",
//       name: "Rajesh Kumar",
//       age: 45,
//       phone: "+91 98765 43210",
//       email: "rajesh@example.com",
//       location: "Mumbai, Maharashtra",
//       lastVisit: "1/28/2026",
//       totalVisits: 5,
//     },
//     {
//       id: "P002",
//       name: "Priya Sharma",
//       age: 32,
//       phone: "+91 98765 43211",
//       email: "priya@example.com",
//       location: "Delhi, India",
//       lastVisit: "2/1/2026",
//       totalVisits: 3,
//     },
//     {
//       id: "P003",
//       name: "Amit Patel",
//       age: 28,
//       phone: "+91 98765 43212",
//       email: "amit@example.com",
//       location: "Bangalore, Karnataka",
//       lastVisit: "2/3/2026",
//       totalVisits: 2,
//     },
//   ]);

//   const historyByPatientId = useMemo(
//     () => ({
//       P001: [
//         {
//           reportId: "R001",
//           type: "report",
//           title: "Medical Report",
//           date: "1/28/2026",
//           time: "03:52 PM",
//           vitals: { height: "175 cm", weight: "75 kg", bp: "120/80" },
//           chiefComplaint: "Chest pain and shortness of breath",
//           diagnosis: "Mild hypertension, advised lifestyle modifications",
//           prescription: "Tab. Amlodipine 5mg OD, Tab. Atorvastatin 10mg OD",
//         },
//       ],
//       P002: [],
//       P003: [],
//     }),
//     []
//   );

//   const stats = useMemo(() => {
//     const totalPatients = patients.length;
//     const todaysConsults = 8;
//     const reportsGenerated = Object.values(historyByPatientId).reduce((sum, arr) => sum + arr.length, 0);
//     const avgWait = 12;
//     return { totalPatients, todaysConsults, reportsGenerated, avgWait };
//   }, [patients, historyByPatientId]);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return patients;
//     return patients.filter(
//       (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.phone.toLowerCase().includes(q)
//     );
//   }, [patients, query]);

//   const openHistory = (p) => {
//     setSelectedPatient(p);
//     setShowReports(true);
//   };

//   // ✅ correct routes for your app:
//   const goNewPatient = () => navigate("/capture");

//   // ✅ sends patientName to CaptureVitals for auto-fill
//   const goNewConsultation = (p) => {
//     const payload = { patientId: p.id, patientName: p.name };

//     // fallback for refresh
//     sessionStorage.setItem("capturePatient", JSON.stringify(payload));

//     // navigate state (no reload)
//     navigate(`/capture/${p.id}`, { state: payload });
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
//             <h1 className="text-3xl font-extrabold text-black tracking-tight">PATIENTS</h1>
//             <p className="text-sm text-black/55 mt-1">Manage patient records and consultations</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <SecondaryButton onClick={() => openHistory(patients[0])} leftIcon={<FiFileText />}>
//               REPORTS
//             </SecondaryButton>
//             <PrimaryButton onClick={goNewPatient} leftIcon={<FiPlus />}>
//               NEW PATIENT
//             </PrimaryButton>
//           </div>
//         </div>

//         <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatCard title="TOTAL PATIENTS" value={stats.totalPatients} subtitle="Active patients" border="border-[#00B8DB]" iconBg="bg-[#00B8DB]" icon={<FiUser />} />
//           <StatCard title="TODAY'S CONSULTATIONS" value={stats.todaysConsults} subtitle={<span className="inline-flex items-center gap-2"><span className="text-[#00C950] font-extrabold">▲</span><span className="text-black/60">+2 from yesterday</span></span>} border="border-black" iconBg="bg-white" icon={<FiActivity />} />
//           <StatCard title="REPORTS GENERATED" value={stats.reportsGenerated} subtitle="Total records" border="border-[#F0B100]" iconBg="bg-[#F0B100]" icon={<FiFileText />} />
//           <StatCard title="AVG. WAIT TIME" value={`${stats.avgWait} min`} subtitle={<span className="inline-flex items-center gap-2"><span className="text-[#FF2D2D] font-extrabold">▼</span><span className="text-black/60">Below target</span></span>} border="border-[#00B8DB]" iconBg="bg-[#00B8DB]" icon={<FiClock />} />
//         </div>

//         <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
//           <div className="text-lg font-extrabold text-black">PATIENT LIST</div>

//           <div className="w-full md:w-[420px] border-2 border-black bg-white rounded-md px-3 h-11 flex items-center gap-2">
//             <FiSearch className="text-black/60" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search by name / ID / phone..."
//               className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
//             />
//           </div>
//         </div>

//         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//           {filtered.map((p) => (
//             <PatientCard key={p.id} p={p} onNewConsult={goNewConsultation} onOpenReport={openHistory} />
//           ))}
//         </div>

//         {filtered.length === 0 ? (
//           <div className="mt-4 border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
//             No patients match your search.
//           </div>
//         ) : null}
//       </main>

//       <Modal open={showReports} title="MEDICAL REPORTS" onClose={() => setShowReports(false)} widthClass="max-w-[980px]">
//         {selectedPatient ? (
//           <>
//             <div className="text-sm text-black/70 mb-3">
//               <span className="font-extrabold text-black">Reports for</span>{" "}
//               <span className="font-extrabold">{selectedPatient.name}</span>{" "}
//               <span className="text-black/50">({selectedPatient.id})</span>
//             </div>

//             <div className="space-y-4">
//               {(historyByPatientId[selectedPatient.id] || []).length === 0 ? (
//                 <div className="border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
//                   No report history found for this patient.
//                 </div>
//               ) : (
//                 (historyByPatientId[selectedPatient.id] || []).map((item) => <HistoryItem key={item.reportId} item={item} />)
//               )}
//             </div>
//           </>
//         ) : (
//           <div className="text-sm text-black/60">Select a patient to view history.</div>
//         )}

//         <div className="mt-4 flex justify-end">
//           <button
//             type="button"
//             onClick={() => setShowReports(false)}
//             className="h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs uppercase"
//           >
//             BACK
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiFileText,
  FiPlus,
  FiSearch,
  FiPhone,
  FiMail,
  FiMapPin,
  FiActivity,
  FiClock,
  FiX,
} from "react-icons/fi";

const PAGE_BG = "#FEFCE8";

// ✅ base path for doctor module (MUST match your Sidebar/MainDoctor mount)
const DOCTOR_BASE = "/maindoctor";

const StatCard = ({ title, value, subtitle, border, iconBg, icon }) => {
  return (
    <div
      className={`border-2 ${border} bg-white rounded-md p-5 flex items-start justify-between`}
    >
      <div>
        <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
          {title}
        </div>
        <div className="mt-2 text-4xl font-extrabold text-black leading-none">
          {value}
        </div>
        <div className="mt-2 text-sm text-black/60">{subtitle}</div>
      </div>

      <div
        className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${iconBg}`}
      >
        <div className="text-black text-xl">{icon}</div>
      </div>
    </div>
  );
};

const PrimaryButton = ({ children, onClick, className = "", leftIcon }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
      "bg-[#00B8DB] text-black hover:brightness-95 active:brightness-90",
      className,
    ].join(" ")}
  >
    {leftIcon}
    {children}
  </button>
);

const SecondaryButton = ({ children, onClick, className = "", leftIcon }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
      "bg-[#F0B100] text-black hover:brightness-95 active:brightness-90",
      className,
    ].join(" ")}
  >
    {leftIcon}
    {children}
  </button>
);

const IconSquare = ({ children, bg = "bg-[#00B8DB]" }) => (
  <div
    className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${bg}`}
  >
    <div className="text-black text-xl">{children}</div>
  </div>
);

const Modal = ({
  open,
  title,
  children,
  onClose,
  widthClass = "max-w-[820px]",
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/35 flex items-center justify-center p-4">
      <div
        className={`w-full ${widthClass} bg-white border-2 border-black rounded-md overflow-hidden`}
      >
        <div className="p-4 border-b border-black/10 flex items-center justify-between">
          <div className="font-extrabold text-sm uppercase text-black">
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
            aria-label="Close"
          >
            <FiX className="text-black" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const Tag = ({ children, bg = "bg-white" }) => (
  <span
    className={`inline-flex items-center h-6 px-2 border-2 border-black rounded-sm text-[11px] font-extrabold ${bg}`}
  >
    {children}
  </span>
);

const PatientCard = ({ p, onNewConsult, onOpenReport }) => {
  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-5">
      <div className="flex items-start gap-4">
        <IconSquare bg="bg-[#00B8DB]">
          <FiUser />
        </IconSquare>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-extrabold text-lg text-black">{p.name}</div>
            <Tag bg="bg-white">ID: {p.id}</Tag>
            <Tag bg="bg-[#EAFBFF]">{p.age} years</Tag>
          </div>

          <div className="mt-3 text-sm text-black/70 space-y-1">
            <div className="flex items-center gap-2">
              <FiPhone className="text-black/60" /> <span>{p.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="text-black/60" /> <span>{p.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-black/60" /> <span>{p.location}</span>
            </div>
          </div>

          <div className="mt-4 border-t border-black/10 pt-3 text-xs text-black/55">
            Last visit:{" "}
            <span className="text-black/70 font-semibold">{p.lastVisit}</span> •{" "}
            <span className="text-black/70 font-semibold">
              {p.totalVisits} total visits
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNewConsult(p)}
              className="h-9 min-w-[260px] flex-1 md:flex-none px-4 border-2 border-black rounded-sm bg-[#00B8DB] text-black font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2"
            >
              <FiActivity />
              NEW CONSULTATION
            </button>

            <button
              type="button"
              onClick={() => onOpenReport(p)}
              className="h-9 w-10 border-2 border-black rounded-sm bg-[#F0B100] flex items-center justify-center"
              title="View report history"
            >
              <FiFileText className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function HistoryItem({ item }) {
  return (
    <div className="border-2 border-[#00B8DB] rounded-md bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-extrabold text-sm text-black">{item.title}</div>
          <div className="text-xs text-black/60 mt-1">
            {item.date} • {item.time} • {item.reportId}
          </div>
        </div>
        <div className="text-[11px] font-extrabold border-2 border-black rounded-sm px-2 py-1 bg-[#EAFBFF]">
          {item.type.toUpperCase()}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <MiniVital label="HEIGHT" value={item.vitals.height} />
        <MiniVital label="WEIGHT" value={item.vitals.weight} />
        <MiniVital label="BP" value={item.vitals.bp} />
      </div>

      <div className="mt-4 space-y-3">
        <ReportBlock title="CHIEF COMPLAINT" value={item.chiefComplaint} />
        <ReportBlock title="DIAGNOSIS" value={item.diagnosis} />
        <ReportBlock title="PRESCRIPTION" value={item.prescription} />
      </div>
    </div>
  );
}

function MiniVital({ label, value }) {
  return (
    <div className="border-2 border-[#00B8DB] bg-[#EAFBFF] rounded-sm p-3">
      <div className="text-[10px] font-extrabold text-black/60 uppercase">
        {label}
      </div>
      <div className="mt-1 text-sm font-extrabold text-black">{value}</div>
    </div>
  );
}

function ReportBlock({ title, value }) {
  return (
    <div>
      <div className="text-[11px] font-extrabold text-black/60 uppercase">
        {title}
      </div>
      <div className="mt-1 text-sm text-black">{value}</div>
    </div>
  );
}

export default function Patients() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showReports, setShowReports] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patients] = useState([
    {
      id: "P001",
      name: "Rajesh Kumar",
      age: 45,
      phone: "+91 98765 43210",
      email: "rajesh@example.com",
      location: "Mumbai, Maharashtra",
      lastVisit: "1/28/2026",
      totalVisits: 5,
    },
    {
      id: "P002",
      name: "Priya Sharma",
      age: 32,
      phone: "+91 98765 43211",
      email: "priya@example.com",
      location: "Delhi, India",
      lastVisit: "2/1/2026",
      totalVisits: 3,
    },
    {
      id: "P003",
      name: "Amit Patel",
      age: 28,
      phone: "+91 98765 43212",
      email: "amit@example.com",
      location: "Bangalore, Karnataka",
      lastVisit: "2/3/2026",
      totalVisits: 2,
    },
  ]);

  const historyByPatientId = useMemo(
    () => ({
      P001: [
        {
          reportId: "R001",
          type: "report",
          title: "Medical Report",
          date: "1/28/2026",
          time: "03:52 PM",
          vitals: { height: "175 cm", weight: "75 kg", bp: "120/80" },
          chiefComplaint: "Chest pain and shortness of breath",
          diagnosis: "Mild hypertension, advised lifestyle modifications",
          prescription: "Tab. Amlodipine 5mg OD, Tab. Atorvastatin 10mg OD",
        },
      ],
      P002: [],
      P003: [],
    }),
    []
  );

  const stats = useMemo(() => {
    const totalPatients = patients.length;
    const todaysConsults = 8;
    const reportsGenerated = Object.values(historyByPatientId).reduce(
      (sum, arr) => sum + arr.length,
      0
    );
    const avgWait = 12;
    return { totalPatients, todaysConsults, reportsGenerated, avgWait };
  }, [patients, historyByPatientId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q)
    );
  }, [patients, query]);

  const openHistory = (p) => {
    setSelectedPatient(p);
    setShowReports(true);
  };

  // ✅ FIXED: go to doctor module capture
  const goNewPatient = () => navigate(`${DOCTOR_BASE}/capture`);

  // ✅ FIXED: go to doctor module capture/:patientId
  const goNewConsultation = (p) => {
    const payload = { patientId: p.id, patientName: p.name };
    sessionStorage.setItem("capturePatient", JSON.stringify(payload));
    navigate(`${DOCTOR_BASE}/capture/${p.id}`, { state: payload });
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
              PATIENTS
            </h1>
            <p className="text-sm text-black/55 mt-1">
              Manage patient records and consultations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SecondaryButton
              onClick={() => openHistory(patients[0])}
              leftIcon={<FiFileText />}
            >
              REPORTS
            </SecondaryButton>
            <PrimaryButton onClick={goNewPatient} leftIcon={<FiPlus />}>
              NEW PATIENT
            </PrimaryButton>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="TOTAL PATIENTS"
            value={stats.totalPatients}
            subtitle="Active patients"
            border="border-[#00B8DB]"
            iconBg="bg-[#00B8DB]"
            icon={<FiUser />}
          />
          <StatCard
            title="TODAY'S CONSULTATIONS"
            value={stats.todaysConsults}
            subtitle={
              <span className="inline-flex items-center gap-2">
                <span className="text-[#00C950] font-extrabold">▲</span>
                <span className="text-black/60">+2 from yesterday</span>
              </span>
            }
            border="border-black"
            iconBg="bg-white"
            icon={<FiActivity />}
          />
          <StatCard
            title="REPORTS GENERATED"
            value={stats.reportsGenerated}
            subtitle="Total records"
            border="border-[#F0B100]"
            iconBg="bg-[#F0B100]"
            icon={<FiFileText />}
          />
          <StatCard
            title="AVG. WAIT TIME"
            value={`${stats.avgWait} min`}
            subtitle={
              <span className="inline-flex items-center gap-2">
                <span className="text-[#FF2D2D] font-extrabold">▼</span>
                <span className="text-black/60">Below target</span>
              </span>
            }
            border="border-[#00B8DB]"
            iconBg="bg-[#00B8DB]"
            icon={<FiClock />}
          />
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
          <div className="text-lg font-extrabold text-black">PATIENT LIST</div>

          <div className="w-full md:w-[420px] border-2 border-black bg-white rounded-md px-3 h-11 flex items-center gap-2">
            <FiSearch className="text-black/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name / ID / phone..."
              className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <PatientCard
              key={p.id}
              p={p}
              onNewConsult={goNewConsultation}
              onOpenReport={openHistory}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-4 border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
            No patients match your search.
          </div>
        ) : null}
      </main>

      <Modal
        open={showReports}
        title="MEDICAL REPORTS"
        onClose={() => setShowReports(false)}
        widthClass="max-w-[980px]"
      >
        {selectedPatient ? (
          <>
            <div className="text-sm text-black/70 mb-3">
              <span className="font-extrabold text-black">Reports for</span>{" "}
              <span className="font-extrabold">{selectedPatient.name}</span>{" "}
              <span className="text-black/50">({selectedPatient.id})</span>
            </div>

            <div className="space-y-4">
              {(historyByPatientId[selectedPatient.id] || []).length === 0 ? (
                <div className="border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
                  No report history found for this patient.
                </div>
              ) : (
                (historyByPatientId[selectedPatient.id] || []).map((item) => (
                  <HistoryItem key={item.reportId} item={item} />
                ))
              )}
            </div>
          </>
        ) : (
          <div className="text-sm text-black/60">
            Select a patient to view history.
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setShowReports(false)}
            className="h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs uppercase"
          >
            BACK
          </button>
        </div>
      </Modal>
    </div>
  );
}
