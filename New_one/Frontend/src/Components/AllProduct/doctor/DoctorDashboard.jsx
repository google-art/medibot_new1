import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiCalendar,
  FiClock,
  FiFileText,
  FiSend,
  FiX,
  FiShare2,
  FiClipboard,
  FiCheckCircle,
  FiUser,
  FiPlus,
  FiChevronDown,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const COLORS = {
  black: "#0D0D0D",
  cyan: "#00B8DB",
  yellow: "#F0B100",
  page: "#FEFCE8",
  green: "#00C950",
};

/* ---------- helpers ---------- */

const openEmail = ({ to, subject, body }) => {
  const link = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject || ""
  )}&body=${encodeURIComponent(body || "")}`;
  window.location.href = link;
};

/* ---------- UI pieces ---------- */

const StatCard = ({
  title,
  value,
  subtitle,
  border,
  iconBg,
  icon: Icon,
  valuePrefix,
}) => {
  return (
    <div
      className={`border-2 ${border} bg-white rounded-md p-5 flex items-start justify-between`}
    >
      <div>
        <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
          {title}
        </div>
        <div className="mt-2 text-4xl font-extrabold text-black leading-none">
          {valuePrefix ? <span className="mr-1">{valuePrefix}</span> : null}
          {value}
        </div>
        <div className="mt-2 text-sm text-black/60">{subtitle}</div>
      </div>

      <div
        className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${iconBg}`}
      >
        <Icon className="text-black text-xl" />
      </div>
    </div>
  );
};

const SuggestionCard = ({
  icon: Icon,
  title,
  desc,
  confidence,
  cta,
  onPrimary,
  onReject,
}) => {
  return (
    <div className="border-2 border-black bg-white rounded-md">
      <div className="p-4 flex items-start gap-3">
        <div className="h-9 w-9 border-2 border-black rounded-md flex items-center justify-center">
          <Icon className="text-black" />
        </div>

        <div className="flex-1">
          <div className="font-extrabold text-sm text-black">{title}</div>
          <div className="text-xs text-black/60 mt-1">{desc}</div>

          <div className="mt-2 inline-flex items-center gap-2 border border-black/15 rounded px-2 py-1 text-[10px] font-extrabold bg-white">
            <span className="text-black/70">AI CONFIDENCE:</span>
            <span className="text-black">{confidence}%</span>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 p-3 flex gap-3">
        <button
          type="button"
          onClick={onPrimary}
          className="flex-1 h-9 bg-[#00B8DB] text-black font-extrabold text-xs rounded-sm border-2 border-black flex items-center justify-center gap-2"
        >
          <FiSend />
          {cta}
        </button>

        <button
          type="button"
          onClick={onReject}
          className="w-24 h-9 bg-[#0D0D0D] text-white font-extrabold text-xs rounded-sm border-2 border-black flex items-center justify-center gap-2"
        >
          <FiX />
          REJECT
        </button>
      </div>
    </div>
  );
};

