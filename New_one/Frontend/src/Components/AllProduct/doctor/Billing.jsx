

// import React, { useMemo, useState } from "react";
// import {
//   FiDownload,
//   FiTrendingUp,
//   FiClock,
//   FiAlertCircle,
//   FiSearch,
//   FiChevronDown,
//   FiEdit2,
//   FiCheck,
//   FiX,
//   FiCheckCircle,
//   FiXCircle,
// } from "react-icons/fi";
// import { FaRupeeSign } from "react-icons/fa";

// const PAGE_BG = "#FEFCE8";

// const formatINR = (n) => Number(n || 0).toLocaleString("en-IN");
// const sanitizeFee = (v) => {
//   const num = Number(String(v ?? "").replace(/[^\d]/g, ""));
//   if (!Number.isFinite(num)) return 0;
//   return Math.max(0, Math.min(999999, Math.floor(num)));
// };

// const StatCard = ({ title, value, subtitle, border, iconBg, icon: Icon }) => {
//   return (
//     <div className={`border-2 ${border} bg-white rounded-md p-5 flex items-start justify-between`}>
//       <div>
//         <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
//           {title}
//         </div>
//         <div className="mt-2 text-4xl font-extrabold text-black leading-none">
//           {value}
//         </div>
//         <div className="mt-2 text-sm text-black/60">{subtitle}</div>
//       </div>

//       <div className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${iconBg}`}>
//         <Icon className="text-black text-xl" />
//       </div>
//     </div>
//   );
// };

// const InfoBanner = () => {
//   return (
//     <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4 flex items-start gap-3">
//       <div className="h-10 w-10 bg-[#00B8DB] border-2 border-black rounded-md flex items-center justify-center">
//         <FaRupeeSign className="text-black text-lg" />
//       </div>
//       <div className="flex-1">
//         <div className="font-extrabold text-sm text-black uppercase">
//           Default Consultation Fee
//         </div>
//         <div className="text-xs text-black/60 mt-1">
//           All new consultations default to ₹200. You can edit individual fees as needed.
//         </div>
//       </div>
//     </div>
//   );
// };

// const FilterBar = ({ query, setQuery, status, setStatus }) => {
//   return (
//     <div className="mt-5 flex flex-col md:flex-row gap-3">
//       <div className="flex-1 border-2 border-black bg-white rounded-md px-3 h-11 flex items-center gap-2">
//         <FiSearch className="text-black/60" />
//         <input
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search by patient name or ID..."
//           className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
//         />
//       </div>

//       <button
//         type="button"
//         className="md:w-[180px] border-2 border-black bg-white rounded-md h-11 px-3 flex items-center justify-between text-sm font-semibold text-black"
//         onClick={() => {
//           const order = ["all", "pending", "paid", "overdue"];
//           const idx = order.indexOf(status);
//           setStatus(order[(idx + 1) % order.length]);
//         }}
//         title="Click to cycle filter"
//       >
//         <span className="flex items-center gap-2">
//           <span className="inline-flex items-center justify-center w-6 h-6 rounded border border-black/15">
//             <FiChevronDown className="text-black/70" />
//           </span>
//           {status === "all"
//             ? "All Payments"
//             : status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//         <span className="text-[11px] text-black/50">tap</span>
//       </button>
//     </div>
//   );
// };

// const Badge = ({ kind }) => {
//   const label =
//     kind === "pending" ? "PENDING" : kind === "paid" ? "PAID" : "OVERDUE";

//   const cls =
//     kind === "pending"
//       ? "border-[#F0B100] bg-[#FFF4D1]"
//       : kind === "paid"
//       ? "border-[#00C950] bg-[#EFFFF5]"
//       : "border-[#FF2D2D] bg-[#FFE3E3]";

//   return (
//     <span
//       className={`inline-flex items-center h-5 px-2 text-[10px] font-extrabold rounded-sm border-2 ${cls} text-black`}
//     >
//       {label}
//     </span>
//   );
// };

// const RecordCard = ({
//   r,
//   isEditing,
//   draftFee,
//   onStartEdit,
//   onDraftChange,
//   onSaveEdit,
//   onCancelEdit,
//   onMarkPaid,
// }) => {
//   const border =
//     r.status === "paid"
//       ? "border-[#00C950]"
//       : r.status === "overdue"
//       ? "border-[#FF2D2D]"
//       : "border-[#F0B100]";

//   const subtleBg = r.status === "pending" ? "bg-[#FFFBEE]" : "bg-white";

//   return (
//     <div className={`border-2 ${border} ${subtleBg} rounded-md`}>
//       <div className="p-4 flex flex-col md:flex-row md:items-start gap-4">
//         {/* Left */}
//         <div className="flex-1">
//           <div className="flex items-center gap-3">
//             <div className="font-extrabold text-black">{r.name}</div>
//             <Badge kind={r.status} />
//           </div>

