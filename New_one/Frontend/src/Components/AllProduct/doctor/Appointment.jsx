//  12/03/2026  Worked By Abishek Intern   Changes - Manage Slot Button Upgrade

import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  FiCalendar,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiPlus,
  FiX,
  FiEdit2,
  FiCheck
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
  const diff = day; // shift to Sunday (no change needed)
  d.setDate(d.getDate() - diff);
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
  const [isSavingWeek, setIsSavingWeek] = useState(false);
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

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const [manageSlotsRipples, setManageSlotsRipples] = useState([]);
  const manageSlotsRippleId = useRef(0);

  const createManageSlotsRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++manageSlotsRippleId.current;
    setManageSlotsRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setManageSlotsRipples((prev) => prev.filter((r) => r.id !== id));
    }, 580);
  };

  const [view, setView] = useState("slots");
  const [showManageSlots, setShowManageSlots] = useState(true);


  const fetchingRef = useRef(false);
  const [hoursByDate, setHoursByDate] = useState(() => {
    const saved = localStorage.getItem("hoursByDate");
    if (saved) return JSON.parse(saved);

    return {}; // empty initially
  });

  const [bookingsByDate, setBookingsByDate] = useState({});


  useEffect(() => {

    const fetchBookings = async () => {

      if (fetchingRef.current) return;
      fetchingRef.current = true;


      try {

        const res = await fetch("http://localhost:3001/api/medibot/appointments")

        if (!res.ok) return;

        const data = await res.json();
        if (!Array.isArray(data)) return;

        const updated = {};

        data.forEach((item) => {

          const rawDate =
            item["Slot booked date"] ||
            item["Slot Booked date"];

          const dateParts = rawDate?.split("-") || [];

          if (dateParts.length !== 3) return;

          const dateKey = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

          let timeSlot =
            item["Slot booked time"] ||
            item["Slot Booked time"] ||
            "00:00";

          if (timeSlot.length > 5) {
            timeSlot = new Date(`1970-01-01T${timeSlot}`)
              .toTimeString()
              .slice(0, 5);
          }

          const dayConfig = hoursByDate[dateKey];

          if (!dayConfig || !dayConfig.open) return;

          const allowedSlots = buildSlotsFromRanges(dayConfig.ranges || []);

          if (!allowedSlots.includes(timeSlot)) {
            console.warn("Invalid slot from webhook:", timeSlot);
            return;
          }

          if (!updated[dateKey]) updated[dateKey] = {};

          updated[dateKey][timeSlot] = {
            patient: item["Name"] || "Unknown",
            pid: item["Patient Id"] || "N/A",
            phone: item["Phone Number"] || item.phone || "N/A",
            email: item["Email"] || "N/A",
            bookedAt: new Date().toLocaleString(),
            via: "CHATBOT"
          };

        });

        setBookingsByDate(prev => {

          const merged = { ...prev };

          Object.keys(updated).forEach(date => {
            merged[date] = {
              ...(merged[date] || {}),
              ...updated[date]
            };
          });

          return merged;

        });

      } catch (err) {

        console.warn("Webhook not active");

      } finally {
        fetchingRef.current = false;
      }

    };

    fetchBookings();

    // 🔥 auto refresh every 5 seconds
    const interval = setInterval(fetchBookings, 5000);

    // 🔥 cleanup when component unmounts
    return () => clearInterval(interval);

  }, [hoursByDate]);




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
    for (let h = 0; h <= 23; h++) {
      for (let m = 0; m <= 45; m += 15) {
        const t = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        opts.push({ value: t, label: timeLabel(t) });
      }
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
    Sun: { open: false, ranges: [{ start: "", end: "" }] },
    Mon: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Tue: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Wed: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Thu: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Fri: { open: true, ranges: [{ start: "09:00", end: "17:00" }] },
    Sat: { open: false, ranges: [{ start: "", end: "" }] },
  }));

  // Month selector state for Manage Slots
  const [manageSlotsMonth, setManageSlotsMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Month-wise hours state
  const [monthHours, setMonthHours] = useState(() => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const hours = {};
    dayNames.forEach(day => {
      if (day === "Sun" || day === "Sat") {
        hours[day] = { open: false, ranges: [{ start: "", end: "" }] };
      } else {
        hours[day] = { open: true, ranges: [{ start: "09:00", end: "17:00" }] };
      }
    });
    return hours;
  });

  // Filter state for Manage Slots
  const [slotFilter, setSlotFilter] = useState("this_month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const filteredMonthDates = useMemo(() => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (slotFilter === "today") {
      return [todayDate];
    }
    if (slotFilter === "tomorrow") {
      return [addDays(todayDate, 1)];
    }
    if (slotFilter === "day_after") {
      return [addDays(todayDate, 2)];
    }
    if (slotFilter === "this_week") {
      const sunStart = startOfWeekMonday(todayDate);
      const dates = [];
      for (let i = 0; i < 7; i++) {
        dates.push(addDays(sunStart, i));
      }
      return dates;
    }
    if (slotFilter === "custom_range") {
      if (!customFrom || !customTo) return [];
      const dates = [];
      let curr = parseKey(customFrom);
      const end = parseKey(customTo);
      for (let i = 0; i < 365; i++) {
        if (curr > end) break;
        dates.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
      }
      return dates;
    }
    // this_month → all days of CURRENT month
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  }, [slotFilter, customFrom, customTo]);

  // Check if date is valid (always true since dates are purely generated from filters)
  const isValidDateForSelection = (date) => true;

  // Update month label to show dynamic date range
  const monthLabel = useMemo(() => {
    if (!filteredMonthDates.length) return "";
    const start = filteredMonthDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const end = filteredMonthDates[filteredMonthDates.length - 1].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `${start} – ${end}`;
  }, [filteredMonthDates]);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  // Month-wise handlers
  const setMonthDayOpen = (day, open) => {
    setMonthHours((p) => ({ ...p, [day]: { ...p[day], open } }));
  };

  const updateMonthRange = (day, idx, patch) =>
    setMonthHours((p) => ({
      ...p,
      [day]: { ...p[day], ranges: p[day].ranges.map((r, i) => (i === idx ? { ...r, ...patch } : r)) },
    }));

  const addMonthRange = (day) =>
    setMonthHours((p) => ({ ...p, [day]: { ...p[day], ranges: [...p[day].ranges, { start: "", end: "" }] } }));

  const removeMonthRange = (day, idx) =>
    setMonthHours((p) => {
      const left = p[day].ranges.filter((_, i) => i !== idx);
      return { ...p, [day]: { ...p[day], ranges: left.length ? left : [{ start: "", end: "" }] } };
    });

  const applyMonthToDates = async () => {
    try {
      setIsSavingWeek(true);

      // Send webhook payload (same format as applyWeekToDates)
      if (!filteredMonthDates.length) return;

      const payload = {
        weekStart: toDDMMYYYY(filteredMonthDates[0]),
        weekEnd: toDDMMYYYY(filteredMonthDates[filteredMonthDates.length - 1]),
        schedule: filteredMonthDates.map((date) => {
          const key = toKey(date);
          const dayNameShort = date.toLocaleDateString("en-US", { weekday: "short" });
          const dayConfig = hoursByDate[key] || { open: false, ranges: [] };

          return {
            date: toDDMMYYYY(date),
            day: dayNameShort,
            open: !!dayConfig.open,
            ranges: dayConfig.ranges || [],
            slots: dayConfig.open
              ? buildSlotsFromRanges(dayConfig.ranges || [])
              : [],
          };
        }),
      };

      try {
        await fetch("http://localhost:3001/api/medibot/save-schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("Webhook saving failed, but local state was already preserved.", err);
      }

      showToast("Schedule saved! Slots updated below.", "success");
    } catch (error) {
      console.error("Error applying month schedule:", error);
      showToast("Failed to apply month schedule", "error");
    } finally {
      setIsSavingWeek(false);
    }
  };

  // Month navigation handlers
  const navigateMonth = (direction) => {
    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const newMonth = new Date(manageSlotsMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);

    // Only allow navigation within current year and not before current month
    if (newMonth.getFullYear() === today.getFullYear() && newMonth >= currentMonth) {
      setManageSlotsMonth(newMonth);
    }
  };

  const applyWeekToDates = async () => {
    try {
      setIsSavingWeek(true); // 🔥 START LOADER

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
    } finally {
      setIsSavingWeek(false); // 🔥 STOP LOADER
    }
  };
  const dayHours = useMemo(
    () =>
      hoursByDate[selectedKey] || {
        open: true,
        ranges: [{ start: "09:00", end: "17:00" }],
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

    let conflictFound = false;
    setBookingsByDate((prev) => {
      const day = prev[selectedKey] || {};
      const booking = day[from];
      if (!booking) return prev;
      if (day[to]) {
        conflictFound = true;
        return prev;
      }
      const nextDay = { ...day };
      delete nextDay[from];
      nextDay[to] = { ...booking, bookedAt: new Date().toLocaleString(), via: booking.via || "MANUAL", isUpdated: true, originalTime: booking.originalTime || from };
      return { ...prev, [selectedKey]: nextDay };
    });

    if (conflictFound) {
      showToast("That slot is already booked. Choose another time.", "error");
      return;
    }
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



  const navMonth = (dir) => setMonthCursor((p) => new Date(p.getFullYear(), p.getMonth() + dir, 1));

  const TopToggle = () => (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => { setView("slots"); setShowManageSlots(true); }}
        className={view === "slots" && showManageSlots ? "bg-black text-white" : "bg-white text-black"}
      >
        <FiClock />
        SLOTS
      </Button>
      <Button onClick={() => setView("calendar")} className={view === "calendar" ? "bg-black text-white" : "bg-white text-black"}>
        <FiCalendar />
        CALENDAR
      </Button>
    </div>
  );

  const isSelected = (key) => key === selectedKey;

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 1000px;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
          overflow: hidden;
        }

        @keyframes toastSlide {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-toastSlide {
          animation: toastSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes ripple-expand {
          0%   { transform: scale(0); opacity: 0.55; }
          80%  { transform: scale(4); opacity: 0.15; }
          100% { transform: scale(5); opacity: 0; }
        }

        .ripple-circle {
          position: absolute;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          margin-top: -40px;
          margin-left: -40px;
          background: rgba(0, 0, 0, 0.22);
          animation: ripple-expand 0.55s ease-out forwards;
          pointer-events: none;
        }

        @keyframes btn-press {
          0%   { transform: scale(1); }
          40%  { transform: scale(0.93); }
          100% { transform: scale(1); }
        }

        .btn-press {
          animation: btn-press 0.22s ease-out forwards;
        }
      `}</style>
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

            {/* Calendar / Slots buttons */}
            <TopToggle />
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="TODAY'S BOOKINGS" value={stats.todayBookings} subtitle="patients scheduled" borderColor={CYAN} iconBg={CYAN} icon={<FiCalendar />} />
            <StatCard title="AVAILABLE SLOTS" value={stats.available < 0 ? 0 : stats.available} subtitle="Open for booking" borderColor={BLACK} iconBg="#fff" icon={<FiClock />} />
            <StatCard title="TOTAL SLOTS" value={stats.totalSlots} subtitle="slots configured" borderColor={YELLOW} iconBg={YELLOW} icon={<FiClock />} />
          </div>




          {view === "slots" ? (
            <>
              <div className="mt-6">
                <button
                  id="manage-slots-btn"
                  onClick={(e) => {
                    createManageSlotsRipple(e);
                    // brief press class
                    e.currentTarget.classList.remove("btn-press");
                    void e.currentTarget.offsetWidth; // reflow trick
                    e.currentTarget.classList.add("btn-press");
                    setShowManageSlots((v) => !v);
                  }}
                  className="relative overflow-hidden h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs inline-flex items-center gap-2 bg-[#00B8DB] text-black select-none"
                  style={{ userSelect: "none" }}
                >
                  {manageSlotsRipples.map((r) => (
                    <span
                      key={r.id}
                      className="ripple-circle"
                      style={{ left: r.x, top: r.y }}
                    />
                  ))}
                  {showManageSlots ? <FiX /> : <FiPlus />}
                  MANAGE SLOTS (MONTH)
                </button>
              </div>

              {showManageSlots && (
                <div className="mt-4 border-2 rounded-md bg-white p-5 animate-slideDown" style={{ borderColor: CYAN }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-extrabold text-black uppercase">HOURS (MONTH)</div>
                      <div className="text-xs text-black/55 mt-1">
                        Set hours for the month: <b>{monthLabel}</b>
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

                    <div className="text-sm font-semibold text-black px-3 py-1 border-2 border-black rounded-sm bg-[#00B8DB]">
                      {monthLabel}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="text-xs text-black/55">
                      Configuring hours selectively based on your filter
                    </div>

                    <Button
                      onClick={applyMonthToDates}
                      disabled={isSavingWeek}
                      className={`bg-[#00B8DB] text-black ${isSavingWeek ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {isSavingWeek ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="black" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="black" d="M4 12a8 8 0 018-8v4l3-3-3-3v4A12 12 0 000 12h4z" />
                          </svg>
                          SAVING...
                        </>
                      ) : (
                        <>
                          <FiCheck />
                          SAVE SCHEDULE
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="mt-4 border-t border-black/10 pt-4">

                    {/* Filter dropdown */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="relative inline-flex min-w-[180px]">
                        <select
                          value={slotFilter}
                          onChange={(e) => setSlotFilter(e.target.value)}
                          className="h-9 w-full pl-3 pr-8 border-2 border-black rounded-sm bg-white text-xs font-extrabold text-black outline-none appearance-none cursor-pointer"
                        >
                          <option value="today">Today</option>
                          <option value="tomorrow">Tomorrow</option>
                          <option value="day_after">Day After Tomorrow</option>
                          <option value="this_week">This Week</option>
                          <option value="this_month">This Month</option>
                          <option value="custom_range">Custom Range</option>
                        </select>
                        <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black text-[15px]" />
                      </div>
                      {slotFilter !== "this_month" && (
                        <button
                          onClick={() => {
                            setSlotFilter("this_month");
                            setCustomFrom("");
                            setCustomTo("");
                          }}
                          className="text-[11px] font-extrabold underline underline-offset-2 hover:no-underline text-black/60 hover:text-black cursor-pointer bg-transparent border-none p-0"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>

                    {/* Custom date range pickers */}
                    {slotFilter === "custom_range" && (
                      <div className="flex flex-wrap items-center gap-2 mb-4 p-3 border-2 border-black/20 rounded-md bg-[#FAFAFA]">
                        <span className="text-[11px] font-extrabold text-black/60 uppercase tracking-wide">From</span>
                        <input
                          type="date"
                          value={customFrom}
                          min={toKey(new Date())}
                          max={toKey(addDays(new Date(), 29))}
                          onChange={(e) => {
                            setCustomFrom(e.target.value);
                            // auto-clear To if it's before new From
                            if (customTo && e.target.value > customTo) setCustomTo("");
                          }}
                          className="h-7 px-2 border-2 border-black rounded-sm text-[11px] font-extrabold bg-white outline-none"
                        />
                        <span className="text-black/40 font-extrabold">—</span>
                        <span className="text-[11px] font-extrabold text-black/60 uppercase tracking-wide">To</span>
                        <input
                          type="date"
                          value={customTo}
                          min={customFrom || toKey(new Date())}
                          max={toKey(addDays(new Date(), 29))}
                          onChange={(e) => setCustomTo(e.target.value)}
                          className="h-7 px-2 border-2 border-black rounded-sm text-[11px] font-extrabold bg-white outline-none"
                        />
                        {customFrom && customTo && (
                          <span className="text-[11px] text-black/50 font-semibold ml-1">
                            {filteredMonthDates.length} day{filteredMonthDates.length !== 1 ? "s" : ""} selected
                          </span>
                        )}
                      </div>
                    )}

                    {/* Date list (filtered) */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredMonthDates.length === 0 ? (
                        <div className="text-sm text-black/50 py-4 text-center">
                          {slotFilter === "custom_range" && (!customFrom || !customTo)
                            ? "Pick a From and To date above to configure slots."
                            : "No dates in this range."}
                        </div>
                      ) : filteredMonthDates.map((date) => {
                        const key = toKey(date);
                        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                        const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                        const isToday = key === toKey(new Date());
                        const isDateSelected = key === selectedKey;
                        const isPastDate = key < toKey(new Date());

                        // Get existing hours for this date or use default
                        const existingHours = hoursByDate[key] || {
                          open: true,
                          ranges: [{ start: "09:00", end: "17:00" }]
                        };

                        return (
                          <div
                            key={key}
                            onClick={() => { if (!isPastDate) setSelectedKey(key); }}
                            className={`border-2 rounded-md p-3 transition-all select-none ${isPastDate
                              ? "opacity-50 cursor-not-allowed bg-[#F9F9F9] border-black/10"
                              : isDateSelected
                                ? "cursor-pointer border-[#00B8DB] bg-[#EAFBFF] shadow-[0_0_15px_rgba(0,184,219,0.3)] text-black"
                                : isToday
                                  ? "cursor-pointer border-black bg-[#FAFAFA]"
                                  : "cursor-pointer border-black/10 bg-white hover:border-black/30"
                              }`}
                          >
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              {/* Date label */}
                              <div className={`text-sm font-extrabold flex items-center gap-1.5 ${isDateSelected ? "text-[#00B8DB]" : "text-black"}`}>
                                <span>{dayName}, {date.getDate()} {date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                                {isDateSelected && <span className="text-[10px] uppercase opacity-70 font-black tracking-wider">(Selected)</span>}
                              </div>

                              {/* Spacer to push toggle to the right */}
                              <div className="flex-1" />

                              <div className={isPastDate ? "pointer-events-none" : ""} onClick={(e) => e.stopPropagation()}>
                                <Toggle
                                  checked={existingHours.open}
                                  onChange={(open) => {
                                    if (isPastDate) return;
                                    setHoursByDate(prev => ({
                                      ...prev,
                                      [key]: { ...existingHours, open }
                                    }));
                                  }}
                                />
                              </div>

                              <div className={`text-sm font-semibold text-black/70`}>
                                {existingHours.open ? "Open" : "Closed"}
                              </div>

                              {isToday && (
                                <span className="text-xs px-2 py-1 bg-[#00B8DB] text-black font-extrabold rounded-sm">
                                  TODAY
                                </span>
                              )}
                            </div>

                            {existingHours.open && (
                              <div className={`space-y-2 ${isPastDate ? "pointer-events-none opacity-60" : ""}`}>
                                {existingHours.ranges.map((r, idx) => (
                                  <div key={idx} className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                    <SelectTime
                                      value={r.start}
                                      onChange={(start) => {
                                        const newRanges = [...existingHours.ranges];
                                        newRanges[idx] = { ...newRanges[idx], start };
                                        setHoursByDate(prev => ({
                                          ...prev,
                                          [key]: { ...existingHours, ranges: newRanges }
                                        }));
                                      }}
                                      placeholder="Opens at"
                                      options={TIME_OPTIONS}
                                      size="sm"
                                    />
                                    <div className="text-black/40 font-extrabold">—</div>
                                    <SelectTime
                                      value={r.end}
                                      onChange={(end) => {
                                        const newRanges = [...existingHours.ranges];
                                        newRanges[idx] = { ...newRanges[idx], end };
                                        setHoursByDate(prev => ({
                                          ...prev,
                                          [key]: { ...existingHours, ranges: newRanges }
                                        }));
                                      }}
                                      placeholder="Closes at"
                                      options={TIME_OPTIONS}
                                      size="sm"
                                    />

                                    {existingHours.ranges.length > 1 && (
                                      <IconBtn
                                        onClick={() => {
                                          const newRanges = existingHours.ranges.filter((_, i) => i !== idx);
                                          setHoursByDate(prev => ({
                                            ...prev,
                                            [key]: { ...existingHours, ranges: newRanges.length ? newRanges : [{ start: "", end: "" }] }
                                          }));
                                        }}
                                        title="Remove range"
                                      >
                                        <FiX />
                                      </IconBtn>
                                    )}

                                    <div className="flex-1" />

                                    {idx === existingHours.ranges.length - 1 && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setHoursByDate(prev => ({
                                            ...prev,
                                            [key]: {
                                              ...existingHours,
                                              ranges: [...existingHours.ranges, { start: "", end: "" }]
                                            }
                                          }));
                                        }}
                                        className="text-sm font-extrabold underline"
                                        style={{ color: CYAN }}
                                      >
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
    </>
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
              {booking.isUpdated && <Badge label="UPDATED" tone="cyan" />}
            </div>

            <div className="mt-2 text-sm font-extrabold text-black">
              {booking.patient} <span className="text-black/50 font-semibold">(ID: {booking.pid})</span>
            </div>

            <div className="mt-2 text-xs text-black/70 space-y-1">
              <div>📞 {booking.phone}</div>
              <div>✉️ {booking.email}</div>
              <div>🕒 Booked {booking.bookedAt}</div>
              {booking.originalTime && (
                <div className="text-[#00B8DB] font-bold mt-1.5 bg-[#EAFBFF] px-2 py-1 rounded-sm border-l-2 border-[#00B8DB]">
                  🔄 Rescheduled from {timeLabel(booking.originalTime)} to {timeLabelText}
                </div>
              )}
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

