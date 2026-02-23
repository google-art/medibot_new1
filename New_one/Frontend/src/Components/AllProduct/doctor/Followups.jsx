

// import React, { useMemo, useState } from "react";
// import {
//   FiCalendar,
//   FiClock,
//   FiAlertCircle,
//   FiCheckCircle,
//   FiSend,
//   FiRefreshCw,
//   FiX,
//   FiMessageSquare,
// } from "react-icons/fi";

// const PAGE_BG = "#FEFCE8";

// /* ---------- style maps ---------- */

// const STATUS_STYLES = {
//   UPCOMING: {
//     border: "border-[#00B8DB]",
//     // in screenshot: mostly white/cool, subtle cyan tint is ok
//     cardBg: "bg-white",
//     bandBg: "bg-white",
//     chipBg: "bg-[#EAFBFF]",
//     chipBorder: "border-[#00B8DB]",
//     accent: "#00B8DB",
//   },
//   "DUE TODAY": {
//     border: "border-[#F0B100]",
//     // in screenshot: warm yellow tint
//     cardBg: "bg-[#FFF9E6]",
//     bandBg: "bg-[#FFF9E6]",
//     chipBg: "bg-[#FFF3CC]",
//     chipBorder: "border-[#F0B100]",
//     accent: "#F0B100",
//   },
//   OVERDUE: {
//     border: "border-[#FF2D2D]",
//     // in screenshot: white but strong red border; tiny soft red tint looks good
//     cardBg: "bg-white",
//     bandBg: "bg-white",
//     chipBg: "bg-[#FFE5E5]",
//     chipBorder: "border-[#FF2D2D]",
//     accent: "#FF2D2D",
//   },
// };

// /* ---------- helpers ---------- */

// const StatusChip = ({ status }) => {
//   const s = STATUS_STYLES[status] || STATUS_STYLES.UPCOMING;
//   return (
//     <span
//       className={[
//         "inline-flex items-center h-6 px-2 border-2 rounded-sm text-[11px] font-extrabold text-black",
//         s.chipBg,
//         s.chipBorder,
//       ].join(" ")}
//     >
//       {status}
//     </span>
//   );
// };

// const StatCard = ({ title, value, subtitle, border, icon }) => (
//   <div className={`border-2 ${border} bg-white rounded-md p-5 flex items-start justify-between`}>
//     <div>
//       <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
//         {title}
//       </div>
//       <div className="mt-2 text-4xl font-extrabold text-black leading-none">{value}</div>
//       <div className="mt-2 text-sm text-black/60">{subtitle}</div>
//     </div>
//     <div className="h-12 w-12 border-2 border-black rounded-md bg-white flex items-center justify-center">
//       <div className="text-black text-xl">{icon}</div>
//     </div>
//   </div>
// );

// const Modal = ({ open, title, children, onClose }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
//       <div className="w-full max-w-[620px] bg-white border-2 border-black rounded-md overflow-hidden">
//         <div className="p-4 border-b border-black/10 flex items-center justify-between">
//           <div className="font-extrabold text-sm uppercase text-black">{title}</div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
//             aria-label="Close"
//           >
//             <FiX />
//           </button>
//         </div>
//         <div className="p-4">{children}</div>
//       </div>
//     </div>
//   );
// };

// const normalizePhone = (phone) => {
//   const digits = phone.replace(/[^\d]/g, "");
//   return digits.length === 10 ? `91${digits}` : digits; // if already includes country code, keep
// };

// const formatDatePretty = (iso) => {
//   // iso: yyyy-mm-dd
//   try {
//     const d = new Date(iso);
//     if (Number.isNaN(d.getTime())) return "";
//     return d.toLocaleDateString();
//   } catch {
//     return "";
//   }
// };

// /* ---------- main component ---------- */

