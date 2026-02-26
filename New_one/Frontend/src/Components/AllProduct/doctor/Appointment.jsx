

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   FiCalendar,
//   FiClock,
//   FiBell,
//   FiCheck,
//   FiChevronLeft,
//   FiChevronRight,
//   FiPlus,
//   FiX,
//   FiEdit2,
//   FiMessageSquare,
// } from "react-icons/fi";

// const PAGE_BG = "#FEFCE8";
// const CYAN = "#00B8DB";
// const YELLOW = "#F0B100";
// const GREEN = "#00C950";
// const BLACK = "#111111";

// const pad2 = (n) => String(n).padStart(2, "0");

// const toKey = (date) => {
//   const y = date.getFullYear();
//   const m = pad2(date.getMonth() + 1);
//   const d = pad2(date.getDate());
//   return `${y}-${m}-${d}`;
// };

// const parseKey = (key) => {
//   const [y, m, d] = key.split("-").map((x) => Number(x));
//   return new Date(y, m - 1, d);
// };

// const formatLong = (date) =>
//   date.toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });

// const formatMonthTitle = (date) =>
//   date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

// const timeLabel = (t24) => {
//   if (!t24) return "";
//   const [hh, mm] = t24.split(":").map(Number);
//   const am = hh < 12;
//   const h12 = hh % 12 === 0 ? 12 : hh % 12;
//   return `${pad2(h12)}:${pad2(mm)} ${am ? "AM" : "PM"}`;
// };

// const sortTimes = (arr) =>
//   [...arr].sort((a, b) => {
//     const [ah, am] = a.split(":").map(Number);
//     const [bh, bm] = b.split(":").map(Number);
//     return ah * 60 + am - (bh * 60 + bm);
//   });

// const t24ToMinutes = (t24) => {
//   const [h, m] = t24.split(":").map(Number);
//   return h * 60 + m;
// };

// const minutesToT24 = (min) => {
//   const h = Math.floor(min / 60);
//   const m = min % 60;
//   return `${pad2(h)}:${pad2(m)}`;
// };

// // Generate discrete 30-min slots within ranges (inclusive start, exclusive end)
// const buildSlotsFromRanges = (ranges) => {
//   const out = new Set();
//   for (const r of ranges) {
//     if (!r.start || !r.end) continue;
//     const startMin = t24ToMinutes(r.start);
//     const endMin = t24ToMinutes(r.end);
//     if (endMin <= startMin) continue;

//     for (let m = startMin; m < endMin; m += 30) {
//       out.add(minutesToT24(m));
//     }
//   }
//   return sortTimes([...out]);
// };

// /* ---------- UI atoms ---------- */

// const StatCard = ({ title, value, subtitle, borderColor, iconBg, icon }) => (
//   <div
//     className="bg-white rounded-md border-2 p-5 flex items-start justify-between"
//     style={{ borderColor }}
//   >
//     <div>
//       <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
//         {title}
//       </div>
//       <div className="mt-2 text-4xl font-extrabold text-black leading-none">
//         {value}
//       </div>
//       <div className="mt-2 text-sm text-black/60">{subtitle}</div>
//     </div>

//     <div
//       className="h-12 w-12 rounded-md border-2 border-black flex items-center justify-center"
//       style={{ background: iconBg }}
//     >
//       <div className="text-black text-xl">{icon}</div>
//     </div>
//   </div>
// );

// const Badge = ({ label, tone = "gray" }) => {
//   const tones = {
//     green: "bg-[#EFFFF5] border-[#00C950]",
//     cyan: "bg-[#EAFBFF] border-[#00B8DB]",
//     yellow: "bg-[#FFF3CC] border-[#F0B100]",
//     gray: "bg-white border-black/30",
//   };
//   return (
//     <span
//       className={`inline-flex items-center h-5 px-2 border-2 rounded-sm text-[10px] font-extrabold text-black ${tones[tone]}`}
//     >
//       {label}
//     </span>
//   );
// };

// const Button = ({ children, className = "", ...props }) => (
//   <button
//     {...props}
//     className={`h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs inline-flex items-center gap-2 ${className}`}
//   >
//     {children}
//   </button>
// );

// const IconBtn = ({ children, className = "", ...props }) => (
//   <button
//     {...props}
//     className={`h-9 w-9 border-2 border-black rounded-sm bg-white inline-flex items-center justify-center ${className}`}
//   >
//     {children}
//   </button>
// );

// const SectionTitle = ({ icon, title }) => (
//   <div className="flex items-center gap-2">
//     <div className="text-black">{icon}</div>
//     <div className="text-sm font-extrabold text-black uppercase">{title}</div>
//   </div>
// );

// // iOS-like toggle (matches your reference image feel)
// const Toggle = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={() => onChange(!checked)}
//     className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 border-black transition-colors ${
//       checked ? "bg-[#00B8DB]" : "bg-[#E5E7EB]"
//     }`}
//     aria-pressed={checked}
//   >
//     <span
//       className={`inline-block h-5 w-5 transform rounded-full bg-white border-2 border-black transition-transform ${
//         checked ? "translate-x-5" : "translate-x-0.5"
//       }`}
//     />
//   </button>
// );

// function SelectTime({ value, onChange, placeholder = "Opens at", options }) {
//   return (
//     <select
//       value={value || ""}
//       onChange={(e) => onChange(e.target.value || "")}
//       className={`h-10 px-3 border-2 border-black rounded-sm bg-white text-sm font-semibold outline-none ${
//         value ? "text-black" : "text-black/40"
//       }`}
//     >
//       <option value="">{placeholder}</option>
//       {options.map((o) => (
//         <option key={o.value} value={o.value}>
//           {o.label}
//         </option>
//       ))}
//     </select>
//   );
// }

// /* ---------- main ---------- */

// export default function Appointment() {
//   // Start on February 2026 to match screenshot.
//   const [monthCursor, setMonthCursor] = useState(new Date(2026, 1, 1)); // Feb 2026
//   const [selectedKey, setSelectedKey] = useState(toKey(new Date(2026, 1, 5))); // 2026-02-05
//   const selectedDate = useMemo(() => parseKey(selectedKey), [selectedKey]);

//   const [view, setView] = useState("slots"); // "slots" | "calendar"
//   const [showManageSlots, setShowManageSlots] = useState(true);

//   // Notifications
//   const [notifications, setNotifications] = useState([
//     {
//       id: "n1",
//       text: "Rajesh Kumar - New appointment booked via chatbot",
//       time: "11:57:17 AM",
//       read: false,
//     },
//     {
//       id: "n2",
//       text: "Priya Sharma - New appointment booked via chatbot",
//       time: "11:27:17 AM",
//       read: false,
//     },
//   ]);

//   // --- Day HOURS config (Open/Closed + time ranges)
//   const [hoursByDate, setHoursByDate] = useState(() => ({
//     "2026-02-05": { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
//     "2026-02-10": { open: true, ranges: [{ start: "09:00", end: "12:00" }] },
//     "2026-02-15": { open: true, ranges: [{ start: "10:00", end: "13:00" }] },
//     "2026-02-20": { open: true, ranges: [{ start: "09:30", end: "11:00" }, { start: "14:00", end: "16:00" }] },
//     "2026-02-25": { open: true, ranges: [{ start: "09:00", end: "12:00" }, { start: "14:30", end: "17:00" }] },
//   }));

//   // Bookings (per day + time)
//   const [bookingsByDate, setBookingsByDate] = useState(() => ({
//     "2026-02-05": {
//       "09:00": {
//         patient: "Rajesh Kumar",
//         pid: "P001",
//         phone: "+91 98765 43210",
//         email: "rajesh@example.com",
//         bookedAt: "2/5/2026, 10:12:17 AM",
//         via: "CHATBOT",
//       },
//       "10:00": {
//         patient: "Priya Sharma",
//         pid: "P002",
//         phone: "+91 98765 43211",
//         email: "priya@example.com",
//         bookedAt: "2/5/2026, 11:42:17 AM",
//         via: "CHATBOT",
//       },
//       "14:00": {
//         patient: "Amit Patel",
//         pid: "P003",
//         phone: "+91 98765 43212",
//         email: "amit@example.com",
//         bookedAt: "2/5/2026, 11:12:17 AM",
//         via: "CHATBOT",
//       },
//     },
//     "2026-02-10": {
//       "09:00": {
//         patient: "Rajesh Kumar",
//         pid: "P001",
//         phone: "+91 98765 43210",
//         email: "rajesh@example.com",
//         bookedAt: "2/10/2026, 09:12:17 AM",
//         via: "CHATBOT",
//       },
//       "10:00": {
//         patient: "Priya Sharma",
//         pid: "P002",
//         phone: "+91 98765 43211",
//         email: "priya@example.com",
//         bookedAt: "2/10/2026, 09:42:17 AM",
//         via: "CHATBOT",
//       },
//     },
//   }));

//   const TIME_OPTIONS = useMemo(
//     () =>
//       [
//         "06:00",
//         "06:30",
//         "07:00",
//         "07:30",
//         "08:00",
//         "08:30",
//         "09:00",
//         "09:30",
//         "10:00",
//         "10:30",
//         "11:00",
//         "11:30",
//         "12:00",
//         "12:30",
//         "13:00",
//         "13:30",
//         "14:00",
//         "14:30",
//         "15:00",
//         "15:30",
//         "16:00",
//         "16:30",
//         "17:00",
//         "17:30",
//         "18:00",
//         "18:30",
//         "19:00",
//         "19:30",
//         "20:00",
//       ].map((t) => ({ value: t, label: timeLabel(t) })),
//     []
//   );

//   // Current day config
//   const dayHours = useMemo(() => {
//     return (
//       hoursByDate[selectedKey] || {
//         open: true,
//         ranges: [{ start: "", end: "17:00" }],
//       }
//     );
//   }, [hoursByDate, selectedKey]);

//   const daySlots = useMemo(() => {
//     if (!dayHours.open) return [];
//     return buildSlotsFromRanges(dayHours.ranges);
//   }, [dayHours]);

//   const dayBookings = useMemo(() => bookingsByDate[selectedKey] || {}, [bookingsByDate, selectedKey]);

//   const daySchedule = useMemo(
//     () =>
//       daySlots.map((t) => ({
//         time: t,
//         booking: dayBookings[t] || null,
//       })),
//     [daySlots, dayBookings]
//   );

//   const stats = useMemo(() => {
//     const todayBookings = Object.keys(dayBookings).length;
//     const available = daySlots.length - todayBookings;
//     const totalSlots = daySlots.length;
//     const chatbotPct = todayBookings === 0 ? "0%" : "100%";
//     return { todayBookings, available, totalSlots, chatbotPct };
//   }, [dayBookings, daySlots]);