//           <div className="mt-2 text-xs text-black/60 flex flex-wrap items-center gap-x-3 gap-y-1">
//             <span className="inline-flex items-center gap-1">
//               <span className="font-extrabold text-black/70">ID:</span> {r.id}
//             </span>
//             <span className="inline-flex items-center gap-1">
//               <span className="font-extrabold text-black/70">📅</span> {r.date}
//             </span>
//             <span className="inline-flex items-center gap-1">
//               <span className="font-extrabold text-black/70">🕒</span> {r.time}
//             </span>
//           </div>

//           {r.status !== "pending" ? (
//             <div
//               className={`mt-3 border-2 rounded-sm p-3 text-xs ${
//                 r.status === "paid"
//                   ? "border-[#00C950] bg-[#F2FFF8]"
//                   : "border-[#FF2D2D] bg-[#FFF5F5]"
//               }`}
//             >
//               <div className="font-extrabold text-black flex items-center gap-2">
//                 {r.status === "paid" ? (
//                   <>
//                     <FiCheckCircle className="text-[#00C950]" /> PAYMENT RECEIVED
//                   </>
//                 ) : (
//                   <>
//                     <FiXCircle className="text-[#FF2D2D]" /> PAYMENT OVERDUE
//                   </>
//                 )}
//               </div>
//               <div className="text-black/70 mt-1">{r.note}</div>
//             </div>
//           ) : null}
//         </div>

//         {/* Right */}
//         <div className="md:w-[260px] md:text-right">
//           <div className="text-[10px] font-extrabold text-black/60 uppercase">
//             Consultation Fee
//           </div>