// export default function Followups() {
//   const [items, setItems] = useState([
//     {
//       id: "P001",
//       name: "Rajesh Kumar",
//       phone: "+91 98765 43210",
//       reason: "Hypertension – Check BP levels",
//       lastVisit: "1/22/2026",
//       dueDate: "2/8/2026",
//       status: "UPCOMING",
//       sent: true,
//       auto: true,
//     },
//     {
//       id: "P002",
//       name: "Priya Sharma",
//       phone: "+91 98765 43211",
//       reason: "Viral Fever – Follow-up check",
//       lastVisit: "1/31/2026",
//       dueDate: "2/6/2026",
//       status: "DUE TODAY",
//       sent: false,
//       auto: true,
//     },
//     {
//       id: "P004",
//       name: "Sneha Reddy",
//       phone: "+91 98765 43213",
//       reason: "Diabetes – Blood sugar monitoring",
//       lastVisit: "1/15/2026",
//       dueDate: "2/3/2026",
//       status: "OVERDUE",
//       sent: true,
//       auto: true,
//     },
//     {
//       id: "P005",
//       name: "Vikram Singh",
//       phone: "+91 98765 43214",
//       reason: "Post-surgery checkup",
//       lastVisit: "1/29/2026",
//       dueDate: "2/12/2026",
//       status: "UPCOMING",
//       sent: false,
//       auto: false,
//     },
//   ]);

//   const [rescheduleOpen, setRescheduleOpen] = useState(false);
//   const [target, setTarget] = useState(null);
//   const [newDate, setNewDate] = useState("");

//   const stats = useMemo(() => {
//     return {
//       total: items.length,
//       upcoming: items.filter((i) => i.status === "UPCOMING").length,
//       dueToday: items.filter((i) => i.status === "DUE TODAY").length,
//       overdue: items.filter((i) => i.status === "OVERDUE").length,
//     };
//   }, [items]);

//   const sendWhatsApp = (row) => {
//     const msg = `Hello ${row.name}, this is a reminder for your follow-up.\n\nReason: ${row.reason}\nFollow-up Due: ${row.dueDate}\n\nThank you.`;
//     const url = `https://wa.me/${normalizePhone(row.phone)}?text=${encodeURIComponent(msg)}`;
//     window.open(url, "_blank");

//     setItems((prev) => prev.map((i) => (i.id === row.id ? { ...i, sent: true } : i)));
//   };

//   const openReschedule = (row) => {
//     setTarget(row);
//     setNewDate(""); // reset
//     setRescheduleOpen(true);
//   };

//   const saveReschedule = () => {
//     if (!target) return;
//     if (!newDate) {
//       alert("Please select a new date.");
//       return;
//     }

//     const pretty = formatDatePretty(newDate) || target.dueDate;

//     setItems((prev) =>
//       prev.map((i) =>
//         i.id === target.id
//           ? {
//               ...i,
//               dueDate: pretty,
//               sent: false,
//               // keep status as-is; in real app you'd recompute based on date
//             }
//           : i
//       )
//     );
//     setRescheduleOpen(false);
//   };

//   return (
//     <div
//       className="min-h-screen font-sans"
//       style={{
//         backgroundColor: PAGE_BG,
//         fontFamily:
//           "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
//       }}
//     >
//       <main className="mx-auto max-w-[1100px] px-6 py-7">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-extrabold text-black">FOLLOW-UPS</h1>
//             <p className="text-sm text-black/55 mt-1">
//               AI-powered automated patient follow-up system
//             </p>
//           </div>

//           <button
//             type="button"
//             className="h-9 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm inline-flex items-center gap-2"
//             onClick={() => alert("Configure clicked (demo)")}
//           >
//             <FiRefreshCw />
//             CONFIGURE
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatCard
//             title="TOTAL FOLLOW-UPS"
//             value={stats.total}
//             subtitle="Active patients"
//             border="border-[#00B8DB]"
//             icon={<FiRefreshCw />}
//           />
//           <StatCard
//             title="UPCOMING"
//             value={stats.upcoming}
//             subtitle="Scheduled ahead"
//             border="border-[#00B8DB]"
//             icon={<FiCalendar />}
//           />
//           <StatCard
//             title="DUE TODAY"
//             value={stats.dueToday}
//             subtitle="Send reminders"
//             border="border-[#F0B100]"
//             icon={<FiClock />}
//           />
//           <StatCard
//             title="OVERDUE"
//             value={stats.overdue}
//             subtitle="Needs attention"
//             border="border-black"
//             icon={<FiAlertCircle />}
//           />
//         </div>

//         {/* AI Auto Follow-up banner */}
       

//         {/* Patient Follow-ups */}
//         <div className="mt-6">
//           <div className="font-extrabold text-sm text-black uppercase mb-3">Patient Follow-ups</div>