//   const calendarCells = useMemo(() => {
//     const year = monthCursor.getFullYear();
//     const month = monthCursor.getMonth();
//     const first = new Date(year, month, 1);
//     const startDay = first.getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     const cells = [];
//     for (let i = 0; i < 42; i++) {
//       const dayNum = i - startDay + 1;
//       if (dayNum < 1 || dayNum > daysInMonth) {
//         cells.push({ type: "empty", key: `e-${i}` });
//       } else {
//         const d = new Date(year, month, dayNum);
//         const key = toKey(d);
//         const h = hoursByDate[key];
//         const slots = h && h.open ? buildSlotsFromRanges(h.ranges).length : 0;
//         const booked = bookingsByDate[key] ? Object.keys(bookingsByDate[key]).length : 0;
//         cells.push({ type: "day", key, dayNum, slots, booked });
//       }
//     }
//     return cells;
//   }, [monthCursor, hoursByDate, bookingsByDate]);

//   const markNotificationRead = (id) => {
//     setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
//   };

//   const navMonth = (dir) => {
//     setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
//   };

//   const isSelected = (key) => key === selectedKey;

//   /* ---------- Hours UI handlers (Google-style) ---------- */

//   const setDayOpen = (open) => {
//     setHoursByDate((prev) => {
//       const existing = prev[selectedKey] || { open: true, ranges: [{ start: "", end: "17:00" }] };
//       const next = { ...existing, open };
//       // If closing, no slots should exist; we also remove bookings that don't make sense? keep bookings as historical; schedule will show none.
//       return { ...prev, [selectedKey]: next };
//     });
//   };

//   const updateRange = (idx, patch) => {
//     setHoursByDate((prev) => {
//       const existing = prev[selectedKey] || { open: true, ranges: [{ start: "", end: "17:00" }] };
//       const ranges = existing.ranges.map((r, i) => (i === idx ? { ...r, ...patch } : r));
//       return { ...prev, [selectedKey]: { ...existing, ranges } };
//     });
//   };

//   const addHoursRange = () => {
//     setHoursByDate((prev) => {
//       const existing = prev[selectedKey] || { open: true, ranges: [{ start: "", end: "17:00" }] };
//       const ranges = [...existing.ranges, { start: "", end: "" }];
//       return { ...prev, [selectedKey]: { ...existing, ranges } };
//     });
//   };

//   const removeHoursRange = (idx) => {
//     setHoursByDate((prev) => {
//       const existing = prev[selectedKey] || { open: true, ranges: [{ start: "", end: "17:00" }] };
//       const ranges = existing.ranges.filter((_, i) => i !== idx);
//       return { ...prev, [selectedKey]: { ...existing, ranges: ranges.length ? ranges : [{ start: "", end: "" }] } };
//     });
//   };

//   // If slots shrink, remove bookings that fall outside current slots (keeps UI consistent)
//   useEffect(() => {
//     const allowed = new Set(daySlots);
//     setBookingsByDate((prev) => {
//       const day = prev[selectedKey];
//       if (!day) return prev;

//       const nextDay = {};
//       let changed = false;

//       for (const [t, b] of Object.entries(day)) {
//         if (allowed.has(t)) nextDay[t] = b;
//         else changed = true;
//       }

//       if (!changed) return prev;
//       return { ...prev, [selectedKey]: nextDay };
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedKey, daySlots.join("|")]);

//   const TopToggle = () => (
//     <div className="flex items-center gap-2">
//       <Button
//         onClick={() => setView("calendar")}
//         className={view === "calendar" ? "bg-black text-white" : "bg-white text-black"}
//       >
//         <FiCalendar />
//         CALENDAR
//       </Button>

//       <Button
//         onClick={() => setView("slots")}
//         className={view === "slots" ? "bg-[#00B8DB] text-black" : "bg-white text-black"}
//       >
//         <FiClock />
//         SLOTS
//       </Button>
//     </div>
//   );

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
//             <h1 className="text-3xl font-extrabold text-black tracking-tight">APPOINTMENTS</h1>
//             <p className="text-sm text-black/55 mt-1">Manage your appointment slots and bookings</p>
//           </div>
//           <TopToggle />
//         </div>

//         {/* Stats */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatCard
//             title="TODAY'S BOOKINGS"
//             value={stats.todayBookings}
//             subtitle="patients scheduled"
//             borderColor={CYAN}
//             iconBg={CYAN}
//             icon={<FiCalendar />}
//           />
//           <StatCard
//             title="AVAILABLE SLOTS"
//             value={stats.available < 0 ? 0 : stats.available}
//             subtitle="Open for booking"
//             borderColor={BLACK}
//             iconBg="#fff"
//             icon={<FiClock />}
//           />
//           <StatCard
//             title="TOTAL SLOTS"
//             value={stats.totalSlots}
//             subtitle="slots configured"
//             borderColor={YELLOW}
//             iconBg={YELLOW}
//             icon={<FiClock />}
//           />
//           <StatCard
//             title="CHATBOT BOOKINGS"
//             value={stats.chatbotPct}
//             subtitle="All bookings via AI chatbot"
//             borderColor={CYAN}
//             iconBg={CYAN}
//             icon={<FiMessageSquare />}
//           />
//         </div>

//         {/* Notifications */}
//         <div className="mt-6 border-2 border-black bg-white rounded-md">
//           <div className="p-4 border-b border-black/10 flex items-center justify-between">
//             <SectionTitle icon={<FiBell />} title="NEW NOTIFICATIONS" />
//           </div>

//           <div className="p-4 space-y-3">
//             {notifications.length === 0 ? (
//               <div className="text-sm text-black/60">No notifications.</div>
//             ) : (
//               notifications.map((n) => (
//                 <div
//                   key={n.id}
//                   className="border-2 border-black rounded-sm p-3 flex items-center justify-between gap-3"
//                 >
//                   <div className="min-w-0">
//                     <div className="text-sm font-semibold text-black truncate">{n.text}</div>
//                     <div className="text-[11px] text-black/50 mt-1">{n.time}</div>
//                   </div>

//                   <button
//                     onClick={() => markNotificationRead(n.id)}
//                     className={`h-9 w-10 border-2 border-black rounded-sm inline-flex items-center justify-center ${
//                       n.read ? "bg-[#B9F6CC]" : "bg-[#00B8DB]"
//                     }`}
//                     title={n.read ? "Read" : "Mark as read"}
//                   >
//                     <FiCheck className="text-black" />
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Main */}
//         {view === "slots" ? (
//           <>
//             {/* Manage slots button */}
//             <div className="mt-6">
//               <Button
//                 onClick={() => setShowManageSlots((v) => !v)}
//                 className="bg-[#00B8DB] text-black"
//               >
//                 <FiPlus />
//                 MANAGE SLOTS
//               </Button>
//             </div>

//             {/* Slot Management (UPDATED to Hours-style like your reference image) */}
//             {showManageSlots && (
//               <div className="mt-4 border-2 rounded-md bg-white p-5" style={{ borderColor: CYAN }}>
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <div className="text-sm font-extrabold text-black uppercase">HOURS</div>
//                     <div className="text-xs text-black/55 mt-1">
//                       Configure available slot hours for <b>{formatLong(selectedDate)}</b>
//                     </div>
//                   </div>

//                   <IconBtn
//                     onClick={() => setShowManageSlots(false)}
//                     className="bg-black text-white"
//                     title="Close"
//                   >
//                     <FiX />
//                   </IconBtn>
//                 </div>

//                 <div className="mt-5 border-t border-black/10 pt-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-24 text-sm font-semibold text-black">
//                       {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
//                     </div>

//                     <Toggle checked={dayHours.open} onChange={setDayOpen} />

//                     <div className="text-sm font-semibold text-black/70">
//                       {dayHours.open ? "Open" : "Closed"}
//                     </div>

//                     <div className="flex-1" />
//                   </div>

//                   {/* Ranges */}
//                   {dayHours.open && (
//                     <div className="mt-3 space-y-3">
//                       {dayHours.ranges.map((r, idx) => (
//                         <div key={idx} className="flex flex-wrap items-center gap-3">
//                           <SelectTime
//                             value={r.start}
//                             onChange={(v) => updateRange(idx, { start: v })}
//                             placeholder="Opens at"
//                             options={TIME_OPTIONS}
//                           />

//                           <div className="text-black/40 font-extrabold">—</div>

//                           <SelectTime
//                             value={r.end}
//                             onChange={(v) => updateRange(idx, { end: v })}
//                             placeholder="Closes at"
//                             options={TIME_OPTIONS}
//                           />

//                           {/* Remove range (only if multiple) */}
//                           {dayHours.ranges.length > 1 && (
//                             <IconBtn
//                               onClick={() => removeHoursRange(idx)}
//                               className="bg-white"
//                               title="Remove hours"
//                             >
//                               <FiX />
//                             </IconBtn>
//                           )}

//                           <div className="flex-1" />

//                           {/* Add hours link on the right like reference image */}
//                           {idx === dayHours.ranges.length - 1 && (
//                             <button
//                               type="button"
//                               onClick={addHoursRange}
//                               className="text-sm font-extrabold underline"
//                               style={{ color: CYAN }}
//                             >
//                               Add hours
//                             </button>
//                           )}
//                         </div>
//                       ))}

//                       {/* Helper text */}
//                       <div className="text-xs text-black/55">
//                         Slots are auto-generated every <b>30 minutes</b> inside the time range(s).
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Today's schedule */}
//             <div className="mt-7 flex items-center justify-between gap-3">
//               <div className="text-lg font-extrabold text-black uppercase">TODAY'S SCHEDULE</div>
//               <div
//                 className="h-8 px-3 border-2 border-black rounded-sm bg-[#00B8DB] text-black text-xs font-extrabold inline-flex items-center"
//               >
//                 {formatLong(selectedDate)}
//               </div>
//             </div>

//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//               {daySchedule.map(({ time, booking }) =>
//                 booking ? (
//                   <BookedCard key={time} time={timeLabel(time)} booking={booking} />
//                 ) : (
//                   <AvailableCard key={time} time={timeLabel(time)} />
//                 )
//               )}

//               {daySchedule.length === 0 ? (
//                 <div className="border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
//                   No slots configured (or day is Closed).
//                 </div>
//               ) : null}
//             </div>
//           </>
//         ) : (
//           /* CALENDAR view */
//           <div className="mt-6 border-2 rounded-md bg-white p-5" style={{ borderColor: CYAN }}>
//             <div className="flex items-start justify-between gap-3">
//               <div className="text-2xl font-extrabold text-black">{formatMonthTitle(monthCursor)}</div>

//               <div className="flex items-center gap-2">
//                 <IconBtn className="bg-black text-white" onClick={() => navMonth(-1)} title="Prev month">
//                   <FiChevronLeft />
//                 </IconBtn>
//                 <IconBtn className="bg-black text-white" onClick={() => navMonth(1)} title="Next month">
//                   <FiChevronRight />
//                 </IconBtn>
//               </div>
//             </div>

