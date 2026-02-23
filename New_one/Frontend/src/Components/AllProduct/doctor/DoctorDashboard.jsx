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

const TodayAppointments = ({ onViewAll }) => {
  const rows = [
    { name: "Rajesh Kumar", tag: "Follow-up", time: "09:00 AM" },
    { name: "Priya Sharma", tag: "New Patient", time: "10:00 AM" },
    { name: "Amit Patel", tag: "Consultation", time: "02:00 PM" },
  ];

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
        <div className="space-y-3">
          {rows.map((r) => (
            <div
              key={r.name}
              className="border-2 border-black rounded-sm p-3 flex items-center gap-3"
            >
              <div className="h-9 w-9 bg-[#00B8DB] border-2 border-black rounded-sm flex items-center justify-center">
                <FiUser className="text-black" />
              </div>

              <div className="flex-1 leading-tight">
                <div className="font-extrabold text-sm text-black">{r.name}</div>
                <div className="text-xs text-black/55">{r.tag}</div>
              </div>

              <div className="h-6 px-2 bg-[#00B8DB] border-2 border-black rounded-sm font-extrabold text-[10px] text-black flex items-center">
                {r.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RecentActivity = () => {
  const items = [
    {
      title: "New Appointment Booked",
      desc: "Rajesh Kumar booked via chatbot for 9:00 AM",
      time: "01:13 PM",
    },
    {
      title: "Payment Received",
      desc: "Priya Sharma paid ₹200 via UPI",
      time: "12:43 PM",
    },
    {
      title: "Report Sent",
      desc: "Medical report sent to Amit Patel via WhatsApp & Email",
      time: "12:28 PM",
    },
    {
      title: "Social Post Published",
      desc: "Health tips post shared on LinkedIn & Instagram",
      time: "11:28 AM",
    },
  ];

  return (
    <div>
      <div className="text-xs font-extrabold text-black/20 uppercase tracking-widest">
        Recent Activity
      </div>

      <div className="mt-2 border-2 border-[#F0B100] bg-white rounded-md p-3 space-y-3">
        {items.map((a) => (
          <div
            key={a.title}
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
        ))}
      </div>
    </div>
  );
};

const RevenueSummary = ({ onViewDetails }) => {
  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
      <div className="font-extrabold text-sm text-black uppercase">
        Revenue Summary - February 2026
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="border-2 border-[#00C950] rounded-md p-4 bg-[#F2FFF8]">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Collected
          </div>
          <div className="mt-2 text-2xl font-extrabold text-black">₹18,400</div>
          <div className="text-xs text-black/60 mt-1">92 consultations</div>
        </div>

        <div className="border-2 border-[#F0B100] rounded-md p-4 bg-[#FFFBEE]">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Pending
          </div>
          <div className="mt-2 text-2xl font-extrabold text-black">₹1,200</div>
          <div className="text-xs text-black/60 mt-1">6 pending</div>
        </div>

        <div className="border-2 border-[#00B8DB] rounded-md p-4 bg-[#EAFBFF]">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Total Expected
          </div>
          <div className="mt-2 text-2xl font-extrabold text-black">₹19,600</div>
          <div className="text-xs text-black/60 mt-1">98 total</div>
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

const Dashboard = () => {
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifShowAll, setNotifShowAll] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifWrapRef = useRef(null);

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
      value: "8",
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
      value: "1,200",
      valuePrefix: "₹",
      subtitle: "3 payments due",
      border: "border-[#F0B100]",
      iconBg: "bg-[#F0B100]",
      icon: FaRupeeSign,
    },
    {
      title: "REPORTS GENERATED",
      value: "12",
      subtitle: "This week",
      border: "border-black",
      iconBg: "bg-white",
      icon: FiFileText,
    },
    {
      title: "AVAILABLE SLOTS",
      value: "5",
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
          <RevenueSummary onViewDetails={() => go("billing")} />
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
          <TodayAppointments onViewAll={() => go("appointment")} />
          <RecentActivity />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