//           <div className="space-y-4">
//             {items.map((row) => {
//               const s = STATUS_STYLES[row.status] || STATUS_STYLES.UPCOMING;

//               return (
//                 <div
//                   key={row.id}
//                   className={[
//                     "border-2 rounded-md overflow-hidden",
//                     s.border,
//                     s.cardBg,
//                   ].join(" ")}
//                 >
//                   <div className="p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                     {/* Left */}
//                     <div className="flex-1">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <div className="font-extrabold text-black">{row.name}</div>
//                         <StatusChip status={row.status} />
//                         {row.auto ? (
//                           <span className="inline-flex items-center h-6 px-2 border-2 border-black rounded-sm text-[11px] font-extrabold text-black bg-white">
//                             AUTO
//                           </span>
//                         ) : null}
//                       </div>

//                       <div className="text-xs text-black/60 mt-1">
//                         ID: {row.id} • {row.reason}
//                       </div>
//                     </div>

//                     {/* Right buttons */}
//                     <div className="flex items-center gap-2">
//                       {row.sent ? (
//                         <span className="h-9 px-4 border-2 border-black rounded-sm bg-[#B9F6CC] font-extrabold text-xs uppercase inline-flex items-center gap-2">
//                           <FiCheckCircle /> SENT
//                         </span>
//                       ) : (
//                         <button
//                           type="button"
//                           onClick={() => sendWhatsApp(row)}
//                           className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] font-extrabold text-xs uppercase inline-flex items-center gap-2"
//                         >
//                           <FiSend /> SEND NOW
//                         </button>
//                       )}

//                       <button
//                         type="button"
//                         onClick={() => openReschedule(row)}
//                         className="h-9 px-4 border-2 border-black rounded-sm bg-[#F0B100] font-extrabold text-xs uppercase inline-flex items-center gap-2"
//                       >
//                         <FiRefreshCw /> RESCHEDULE
//                       </button>
//                     </div>
//                   </div>

//                   <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <InfoBox label="LAST VISIT" value={row.lastVisit} icon={<FiCalendar />} />
//                     <InfoBox label="FOLLOW-UP DUE" value={row.dueDate} icon={<FiClock />} />
//                   </div>

//                   {/* Status message band like screenshot */}
//                   <div className="px-4 pb-4">
//                     <div
//                       className={[
//                         "border-2 rounded-sm p-3 text-sm flex items-start gap-2",
//                         row.sent ? "border-[#00C950] bg-[#F2FFF8]" : "border-[#F0B100] bg-[#FFF9E6]",
//                       ].join(" ")}
//                     >
//                       <FiMessageSquare className="mt-1" />
//                       <div className="text-black/75">
//                         {row.sent
//                           ? "Reminder sent via WhatsApp."
//                           : "Reminder pending — will auto-send 2 days before (demo)."}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Follow-up statistics */}
//         <div className="mt-7 border-2 border-[#F0B100] bg-[#FFF9E6] rounded-md p-5">
//           <div className="font-extrabold text-sm text-black uppercase mb-4">Follow-up Statistics</div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <SmallStat
//               title="COMPLETION RATE"
//               value="87%"
//               subtitle="Patients attend follow-ups"
//               border="border-[#00B8DB]"
//               icon={<FiCheckCircle />}
//             />
//             <SmallStat
//               title="REMINDERS SENT"
//               value="142"
//               subtitle="This month"
//               border="border-black"
//               icon={<FiSend />}
//             />
//             <SmallStat
//               title="AVG. RESPONSE TIME"
//               value="24h"
//               subtitle="Patient booking time"
//               border="border-[#F0B100]"
//               icon={<FiClock />}
//             />
//           </div>
//         </div>
//       </main>

//       {/* Reschedule modal */}
//       <Modal
//         open={rescheduleOpen}
//         title="RESCHEDULE FOLLOW-UP"
//         onClose={() => setRescheduleOpen(false)}
//       >
//         <div className="space-y-4">
//           <div className="text-sm text-black/70">
//             {target ? (
//               <>
//                 Reschedule for <span className="font-extrabold text-black">{target.name}</span>{" "}
//                 <span className="text-black/50">(ID: {target.id})</span>
//               </>
//             ) : null}
//           </div>

//           <input
//             type="date"
//             value={newDate}
//             onChange={(e) => setNewDate(e.target.value)}
//             className="w-full border-2 border-black rounded-sm h-11 px-3"
//           />