//             {/* Week header */}
//             <div className="mt-4 grid grid-cols-7 gap-2">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//                 <div
//                   key={d}
//                   className="h-8 bg-black text-white text-xs font-extrabold flex items-center justify-center rounded-sm"
//                 >
//                   {d}
//                 </div>
//               ))}
//             </div>

//             {/* Grid */}
//             <div className="mt-2 grid grid-cols-7 gap-2">
//               {calendarCells.map((cell) => {
//                 if (cell.type === "empty") {
//                   return (
//                     <div
//                       key={cell.key}
//                       className="h-[74px] border border-black/10 rounded-sm bg-white"
//                     />
//                   );
//                 }

//                 const selected = isSelected(cell.key);
//                 const hasBookings = cell.booked > 0;
//                 const hasSlots = cell.slots > 0;

//                 const bg = selected ? CYAN : hasBookings ? "#F6E7B1" : "white";
//                 const border = selected
//                   ? "2px solid black"
//                   : hasSlots
//                   ? "2px solid #CBD5E1"
//                   : "1px solid rgba(0,0,0,0.10)";

//                 return (
//                   <button
//                     key={cell.key}
//                     onClick={() => setSelectedKey(cell.key)}
//                     className="h-[74px] rounded-sm flex flex-col items-center justify-center relative"
//                     style={{ background: bg, border: border }}
//                     title={`${cell.key} • slots: ${cell.slots}, booked: ${cell.booked}`}
//                   >
//                     <div className="text-sm font-extrabold text-black">{cell.dayNum}</div>

//                     {/* dots */}
//                     <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//                       {hasBookings
//                         ? Array.from({ length: Math.min(3, cell.booked) }).map((_, i) => (
//                             <span
//                               key={i}
//                               className="h-1.5 w-1.5 rounded-full"
//                               style={{ background: selected ? "black" : CYAN }}
//                             />
//                           ))
//                         : null}
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Day details */}
//             <div className="mt-6 border-t border-black/10 pt-5 flex items-start justify-between gap-3">
//               <div className="text-sm font-extrabold text-black">{formatLong(selectedDate)}</div>
//               <Button className="bg-[#00B8DB] text-black" onClick={() => setView("slots")}>
//                 <FiPlus />
//                 ADD SLOTS
//               </Button>
//             </div>

//             {/* Mini list */}
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
//               {daySchedule.slice(0, 4).map(({ time, booking }) =>
//                 booking ? (
//                   <MiniBooked key={time} time={timeLabel(time)} patient={booking.patient} />
//                 ) : (
//                   <MiniAvailable key={time} time={timeLabel(time)} />
//                 )
//               )}

//               {daySchedule.length === 0 ? (
//                 <div className="border-2 border-black rounded-sm p-4 text-sm text-black/60">
//                   No slots for this day. Switch to <b>SLOTS</b> to add.
//                 </div>
//               ) : null}
//             </div>

//             <div className="mt-4 flex justify-center">
//               <Button className="bg-black text-white" onClick={() => setView("slots")}>
//                 VIEW ALL SLOTS
//               </Button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// /* ---------- Cards ---------- */

// function AvailableCard({ time }) {
//   return (
//     <div className="border-2 border-[#9CA3AF] bg-white rounded-md p-4">
//       <div className="flex items-start gap-3">
//         <div className="h-12 w-12 border-2 border-black rounded-md bg-[#E5E7EB] flex items-center justify-center">
//           <FiClock className="text-black text-xl" />
//         </div>

//         <div className="flex-1">
//           <div className="flex items-center gap-3">
//             <div className="text-sm font-extrabold text-black">{time}</div>
//             <Badge label="AVAILABLE" tone="gray" />
//           </div>
//           <div className="text-xs text-black/55 mt-1">Waiting for patient to book via chatbot</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function BookedCard({ time, booking }) {
//   return (
//     <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex items-start gap-3">
//           <div className="h-12 w-12 border-2 border-black rounded-md bg-[#00B8DB] flex items-center justify-center">
//             <FiClock className="text-black text-xl" />
//           </div>

//           <div>
//             <div className="flex items-center gap-3 flex-wrap">
//               <div className="text-sm font-extrabold text-black">{time}</div>
//               <Badge label="BOOKED" tone="green" />
//               <Badge label={booking.via} tone="gray" />
//             </div>

//             <div className="mt-2 text-sm font-extrabold text-black">
//               {booking.patient}{" "}
//               <span className="text-black/50 font-semibold">(ID: {booking.pid})</span>
//             </div>

//             <div className="mt-2 text-xs text-black/70 space-y-1">
//               <div>📞 {booking.phone}</div>
//               <div>✉️ {booking.email}</div>
//               <div>🕒 Booked {booking.bookedAt}</div>
//             </div>
//           </div>
//         </div>

//         <button
//           className="h-9 w-9 border-2 border-black rounded-sm bg-[#F0B100] inline-flex items-center justify-center"
//           title="Edit"
//           onClick={() => alert("Edit action (demo).")}
//         >
//           <FiEdit2 className="text-black" />
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ---------- Calendar mini rows ---------- */

// function MiniBooked({ time, patient }) {
//   return (
//     <div className="border-2 border-[#00B8DB] bg-white rounded-sm p-3 flex items-center justify-between gap-3">
//       <div className="flex items-center gap-2">
//         <div className="text-xs font-extrabold text-black">{time}</div>
//         <Badge label="BOOKED" tone="green" />
//       </div>
//       <div className="text-xs font-semibold text-black">{patient}</div>
//       <button
//         className="h-7 w-7 border-2 border-black rounded-sm bg-[#F0B100] inline-flex items-center justify-center"
//         title="Edit"
//         onClick={() => alert("Edit action (demo).")}
//       >
//         <FiEdit2 className="text-black" />
//       </button>
//     </div>
//   );
// }

// function MiniAvailable({ time }) {
//   return (
//     <div className="border-2 border-[#9CA3AF] bg-white rounded-sm p-3 flex items-center justify-between gap-3">
//       <div className="flex items-center gap-2">
//         <div className="text-xs font-extrabold text-black">{time}</div>
//         <Badge label="AVAILABLE" tone="gray" />
//       </div>
//       <div className="text-xs text-black/50">—</div>
//       <div className="h-7 w-7" />
//     </div>
//   );
// }
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   FiCalendar,
//   FiClock,
//   FiBell,
//   FiCheck,
//   FiChevronLeft,
//   FiChevronRight,
//   FiPlus,
//   FiX,
//   FiEdit2,
//   FiMessageSquare,
// } from "react-icons/fi";

// const PAGE_BG = "#FEFCE8";
// const CYAN = "#00B8DB";
// const YELLOW = "#F0B100";
// const BLACK = "#111111";

// const pad2 = (n) => String(n).padStart(2, "0");

// const toKey = (date) => {
//   const y = date.getFullYear();
//   const m = pad2(date.getMonth() + 1);
//   const d = pad2(date.getDate());
//   return `${y}-${m}-${d}`;
// };

// const parseKey = (key) => {
//   const [y, m, d] = key.split("-").map((x) => Number(x));
//   return new Date(y, m - 1, d);
// };

// const formatLong = (date) =>
//   date.toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });

// const formatMonthTitle = (date) =>
//   date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

// const timeLabel = (t24) => {
//   if (!t24) return "";
//   const [hh, mm] = t24.split(":").map(Number);
//   const am = hh < 12;
//   const h12 = hh % 12 === 0 ? 12 : hh % 12;
//   return `${pad2(h12)}:${pad2(mm)} ${am ? "AM" : "PM"}`;
// };

// const sortTimes = (arr) =>
//   [...arr].sort((a, b) => {
//     const [ah, am] = a.split(":").map(Number);
//     const [bh, bm] = b.split(":").map(Number);
//     return ah * 60 + am - (bh * 60 + bm);
//   });

// const t24ToMinutes = (t24) => {
//   const [h, m] = t24.split(":").map(Number);
//   return h * 60 + m;
// };

// const minutesToT24 = (min) => {
//   const h = Math.floor(min / 60);
//   const m = min % 60;
//   return `${pad2(h)}:${pad2(m)}`;
// };

// // Generate discrete 30-min slots within ranges (inclusive start, exclusive end)
// const buildSlotsFromRanges = (ranges) => {
//   const out = new Set();
//   for (const r of ranges) {
//     if (!r.start || !r.end) continue;
//     const startMin = t24ToMinutes(r.start);
//     const endMin = t24ToMinutes(r.end);
//     if (endMin <= startMin) continue;

//     for (let m = startMin; m < endMin; m += 30) out.add(minutesToT24(m));
//   }
//   return sortTimes([...out]);
// };

// const startOfWeekMonday = (date) => {
//   const d = new Date(date);
//   const day = d.getDay(); // 0 Sun .. 6 Sat
//   const diff = day === 0 ? -6 : 1 - day; // shift to Monday
//   d.setDate(d.getDate() + diff);
//   d.setHours(0, 0, 0, 0);
//   return d;
// };

// const addDays = (date, n) => {
//   const d = new Date(date);
//   d.setDate(d.getDate() + n);
//   return d;
// };

// /* ---------- UI atoms ---------- */

// const StatCard = ({ title, value, subtitle, borderColor, iconBg, icon }) => (
//   <div
//     className="bg-white rounded-md border-2 p-5 flex items-start justify-between"
//     style={{ borderColor }}
//   >
//     <div>
//       <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
//         {title}
//       </div>
//       <div className="mt-2 text-4xl font-extrabold text-black leading-none">
//         {value}
//       </div>
//       <div className="mt-2 text-sm text-black/60">{subtitle}</div>
//     </div>

//     <div
//       className="h-12 w-12 rounded-md border-2 border-black flex items-center justify-center"
//       style={{ background: iconBg }}
//     >
//       <div className="text-black text-xl">{icon}</div>
//     </div>
//   </div>
// );

// const Badge = ({ label, tone = "gray" }) => {
//   const tones = {
//     green: "bg-[#EFFFF5] border-[#00C950]",
//     cyan: "bg-[#EAFBFF] border-[#00B8DB]",
//     yellow: "bg-[#FFF3CC] border-[#F0B100]",
//     gray: "bg-white border-black/30",
//   };
//   return (
//     <span
//       className={`inline-flex items-center h-5 px-2 border-2 rounded-sm text-[10px] font-extrabold text-black ${tones[tone]}`}
//     >
//       {label}
//     </span>
//   );
// };

// const Button = ({ children, className = "", ...props }) => (
//   <button
//     {...props}
//     className={`h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs inline-flex items-center gap-2 ${className}`}
//   >
//     {children}
//   </button>
// );