const QuickActions = ({ onGo }) => {
  const actions = [
    {
      label: "NEW CONSULTATION",
      icon: FiPlus,
      bg: "bg-[#00B8DB]",
      key: "consultation",
    },
    {
      label: "MANAGE SLOTS",
      icon: FiCalendar,
      bg: "bg-white",
      key: "appointment",
    },
    {
      label: "CREATE POST",
      icon: FiShare2,
      bg: "bg-[#F0B100]",
      key: "socialmedia",
    },
    {
      label: "VIEW REPORTS",
      icon: FiFileText,
      bg: "bg-[#00B8DB]",
      key: "patient",
    },
  ];

  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
      <div className="text-sm font-extrabold text-black uppercase">
        Quick Actions
      </div>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map(({ label, icon: Icon, bg, key }) => (
          <button
            key={label}
            type="button"
            onClick={() => onGo(key)}
            className={`h-10 rounded-sm border-2 border-black ${bg} text-black font-extrabold text-xs flex items-center justify-center gap-2`}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

const TodayAppointments = ({ rows = [], onViewAll }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xs font-extrabold text-black/20 uppercase tracking-widest">
          Today's Appointments
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="h-7 px-3 bg-[#00B8DB] text-black font-extrabold text-[10px] border-2 border-black rounded-sm"
        >
          VIEW ALL
        </button>
      </div>

      <div className="mt-2 border-2 border-black bg-white rounded-md p-3">
        {rows.length === 0 ? (
  <div className="text-sm text-black/60">
    No appointments today
  </div>
) : (
  <div className="space-y-3">

    {rows.map((r, i) => (

      <div
        key={i}
        className="border-2 border-black rounded-sm p-3 flex items-center gap-3"
      >

        <div className="h-9 w-9 bg-[#00B8DB] border-2 border-black rounded-sm flex items-center justify-center">
          <FiUser className="text-black" />
        </div>

        <div className="flex-1 leading-tight">
          <div className="font-extrabold text-sm text-black">
            {r.name}
          </div>

          <div className="text-xs text-black/55">
            {r.tag}
          </div>
        </div>

        <div className="h-6 px-2 bg-[#00B8DB] border-2 border-black rounded-sm font-extrabold text-[10px] text-black flex items-center">
          {r.time}
        </div>

      </div>

    ))}

  </div>
)}
      </div>
    </div>
  );
};

const RecentActivity = ({ items = [] }) => {
  return (
    <div>
      <div className="text-xs font-extrabold text-black/20 uppercase tracking-widest">
        Recent Activity
      </div>

      <div className="mt-2 border-2 border-[#F0B100] bg-white rounded-md p-3 space-y-3">

        {items.length === 0 ? (
          <div className="text-sm text-black/60">
            No recent activity
          </div>
        ) : (
          items.map((a, i) => (
            <div
              key={i}
              className="border-2 border-[#00B8DB] rounded-sm p-3 flex items-start gap-3"
            >
              <div className="h-9 w-9 bg-[#0D0D0D] rounded-sm flex items-center justify-center border-2 border-black">
                <FiClipboard className="text-white" />
              </div>

              <div className="flex-1">
                <div className="font-extrabold text-sm text-black">{a.title}</div>
                <div className="text-xs text-black/60 mt-1">{a.desc}</div>
                <div className="text-[10px] text-black/45 mt-1">{a.time}</div>
              </div>

              <FiCheckCircle className="text-[#00C950] text-lg mt-0.5" />
            </div>
          ))
        )}

      </div>
    </div>
  );
};

const RevenueSummary = ({
  onViewDetails,
  collectedAmount,
  pendingAmount,
  consultations,
  pendingCount,
  currencySymbol
}) => {
const now = new Date();

const monthYear = now.toLocaleString("en-IN", {
  month: "long",
  year: "numeric",
});

  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
      <div className="font-extrabold text-sm text-black uppercase">
        Revenue Summary - {monthYear}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="border-2 border-[#00C950] rounded-md p-4 bg-[#F2FFF8]">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Collected
          </div>
          <div className="mt-2 text-2xl font-extrabold text-black">{currencySymbol}{collectedAmount.toLocaleString("en-IN")}</div>
          <div className="text-xs text-black/60 mt-1">{consultations} consultations</div>
        </div>

        <div className="border-2 border-[#F0B100] rounded-md p-4 bg-[#FFFBEE]">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Pending
          </div>
          <div className="mt-2 text-2xl font-extrabold text-black">{currencySymbol}{pendingAmount.toLocaleString("en-IN")}</div>
          <div className="text-xs text-black/60 mt-1">{pendingCount} pending</div>
        </div>

        <div className="border-2 border-[#00B8DB] rounded-md p-4 bg-[#EAFBFF]">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Total Expected
          </div>
          <div className="mt-2 text-2xl font-extrabold text-black">{currencySymbol}{(collectedAmount + pendingAmount).toLocaleString("en-IN")}</div>
          <div className="text-xs text-black/60 mt-1">{consultations + pendingCount} total</div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="h-8 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm"
          onClick={onViewDetails}
        >
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
};

/* ---------- Notification Panel ---------- */

const NotificationPanel = ({
  open,
  showAll,
  onToggleAll,
  onClose,
  notifications,
}) => {
  if (!open) return null;

  if (!notifications || notifications.length === 0) {
    return (
      <div className="absolute right-0 top-[42px] w-[340px] border-2 border-black bg-white rounded-md shadow-xl z-50 p-4">
        <p className="text-sm text-black/60">No new notifications</p>
      </div>
    );
  }


  const visible = showAll ? notifications : notifications.slice(0, 3);

  return (
    <div className="absolute right-0 top-[42px] w-[340px] border-2 border-black bg-white rounded-md shadow-xl z-50 overflow-hidden">
      <div className="p-3 border-b border-black/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#00B8DB]" />
          <div className="text-xs font-extrabold text-black uppercase">
            Notifications
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="h-7 w-7 border-2 border-black rounded-sm flex items-center justify-center hover:bg-black/5"
          title="Close"
        >
          <FiX />
        </button>
      </div>

      <div className="p-3 space-y-2">
        {visible.map((n) => (
          <div
            key={n.title + n.time}
            className={`border-2 rounded-sm p-3 ${n.pill}`}
          >
            <div className="flex items-start gap-2">
              <span className={`mt-1.5 h-2 w-2 rounded-full ${n.dot}`} />
              <div className="flex-1">
                <div className="font-extrabold text-sm text-black">
                  {n.title}
                </div>
                <div className="text-xs text-black/60 mt-1">{n.desc}</div>
                <div className="text-[10px] text-black/45 mt-1">{n.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10 p-3 flex gap-3">
        <button
          type="button"
          onClick={onToggleAll}
          className="flex-1 h-9 bg-[#00B8DB] text-black font-extrabold text-xs rounded-sm border-2 border-black flex items-center justify-center gap-2"
        >
          <FiChevronDown
            className={showAll ? "rotate-180 transition" : "transition"}
          />
          {showAll ? "SHOW LESS" : "VIEW ALL"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-24 h-9 bg-[#0D0D0D] text-white font-extrabold text-xs rounded-sm border-2 border-black flex items-center justify-center gap-2"
        >
          <FiX />
          CLOSE
        </button>
      </div>
    </div>
  );
};

/* ---------- Dashboard Page ---------- */
const pad2 = (n) => String(n).padStart(2, "0");

const t24ToMinutes = (t24) => {
  const [h, m] = t24.split(":").map(Number);
  return h * 60 + m;
};

const minutesToT24 = (min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${pad2(h)}:${pad2(m)}`;
};

const buildSlotsFromRanges = (ranges) => {
  const out = new Set();
  for (const r of ranges) {
    if (!r.start || !r.end) continue;

    const startMin = t24ToMinutes(r.start);
    const endMin = t24ToMinutes(r.end);

    for (let m = startMin; m < endMin; m += 15) {
      out.add(minutesToT24(m));
    }
  }
  return [...out];
};

const formatTime = (t24) => {
  const [hh, mm] = t24.split(":").map(Number);
  const am = hh < 12;
  const h12 = hh % 12 === 0 ? 12 : hh % 12;

  return `${String(h12).padStart(2, "0")}:${String(mm).padStart(2, "0")} ${
    am ? "AM" : "PM"
  }`;
};


const Dashboard = () => {
  const navigate = useNavigate();
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [todayRows, setTodayRows] = useState([]);
  const [availableSlots, setAvailableSlots] = useState(0);
  const [reportsGenerated, setReportsGenerated] = useState(0);

  const [pendingAmount, setPendingAmount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifShowAll, setNotifShowAll] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifWrapRef = useRef(null);

  // Revenue summary states
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [consultations, setConsultations] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  // track rejected suggestions (hide on page)
  const [rejectedSuggestions, setRejectedSuggestions] = useState(() => new Set());

  const DOCTOR_BASE = "/maindoctor";

  const go = (routeKey) => {
    const map = {
      consultation: `${DOCTOR_BASE}/consultation`,
      appointment: `${DOCTOR_BASE}/appointment`,
      socialmedia: `${DOCTOR_BASE}/socialmedia`,
      patient: `${DOCTOR_BASE}/patients`,
      billing: `${DOCTOR_BASE}/billing`, // ✅ add billing route
      dashboard: `${DOCTOR_BASE}/dashboard`,
      capture: `${DOCTOR_BASE}/capture`,
    };

    navigate(map[routeKey] || map.dashboard);
  };

  useEffect(() => {
    const onDown = (e) => {
      if (!notifOpen) return;
      if (e.key === "Escape") {
        setNotifOpen(false);
        setNotifShowAll(false);
      }
    };



    const onClick = (e) => {
      if (!notifOpen) return;
      const el = notifWrapRef.current;
      if (el && !el.contains(e.target)) {
        setNotifOpen(false);
        setNotifShowAll(false);
      }
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("mousedown", onClick);
    };
  }, [notifOpen]);

  useEffect(() => {
    let lastBookingId = null;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/medibot/latest-booking"
        );

        const data = await res.json();

        if (!data || !data.latest) return;

        const booking = data.latest;

        if (booking["Book-id"] === lastBookingId) return;

        lastBookingId = booking["Book-id"];

        setNotifications((prev) => [
          {
            id: Date.now(),
            title: `${booking.Name} - New appointment booked`,
            desc: "",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            pill: "bg-white border-black",
            dot: "bg-[#00B8DB]",
          },
          ...prev,
        ]);
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

useEffect(() => {

  const getTodayAppointments = () => {

    const stored = localStorage.getItem("bookingsByDate");

    if (!stored) {
      setTodayAppointments(0);
      setTodayRows([]);
      return;
    }

    const bookings = JSON.parse(stored);

    const todayKey = new Date().toISOString().slice(0,10);

    const todayBookings = bookings[todayKey] || {};

    const rows = Object.entries(todayBookings)
  .map(([time, booking]) => ({
    name: booking.patient,
    tag: booking.via === "CHATBOT" ? "New Patient" : booking.via || "Consultation",
    time: formatTime(time)
  }))
      .sort((a,b)=>a.time.localeCompare(b.time));

    setTodayAppointments(rows.length);
    setTodayRows(rows);

  };

  getTodayAppointments();

  const interval = setInterval(getTodayAppointments, 2000);

  return () => clearInterval(interval);

}, []);

  useEffect(() => {
    const calculateAvailableSlots = () => {
      const hoursStored = localStorage.getItem("hoursByDate");
      const bookingsStored = localStorage.getItem("bookingsByDate");

      if (!hoursStored) {
        setAvailableSlots(0);
        return;
      }

      const hoursByDate = JSON.parse(hoursStored);
      const bookingsByDate = bookingsStored
        ? JSON.parse(bookingsStored)
        : {};

      const todayKey = new Date().toISOString().slice(0, 10);

      const todayHours = hoursByDate[todayKey];
      const todayBookings = bookingsByDate[todayKey] || {};

      if (!todayHours || !todayHours.open) {
        setAvailableSlots(0);
        return;
      }

      const allSlots = buildSlotsFromRanges(todayHours.ranges);
      const bookedCount = Object.keys(todayBookings).length;

      const available = allSlots.length - bookedCount;

      setAvailableSlots(available > 0 ? available : 0);
    };

    calculateAvailableSlots();

    const interval = setInterval(calculateAvailableSlots, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getReportsCount = () => {
      const stored = localStorage.getItem("totalReportsGenerated");
      setReportsGenerated(stored ? Number(stored) : 0);
    };

    getReportsCount();

    const interval = setInterval(getReportsCount, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadBillingSummary = () => {
      const stored = localStorage.getItem("billingSummary");

      if (!stored) {
        setPendingAmount(0);
        setPendingCount(0);
        return;
      }

      const data = JSON.parse(stored);

      setPendingAmount(data.pendingAmount || 0);
      setPendingCount(data.pendingCount || 0);
    };

    loadBillingSummary();

    const interval = setInterval(loadBillingSummary, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {

  const calculateRevenue = () => {

    const stored = localStorage.getItem("billingRecords");

    if (!stored) return;

    const records = JSON.parse(stored);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let collected = 0;
    let pending = 0;
    let consult = 0;
    let pendingC = 0;

    records.forEach(r => {

      const d = new Date(r.date);

      if (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      ) {

        consult++;

        if (r.status === "PAID") {
          collected += Number(r.amount || 0);
        }

        if (r.status === "PENDING") {
          pending += Number(r.amount || 0);
          pendingC++;
        }

      }

    });

    setCollectedAmount(collected);
    setPendingAmount(pending);
    setConsultations(consult);
    setPendingCount(pendingC);

  };

  calculateRevenue();

  const interval = setInterval(calculateRevenue, 2000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {
  const storedBilling = localStorage.getItem("billingSettings");

  if (!storedBilling) return;

  const billing = JSON.parse(storedBilling);

  const getSymbol = (currency) => {
    switch (currency) {
      case "US Dollar (USD)":
        return "$";
      case "Euro (EUR)":
        return "€";
      case "UAE Dirham (AED)":
        return "د.إ";
      default:
        return "₹";
    }
  };

  setCurrencySymbol(getSymbol(billing.currency));
}, []);

  const rejectSuggestion = (key) => {
    setRejectedSuggestions((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const sendFollowupEmail = () => {
    openEmail({
      to: "clinic@example.com",
      subject: "Follow-up reminders",
      body:
        "Hi,\n\nPlease send follow-up reminders to the patients due today.\n\nThanks,\nClinic Team",
    });
  };

  const sendPaymentEmail = () => {
    openEmail({
      to: "billing@example.com",
      subject: "Payment reminder",
      body:
        "Hi,\n\nThis is a gentle reminder regarding the pending payment of ₹200.\n\nThanks,\nClinic Team",
    });
  };

  const stats = [
    {
      title: "TODAY'S APPOINTMENTS",
      value: todayAppointments,
      subtitle: (
        <span className="inline-flex items-center gap-2">
          <span className="text-[#00C950] font-extrabold">▲</span>
          <span className="text-black/60">+2 from yesterday</span>
        </span>
      ),
      border: "border-[#00B8DB]",
      iconBg: "bg-[#00B8DB]",
      icon: FiCalendar,
    },
    {
      title: "PENDING PAYMENTS",
      value: pendingAmount.toLocaleString("en-IN"),
      valuePrefix: currencySymbol,
      subtitle: `${pendingCount} payments due`,
      border: "border-[#F0B100]",
      iconBg: "bg-[#F0B100]",
      icon: FaRupeeSign,
    },
    {
      title: "REPORTS GENERATED",
      value: reportsGenerated,
      subtitle: "This week",
      border: "border-black",
      iconBg: "bg-white",
      icon: FiFileText,
    },
    {
      title: "AVAILABLE SLOTS",
      value: availableSlots,
      subtitle: "Open for booking",
      border: "border-[#00B8DB]",
      iconBg: "bg-[#00B8DB]",
      icon: FiClock,
    },
  ];

  const suggestions = [
    {
      key: "followup",
      icon: FiSend,
      title: "Send Follow-up Reminder",
      desc: "3 patients need follow-up reminders for their next appointments",
      confidence: 92,
      cta: "SEND EMAIL",
      onPrimary: sendFollowupEmail,
    },
    {
      key: "social",
      icon: FiShare2,
      title: "Post Health Tip",
      desc: "It's been 3 days since your last social media post. Share a heart health tip?",
      confidence: 87,
      cta: "GO TO SOCIAL",
      onPrimary: () => go("socialmedia"),
    },
    {
      key: "payment",
      icon: FaRupeeSign,
      title: "Payment Follow-up",
      desc: "Sneha Reddy has an overdue payment of ₹200 from 7 days ago",
      confidence: 95,
      cta: "SEND EMAIL",
      onPrimary: sendPaymentEmail,
    },
    {
      key: "buffer",
      icon: FiCalendar,
      title: "Schedule Buffer Time",
      desc: "You have back-to-back appointments. Consider adding 10-min buffer slots",
      confidence: 78,
      cta: "MANAGE SLOTS",
      onPrimary: () => go("appointment"),
    },
  ];

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: COLORS.page,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      }}
    >
      <main className="mx-auto max-w-[1100px] px-6 py-7">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-black tracking-tight">
              DASHBOARD
            </h1>
            <p className="text-sm text-black/55 mt-1">
              Your clinic command center - AI-powered insights at a glance
            </p>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifWrapRef}>
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-extrabold text-black/80 hover:text-black mt-1"
              onClick={() => {
                setNotifOpen((v) => !v);
                setNotifShowAll(false);
              }}
              aria-expanded={notifOpen}
              aria-haspopup="dialog"
            >
              <span className="relative inline-flex">
                <FiBell />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#F0B100] border border-black" />
              </span>
              NOTIFICATIONS
            </button>

            <NotificationPanel
              open={notifOpen}
              showAll={notifShowAll}
              onToggleAll={() => setNotifShowAll((v) => !v)}
              onClose={() => {
                setNotifOpen(false);
                setNotifShowAll(false);
              }}
              notifications={notifications}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        {/* Revenue (VIEW DETAILS -> Billing page) */}
        <div className="mt-6">
          <RevenueSummary
  onViewDetails={() => go("billing")}
  collectedAmount={collectedAmount}
  pendingAmount={pendingAmount}
  consultations={consultations}
  pendingCount={pendingCount}
  currencySymbol={currencySymbol}
/>
        </div>

        {/* AI Suggestions */}
        <div className="mt-8">
          <div className="text-xs font-extrabold text-black/20 uppercase tracking-widest">
            AI Suggestions
          </div>

          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions
              .filter((s) => !rejectedSuggestions.has(s.key))
              .map((s) => (
                <SuggestionCard
                  key={s.key}
                  icon={s.icon}
                  title={s.title}
                  desc={s.desc}
                  confidence={s.confidence}
                  cta={s.cta}
                  onPrimary={s.onPrimary}
                  onReject={() => rejectSuggestion(s.key)}
                />
              ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <QuickActions onGo={go} />
        </div>

        {/* Today + Activity */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TodayAppointments
  rows={todayRows}
  onViewAll={() => go("appointment")}
/>
          <RecentActivity />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