//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={() => setRescheduleOpen(false)}
//               className="h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase bg-white"
//             >
//               CANCEL
//             </button>
//             <button
//               type="button"
//               onClick={saveReschedule}
//               className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] font-extrabold text-xs uppercase"
//             >
//               SAVE
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// /* ---------- sub components ---------- */

// function HowCard({ step, title, desc, badgeBg }) {
//   return (
//     <div className="border-2 border-black rounded-md bg-white p-4">
//       <div className="flex items-start gap-3">
//         <div className={`h-10 w-10 border-2 border-black rounded-md flex items-center justify-center ${badgeBg}`}>
//           <div className="font-extrabold text-black">{step}</div>
//         </div>
//         <div>
//           <div className="font-extrabold text-xs text-black uppercase">{title}</div>
//           <div className="text-xs text-black/60 mt-1 leading-relaxed">{desc}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoBox({ label, value, icon }) {
//   return (
//     <div className="border-2 border-black rounded-sm bg-white p-3 flex items-start gap-2">
//       <div className="mt-0.5 text-black/70">{icon}</div>
//       <div>
//         <div className="text-[10px] font-extrabold uppercase text-black/60">{label}</div>
//         <div className="font-extrabold text-black text-sm">{value}</div>
//       </div>
//     </div>
//   );
// }

// function SmallStat({ title, value, subtitle, border, icon }) {
//   return (
//     <div className={`border-2 ${border} bg-white rounded-md p-4`}>
//       <div className="flex items-start justify-between">
//         <div>
//           <div className="text-[10px] font-extrabold text-black/60 uppercase">{title}</div>
//           <div className="mt-2 text-2xl font-extrabold text-black">{value}</div>
//           <div className="text-xs text-black/60 mt-1">{subtitle}</div>
//         </div>
//         <div className="text-xl text-black">{icon}</div>
//       </div>
//     </div>
//   );
// }


import React, { useMemo, useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiSend,
  FiRefreshCw,
  FiX,
  FiMessageSquare,
} from "react-icons/fi";

const PAGE_BG = "#FEFCE8";

/* ---------- style maps ---------- */

const STATUS_STYLES = {
  UPCOMING: {
    border: "border-[#00B8DB]",
    cardBg: "bg-white",
    bandBg: "bg-white",
    chipBg: "bg-[#EAFBFF]",
    chipBorder: "border-[#00B8DB]",
    accent: "#00B8DB",
  },
  "DUE TODAY": {
    border: "border-[#F0B100]",
    cardBg: "bg-[#FFF9E6]",
    bandBg: "bg-[#FFF9E6]",
    chipBg: "bg-[#FFF3CC]",
    chipBorder: "border-[#F0B100]",
    accent: "#F0B100",
  },
  OVERDUE: {
    border: "border-[#FF2D2D]",
    cardBg: "bg-white",
    bandBg: "bg-white",
    chipBg: "bg-[#FFE5E5]",
    chipBorder: "border-[#FF2D2D]",
    accent: "#FF2D2D",
  },
};

/* ---------- helpers ---------- */

const StatusChip = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.UPCOMING;
  return (
    <span
      className={[
        "inline-flex items-center h-6 px-2 border-2 rounded-sm text-[11px] font-extrabold text-black",
        s.chipBg,
        s.chipBorder,
      ].join(" ")}
    >
      {status}
    </span>
  );
};

const StatCard = ({ title, value, subtitle, border, icon }) => (
  <div className={`border-2 ${border} bg-white rounded-md p-5 flex items-start justify-between`}>
    <div>
      <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
        {title}
      </div>
      <div className="mt-2 text-4xl font-extrabold text-black leading-none">{value}</div>
      <div className="mt-2 text-sm text-black/60">{subtitle}</div>
    </div>
    <div className="h-12 w-12 border-2 border-black rounded-md bg-white flex items-center justify-center">
      <div className="text-black text-xl">{icon}</div>
    </div>
  </div>
);

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-[620px] bg-white border-2 border-black rounded-md overflow-hidden">
        <div className="p-4 border-b border-black/10 flex items-center justify-between">
          <div className="font-extrabold text-sm uppercase text-black">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const normalizePhone = (phone) => {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
};

const formatDatePretty = (iso) => {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString();
  } catch {
    return "";
  }
};