// const IconBtn = ({ children, className = "", ...props }) => (
//   <button
//     {...props}
//     className={`h-9 w-9 border-2 border-black rounded-sm bg-white inline-flex items-center justify-center ${className}`}
//   >
//     {children}
//   </button>
// );

// const SectionTitle = ({ icon, title }) => (
//   <div className="flex items-center gap-2">
//     <div className="text-black">{icon}</div>
//     <div className="text-sm font-extrabold text-black uppercase">{title}</div>
//   </div>
// );

// // iOS-like toggle
// const Toggle = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={() => onChange(!checked)}
//     className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 border-black transition-colors ${
//       checked ? "bg-[#00B8DB]" : "bg-[#E5E7EB]"
//     }`}
//     aria-pressed={checked}
//   >
//     <span
//       className={`inline-block h-5 w-5 transform rounded-full bg-white border-2 border-black transition-transform ${
//         checked ? "translate-x-5" : "translate-x-0.5"
//       }`}
//     />
//   </button>
// );

// function SelectTime({ value, onChange, placeholder, options }) {
//   return (
//     <select
//       value={value || ""}
//       onChange={(e) => onChange(e.target.value || "")}
//       className={`h-10 px-3 border-2 border-black rounded-sm bg-white text-sm font-semibold outline-none ${
//         value ? "text-black" : "text-black/40"
//       }`}
//     >
//       <option value="">{placeholder}</option>
//       {options.map((o) => (
//         <option key={o.value} value={o.value}>
//           {o.label}
//         </option>
//       ))}
//     </select>
//   );
// }

// /* ---------- main ---------- */

// export default function Appointment() {
//   // Start on Feb 2026 to match your screenshot
//   const [monthCursor, setMonthCursor] = useState(new Date(2026, 1, 1)); // Feb 2026
//   const [selectedKey, setSelectedKey] = useState(toKey(new Date(2026, 1, 5))); // 2026-02-05
//   const selectedDate = useMemo(() => parseKey(selectedKey), [selectedKey]);

//   const [view, setView] = useState("slots"); // "slots" | "calendar"
//   const [showManageSlots, setShowManageSlots] = useState(true);

//   // Notifications
//   const [notifications, setNotifications] = useState([
//     {
//       id: "n1",
//       text: "Rajesh Kumar - New appointment booked via chatbot",
//       time: "11:57:17 AM",
//       read: false,
//     },
//     {
//       id: "n2",
//       text: "Priya Sharma - New appointment booked via chatbot",
//       time: "11:27:17 AM",
//       read: false,
//     },
//   ]);

//   // --- Per-DATE hours config (what actually drives slots for each date)
//   const [hoursByDate, setHoursByDate] = useState(() => ({
//     "2026-02-05": { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
//     "2026-02-10": { open: true, ranges: [{ start: "09:00", end: "12:00" }] },
//     "2026-02-15": { open: true, ranges: [{ start: "10:00", end: "13:00" }] },
//     "2026-02-20": {
//       open: true,
//       ranges: [
//         { start: "09:30", end: "11:00" },
//         { start: "14:00", end: "16:00" },
//       ],
//     },
//     "2026-02-25": {
//       open: true,
//       ranges: [
//         { start: "09:00", end: "12:00" },
//         { start: "14:30", end: "17:00" },
//       ],
//     },
//   }));

//   // Bookings
//   const [bookingsByDate, setBookingsByDate] = useState(() => ({
//     "2026-02-05": {
//       "09:00": {
//         patient: "Rajesh Kumar",
//         pid: "P001",
//         phone: "+91 98765 43210",
//         email: "rajesh@example.com",
//         bookedAt: "2/5/2026, 10:12:17 AM",
//         via: "CHATBOT",
//       },
//       "10:00": {
//         patient: "Priya Sharma",
//         pid: "P002",
//         phone: "+91 98765 43211",
//         email: "priya@example.com",
//         bookedAt: "2/5/2026, 11:42:17 AM",
//         via: "CHATBOT",
//       },
//       "14:00": {
//         patient: "Amit Patel",
//         pid: "P003",
//         phone: "+91 98765 43212",
//         email: "amit@example.com",
//         bookedAt: "2/5/2026, 11:12:17 AM",
//         via: "CHATBOT",
//       },
//     },
//     "2026-02-10": {
//       "09:00": {
//         patient: "Rajesh Kumar",
//         pid: "P001",
//         phone: "+91 98765 43210",
//         email: "rajesh@example.com",
//         bookedAt: "2/10/2026, 09:12:17 AM",
//         via: "CHATBOT",
//       },
//       "10:00": {
//         patient: "Priya Sharma",
//         pid: "P002",
//         phone: "+91 98765 43211",
//         email: "priya@example.com",
//         bookedAt: "2/10/2026, 09:42:17 AM",
//         via: "CHATBOT",
//       },
//     },
//   }));

//   const TIME_OPTIONS = useMemo(
//     () =>
//       [
//         "06:00",
//         "06:30",
//         "07:00",
//         "07:30",
//         "08:00",
//         "08:30",
//         "09:00",
//         "09:30",
//         "10:00",
//         "10:30",
//         "11:00",
//         "11:30",
//         "12:00",
//         "12:30",
//         "13:00",
//         "13:30",
//         "14:00",
//         "14:30",
//         "15:00",
//         "15:30",
//         "16:00",
//         "16:30",
//         "17:00",
//         "17:30",
//         "18:00",
//         "18:30",
//         "19:00",
//         "19:30",
//         "20:00",
//       ].map((t) => ({ value: t, label: timeLabel(t) })),
//     []
//   );

//   /* ----------------- WEEKLY SLOTS MODEL (NEW) ----------------- */

//   const weekStart = useMemo(() => startOfWeekMonday(selectedDate), [selectedDate]);
//   const weekDates = useMemo(
//     () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
//     [weekStart]
//   );

//   const weekLabel = useMemo(() => {
//     const end = addDays(weekStart, 6);
//     const s = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
//     const e = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
//     return `${s} – ${e}`;
//   }, [weekStart]);

//   // local editor state for Mon..Sun
//   const [weekHours, setWeekHours] = useState(() => ({
//     Mon: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
//     Tue: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
//     Wed: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
//     Thu: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
//     Fri: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
//     Sat: { open: false, ranges: [{ start: "", end: "" }] },
//     Sun: { open: false, ranges: [{ start: "", end: "" }] },
//   }));

//   const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   // When selected week changes, preload editor from existing hoursByDate if available
//   useEffect(() => {
//     setWeekHours((prev) => {
//       const next = { ...prev };
//       for (let i = 0; i < 7; i++) {
//         const date = weekDates[i];
//         const key = toKey(date);
//         const name = dayNames[i];
//         const existing = hoursByDate[key];
//         if (existing) {
//           next[name] = {
//             open: !!existing.open,
//             ranges: existing.ranges?.length ? existing.ranges.map((r) => ({ ...r })) : [{ start: "", end: "" }],
//           };
//         }
//       }
//       return next;
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [weekStart.getTime()]);

//   const setWeekDayOpen = (day, open) => {
//     setWeekHours((prev) => ({
//       ...prev,
//       [day]: { ...prev[day], open },
//     }));
//   };

//   const updateWeekRange = (day, idx, patch) => {
//     setWeekHours((prev) => {
//       const ranges = prev[day].ranges.map((r, i) => (i === idx ? { ...r, ...patch } : r));
//       return { ...prev, [day]: { ...prev[day], ranges } };
//     });
//   };

//   const addWeekRange = (day) => {
//     setWeekHours((prev) => ({
//       ...prev,
//       [day]: { ...prev[day], ranges: [...prev[day].ranges, { start: "", end: "" }] },
//     }));
//   };

//   const removeWeekRange = (day, idx) => {
//     setWeekHours((prev) => {
//       const left = prev[day].ranges.filter((_, i) => i !== idx);
//       return {
//         ...prev,
//         [day]: { ...prev[day], ranges: left.length ? left : [{ start: "", end: "" }] },
//       };
//     });
//   };

//   const applyWeekToDates = () => {
//     // Writes weekHours into hoursByDate for ALL 7 dates in this selected week
//     setHoursByDate((prev) => {
//       const next = { ...prev };
//       for (let i = 0; i < 7; i++) {
//         const date = weekDates[i];
//         const key = toKey(date);
//         const name = dayNames[i];
//         next[key] = {
//           open: !!weekHours[name].open,
//           ranges: weekHours[name].ranges.map((r) => ({ ...r })),
//         };
//       }
//       return next;
//     });
//   };

//   /* ----------------- DAILY VIEW (selected date) ----------------- */

//   const dayHours = useMemo(() => {
//     return (
//       hoursByDate[selectedKey] || {
//         open: true,
//         ranges: [{ start: "", end: "17:00" }],
//       }
//     );
//   }, [hoursByDate, selectedKey]);

//   const daySlots = useMemo(() => {
//     if (!dayHours.open) return [];
//     return buildSlotsFromRanges(dayHours.ranges);
//   }, [dayHours]);

//   const dayBookings = useMemo(
//     () => bookingsByDate[selectedKey] || {},
//     [bookingsByDate, selectedKey]
//   );

//   const daySchedule = useMemo(
//     () =>
//       daySlots.map((t) => ({
//         time: t,
//         booking: dayBookings[t] || null,
//       })),
//     [daySlots, dayBookings]
//   );

//   const stats = useMemo(() => {
//     const todayBookings = Object.keys(dayBookings).length;
//     const available = daySlots.length - todayBookings;
//     const totalSlots = daySlots.length;
//     const chatbotPct = todayBookings === 0 ? "0%" : "100%";
//     return { todayBookings, available, totalSlots, chatbotPct };
//   }, [dayBookings, daySlots]);

//   // If slots shrink, remove bookings that fall outside current slots
//   useEffect(() => {
//     const allowed = new Set(daySlots);
//     setBookingsByDate((prev) => {
//       const day = prev[selectedKey];
//       if (!day) return prev;

//       const nextDay = {};
//       let changed = false;

//       for (const [t, b] of Object.entries(day)) {
//         if (allowed.has(t)) nextDay[t] = b;
//         else changed = true;
//       }

//       if (!changed) return prev;
//       return { ...prev, [selectedKey]: nextDay };
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedKey, daySlots.join("|")]);

//   /* ----------------- calendar ----------------- */

//   const calendarCells = useMemo(() => {
//     const year = monthCursor.getFullYear();
//     const month = monthCursor.getMonth();
//     const first = new Date(year, month, 1);
//     const startDay = first.getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     const cells = [];
//     for (let i = 0; i < 42; i++) {
//       const dayNum = i - startDay + 1;
//       if (dayNum < 1 || dayNum > daysInMonth) {
//         cells.push({ type: "empty", key: `e-${i}` });
//       } else {
//         const d = new Date(year, month, dayNum);
//         const key = toKey(d);
//         const h = hoursByDate[key];
//         const slots = h && h.open ? buildSlotsFromRanges(h.ranges).length : 0;
//         const booked = bookingsByDate[key] ? Object.keys(bookingsByDate[key]).length : 0;
//         cells.push({ type: "day", key, dayNum, slots, booked });
//       }
//     }
//     return cells;
//   }, [monthCursor, hoursByDate, bookingsByDate]);