//           {/* Fee row */}
//           <div className="mt-1 flex items-center md:justify-end gap-2">
//             {!isEditing ? (
//               <>
//                 <div className="text-2xl font-extrabold text-black">
//                   ₹{formatINR(r.fee)}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => onStartEdit(r.id, r.fee)}
//                   className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
//                   title="Edit fee"
//                 >
//                   <FiEdit2 className="text-black" />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="inline-flex items-center gap-2 justify-end">
//                   <span className="text-2xl font-extrabold text-black">₹</span>
//                   <input
//                     autoFocus
//                     inputMode="numeric"
//                     value={draftFee}
//                     onChange={(e) => onDraftChange(r.id, e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") onSaveEdit(r.id);
//                       if (e.key === "Escape") onCancelEdit(r.id);
//                     }}
//                     className="w-[130px] text-right text-2xl font-extrabold text-black bg-transparent outline-none border-b-2 border-black"
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => onSaveEdit(r.id)}
//                   className="h-9 w-9 border-2 border-black rounded-sm bg-[#00C950] flex items-center justify-center"
//                   title="Save"
//                 >
//                   <FiCheck className="text-black" />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => onCancelEdit(r.id)}
//                   className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
//                   title="Cancel"
//                 >
//                   <FiX className="text-black" />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Action button */}
//           <div className="mt-3 flex md:justify-end gap-2">
//             {r.status === "paid" ? (
//               <button
//                 type="button"
//                 className="h-9 px-4 border-2 border-black rounded-sm bg-[#00C950] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2"
//                 disabled
//               >
//                 <FiCheckCircle className="text-black" />
//                 PAID
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => onMarkPaid(r.id)}
//                 className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2"
//               >
//                 <FiCheckCircle className="text-black" />
//                 MARK AS PAID
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SummaryCard = ({ title, value, subtitle, border, icon }) => {
//   return (
//     <div className={`border-2 ${border} bg-white rounded-md p-4`}>
//       <div className="flex items-start justify-between">
//         <div>
//           <div className="text-[10px] font-extrabold text-black/60 uppercase">{title}</div>
//           <div className="mt-2 text-2xl font-extrabold text-black">₹{formatINR(value)}</div>
//           <div className="text-xs text-black/60 mt-1">{subtitle}</div>
//         </div>
//         <div className="text-xl">{icon}</div>
//       </div>
//     </div>
//   );
// };

// const Billing = () => {
//   const [records, setRecords] = useState([
//     { id: "P001", name: "Rajesh Kumar", date: "2/2/2026", time: "03:52 PM", status: "pending", fee: 200, note: "" },
//     { id: "P002", name: "Priya Sharma", date: "2/3/2026", time: "03:52 PM", status: "paid", fee: 200, note: "Paid on 2/4/2026 via UPI" },
//     { id: "P003", name: "Amit Patel", date: "2/4/2026", time: "03:52 PM", status: "pending", fee: 250, note: "" },
//     { id: "P004", name: "Sneha Reddy", date: "1/28/2026", time: "03:52 PM", status: "overdue", fee: 200, note: "Due since 1/28/2026" },
//     { id: "P005", name: "Vikram Singh", date: "1/31/2026", time: "03:52 PM", status: "paid", fee: 200, note: "Paid on 2/1/2026 via Cash" },
//   ]);

//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("all"); // all | pending | paid | overdue

//   // editing state: which record is being edited + draft fee
//   const [editing, setEditing] = useState({}); // { [id]: { active: true, draft: "123" } }

//   const totals = useMemo(() => {
//     const paid = records.filter((r) => r.status === "paid").reduce((s, r) => s + (r.fee || 0), 0);
//     const pending = records.filter((r) => r.status === "pending").reduce((s, r) => s + (r.fee || 0), 0);
//     const overdue = records.filter((r) => r.status === "overdue").reduce((s, r) => s + (r.fee || 0), 0);
//     const total = paid + pending + overdue;

//     return {
//       total,
//       paid,
//       pending,
//       overdue,
//       paidCount: records.filter((r) => r.status === "paid").length,
//       pendingCount: records.filter((r) => r.status === "pending").length,
//       overdueCount: records.filter((r) => r.status === "overdue").length,
//       defaultFee: 200,
//     };
//   }, [records]);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return records.filter((r) => {
//       const matchesQ = !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
//       const matchesStatus = status === "all" ? true : r.status === status;
//       return matchesQ && matchesStatus;
//     });
//   }, [records, query, status]);

//   const markAsPaid = (id) => {
//     setRecords((prev) =>
//       prev.map((r) =>
//         r.id === id
//           ? { ...r, status: "paid", note: r.note || "Paid today via UPI" }
//           : r
//       )
//     );
//   };

//   const startEdit = (id, currentFee) => {
//     setEditing((prev) => ({
//       ...prev,
//       [id]: { active: true, draft: String(currentFee ?? "") },
//     }));
//   };

//   const draftChange = (id, next) => {
//     setEditing((prev) => ({
//       ...prev,
//       [id]: { active: true, draft: String(next).replace(/[^\d]/g, "") },
//     }));
//   };

//   const cancelEdit = (id) => {
//     setEditing((prev) => {
//       const copy = { ...prev };
//       delete copy[id];
//       return copy;
//     });
//   };

//   const saveEdit = (id) => {
//     const draft = editing[id]?.draft ?? "";
//     const fee = sanitizeFee(draft);

//     setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, fee } : r)));
//     cancelEdit(id);
//   };

//   const exportCsv = () => {
//     const header = ["ID", "Name", "Date", "Time", "Status", "Fee", "Note"];
//     const rows = records.map((r) => [r.id, r.name, r.date, r.time, r.status, r.fee, r.note || ""]);

//     const csv = [header, ...rows]
//       .map((row) =>
//         row
//           .map((cell) => {
//             const s = String(cell ?? "");
//             return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
//           })
//           .join(",")
//       )
//       .join("\n");

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "billing-records.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const stats = [
//     {
//       title: "TOTAL REVENUE",
//       value: `₹${formatINR(totals.paid)}`,
//       subtitle: (
//         <span className="inline-flex items-center gap-2">
//           <span className="text-[#00C950] font-extrabold">▲</span>
//           <span className="text-black/60">{totals.paidCount} payments received</span>
//         </span>
//       ),
//       border: "border-[#00B8DB]",
//       iconBg: "bg-[#00B8DB]",
//       icon: FiTrendingUp,
//     },
//     {
//       title: "PENDING PAYMENTS",
//       value: `₹${formatINR(totals.pending)}`,
//       subtitle: <span className="text-black/60">{totals.pendingCount} pending</span>,
//       border: "border-[#F0B100]",
//       iconBg: "bg-[#F0B100]",
//       icon: FiClock,
//     },
//     {
//       title: "OVERDUE",
//       value: `₹${formatINR(totals.overdue)}`,
//       subtitle: <span className="text-black/60">{totals.overdueCount} overdue</span>,
//       border: "border-black",
//       iconBg: "bg-white",
//       icon: FiAlertCircle,
//     },
//     {
//       title: "DEFAULT FEE",
//       value: `₹${formatINR(totals.defaultFee)}`,
//       subtitle: <span className="text-black/60">Per consultation</span>,
//       border: "border-[#00B8DB]",
//       iconBg: "bg-[#00B8DB]",
//       icon: FaRupeeSign,
//     },
//   ];

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
//             <h1 className="text-3xl font-extrabold text-black tracking-tight">
//               BILLING &amp; REVENUE
//             </h1>
//             <p className="text-sm text-black/55 mt-1">
//               Track consultation fees and payments
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={exportCsv}
//             className="h-9 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm inline-flex items-center gap-2"
//           >
//             <FiDownload />
//             EXPORT
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {stats.map((s) => (
//             <StatCard
//               key={s.title}
//               title={s.title}
//               value={s.value}
//               subtitle={s.subtitle}
//               border={s.border}
//               iconBg={s.iconBg}
//               icon={s.icon}
//             />
//           ))}
//         </div>

//         {/* Info banner */}
//         <div className="mt-5">
//           <InfoBanner />
//         </div>

//         {/* Search + Filter */}
//         <FilterBar query={query} setQuery={setQuery} status={status} setStatus={setStatus} />

//         {/* Payment Records header */}
//         <div className="mt-6 flex items-center justify-between gap-3">
//           <div className="text-lg font-extrabold text-black">PAYMENT RECORDS</div>
//           <div className="text-[11px] font-extrabold text-black/60 border border-black/15 bg-white rounded px-2 py-1">
//             {filtered.length} Records
//           </div>
//         </div>

//         {/* Records list */}
//         <div className="mt-3 space-y-4">
//           {filtered.map((r) => (
//             <RecordCard
//               key={r.id}
//               r={r}
//               isEditing={!!editing[r.id]?.active}
//               draftFee={editing[r.id]?.draft ?? ""}
//               onStartEdit={startEdit}
//               onDraftChange={draftChange}
//               onSaveEdit={saveEdit}
//               onCancelEdit={cancelEdit}
//               onMarkPaid={markAsPaid}
//             />
//           ))}

//           {filtered.length === 0 ? (
//             <div className="border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
//               No records match your search/filter.
//             </div>
//           ) : null}
//         </div>

//         {/* Payment Summary */}
//         <div className="mt-8 border-2 border-black bg-white rounded-md p-4">
//           <div className="font-extrabold text-sm text-black uppercase">
//             Payment Summary
//           </div>

//           <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
//             <SummaryCard
//               title="PAID"
//               value={totals.paid}
//               subtitle={`${totals.paidCount} transactions`}
//               border="border-[#00C950]"
//               icon={<FiCheckCircle className="text-[#00C950]" />}
//             />
//             <SummaryCard
//               title="PENDING"
//               value={totals.pending}
//               subtitle={`${totals.pendingCount} transactions`}
//               border="border-[#F0B100]"
//               icon={<FiClock className="text-[#F0B100]" />}
//             />
//             <SummaryCard
//               title="OVERDUE"
//               value={totals.overdue}
//               subtitle={`${totals.overdueCount} transactions`}
//               border="border-[#FF2D2D]"
//               icon={<FiAlertCircle className="text-[#FF2D2D]" />}
//             />
//           </div>

//           <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
//             <div className="text-sm font-extrabold text-black uppercase">
//               Total Expected
//             </div>
//             <div className="text-xl font-extrabold text-black">
//               ₹{formatINR(totals.total)}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
// export default Billing;

import React, { useMemo, useState } from "react";
import {
  FiDownload,
  FiTrendingUp,
  FiClock,
  FiAlertCircle,
  FiSearch,
  FiChevronDown,
  FiEdit2,
  FiCheck,
  FiX,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const PAGE_BG = "#FEFCE8";

const formatINR = (n) => Number(n || 0).toLocaleString("en-IN");
const sanitizeFee = (v) => {
  const num = Number(String(v ?? "").replace(/[^\d]/g, ""));
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(999999, Math.floor(num)));
};

const PAYMENT_METHODS = ["Cash", "UPI", "Card", "Net Banking", "Paytm", "PhonePe"];

/* ---------- UI ---------- */

const StatCard = ({ title, value, subtitle, border, iconBg, icon: Icon }) => {
  return (
    <div className={`border-2 ${border} bg-white rounded-md p-5 flex items-start justify-between`}>
      <div>
        <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
          {title}
        </div>
        <div className="mt-2 text-4xl font-extrabold text-black leading-none">
          {value}
        </div>
        <div className="mt-2 text-sm text-black/60">{subtitle}</div>
      </div>

      <div className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${iconBg}`}>
        <Icon className="text-black text-xl" />
      </div>
    </div>
  );
};

const InfoBanner = () => {
  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4 flex items-start gap-3">
      <div className="h-10 w-10 bg-[#00B8DB] border-2 border-black rounded-md flex items-center justify-center">
        <FaRupeeSign className="text-black text-lg" />
      </div>
      <div className="flex-1">
        <div className="font-extrabold text-sm text-black uppercase">
          Default Consultation Fee
        </div>
        <div className="text-xs text-black/60 mt-1">
          All new consultations default to ₹200. You can edit individual fees as needed.
        </div>
      </div>
    </div>
  );
};

const FilterBar = ({ query, setQuery, status, setStatus }) => {
  return (
    <div className="mt-5 flex flex-col md:flex-row gap-3">
      <div className="flex-1 border-2 border-black bg-white rounded-md px-3 h-11 flex items-center gap-2">
        <FiSearch className="text-black/60" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by patient name or ID..."
          className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
        />
      </div>

      <button
        type="button"
        className="md:w-[180px] border-2 border-black bg-white rounded-md h-11 px-3 flex items-center justify-between text-sm font-semibold text-black"
        onClick={() => {
          const order = ["all", "pending", "paid", "overdue"];
          const idx = order.indexOf(status);
          setStatus(order[(idx + 1) % order.length]);
        }}
        title="Click to cycle filter"
      >
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded border border-black/15">
            <FiChevronDown className="text-black/70" />
          </span>
          {status === "all"
            ? "All Payments"
            : status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
       
      </button>
    </div>
  );
};

const Badge = ({ kind }) => {
  const label = kind === "pending" ? "PENDING" : kind === "paid" ? "PAID" : "OVERDUE";

  const cls =
    kind === "pending"
      ? "border-[#F0B100] bg-[#FFF4D1]"
      : kind === "paid"
      ? "border-[#00C950] bg-[#EFFFF5]"
      : "border-[#FF2D2D] bg-[#FFE3E3]";

  return (
    <span className={`inline-flex items-center h-5 px-2 text-[10px] font-extrabold rounded-sm border-2 ${cls} text-black`}>
      {label}
    </span>
  );
};

const SummaryCard = ({ title, value, subtitle, border, icon }) => {
  return (
    <div className={`border-2 ${border} bg-white rounded-md p-4`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-extrabold text-black/60 uppercase">{title}</div>
          <div className="mt-2 text-2xl font-extrabold text-black">₹{formatINR(value)}</div>
          <div className="text-xs text-black/60 mt-1">{subtitle}</div>
        </div>
        <div className="text-xl">{icon}</div>
      </div>
    </div>
  );
};

const Modal = ({ open, title, children, onClose, widthClass = "max-w-[520px]" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/35 flex items-center justify-center p-4">
      <div className={`w-full ${widthClass} bg-white border-2 border-black rounded-md overflow-hidden`}>
        <div className="p-4 border-b border-black/10 flex items-center justify-between">
          <div className="font-extrabold text-sm uppercase text-black">{title}</div>
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

const RecordCard = ({
  r,
  isEditing,
  draftFee,
  onStartEdit,
  onDraftChange,
  onSaveEdit,
  onCancelEdit,
  onOpenMarkPaid,
}) => {
  const border =
    r.status === "paid"
      ? "border-[#00C950]"
      : r.status === "overdue"
      ? "border-[#FF2D2D]"
      : "border-[#F0B100]";

  const subtleBg = r.status === "pending" ? "bg-[#FFFBEE]" : "bg-white";
  const canEditFee = r.status !== "paid"; // ✅ after paid cannot edit

  return (
    <div className={`border-2 ${border} ${subtleBg} rounded-md`}>
      <div className="p-4 flex flex-col md:flex-row md:items-start gap-4">
        {/* Left */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="font-extrabold text-black">{r.name}</div>
            <Badge kind={r.status} />
          </div>

          <div className="mt-2 text-xs text-black/60 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <span className="font-extrabold text-black/70">ID:</span> {r.id}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="font-extrabold text-black/70">📅</span> {r.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="font-extrabold text-black/70">🕒</span> {r.time}
            </span>
          </div>

          {r.status !== "pending" ? (
            <div
              className={`mt-3 border-2 rounded-sm p-3 text-xs ${
                r.status === "paid"
                  ? "border-[#00C950] bg-[#F2FFF8]"
                  : "border-[#FF2D2D] bg-[#FFF5F5]"
              }`}
            >
              <div className="font-extrabold text-black flex items-center gap-2">
                {r.status === "paid" ? (
                  <>
                    <FiCheckCircle className="text-[#00C950]" /> PAYMENT RECEIVED
                  </>
                ) : (
                  <>
                    <FiXCircle className="text-[#FF2D2D]" /> PAYMENT OVERDUE
                  </>
                )}
              </div>
              <div className="text-black/70 mt-1">{r.note}</div>
            </div>
          ) : null}
        </div>

        {/* Right */}
        <div className="md:w-[260px] md:text-right">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Consultation Fee
          </div>

          {/* Fee row */}
          <div className="mt-1 flex items-center md:justify-end gap-2">
            {!isEditing ? (
              <>
                <div className="text-2xl font-extrabold text-black">
                  ₹{formatINR(r.fee)}
                </div>

                <button
                  type="button"
                  onClick={() => canEditFee && onStartEdit(r.id, r.fee)}
                  disabled={!canEditFee}
                  className={[
                    "h-9 w-9 border-2 border-black rounded-sm flex items-center justify-center",
                    canEditFee ? "bg-white" : "bg-black/5 opacity-50 cursor-not-allowed",
                  ].join(" ")}
                  title={canEditFee ? "Edit fee" : "Fee locked (Paid)"}
                >
                  <FiEdit2 className="text-black" />
                </button>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 justify-end">
                  <span className="text-2xl font-extrabold text-black">₹</span>
                  <input
                    autoFocus
                    inputMode="numeric"
                    value={draftFee}
                    onChange={(e) => onDraftChange(r.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSaveEdit(r.id);
                      if (e.key === "Escape") onCancelEdit(r.id);
                    }}
                    className="w-[130px] text-right text-2xl font-extrabold text-black bg-transparent outline-none border-b-2 border-black"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => onSaveEdit(r.id)}
                  className="h-9 w-9 border-2 border-black rounded-sm bg-[#00C950] flex items-center justify-center"
                  title="Save"
                >
                  <FiCheck className="text-black" />
                </button>

                <button
                  type="button"
                  onClick={() => onCancelEdit(r.id)}
                  className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
                  title="Cancel"
                >
                  <FiX className="text-black" />
                </button>
              </>
            )}
          </div>

          {/* Action button */}
          <div className="mt-3 flex md:justify-end gap-2">
            {r.status === "paid" ? (
              <button
                type="button"
                className="h-9 px-4 border-2 border-black rounded-sm bg-[#00C950] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2"
                disabled
              >
                <FiCheckCircle className="text-black" />
                PAID
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenMarkPaid(r)}
                className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2"
              >
                <FiCheckCircle className="text-black" />
                MARK AS PAID
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Page ---------- */

const Billing = () => {
  const [records, setRecords] = useState([
    { id: "P001", name: "Rajesh Kumar", date: "2/2/2026", time: "03:52 PM", status: "pending", fee: 200, note: "" },
    { id: "P002", name: "Priya Sharma", date: "2/3/2026", time: "03:52 PM", status: "paid", fee: 200, note: "Paid on 2/4/2026 via UPI" },
    { id: "P003", name: "Amit Patel", date: "2/4/2026", time: "03:52 PM", status: "pending", fee: 250, note: "" },
    { id: "P004", name: "Sneha Reddy", date: "1/28/2026", time: "03:52 PM", status: "overdue", fee: 200, note: "Due since 1/28/2026" },
    { id: "P005", name: "Vikram Singh", date: "1/31/2026", time: "03:52 PM", status: "paid", fee: 200, note: "Paid on 2/1/2026 via Cash" },
  ]);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all"); // all | pending | paid | overdue

  // editing state: which record is being edited + draft fee
  const [editing, setEditing] = useState({}); // { [id]: { active: true, draft: "123" } }

  // ✅ Mark Paid modal state
  const [markPaidOpen, setMarkPaidOpen] = useState(false);
  const [markPaidTarget, setMarkPaidTarget] = useState(null);
  const [markPaidMethod, setMarkPaidMethod] = useState("");

  const totals = useMemo(() => {
    const paid = records.filter((r) => r.status === "paid").reduce((s, r) => s + (r.fee || 0), 0);
    const pending = records.filter((r) => r.status === "pending").reduce((s, r) => s + (r.fee || 0), 0);
    const overdue = records.filter((r) => r.status === "overdue").reduce((s, r) => s + (r.fee || 0), 0);
    const total = paid + pending + overdue;

    return {
      total,
      paid,
      pending,
      overdue,
      paidCount: records.filter((r) => r.status === "paid").length,
      pendingCount: records.filter((r) => r.status === "pending").length,
      overdueCount: records.filter((r) => r.status === "overdue").length,
      defaultFee: 200,
    };
  }, [records]);

  // ✅ patient summary (counts)
  const patientSummary = useMemo(() => {
    const paid = records.filter((r) => r.status === "paid").length;
    const pending = records.filter((r) => r.status === "pending").length;
    const overdue = records.filter((r) => r.status === "overdue").length;
    const uniquePatients = new Set(records.map((r) => r.id)).size;
    return { uniquePatients, paid, pending, overdue };
  }, [records]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((r) => {
      const matchesQ = !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
      const matchesStatus = status === "all" ? true : r.status === status;
      return matchesQ && matchesStatus;
    });
  }, [records, query, status]);

  // ✅ open modal (instead of instant paid)
  const openMarkPaid = (record) => {
    setMarkPaidTarget(record);
    setMarkPaidMethod("");
    setMarkPaidOpen(true);
  };

  // ✅ confirm paid with method; also lock editing by status=paid (handled in RecordCard)
  const confirmMarkPaid = () => {
    if (!markPaidTarget) return;
    if (!markPaidMethod) {
      alert("Please select a payment method.");
      return;
    }

    const method = markPaidMethod;
    const today = new Date().toLocaleDateString();

    setRecords((prev) =>
      prev.map((r) =>
        r.id === markPaidTarget.id
          ? {
              ...r,
              status: "paid",
              note: `Paid on ${today} via ${method}`,
            }
          : r
      )
    );

    // close modal
    setMarkPaidOpen(false);
    setMarkPaidTarget(null);
    setMarkPaidMethod("");
  };

  const startEdit = (id, currentFee) => {
    const rec = records.find((x) => x.id === id);
    if (rec?.status === "paid") return;

    setEditing((prev) => ({
      ...prev,
      [id]: { active: true, draft: String(currentFee ?? "") },
    }));
  };

  const draftChange = (id, next) => {
    setEditing((prev) => ({
      ...prev,
      [id]: { active: true, draft: String(next).replace(/[^\d]/g, "") },
    }));
  };

  const cancelEdit = (id) => {
    setEditing((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const saveEdit = (id) => {
    const rec = records.find((x) => x.id === id);
    if (rec?.status === "paid") {
      cancelEdit(id);
      return;
    }

    const draft = editing[id]?.draft ?? "";
    const fee = sanitizeFee(draft);

    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, fee } : r)));
    cancelEdit(id);
  };

  const exportCsv = () => {
    const header = ["ID", "Name", "Date", "Time", "Status", "Fee", "Note"];
    const rows = records.map((r) => [r.id, r.name, r.date, r.time, r.status, r.fee, r.note || ""]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((cell) => {
            const s = String(cell ?? "");
            return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "billing-records.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      title: "TOTAL REVENUE",
      value: `₹${formatINR(totals.paid)}`,
      subtitle: (
        <span className="inline-flex items-center gap-2">
          <span className="text-[#00C950] font-extrabold">▲</span>
          <span className="text-black/60">{totals.paidCount} payments received</span>
        </span>
      ),
      border: "border-[#00B8DB]",
      iconBg: "bg-[#00B8DB]",
      icon: FiTrendingUp,
    },
    {
      title: "PENDING PAYMENTS",
      value: `₹${formatINR(totals.pending)}`,
      subtitle: <span className="text-black/60">{totals.pendingCount} pending</span>,
      border: "border-[#F0B100]",
      iconBg: "bg-[#F0B100]",
      icon: FiClock,
    },
    {
      title: "OVERDUE",
      value: `₹${formatINR(totals.overdue)}`,
      subtitle: <span className="text-black/60">{totals.overdueCount} overdue</span>,
      border: "border-black",
      iconBg: "bg-white",
      icon: FiAlertCircle,
    },
    {
      title: "DEFAULT FEE",
      value: `₹${formatINR(totals.defaultFee)}`,
      subtitle: <span className="text-black/60">Per consultation</span>,
      border: "border-[#00B8DB]",
      iconBg: "bg-[#00B8DB]",
      icon: FaRupeeSign,
    },
  ];

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
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black tracking-tight">
              BILLING &amp; REVENUE
            </h1>
            <p className="text-sm text-black/55 mt-1">
              Track consultation fees and payments
            </p>
          </div>

          <button
            type="button"
            onClick={exportCsv}
            className="h-9 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm inline-flex items-center gap-2"
          >
            <FiDownload />
            EXPORT
          </button>
        </div>

        {/* 4 main cards */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard
              key={s.title}
              title={s.title}
              value={s.value}
              subtitle={s.subtitle}
              border={s.border}
              iconBg={s.iconBg}
              icon={s.icon}
            />
          ))}
        </div>

        {/* ✅ Patient Summary directly below the 4 cards */}
        <div className="mt-5 border-2 border-black bg-white rounded-md p-4">
          <div className="font-extrabold text-sm text-black uppercase">Patient Summary</div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="border-2 border-[#00B8DB] bg-[#EAFBFF] rounded-md p-4">
              <div className="text-[10px] font-extrabold text-black/60 uppercase">Total Patients</div>
              <div className="mt-2 text-2xl font-extrabold text-black">{patientSummary.uniquePatients}</div>
              <div className="text-xs text-black/60 mt-1">Unique patient IDs</div>
            </div>

            <div className="border-2 border-[#00C950] bg-[#EFFFF5] rounded-md p-4">
              <div className="text-[10px] font-extrabold text-black/60 uppercase">Paid</div>
              <div className="mt-2 text-2xl font-extrabold text-black">{patientSummary.paid}</div>
              <div className="text-xs text-black/60 mt-1">Patients completed payment</div>
            </div>

            <div className="border-2 border-[#F0B100] bg-[#FFFBEE] rounded-md p-4">
              <div className="text-[10px] font-extrabold text-black/60 uppercase">Pending</div>
              <div className="mt-2 text-2xl font-extrabold text-black">{patientSummary.pending}</div>
              <div className="text-xs text-black/60 mt-1">Awaiting payment</div>
            </div>

            <div className="border-2 border-[#FF2D2D] bg-[#FFF5F5] rounded-md p-4">
              <div className="text-[10px] font-extrabold text-black/60 uppercase">Overdue</div>
              <div className="mt-2 text-2xl font-extrabold text-black">{patientSummary.overdue}</div>
              <div className="text-xs text-black/60 mt-1">Needs attention</div>
            </div>
          </div>
        </div>

        {/* Info banner */}
        <div className="mt-5">
          <InfoBanner />
        </div>

        {/* Search + Filter */}
        <FilterBar query={query} setQuery={setQuery} status={status} setStatus={setStatus} />

        {/* Payment Records header */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="text-lg font-extrabold text-black">PAYMENT RECORDS</div>
          <div className="text-[11px] font-extrabold text-black/60 border border-black/15 bg-white rounded px-2 py-1">
            {filtered.length} Records
          </div>
        </div>

        {/* Records list */}
        <div className="mt-3 space-y-4">
          {filtered.map((r) => (
            <RecordCard
              key={r.id}
              r={r}
              isEditing={!!editing[r.id]?.active}
              draftFee={editing[r.id]?.draft ?? ""}
              onStartEdit={startEdit}
              onDraftChange={draftChange}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
              onOpenMarkPaid={openMarkPaid}
            />
          ))}

          {filtered.length === 0 ? (
            <div className="border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
              No records match your search/filter.
            </div>
          ) : null}
        </div>

        {/* Payment Summary */}
        <div className="mt-8 border-2 border-black bg-white rounded-md p-4">
          <div className="font-extrabold text-sm text-black uppercase">
            Payment Summary
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <SummaryCard
              title="PAID"
              value={totals.paid}
              subtitle={`${totals.paidCount} transactions`}
              border="border-[#00C950]"
              icon={<FiCheckCircle className="text-[#00C950]" />}
            />
            <SummaryCard
              title="PENDING"
              value={totals.pending}
              subtitle={`${totals.pendingCount} transactions`}
              border="border-[#F0B100]"
              icon={<FiClock className="text-[#F0B100]" />}
            />
            <SummaryCard
              title="OVERDUE"
              value={totals.overdue}
              subtitle={`${totals.overdueCount} transactions`}
              border="border-[#FF2D2D]"
              icon={<FiAlertCircle className="text-[#FF2D2D]" />}
            />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
            <div className="text-sm font-extrabold text-black uppercase">
              Total Expected
            </div>
            <div className="text-xl font-extrabold text-black">
              ₹{formatINR(totals.total)}
            </div>
          </div>
        </div>
      </main>

      {/* ✅ Mark Paid Modal */}
      <Modal
        open={markPaidOpen}
        title="MARK PAYMENT AS PAID"
        onClose={() => {
          setMarkPaidOpen(false);
          setMarkPaidTarget(null);
          setMarkPaidMethod("");
        }}
      >
        <div className="space-y-4">
          <div className="text-sm text-black/70">
            {markPaidTarget ? (
              <>
                Confirm payment for{" "}
                <span className="font-extrabold text-black">{markPaidTarget.name}</span>{" "}
                <span className="text-black/50">(ID: {markPaidTarget.id})</span>
              </>
            ) : null}
          </div>

          <div className="border-2 border-black rounded-sm bg-white p-3">
            <div className="text-[10px] font-extrabold text-black/60 uppercase mb-2">
              Payment Method
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.map((m) => {
                const active = markPaidMethod === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMarkPaidMethod(m)}
                    className={[
                      "h-10 px-3 border-2 border-black rounded-sm font-extrabold text-xs inline-flex items-center justify-center",
                      active ? "bg-[#00B8DB] text-black" : "bg-white text-black",
                    ].join(" ")}
                  >
                    {m.toUpperCase()}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 text-xs text-black/55">
              Selected:{" "}
              <span className="font-extrabold text-black">
                {markPaidMethod || "—"}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setMarkPaidOpen(false);
                setMarkPaidTarget(null);
                setMarkPaidMethod("");
              }}
              className="h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase bg-white"
            >
              CANCEL
            </button>

            <button
              type="button"
              onClick={confirmMarkPaid}
              className="h-9 px-4 border-2 border-black rounded-sm bg-[#00C950] font-extrabold text-xs uppercase inline-flex items-center gap-2"
            >
              <FiCheckCircle className="text-black" />
              CONFIRM PAID
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Billing;