/* ---------- main component ---------- */

export default function Followups() {
  const [items, setItems] = useState([
    {
      id: "P001",
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      reason: "Hypertension – Check BP levels",
      lastVisit: "1/22/2026",
      dueDate: "2/8/2026",
      status: "UPCOMING",
      sent: true,
      auto: true,
    },
    {
      id: "P002",
      name: "Priya Sharma",
      phone: "+91 98765 43211",
      reason: "Viral Fever – Follow-up check",
      lastVisit: "1/31/2026",
      dueDate: "2/6/2026",
      status: "DUE TODAY",
      sent: false,
      auto: true,
    },
    {
      id: "P004",
      name: "Sneha Reddy",
      phone: "+91 98765 43213",
      reason: "Diabetes – Blood sugar monitoring",
      lastVisit: "1/15/2026",
      dueDate: "2/3/2026",
      status: "OVERDUE",
      sent: true,
      auto: true,
    },
    {
      id: "P005",
      name: "Vikram Singh",
      phone: "+91 98765 43214",
      reason: "Post-surgery checkup",
      lastVisit: "1/29/2026",
      dueDate: "2/12/2026",
      status: "UPCOMING",
      sent: false,
      auto: false,
    },
  ]);

  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const [newDate, setNewDate] = useState("");

  const stats = useMemo(() => {
    return {
      total: items.length,
      upcoming: items.filter((i) => i.status === "UPCOMING").length,
      dueToday: items.filter((i) => i.status === "DUE TODAY").length,
      overdue: items.filter((i) => i.status === "OVERDUE").length,
    };
  }, [items]);

  const sendWhatsApp = (row) => {
    const msg = `Hello ${row.name}, this is a reminder for your follow-up.\n\nReason: ${row.reason}\nFollow-up Due: ${row.dueDate}\n\nThank you.`;
    const url = `https://wa.me/${normalizePhone(row.phone)}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    setItems((prev) => prev.map((i) => (i.id === row.id ? { ...i, sent: true } : i)));
  };

  const openReschedule = (row) => {
    setTarget(row);
    setNewDate("");
    setRescheduleOpen(true);
  };

  const saveReschedule = () => {
    if (!target) return;
    if (!newDate) {
      alert("Please select a new date.");
      return;
    }

    const pretty = formatDatePretty(newDate) || target.dueDate;

    setItems((prev) =>
      prev.map((i) =>
        i.id === target.id
          ? {
              ...i,
              dueDate: pretty,
              sent: false,
            }
          : i
      )
    );
    setRescheduleOpen(false);
  };

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: PAGE_BG,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <main className="mx-auto max-w-[1100px] px-6 py-7">
        {/* Header (✅ CONFIGURE removed) */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black">FOLLOW-UPS</h1>
            <p className="text-sm text-black/55 mt-1">
              AI-powered automated patient follow-up system
            </p>
          </div>
        </div>

        {/* Main 4 cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="TOTAL FOLLOW-UPS"
            value={stats.total}
            subtitle="Active patients"
            border="border-[#00B8DB]"
            icon={<FiRefreshCw />}
          />
          <StatCard
            title="UPCOMING"
            value={stats.upcoming}
            subtitle="Scheduled ahead"
            border="border-[#00B8DB]"
            icon={<FiCalendar />}
          />
          <StatCard
            title="DUE TODAY"
            value={stats.dueToday}
            subtitle="Send reminders"
            border="border-[#F0B100]"
            icon={<FiClock />}
          />
          <StatCard
            title="OVERDUE"
            value={stats.overdue}
            subtitle="Needs attention"
            border="border-black"
            icon={<FiAlertCircle />}
          />
        </div>

        {/* ✅ Statistics moved directly below the 4 main cards */}
        <div className="mt-6 border-2 border-[#F0B100] bg-[#FFF9E6] rounded-md p-5">
          <div className="font-extrabold text-sm text-black uppercase mb-4">Follow-up Statistics</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SmallStat
              title="COMPLETION RATE"
              value="87%"
              subtitle="Patients attend follow-ups"
              border="border-[#00B8DB]"
              icon={<FiCheckCircle />}
            />
            <SmallStat
              title="REMINDERS SENT"
              value="142"
              subtitle="This month"
              border="border-black"
              icon={<FiSend />}
            />
            <SmallStat
              title="AVG. RESPONSE TIME"
              value="24h"
              subtitle="Patient booking time"
              border="border-[#F0B100]"
              icon={<FiClock />}
            />
          </div>
        </div>

        {/* Patient Follow-ups */}
        <div className="mt-6">
          <div className="font-extrabold text-sm text-black uppercase mb-3">Patient Follow-ups</div>

          <div className="space-y-4">
            {items.map((row) => {
              const s = STATUS_STYLES[row.status] || STATUS_STYLES.UPCOMING;

              return (
                <div
                  key={row.id}
                  className={["border-2 rounded-md overflow-hidden", s.border, s.cardBg].join(" ")}
                >
                  <div className="p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="font-extrabold text-black">{row.name}</div>
                        <StatusChip status={row.status} />
                        {row.auto ? (
                          <span className="inline-flex items-center h-6 px-2 border-2 border-black rounded-sm text-[11px] font-extrabold text-black bg-white">
                            AUTO
                          </span>
                        ) : null}
                      </div>

                      <div className="text-xs text-black/60 mt-1">
                        ID: {row.id} • {row.reason}
                      </div>
                    </div>

                    {/* Right buttons */}
                    <div className="flex items-center gap-2">
                      {row.sent ? (
                        <span className="h-9 px-4 border-2 border-black rounded-sm bg-[#B9F6CC] font-extrabold text-xs uppercase inline-flex items-center gap-2">
                          <FiCheckCircle /> SENT
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => sendWhatsApp(row)}
                          className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] font-extrabold text-xs uppercase inline-flex items-center gap-2"
                        >
                          <FiSend /> SEND NOW
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => openReschedule(row)}
                        className="h-9 px-4 border-2 border-black rounded-sm bg-[#F0B100] font-extrabold text-xs uppercase inline-flex items-center gap-2"
                      >
                        <FiRefreshCw /> RESCHEDULE
                      </button>
                    </div>
                  </div>

                  <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InfoBox label="LAST VISIT" value={row.lastVisit} icon={<FiCalendar />} />
                    <InfoBox label="FOLLOW-UP DUE" value={row.dueDate} icon={<FiClock />} />
                  </div>

                  <div className="px-4 pb-4">
                    <div
                      className={[
                        "border-2 rounded-sm p-3 text-sm flex items-start gap-2",
                        row.sent ? "border-[#00C950] bg-[#F2FFF8]" : "border-[#F0B100] bg-[#FFF9E6]",
                      ].join(" ")}
                    >
                      <FiMessageSquare className="mt-1" />
                      <div className="text-black/75">
                        {row.sent
                          ? "Reminder sent via WhatsApp."
                          : "Reminder pending — will auto-send 2 days before (demo)."}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Reschedule modal */}
      <Modal
        open={rescheduleOpen}
        title="RESCHEDULE FOLLOW-UP"
        onClose={() => setRescheduleOpen(false)}
      >
        <div className="space-y-4">
          <div className="text-sm text-black/70">
            {target ? (
              <>
                Reschedule for <span className="font-extrabold text-black">{target.name}</span>{" "}
                <span className="text-black/50">(ID: {target.id})</span>
              </>
            ) : null}
          </div>

          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full border-2 border-black rounded-sm h-11 px-3"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setRescheduleOpen(false)}
              className="h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase bg-white"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={saveReschedule}
              className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] font-extrabold text-xs uppercase"
            >
              SAVE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ---------- sub components ---------- */

function InfoBox({ label, value, icon }) {
  return (
    <div className="border-2 border-black rounded-sm bg-white p-3 flex items-start gap-2">
      <div className="mt-0.5 text-black/70">{icon}</div>
      <div>
        <div className="text-[10px] font-extrabold uppercase text-black/60">{label}</div>
        <div className="font-extrabold text-black text-sm">{value}</div>
      </div>
    </div>
  );
}

function SmallStat({ title, value, subtitle, border, icon }) {
  return (
    <div className={`border-2 ${border} bg-white rounded-md p-4`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-extrabold text-black/60 uppercase">{title}</div>
          <div className="mt-2 text-2xl font-extrabold text-black">{value}</div>
          <div className="text-xs text-black/60 mt-1">{subtitle}</div>
        </div>
        <div className="text-xl text-black">{icon}</div>
      </div>
    </div>
  );
}