//   const markNotificationRead = (id) => {
//     setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
//   };

//   const navMonth = (dir) => {
//     setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
//   };

//   const TopToggle = () => (
//     <div className="flex items-center gap-2">
//       <Button
//         onClick={() => setView("calendar")}
//         className={view === "calendar" ? "bg-black text-white" : "bg-white text-black"}
//       >
//         <FiCalendar />
//         CALENDAR
//       </Button>

//       <Button
//         onClick={() => setView("slots")}
//         className={view === "slots" ? "bg-[#00B8DB] text-black" : "bg-white text-black"}
//       >
//         <FiClock />
//         SLOTS
//       </Button>
//     </div>
//   );

//   const isSelected = (key) => key === selectedKey;

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
//             <h1 className="text-3xl font-extrabold text-black tracking-tight">APPOINTMENTS</h1>
//             <p className="text-sm text-black/55 mt-1">
//               Manage your appointment slots and bookings
//             </p>
//           </div>
//           <TopToggle />
//         </div>

//         {/* Stats */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatCard
//             title="TODAY'S BOOKINGS"
//             value={stats.todayBookings}
//             subtitle="patients scheduled"
//             borderColor={CYAN}
//             iconBg={CYAN}
//             icon={<FiCalendar />}
//           />
//           <StatCard
//             title="AVAILABLE SLOTS"
//             value={stats.available < 0 ? 0 : stats.available}
//             subtitle="Open for booking"
//             borderColor={BLACK}
//             iconBg="#fff"
//             icon={<FiClock />}
//           />
//           <StatCard
//             title="TOTAL SLOTS"
//             value={stats.totalSlots}
//             subtitle="slots configured"
//             borderColor={YELLOW}
//             iconBg={YELLOW}
//             icon={<FiClock />}
//           />
//           <StatCard
//             title="CHATBOT BOOKINGS"
//             value={stats.chatbotPct}
//             subtitle="All bookings via AI chatbot"
//             borderColor={CYAN}
//             iconBg={CYAN}
//             icon={<FiMessageSquare />}
//           />
//         </div>

//         {/* Notifications */}
//         <div className="mt-6 border-2 border-black bg-white rounded-md">
//           <div className="p-4 border-b border-black/10 flex items-center justify-between">
//             <SectionTitle icon={<FiBell />} title="NEW NOTIFICATIONS" />
//           </div>

//           <div className="p-4 space-y-3">
//             {notifications.length === 0 ? (
//               <div className="text-sm text-black/60">No notifications.</div>
//             ) : (
//               notifications.map((n) => (
//                 <div
//                   key={n.id}
//                   className="border-2 border-black rounded-sm p-3 flex items-center justify-between gap-3"
//                 >
//                   <div className="min-w-0">
//                     <div className="text-sm font-semibold text-black truncate">{n.text}</div>
//                     <div className="text-[11px] text-black/50 mt-1">{n.time}</div>
//                   </div>

//                   <button
//                     onClick={() => markNotificationRead(n.id)}
//                     className={`h-9 w-10 border-2 border-black rounded-sm inline-flex items-center justify-center ${
//                       n.read ? "bg-[#B9F6CC]" : "bg-[#00B8DB]"
//                     }`}
//                     title={n.read ? "Read" : "Mark as read"}
//                   >
//                     <FiCheck className="text-black" />
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Main */}
//         {view === "slots" ? (
//           <>
//             {/* Manage slots button */}
//             <div className="mt-6">
//               <Button
//                 onClick={() => setShowManageSlots((v) => !v)}
//                 className="bg-[#00B8DB] text-black"
//               >
//                 <FiPlus />
//                 MANAGE SLOTS (WEEK)
//               </Button>
//             </div>

//             {/* WEEK HOURS PANEL */}
//             {showManageSlots && (
//               <div className="mt-4 border-2 rounded-md bg-white p-5" style={{ borderColor: CYAN }}>
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <div className="text-sm font-extrabold text-black uppercase">HOURS (WEEK)</div>
//                     <div className="text-xs text-black/55 mt-1">
//                       Set hours for the week: <b>{weekLabel}</b>
//                     </div>
//                   </div>

//                   <IconBtn
//                     onClick={() => setShowManageSlots(false)}
//                     className="bg-black text-white"
//                     title="Close"
//                   >
//                     <FiX />
//                   </IconBtn>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between gap-3">
//                   <div className="text-xs text-black/55">
//                     Slots auto-generate every <b>30 minutes</b> inside each range.
//                   </div>

//                   <Button onClick={applyWeekToDates} className="bg-[#00B8DB] text-black">
//                     <FiCheck />
//                     APPLY TO THIS WEEK
//                   </Button>
//                 </div>

//                 <div className="mt-4 border-t border-black/10 pt-4 space-y-4">
//                   {dayNames.map((day, i) => {
//                     const date = weekDates[i];
//                     const key = toKey(date);
//                     const active = selectedKey === key;

//                     return (
//                       <div
//                         key={day}
//                         className={`border-2 rounded-md p-4 ${
//                           active ? "border-black bg-[#EAFBFF]" : "border-black/10 bg-white"
//                         }`}
//                       >
//                         <div className="flex flex-wrap items-center gap-3">
//                           <button
//                             type="button"
//                             onClick={() => setSelectedKey(key)}
//                             className="text-sm font-extrabold text-black underline"
//                             title="Select this day"
//                           >
//                             {day}{" "}
//                             <span className="text-black/50 font-semibold">
//                               ({date.toLocaleDateString("en-US", { month: "short", day: "numeric" })})
//                             </span>
//                           </button>

//                           <Toggle checked={weekHours[day].open} onChange={(v) => setWeekDayOpen(day, v)} />

//                           <div className="text-sm font-semibold text-black/70">
//                             {weekHours[day].open ? "Open" : "Closed"}
//                           </div>
//                         </div>

//                         {weekHours[day].open && (
//                           <div className="mt-3 space-y-3">
//                             {weekHours[day].ranges.map((r, idx) => (
//                               <div key={idx} className="flex flex-wrap items-center gap-3">
//                                 <SelectTime
//                                   value={r.start}
//                                   onChange={(v) => updateWeekRange(day, idx, { start: v })}
//                                   placeholder="Opens at"
//                                   options={TIME_OPTIONS}
//                                 />

//                                 <div className="text-black/40 font-extrabold">—</div>

//                                 <SelectTime
//                                   value={r.end}
//                                   onChange={(v) => updateWeekRange(day, idx, { end: v })}
//                                   placeholder="Closes at"
//                                   options={TIME_OPTIONS}
//                                 />

//                                 {weekHours[day].ranges.length > 1 && (
//                                   <IconBtn onClick={() => removeWeekRange(day, idx)} title="Remove range">
//                                     <FiX />
//                                   </IconBtn>
//                                 )}

//                                 <div className="flex-1" />

//                                 {idx === weekHours[day].ranges.length - 1 && (
//                                   <button
//                                     type="button"
//                                     onClick={() => addWeekRange(day)}
//                                     className="text-sm font-extrabold underline"
//                                     style={{ color: CYAN }}
//                                   >
//                                     Add hours
//                                   </button>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Selected day schedule */}
//             <div className="mt-7 flex items-center justify-between gap-3">
//               <div className="text-lg font-extrabold text-black uppercase">SCHEDULE</div>
//               <div className="h-8 px-3 border-2 border-black rounded-sm bg-[#00B8DB] text-black text-xs font-extrabold inline-flex items-center">
//                 {formatLong(selectedDate)}
//               </div>
//             </div>

//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//               {daySchedule.map(({ time, booking }) =>
//                 booking ? (
//                   <BookedCard key={time} time={timeLabel(time)} booking={booking} />
//                 ) : (
//                   <AvailableCard key={time} time={timeLabel(time)} />
//                 )
//               )}

//               {daySchedule.length === 0 ? (
//                 <div className="border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
//                   No slots configured (or day is Closed).
//                 </div>
//               ) : null}
//             </div>
//           </>
//         ) : (
//           /* CALENDAR view */
//           <div className="mt-6 border-2 rounded-md bg-white p-5" style={{ borderColor: CYAN }}>
//             <div className="flex items-start justify-between gap-3">
//               <div className="text-2xl font-extrabold text-black">{formatMonthTitle(monthCursor)}</div>

//               <div className="flex items-center gap-2">
//                 <IconBtn className="bg-black text-white" onClick={() => navMonth(-1)} title="Prev month">
//                   <FiChevronLeft />
//                 </IconBtn>
//                 <IconBtn className="bg-black text-white" onClick={() => navMonth(1)} title="Next month">
//                   <FiChevronRight />
//                 </IconBtn>
//               </div>
//             </div>

//             {/* Week header */}
//             <div className="mt-4 grid grid-cols-7 gap-2">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//                 <div
//                   key={d}
//                   className="h-8 bg-black text-white text-xs font-extrabold flex items-center justify-center rounded-sm"
//                 >
//                   {d}
//                 </div>
//               ))}
//             </div>

//             {/* Grid */}
//             <div className="mt-2 grid grid-cols-7 gap-2">
//               {calendarCells.map((cell) => {
//                 if (cell.type === "empty") {
//                   return <div key={cell.key} className="h-[74px] border border-black/10 rounded-sm bg-white" />;
//                 }

//                 const selected = isSelected(cell.key);
//                 const hasBookings = cell.booked > 0;
//                 const hasSlots = cell.slots > 0;

//                 const bg = selected ? CYAN : hasBookings ? "#F6E7B1" : "white";
//                 const border = selected
//                   ? "2px solid black"
//                   : hasSlots
//                   ? "2px solid #CBD5E1"
//                   : "1px solid rgba(0,0,0,0.10)";

//                 return (
//                   <button
//                     key={cell.key}
//                     onClick={() => setSelectedKey(cell.key)}
//                     className="h-[74px] rounded-sm flex flex-col items-center justify-center relative"
//                     style={{ background: bg, border: border }}
//                     title={`${cell.key} • slots: ${cell.slots}, booked: ${cell.booked}`}
//                   >
//                     <div className="text-sm font-extrabold text-black">{cell.dayNum}</div>

