

import React, { useMemo, useRef, useState } from "react";
import {
  FiUser,
  FiHome,
  FiBell,
  FiSave,
  FiUpload,
  FiMail,
  FiPhone,
  FiAward,
  FiClock,
  FiShield,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { FaRupeeSign, FaBolt } from "react-icons/fa";

const PAGE_BG = "#FEFCE8";
const CYAN = "#00B8DB";
const YELLOW = "#F0B100";
const GREEN = "#00C950";
const BLACK = "#0D0D0D";

const TabButton = ({ active, icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "h-11 px-4 border-2 rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2 transition",
      "min-w-[190px]",
      active ? "bg-[#00B8DB] text-black border-black" : "bg-white text-black border-black hover:bg-black/5",
    ].join(" ")}
  >
    <span className="text-black">{icon}</span>
    {label}
  </button>
);

const SectionShell = ({
  borderColor = "border-black",
  title,
  subtitle,
  iconBoxBg = "bg-white",
  icon,
  children,
}) => (
  <div className={`border-2 ${borderColor} bg-white rounded-md overflow-hidden`}>
    <div className="p-5 border-b border-black/10">
      <div className="flex items-start gap-3">
        <div className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${iconBoxBg}`}>
          {icon}
        </div>
        <div>
          <div className="font-extrabold text-sm text-black uppercase">{title}</div>
          {subtitle ? <div className="text-xs text-black/55 mt-1">{subtitle}</div> : null}
        </div>
      </div>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Label = ({ children }) => (
  <div className="text-[11px] font-extrabold text-black/70 uppercase mb-1">{children}</div>
);

const Field = ({ leftIcon, value, onChange, placeholder, type = "text" }) => (
  <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center gap-2">
    {leftIcon ? <div className="text-black/70">{leftIcon}</div> : null}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
    />
  </div>
);

const TextArea = ({ value, onChange, placeholder, rows = 4 }) => (
  <div className="border-2 border-black rounded-sm bg-white p-3">
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35 resize-none"
    />
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={[
      "h-9 w-[84px] border-2 border-black rounded-sm flex items-center justify-end px-2 transition",
      checked ? "bg-[#00B8DB]" : "bg-white",
    ].join(" ")}
    aria-pressed={checked}
  >
    <span className="h-6 w-6 bg-black rounded-sm" />
  </button>
);

const Pill = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase transition",
      active ? "bg-[#00B8DB]" : "bg-white hover:bg-black/5",
    ].join(" ")}
  >
    {children}
  </button>
);

function PrefRow({ icon, title, sub, checked, onChange }) {
  return (
    <div className="border-2 border-black rounded-sm bg-white p-4 flex items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 border-2 border-black rounded-md bg-white flex items-center justify-center">
          <span className="text-black">{icon}</span>
        </div>
        <div>
          <div className="font-extrabold text-sm text-black">{title}</div>
          <div className="text-xs text-black/55 mt-1">{sub}</div>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function HoursRow({ label, value, onChange, badge }) {
  const isClosed = String(value).toLowerCase().includes("closed");
  return (
    <div className="border-2 border-black rounded-sm bg-white p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="font-extrabold text-sm text-black">{label}</div>

      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-full md:w-[240px] border-2 border-black rounded-sm px-3 text-sm outline-none"
        />
        <span
          className={[
            "h-9 px-3 border-2 border-black rounded-sm font-extrabold text-xs inline-flex items-center",
            badge ? (isClosed ? "bg-white" : "bg-[#00B8DB]") : "bg-[#00B8DB]",
          ].join(" ")}
        >
          {badge ? (isClosed ? "CLOSED" : "SET") : "SET"}
        </span>
      </div>
    </div>
  );
}

export default function Settings() {
  const [tab, setTab] = useState("doctor"); // doctor | clinic | billing | notifications
  const [saving, setSaving] = useState(false);

  // --- Workable photo upload state ---
  const fileRef = useRef(null);
  const [photoUrl, setPhotoUrl] = useState(""); // blob url for preview

  // ---- Doctor Profile ----
  const [doctor, setDoctor] = useState({
    fullName: "Dr. Sarah Chen",
    email: "sarah.chen@clinic.com",
    phone: "+91 98765 43210",
    specialization: "Cardiologist",
    qualification: "MD, DM Cardiology",
    experience: "15 years",
  });

  // ---- Clinic Details ----
  const [clinic, setClinic] = useState({
    name: "Heart Care Clinic",
    address: "123 Medical Street, Mumbai, Maharashtra 400001",
    phone: "+91 22 1234 5678",
    email: "info@heartcareclinic.com",
    hours: {
      monFri: "9:00 AM - 6:00 PM",
      sat: "9:00 AM - 2:00 PM",
      sun: "Closed",
    },
  });

  // ---- Billing Settings ----
  const [billing, setBilling] = useState({
    defaultFee: "200",
    currency: "Indian Rupee (INR)",
    methods: ["Cash", "UPI", "Card"],
  });

  const allMethods = ["Cash", "UPI", "Card", "Net Banking", "Paytm", "PhonePe"];

  // ---- Notifications ----
  const [notify, setNotify] = useState({
    email: true,
    whatsapp: true,
    appointment: true,
    payment: true,
  });

  const sanitizedFee = useMemo(() => String(billing.defaultFee).replace(/[^\d]/g, ""), [billing.defaultFee]);

  const toggleMethod = (m) => {
    setBilling((prev) => {
      const exists = prev.methods.includes(m);
      return { ...prev, methods: exists ? prev.methods.filter((x) => x !== m) : [...prev.methods, m] };
    });
  };

  const saveChanges = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("✅ Settings saved!");
    }, 900);
  };

  const openFilePicker = () => fileRef.current?.click();

  const onPhotoPicked = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    // Replace old preview URL safely
    setPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    // allow re-selecting same file again
    e.target.value = "";
  };

  const removePhoto = () => {
    setPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return "";
    });
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
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black tracking-tight">SETTINGS</h1>
            <p className="text-sm text-black/55 mt-1">Configure your clinic and preferences</p>
          </div>

          <button
            type="button"
            onClick={saveChanges}
            disabled={saving}
            className="h-9 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm inline-flex items-center gap-2"
          >
            <FiSave />
            {saving ? "SAVING..." : "SAVE CHANGES"}
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <TabButton active={tab === "doctor"} icon={<FiUser />} label="Doctor Profile" onClick={() => setTab("doctor")} />
          <TabButton active={tab === "clinic"} icon={<FiHome />} label="Clinic Details" onClick={() => setTab("clinic")} />
          <TabButton
            active={tab === "billing"}
            icon={<FaRupeeSign />}
            label="Billing"
            onClick={() => setTab("billing")}
          />
          <TabButton
            active={tab === "notifications"}
            icon={<FiBell />}
            label="Notifications"
            onClick={() => setTab("notifications")}
          />
        </div>

        {/* Hidden input for photo upload */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onPhotoPicked}
          className="hidden"
        />

        {/* CONTENT */}
        <div className="mt-5">
          {/* DOCTOR PROFILE */}
          {tab === "doctor" && (
            <SectionShell
              borderColor="border-[#00B8DB]"
              title="Doctor Profile"
              subtitle="Your professional information"
              iconBoxBg="bg-[#00B8DB]"
              icon={<FiUser className="text-black text-xl" />}
            >
              {/* Profile photo strip */}
              <div className="border-2 border-[#00B8DB] bg-[#EAFBFF] rounded-md p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 border-2 border-black rounded-md overflow-hidden bg-white flex items-center justify-center">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <FiUser className="text-black text-2xl" />
                    )}
                  </div>

                  {photoUrl ? (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 h-7 w-7 border-2 border-black rounded-sm bg-white flex items-center justify-center"
                      title="Remove photo"
                    >
                      <FiX className="text-black" />
                    </button>
                  ) : null}
                </div>

                <div className="flex-1">
                  <div className="font-extrabold text-xs uppercase text-black">Profile Photo</div>
                  <div className="text-xs text-black/55 mt-1">Upload a square image for best fit</div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] font-extrabold text-xs inline-flex items-center gap-2"
                    onClick={openFilePicker}
                  >
                    <FiUpload />
                    UPLOAD PHOTO
                  </button>

                  {photoUrl ? (
                    <button
                      type="button"
                      className="h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs inline-flex items-center gap-2"
                      onClick={openFilePicker}
                    >
                      <FiUpload />
                      REPLACE
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Fields */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Field
                    leftIcon={<FiUser />}
                    value={doctor.fullName}
                    onChange={(v) => setDoctor((p) => ({ ...p, fullName: v }))}
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <Label>Email Address *</Label>
                  <Field
                    leftIcon={<FiMail />}
                    value={doctor.email}
                    onChange={(v) => setDoctor((p) => ({ ...p, email: v }))}
                    placeholder="Email"
                  />
                </div>

                <div>
                  <Label>Phone Number *</Label>
                  <Field
                    leftIcon={<FiPhone />}
                    value={doctor.phone}
                    onChange={(v) => setDoctor((p) => ({ ...p, phone: v }))}
                    placeholder="Phone"
                  />
                </div>

                <div>
                  <Label>Specialization *</Label>
                  <Field
                    leftIcon={<FiAward />}
                    value={doctor.specialization}
                    onChange={(v) => setDoctor((p) => ({ ...p, specialization: v }))}
                    placeholder="Specialization"
                  />
                </div>

                <div>
                  <Label>Qualification</Label>
                  <Field
                    value={doctor.qualification}
                    onChange={(v) => setDoctor((p) => ({ ...p, qualification: v }))}
                    placeholder="Qualification"
                  />
                </div>

                <div>
                  <Label>Years of Experience</Label>
                  <Field
                    value={doctor.experience}
                    onChange={(v) => setDoctor((p) => ({ ...p, experience: v }))}
                    placeholder="Years"
                  />
                </div>
              </div>
            </SectionShell>
          )}

          {/* CLINIC DETAILS */}
          {tab === "clinic" && (
            <div className="space-y-5">
              <SectionShell
                borderColor="border-black"
                title="Clinic Details"
                subtitle="Information about your practice"
                iconBoxBg="bg-white"
                icon={<FiHome className="text-black text-xl" />}
              >
                <div className="space-y-4">
                  <div>
                    <Label>Clinic Name *</Label>
                    <Field
                      leftIcon={<FiHome />}
                      value={clinic.name}
                      onChange={(v) => setClinic((p) => ({ ...p, name: v }))}
                      placeholder="Clinic name"
                    />
                  </div>

                  <div>
                    <Label>Clinic Address *</Label>
                    <TextArea
                      value={clinic.address}
                      onChange={(v) => setClinic((p) => ({ ...p, address: v }))}
                      placeholder="Clinic address"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Clinic Phone *</Label>
                      <Field
                        leftIcon={<FiPhone />}
                        value={clinic.phone}
                        onChange={(v) => setClinic((p) => ({ ...p, phone: v }))}
                        placeholder="Phone"
                      />
                    </div>

                    <div>
                      <Label>Clinic Email *</Label>
                      <Field
                        leftIcon={<FiMail />}
                        value={clinic.email}
                        onChange={(v) => setClinic((p) => ({ ...p, email: v }))}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
              </SectionShell>

              <SectionShell
                borderColor="border-[#F0B100]"
                title="Operating Hours"
                iconBoxBg="bg-[#F0B100]"
                icon={<FiClock className="text-black text-xl" />}
              >
                <div className="space-y-3">
                  <HoursRow
                    label="Monday - Friday"
                    value={clinic.hours.monFri}
                    onChange={(v) => setClinic((p) => ({ ...p, hours: { ...p.hours, monFri: v } }))}
                  />
                  <HoursRow
                    label="Saturday"
                    value={clinic.hours.sat}
                    onChange={(v) => setClinic((p) => ({ ...p, hours: { ...p.hours, sat: v } }))}
                  />
                  <HoursRow
                    label="Sunday"
                    value={clinic.hours.sun}
                    onChange={(v) => setClinic((p) => ({ ...p, hours: { ...p.hours, sun: v } }))}
                    badge
                  />
                </div>
              </SectionShell>
            </div>
          )}

          {/* BILLING */}
          {tab === "billing" && (
            <SectionShell
              borderColor="border-[#F0B100]"
              title="Billing Settings"
              subtitle="Configure payment and fees"
              iconBoxBg="bg-[#F0B100]"
              icon={<FaRupeeSign className="text-black text-xl" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Default Consultation Fee *</Label>
                  <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center gap-2">
                    <FaRupeeSign className="text-black/70" />
                    <input
                      value={sanitizedFee}
                      onChange={(e) => setBilling((p) => ({ ...p, defaultFee: e.target.value }))}
                      className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
                      placeholder="200"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <div>
                  <Label>Currency *</Label>
                  <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center justify-between gap-2">
                    <div className="text-sm text-black">{billing.currency}</div>
                    <FiChevronDown className="text-black/70" />
                  </div>
                  <div className="text-[11px] text-black/45 mt-1">(Static dropdown UI — wire later)</div>
                </div>
              </div>

              

              <div className="mt-5 border-2 border-[#F0B100] bg-[#FFFBEE] rounded-md p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 border-2 border-black rounded-md bg-[#F0B100] flex items-center justify-center">
                    <FaBolt className="text-black" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-black uppercase">Quick Tip</div>
                    <div className="text-xs text-black/60 mt-1">
                      The default consultation fee (₹{sanitizedFee || "200"}) will be automatically applied to new
                      appointments. You can edit individual fees in the Billing section.
                    </div>
                  </div>
                </div>
              </div>
            </SectionShell>
          )}

          {/* NOTIFICATIONS */}
          {tab === "notifications" && (
            <div className="space-y-5">
              <SectionShell
                borderColor="border-[#00B8DB]"
                title="Notification Preferences"
                subtitle="Choose how you want to be notified"
                iconBoxBg="bg-[#00B8DB]"
                icon={<FiBell className="text-black text-xl" />}
              >
                <div className="space-y-3">
                  <PrefRow
                    icon={<FiMail />}
                    title="Email Notifications"
                    sub="Receive updates via email"
                    checked={notify.email}
                    onChange={(v) => setNotify((p) => ({ ...p, email: v }))}
                  />
                  <PrefRow
                    icon={<FiPhone />}
                    title="WhatsApp Notifications"
                    sub="Receive updates via WhatsApp"
                    checked={notify.whatsapp}
                    onChange={(v) => setNotify((p) => ({ ...p, whatsapp: v }))}
                  />
                  <PrefRow
                    icon={<FiClock />}
                    title="Appointment Reminders"
                    sub="Get notified about new bookings"
                    checked={notify.appointment}
                    onChange={(v) => setNotify((p) => ({ ...p, appointment: v }))}
                  />
                  <PrefRow
                    icon={<FaRupeeSign />}
                    title="Payment Reminders"
                    sub="Alerts for pending payments"
                    checked={notify.payment}
                    onChange={(v) => setNotify((p) => ({ ...p, payment: v }))}
                  />
                </div>
              </SectionShell>

              <div className="border-2 border-black bg-white rounded-md p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 border-2 border-black rounded-md bg-white flex items-center justify-center">
                    <FiShield className="text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="font-extrabold text-sm text-black uppercase">Privacy &amp; Security</div>
                    <div className="text-xs text-black/60 mt-1">
                      Your data is encrypted and secure. We never share your information with third parties.
                    </div>

                    <button
                      type="button"
                      className="mt-4 h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs"
                      onClick={() => alert("Open privacy policy")}
                    >
                      VIEW PRIVACY POLICY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