//                     <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//                       {hasBookings
//                         ? Array.from({ length: Math.min(3, cell.booked) }).map((_, i) => (
//                             <span
//                               key={i}
//                               className="h-1.5 w-1.5 rounded-full"
//                               style={{ background: selected ? "black" : CYAN }}
//                             />
//                           ))
//                         : null}
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="mt-6 border-t border-black/10 pt-5 flex items-start justify-between gap-3">
//               <div className="text-sm font-extrabold text-black">{formatLong(selectedDate)}</div>
//               <Button className="bg-[#00B8DB] text-black" onClick={() => setView("slots")}>
//                 <FiPlus />
//                 ADD SLOTS
//               </Button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// /* ---------- Cards ---------- */

// function AvailableCard({ time }) {
//   return (
//     <div className="border-2 border-[#9CA3AF] bg-white rounded-md p-4">
//       <div className="flex items-start gap-3">
//         <div className="h-12 w-12 border-2 border-black rounded-md bg-[#E5E7EB] flex items-center justify-center">
//           <FiClock className="text-black text-xl" />
//         </div>

//         <div className="flex-1">
//           <div className="flex items-center gap-3">
//             <div className="text-sm font-extrabold text-black">{time}</div>
//             <Badge label="AVAILABLE" tone="gray" />
//           </div>
//           <div className="text-xs text-black/55 mt-1">Waiting for patient to book via chatbot</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function BookedCard({ time, booking }) {
//   return (
//     <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex items-start gap-3">
//           <div className="h-12 w-12 border-2 border-black rounded-md bg-[#00B8DB] flex items-center justify-center">
//             <FiClock className="text-black text-xl" />
//           </div>

//           <div>
//             <div className="flex items-center gap-3 flex-wrap">
//               <div className="text-sm font-extrabold text-black">{time}</div>
//               <Badge label="BOOKED" tone="green" />
//               <Badge label={booking.via} tone="gray" />
//             </div>

//             <div className="mt-2 text-sm font-extrabold text-black">
//               {booking.patient}{" "}
//               <span className="text-black/50 font-semibold">(ID: {booking.pid})</span>
//             </div>

//             <div className="mt-2 text-xs text-black/70 space-y-1">
//               <div>📞 {booking.phone}</div>
//               <div>✉️ {booking.email}</div>
//               <div>🕒 Booked {booking.bookedAt}</div>
//             </div>
//           </div>
//         </div>

//         <button
//           className="h-9 w-9 border-2 border-black rounded-sm bg-[#F0B100] inline-flex items-center justify-center"
//           title="Edit"
//           onClick={() => alert("Edit action (demo).")}
//         >
//           <FiEdit2 className="text-black" />
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiBell,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiPlus,
  FiX,
  FiEdit2,
} from "react-icons/fi";

const PAGE_BG = "#FEFCE8";
const CYAN = "#00B8DB";
const YELLOW = "#F0B100";
const BLACK = "#111111";

const pad2 = (n) => String(n).padStart(2, "0");

const toKey = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

// 🔥 ADD THIS RIGHT BELOW
const toDDMMYYYY = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${d}-${m}-${y}`;
};

const parseKey = (key) => {
  const [y, m, d] = key.split("-").map((x) => Number(x));
  return new Date(y, m - 1, d);
};

const formatLong = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const formatMonthTitle = (date) =>
  date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

const timeLabel = (t24) => {
  if (!t24) return "";
  const [hh, mm] = t24.split(":").map(Number);
  const am = hh < 12;
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${pad2(h12)}:${pad2(mm)} ${am ? "AM" : "PM"}`;
};

const sortTimes = (arr) =>
  [...arr].sort((a, b) => {
    const [ah, am] = a.split(":").map(Number);
    const [bh, bm] = b.split(":").map(Number);
    return ah * 60 + am - (bh * 60 + bm);
  });

const t24ToMinutes = (t24) => {
  const [h, m] = t24.split(":").map(Number);
  return h * 60 + m;
};

const minutesToT24 = (min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${pad2(h)}:${pad2(m)}`;
};

// 15-min slots
const buildSlotsFromRanges = (ranges) => {
  const out = new Set();
  for (const r of ranges) {
    if (!r.start || !r.end) continue;
    const startMin = t24ToMinutes(r.start);
    const endMin = t24ToMinutes(r.end);
    if (endMin <= startMin) continue;
    for (let m = startMin; m < endMin; m += 15) out.add(minutesToT24(m));
  }
  return sortTimes([...out]);
};

const startOfWeekMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

/* ---------- UI atoms ---------- */

const StatCard = ({ title, value, subtitle, borderColor, iconBg, icon }) => (
  <div
    className="bg-white rounded-md border-2 p-5 flex items-start justify-between"
    style={{ borderColor }}
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
      className="h-12 w-12 rounded-md border-2 border-black flex items-center justify-center"
      style={{ background: iconBg }}
    >
      <div className="text-black text-xl">{icon}</div>
    </div>
  </div>
);

const Badge = ({ label, tone = "gray" }) => {
  const tones = {
    green: "bg-[#EFFFF5] border-[#00C950]",
    cyan: "bg-[#EAFBFF] border-[#00B8DB]",
    yellow: "bg-[#FFF3CC] border-[#F0B100]",
    gray: "bg-white border-black/30",
  };
  return (
    <span
      className={`inline-flex items-center h-5 px-2 border-2 rounded-sm text-[10px] font-extrabold text-black ${tones[tone]}`}
    >
      {label}
    </span>
  );
};

const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs inline-flex items-center gap-2 ${className}`}
  >
    {children}
  </button>
);

const IconBtn = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`h-9 w-9 border-2 border-black rounded-sm bg-white inline-flex items-center justify-center text-black ${className}`}
  >
    {children}
  </button>
);

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-2">
    <div className="text-black">{icon}</div>
    <div className="text-sm font-extrabold text-black uppercase">{title}</div>
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 border-black transition-colors ${checked ? "bg-[#00B8DB]" : "bg-[#E5E7EB]"
      }`}
    aria-pressed={checked}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white border-2 border-black transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"
        }`}
    />
  </button>
);

/* ✅ FIX: smaller select box + chevron closer to text */
// function SelectTime({ value, onChange, placeholder, options, size = "sm" }) {
//   const sizes = {
//     sm: {
//       h: "h-9",
//       text: "text-sm font-extrabold",
//       pl: "pl-3",
//       pr: "pr-8", // ✅ reduced
//       chevronRight: "right-2", // ✅ closer
//       chevronSize: "text-[16px]",
//       minw: "min-w-[150px]", // ✅ smaller box
//     },
//     md: {
//       h: "h-10",
//       text: "text-sm font-semibold",
//       pl: "pl-3",
//       pr: "pr-10",
//       chevronRight: "right-3",
//       chevronSize: "text-[18px]",
//       minw: "min-w-[170px]",
//     },
//   };

//   const s = sizes[size] || sizes.sm;

//   return (
//     <div className={`relative inline-flex ${s.minw}`}>
//       <select
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value || "")}
//         className={[
//           s.h,
//           s.pl,
//           s.pr,
//           "w-full border-2 border-black rounded-sm bg-white outline-none appearance-none",
//           s.text,
//           value ? "text-black" : "text-black/40",
//         ].join(" ")}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((o) => (
//           <option key={o.value} value={o.value}>
//             {o.label}
//           </option>
//         ))}
//       </select>

//       <FiChevronDown
//         className={[
//           "pointer-events-none absolute top-1/2 -translate-y-1/2 text-black",
//           s.chevronRight,
//           s.chevronSize,
//         ].join(" ")}
//       />
//     </div>
//   );
// }


function SelectTime({ value, onChange, placeholder, options }) {
  return (
    <div className="relative inline-flex w-[122px]">
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value || "")}
        className="
          h-9 w-full
          pl-3 pr-8
          border-2 border-black rounded-sm
          bg-white text-sm font-extrabold text-black
          outline-none appearance-none
        "
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* 🔽 Chevron moved LEFT (NOT corner) */}
      <FiChevronDown
        className="
          pointer-events-none
          absolute right-4 top-1/2 -translate-y-1/2
          text-[14px] text-black
        "
      />
    </div>
  );
}

/* ---------- main ---------- */

export default function Appointment() {
  const today = new Date();

  const [monthCursor, setMonthCursor] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [toast, setToast] = useState(null);
  // toast = { type: "success" | "error", message: "text" }
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);





  const [selectedKey, setSelectedKey] = useState(toKey(today));
  const selectedDate = useMemo(() => parseKey(selectedKey), [selectedKey]);

  const [view, setView] = useState("slots");
  const [showManageSlots, setShowManageSlots] = useState(true);

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/medibot/latest-booking");
        const data = await res.json();

        const latest = data?.latest || data?.[0]?.latest;
        if (!latest) return;

        // ✅ INSERT HERE
        const parsedDate = new Date(latest.Date);
        const formattedDate = toKey(parsedDate);

        const formattedTime =
          latest.Time.length === 5
            ? latest.Time
            : new Date(`1970-01-01T${latest.Time}`)
              .toTimeString()
              .slice(0, 5);

        const formatted = {
          id: latest["Book-id"],
          patient: latest.Name || "Unknown",
          pid: latest["patient id "] || latest["patient id"] || "N/A",
          phone: latest.Phone || "N/A",
          email: latest.email || "N/A",
          date: formattedDate,   // ✅ FIXED
          timeSlot: formattedTime,
          via: "CHATBOT",
          bookedAt: new Date().toLocaleString(),
          read: false,
        };
        setNotifications((prev) => {
          const exists = prev.some((n) => n.id === formatted.id);
          if (exists) return prev;

          const updated = [formatted, ...prev];
          localStorage.setItem("notifications", JSON.stringify(updated));
          return updated;
        });

      } catch (err) {
        console.error("Notification fetch failed", err);
      }
    };

    fetchNotifications();

  }, []);

  const [hoursByDate, setHoursByDate] = useState(() => {
    const saved = localStorage.getItem("hoursByDate");
    if (saved) return JSON.parse(saved);

    return {}; // empty initially
  });

  const [bookingsByDate, setBookingsByDate] = useState(() => {
    const saved = localStorage.getItem("bookingsByDate");
    if (saved) return JSON.parse(saved);

    // fallback initial demo data
    return {
      "2026-02-05": {
        "09:00": {
          patient: "Rajesh Kumar",
          pid: "P001",
          phone: "+91 98765 43210",
          email: "rajesh@example.com",
          bookedAt: "2/5/2026, 10:12:17 AM",
          via: "CHATBOT",
        },
      },
    };
  });
  useEffect(() => {
    localStorage.setItem(
      "bookingsByDate",
      JSON.stringify(bookingsByDate)
    );
  }, [bookingsByDate]);

  useEffect(() => {
    localStorage.setItem(
      "hoursByDate",
      JSON.stringify(hoursByDate)
    );
  }, [hoursByDate]);

  const TIME_OPTIONS = useMemo(() => {
    const opts = [];
    for (let m = 6 * 60; m <= 20 * 60; m += 15) {
      const t = minutesToT24(m);
      opts.push({ value: t, label: timeLabel(t) });
    }
    return opts;
  }, []);

  const weekStart = useMemo(() => startOfWeekMonday(selectedDate), [selectedDate]);
  const weekDates = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  const weekLabel = useMemo(() => {
    const end = addDays(weekStart, 6);
    const s = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const e = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `${s} – ${e}`;
  }, [weekStart]);

  const [weekHours, setWeekHours] = useState(() => ({
    Mon: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Tue: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Wed: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Thu: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Fri: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Sat: { open: false, ranges: [{ start: "", end: "" }] },
    Sun: { open: false, ranges: [{ start: "", end: "" }] },
  }));

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    setWeekHours((prev) => {
      const next = { ...prev };
      for (let i = 0; i < 7; i++) {
        const date = weekDates[i];
        const key = toKey(date);
        const name = dayNames[i];
        const existing = hoursByDate[key];
        if (existing) {
          next[name] = {
            open: !!existing.open,
            ranges: existing.ranges?.length ? existing.ranges.map((r) => ({ ...r })) : [{ start: "", end: "" }],
          };
        }
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStart.getTime()]);

  const setWeekDayOpen = (day, open) => setWeekHours((p) => ({ ...p, [day]: { ...p[day], open } }));
  const updateWeekRange = (day, idx, patch) =>
    setWeekHours((p) => ({
      ...p,
      [day]: { ...p[day], ranges: p[day].ranges.map((r, i) => (i === idx ? { ...r, ...patch } : r)) },
    }));
  const addWeekRange = (day) =>
    setWeekHours((p) => ({ ...p, [day]: { ...p[day], ranges: [...p[day].ranges, { start: "", end: "" }] } }));
  const removeWeekRange = (day, idx) =>
    setWeekHours((p) => {
      const left = p[day].ranges.filter((_, i) => i !== idx);
      return { ...p, [day]: { ...p[day], ranges: left.length ? left : [{ start: "", end: "" }] } };
    });

  const applyWeekToDates = async () => {
    try {
      setHoursByDate((prev) => {
        const next = { ...prev };
        for (let i = 0; i < 7; i++) {
          const key = toKey(weekDates[i]);
          const name = dayNames[i];
          next[key] = {
            open: !!weekHours[name].open,
            ranges: weekHours[name].ranges.map((r) => ({ ...r })),
          };
        }
        return next;
      });

      // ✅ Return to TODAY instead of Monday
      setSelectedKey(toKey(new Date()));
      const payload = {
        weekStart: toDDMMYYYY(weekDates[0]),
        weekEnd: toDDMMYYYY(weekDates[6]),
        schedule: weekDates.map((date, i) => {
          const name = dayNames[i];
          const dayConfig = weekHours[name];

          return {
            date: toDDMMYYYY(date),
            day: name,
            open: dayConfig.open,
            ranges: dayConfig.ranges,
            slots: dayConfig.open
              ? buildSlotsFromRanges(dayConfig.ranges)
              : [],
          };
        }),
      };

      const response = await fetch(
        "http://localhost:3001/api/medibot/save-schedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();

      if (!data?.success) throw new Error("n8n webhook failed");

      setToast({
        type: "success",
        message: "Week schedule saved successfully!",
      });

    } catch (error) {
      console.error("❌ Webhook error:", error);

      setToast({
        type: "error",
        message: "n8n webhook not responding!",
      });
    }
  };

  const dayHours = useMemo(
    () =>
      hoursByDate[selectedKey] || {
        open: true,
        ranges: [{ start: "", end: "17:00" }],
      },
    [hoursByDate, selectedKey]
  );

  const daySlots = useMemo(() => (dayHours.open ? buildSlotsFromRanges(dayHours.ranges) : []), [dayHours]);
  const dayBookings = useMemo(() => bookingsByDate[selectedKey] || {}, [bookingsByDate, selectedKey]);

  const daySchedule = useMemo(
    () => daySlots.map((t) => ({ time: t, booking: dayBookings[t] || null })),
    [daySlots, dayBookings]
  );

  const stats = useMemo(() => {
    const todayBookings = Object.keys(dayBookings).length;
    const available = daySlots.length - todayBookings;
    return { todayBookings, available, totalSlots: daySlots.length };
  }, [dayBookings, daySlots]);

  const [editing, setEditing] = useState(null); // { fromTime, toTime }

  const availableMoveTargets = useMemo(() => {
    if (!editing?.fromTime) return [];
    const bookedSet = new Set(Object.keys(dayBookings));
    const from = editing.fromTime;
    return daySlots
      .filter((t) => t === from || !bookedSet.has(t))
      .map((t) => ({ value: t, label: timeLabel(t) }));
  }, [editing, dayBookings, daySlots]);

  const startEdit = (fromTime) => setEditing({ fromTime, toTime: fromTime });

  const saveEdit = () => {
    if (!editing?.fromTime || !editing?.toTime) return;
    const from = editing.fromTime;
    const to = editing.toTime;

    if (from === to) {
      setEditing(null);
      return;
    }

    setBookingsByDate((prev) => {
      const day = prev[selectedKey] || {};
      const booking = day[from];
      if (!booking) return prev;
      if (day[to]) {
        alert("That time is already booked. Choose another time.");
        return prev;
      }
      const nextDay = { ...day };
      delete nextDay[from];
      nextDay[to] = { ...booking, bookedAt: new Date().toLocaleString(), via: booking.via || "MANUAL" };
      return { ...prev, [selectedKey]: nextDay };
    });

    setEditing(null);
  };


  const calendarCells = useMemo(() => {
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const first = new Date(year, month, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < 42; i++) {
      const dayNum = i - startDay + 1;
      if (dayNum < 1 || dayNum > daysInMonth) cells.push({ type: "empty", key: `e-${i}` });
      else {
        const d = new Date(year, month, dayNum);
        const key = toKey(d);
        const h = hoursByDate[key];
        const slots = h && h.open ? buildSlotsFromRanges(h.ranges).length : 0;
        const booked = bookingsByDate[key] ? Object.keys(bookingsByDate[key]).length : 0;
        cells.push({ type: "day", key, dayNum, slots, booked });
      }
    }
    return cells;
  }, [monthCursor, hoursByDate, bookingsByDate]);

  const selectedDayBookings = useMemo(() => {
    const b = bookingsByDate[selectedKey] || {};
    return Object.entries(b)
      .map(([t, booking]) => ({ t, booking }))
      .sort((a, b2) => t24ToMinutes(a.t) - t24ToMinutes(b2.t));
  }, [bookingsByDate, selectedKey]);

  const markNotificationRead = (id) => {
    setNotifications((prev) => {
      const notification = prev.find((n) => n.id === id);
      if (!notification) return prev;

      // 🔥 1️⃣ Normalize DATE
      const parsedDate = new Date(notification.date);
      const dateKey = toKey(parsedDate); // YYYY-MM-DD

      // 🔥 2️⃣ Normalize TIME (force 24hr HH:mm)
      let timeSlot = notification.timeSlot;
      if (timeSlot.length > 5) {
        timeSlot = new Date(`1970-01-01T${timeSlot}`)
          .toTimeString()
          .slice(0, 5);
      }

      // 🔥 3️⃣ Switch UI to that exact date
      setSelectedKey(dateKey);

      // 🔥 4️⃣ Ensure slot exists in hours range
      setHoursByDate((prevHours) => {
        const existing = prevHours[dateKey];
        const slotEnd = minutesToT24(t24ToMinutes(timeSlot) + 15);

        if (!existing) {
          return {
            ...prevHours,
            [dateKey]: {
              open: true,
              ranges: [{ start: timeSlot, end: slotEnd }],
            },
          };
        }

        const slotMin = t24ToMinutes(timeSlot);

        const inside = existing.ranges.some((r) => {
          const startMin = t24ToMinutes(r.start);
          const endMin = t24ToMinutes(r.end);
          return slotMin >= startMin && slotMin < endMin;
        });

        if (!inside) {
          return {
            ...prevHours,
            [dateKey]: {
              ...existing,
              open: true,
              ranges: [
                ...existing.ranges,
                { start: timeSlot, end: slotEnd },
              ],
            },
          };
        }

        return prevHours;
      });

      // 🔥 5️⃣ Insert booking EXACTLY at that time
      setBookingsByDate((prevBookings) => {
        const dayBookings = prevBookings[dateKey] || {};

        if (dayBookings[timeSlot]) {
          return prevBookings; // prevent duplicate
        }

        return {
          ...prevBookings,
          [dateKey]: {
            ...dayBookings,
            [timeSlot]: {
              patient: notification.patient,
              pid: notification.pid,
              phone: notification.phone,
              email: notification.email,
              bookedAt: notification.bookedAt,
              via: notification.via || "CHATBOT",
            },
          },
        };
      });

      // 🔥 6️⃣ Remove notification
      const updated = prev.filter((n) => n.id !== id);
      localStorage.setItem("notifications", JSON.stringify(updated));

      return updated;
    });
  };

  const navMonth = (dir) => setMonthCursor((p) => new Date(p.getFullYear(), p.getMonth() + dir, 1));

  const TopToggle = () => (
    <div className="flex items-center gap-2">
      <Button onClick={() => setView("calendar")} className={view === "calendar" ? "bg-black text-white" : "bg-white text-black"}>
        <FiCalendar />
        CALENDAR
      </Button>
      <Button onClick={() => setView("slots")} className={view === "slots" ? "bg-[#00B8DB] text-black" : "bg-white text-black"}>
        <FiClock />
        SLOTS
      </Button>
    </div>
  );

  const isSelected = (key) => key === selectedKey;

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: PAGE_BG,
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
      }}
    >
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <div
            className={`
        min-w-[260px]
        px-6 py-3 rounded-md border-2 font-semibold text-sm shadow-xl
        transition-all duration-300 ease-out
        animate-toastSlide
        ${toast.type === "success"
                ? "bg-[#EFFFF5] border-[#00C950] text-black"
                : "bg-[#FFEAEA] border-[#FF4D4D] text-black"
              }
      `}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* ✅ TOAST HERE */}
      <main className="mx-auto max-w-[1100px] px-6 py-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black tracking-tight">
              APPOINTMENTS
            </h1>
            <p className="text-sm text-black/55 mt-1">
              Manage your appointment slots and bookings
            </p>
          </div>

          {/* RIGHT SIDE (Toggle + Toast) */}
          <div className="flex flex-col items-end gap-2">
            <TopToggle />

            
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="TODAY'S BOOKINGS" value={stats.todayBookings} subtitle="patients scheduled" borderColor={CYAN} iconBg={CYAN} icon={<FiCalendar />} />
          <StatCard title="AVAILABLE SLOTS" value={stats.available < 0 ? 0 : stats.available} subtitle="Open for booking" borderColor={BLACK} iconBg="#fff" icon={<FiClock />} />
          <StatCard title="TOTAL SLOTS" value={stats.totalSlots} subtitle="slots configured" borderColor={YELLOW} iconBg={YELLOW} icon={<FiClock />} />
        </div>

        {/* Notifications */}
        <div className="mt-6 border-2 border-black bg-white rounded-md">
          <div className="p-4 border-b border-black/10 flex items-center justify-between">
            <SectionTitle icon={<FiBell />} title="NEW NOTIFICATIONS" />
          </div>

          <div className="p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-sm text-black/60">
                No notifications.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="border-2 border-black rounded-sm p-4 flex items-center justify-between"
                >
                  {/* LEFT SIDE */}
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold text-black">
                      {n.patient} – New appointment booked
                    </div>

                    <div className="text-xs text-black/50 mt-1">
                      {n.date} • {timeLabel(n.timeSlot)}
                    </div>
                  </div>

                  {/* RIGHT SIDE BUTTON */}
                  <button
                    onClick={() => markNotificationRead(n.id)}
                    className={`h-9 w-10 border-2 border-black rounded-sm inline-flex items-center justify-center ${n.read ? "bg-[#B9F6CC]" : "bg-[#00B8DB]"
                      }`}
                    title={n.read ? "Read" : "Mark as read"}
                  >
                    <FiCheck className="text-black" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>


        {view === "slots" ? (
          <>
            <div className="mt-6">
              <Button onClick={() => setShowManageSlots((v) => !v)} className="bg-[#00B8DB] text-black">
                <FiPlus />
                MANAGE SLOTS (WEEK)
              </Button>
            </div>

            {showManageSlots && (
              <div className="mt-4 border-2 rounded-md bg-white p-5" style={{ borderColor: CYAN }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-extrabold text-black uppercase">HOURS (WEEK)</div>
                    <div className="text-xs text-black/55 mt-1">
                      Set hours for the week: <b>{weekLabel}</b>
                    </div>
                  </div>

                  <IconBtn onClick={() => setShowManageSlots(false)} title="Close">
                    <FiX />
                  </IconBtn>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-xs text-black/55">
                    Slots auto-generate every <b>15 minutes</b> inside each range.
                  </div>

                  <Button onClick={applyWeekToDates} className="bg-[#00B8DB] text-black">
                    <FiCheck />
                    APPLY TO THIS WEEK
                  </Button>
                </div>

                <div className="mt-4 border-t border-black/10 pt-4 space-y-4">
                  {dayNames.map((day, i) => {
                    const date = weekDates[i];
                    const key = toKey(date);
                    const active = selectedKey === key;

                    return (
                      <div key={day} className={`border-2 rounded-md p-4 ${active ? "border-black bg-[#EAFBFF]" : "border-black/10 bg-white"}`}>
                        <div className="flex flex-wrap items-center gap-3">
                          <button type="button" onClick={() => setSelectedKey(key)} className="text-sm font-extrabold text-black underline" title="Select this day">
                            {day}{" "}
                            <span className="text-black/50 font-semibold">
                              ({date.toLocaleDateString("en-US", { month: "short", day: "numeric" })})
                            </span>
                          </button>

                          <Toggle checked={weekHours[day].open} onChange={(v) => setWeekDayOpen(day, v)} />

                          <div className="text-sm font-semibold text-black/70">{weekHours[day].open ? "Open" : "Closed"}</div>
                        </div>

                        {weekHours[day].open && (
                          <div className="mt-3 space-y-3">
                            {weekHours[day].ranges.map((r, idx) => (
                              <div key={idx} className="flex flex-wrap items-center gap-3">
                                <SelectTime value={r.start} onChange={(v) => updateWeekRange(day, idx, { start: v })} placeholder="Opens at" options={TIME_OPTIONS} size="sm" />
                                <div className="text-black/40 font-extrabold">—</div>
                                <SelectTime value={r.end} onChange={(v) => updateWeekRange(day, idx, { end: v })} placeholder="Closes at" options={TIME_OPTIONS} size="sm" />

                                {weekHours[day].ranges.length > 1 && (
                                  <IconBtn onClick={() => removeWeekRange(day, idx)} title="Remove range">
                                    <FiX />
                                  </IconBtn>
                                )}

                                <div className="flex-1" />

                                {idx === weekHours[day].ranges.length - 1 && (
                                  <button type="button" onClick={() => addWeekRange(day)} className="text-sm font-extrabold underline" style={{ color: CYAN }}>
                                    Add hours
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-7 flex items-center justify-between gap-3">
              <div className="text-lg font-extrabold text-black uppercase">SCHEDULE</div>
              <div className="h-8 px-3 border-2 border-black rounded-sm bg-[#00B8DB] text-black text-xs font-extrabold inline-flex items-center">
                {formatLong(selectedDate)}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {daySchedule.map(({ time, booking }) =>
                booking ? (
                  <BookedCard
                    key={time}
                    timeT24={time}
                    timeLabelText={timeLabel(time)}
                    booking={booking}
                    isEditing={editing?.fromTime === time}
                    editToTime={editing?.fromTime === time ? editing.toTime : null}
                    onStartEdit={() => startEdit(time)}
                    onCancelEdit={() => setEditing(null)}
                    onChangeEditTime={(v) => setEditing((p) => (p ? { ...p, toTime: v } : p))}
                    onSaveEdit={saveEdit}
                    timeOptions={availableMoveTargets}
                  />
                ) : (
                  <AvailableCard key={time} time={timeLabel(time)} />
                )
              )}

              {daySchedule.length === 0 ? (
                <div className="border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">No slots configured (or day is Closed).</div>
              ) : null}
            </div>
          </>
        ) : (
          <div className="mt-6 border-2 rounded-md bg-white p-5" style={{ borderColor: CYAN }}>
            <div className="flex items-start justify-between gap-3">
              <div className="text-2xl font-extrabold text-black">{formatMonthTitle(monthCursor)}</div>

              <div className="flex items-center gap-2">
                <IconBtn onClick={() => navMonth(-1)} title="Prev month">
                  <FiChevronLeft />
                </IconBtn>
                <IconBtn onClick={() => navMonth(1)} title="Next month">
                  <FiChevronRight />
                </IconBtn>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="h-8 bg-black text-white text-xs font-extrabold flex items-center justify-center rounded-sm">
                  {d}
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {calendarCells.map((cell) => {
                if (cell.type === "empty") return <div key={cell.key} className="h-[74px] border border-black/10 rounded-sm bg-white" />;

                const selected = isSelected(cell.key);
                const hasBookings = cell.booked > 0;
                const hasSlots = cell.slots > 0;

                const bg = selected ? CYAN : hasBookings ? "#F6E7B1" : "white";
                const border = selected ? "2px solid black" : hasSlots ? "2px solid #CBD5E1" : "1px solid rgba(0,0,0,0.10)";

                return (
                  <button
                    key={cell.key}
                    onClick={() => setSelectedKey(cell.key)}
                    className="h-[74px] rounded-sm flex flex-col items-center justify-center relative"
                    style={{ background: bg, border }}
                    title={`${cell.key} • slots: ${cell.slots}, booked: ${cell.booked}`}
                  >
                    <div className="text-sm font-extrabold text-black">{cell.dayNum}</div>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {hasBookings
                        ? Array.from({ length: Math.min(3, cell.booked) }).map((_, i) => (
                          <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: selected ? "black" : CYAN }} />
                        ))
                        : null}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border-t border-black/10 pt-5">
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-extrabold text-black">{formatLong(selectedDate)}</div>
                <Button className="bg-[#00B8DB] text-black" onClick={() => setView("slots")}>
                  <FiPlus />
                  GO TO SLOTS
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedDayBookings.length === 0 ? (
                  <div className="border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">No appointments booked for this date.</div>
                ) : (
                  selectedDayBookings.map(({ t, booking }) => (
                    <BookedCard key={t} timeT24={t} timeLabelText={timeLabel(t)} booking={booking} isEditing={false} onStartEdit={() => { }} onCancelEdit={() => { }} onChangeEditTime={() => { }} onSaveEdit={() => { }} timeOptions={[]} hideEdit />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------- Cards ---------- */

function AvailableCard({ time }) {
  return (
    <div className="border-2 border-[#9CA3AF] bg-white rounded-md p-4">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 border-2 border-black rounded-md bg-[#E5E7EB] flex items-center justify-center">
          <FiClock className="text-black text-xl" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="text-sm font-extrabold text-black">{time}</div>
            <Badge label="AVAILABLE" tone="gray" />
          </div>
          <div className="text-xs text-black/55 mt-1">Waiting for patient to book</div>
        </div>
      </div>
    </div>
  );
}

function BookedCard({
  timeT24,
  timeLabelText,
  booking,
  isEditing,
  editToTime,
  onStartEdit,
  onCancelEdit,
  onChangeEditTime,
  onSaveEdit,
  timeOptions,
  hideEdit = false,
}) {
  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 border-2 border-black rounded-md bg-[#00B8DB] flex items-center justify-center">
            <FiClock className="text-black text-xl" />
          </div>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              {!isEditing ? (
                <div className="text-sm font-extrabold text-black">{timeLabelText}</div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="text-xs font-extrabold text-black/60">TIME</div>

                  {/* ✅ smaller dropdown in edit mode */}
                  <SelectTime
                    value={editToTime || timeT24}
                    onChange={onChangeEditTime}
                    placeholder="Select"
                    options={timeOptions}
                    size="sm"
                  />

                  <button
                    type="button"
                    onClick={onSaveEdit}
                    className="h-9 px-3 border-2 border-black rounded-sm bg-[#B9F6CC] text-black font-extrabold text-xs inline-flex items-center gap-2"
                    title="Save"
                  >
                    <FiCheck />
                    SAVE
                  </button>

                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="h-9 px-3 border-2 border-black rounded-sm bg-white text-black font-extrabold text-xs inline-flex items-center gap-2"
                    title="Cancel"
                  >
                    <FiX />
                    CANCEL
                  </button>
                </div>
              )}

              <Badge label="BOOKED" tone="green" />
              <Badge label={booking.via || "MANUAL"} tone="gray" />
            </div>

            <div className="mt-2 text-sm font-extrabold text-black">
              {booking.patient} <span className="text-black/50 font-semibold">(ID: {booking.pid})</span>
            </div>

            <div className="mt-2 text-xs text-black/70 space-y-1">
              <div>📞 {booking.phone}</div>
              <div>✉️ {booking.email}</div>
              <div>🕒 Booked {booking.bookedAt}</div>
            </div>
          </div>
        </div>

        {!hideEdit && !isEditing ? (
          <button
            className="h-9 w-9 border-2 border-black rounded-sm bg-[#F0B100] inline-flex items-center justify-center"
            title="Edit time"
            onClick={onStartEdit}
          >
            <FiEdit2 className="text-black" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

