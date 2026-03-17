 // 11/03/2026 - Create and Work By Abishek and Rithanya
 
 import React, { useMemo, useRef, useState, useEffect } from "react";
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
    FiFileText,
    FiX,
     FiInfo,
  } from "react-icons/fi";
  import { FaRupeeSign, FaBolt } from "react-icons/fa";
  import useSettings from "./useSettings";

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
    const [showSuccess, setShowSuccess] = useState(false);
    const { settings, loading } = useSettings();

    // --- Workable photo upload state ---
    // const fileRef = useRef(null);
    // const [photoUrl, setPhotoUrl] = useState("");
    // const [photoPreview, setPhotoPreview] = useState(null);  // blob url for preview
    const fileRef = useRef(null);
const [photoPreview, setPhotoPreview] = useState(null);
const [photoFile, setPhotoFile] = useState(null);

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
      email: ""
    });

    // ---- Billing Settings ----
    const [billing, setBilling] = useState({
      defaultFee: "200",
      currency: "Indian Rupee (INR)",
      methods: ["Cash", "UPI", "Card"],
    });
    const getCurrencySymbol = (currency) => {
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

    const currencySymbol = getCurrencySymbol(billing.currency);

    const allMethods = ["Cash", "UPI", "Card", "Net Banking", "Paytm", "PhonePe"];

    // ---- Notifications ----
    const [notify, setNotify] = useState({
      email: true,
      whatsapp: true,
      appointment: true,
      payment: true,
    });

    /* -------- Hospital Details -------- */

  const [hospital, setHospital] = useState({
  logo: null,
  sign: null,
  seal: null
});
    // ✅ Load saved settings from localStorage on first render
    useEffect(() => {
      const savedDoctor = localStorage.getItem("doctorSettings");
      const savedClinic = localStorage.getItem("clinicSettings");
      const savedBilling = localStorage.getItem("billingSettings");
      const savedNotify = localStorage.getItem("notifySettings");
      const savedPhoto = localStorage.getItem("profilePhoto");
      const savedHospital = localStorage.getItem("hospitalSettings");

      if (savedDoctor) setDoctor(JSON.parse(savedDoctor));
      if (savedClinic) setClinic(JSON.parse(savedClinic));
      if (savedBilling) setBilling(JSON.parse(savedBilling));
      if (savedNotify) setNotify(JSON.parse(savedNotify));
      if (savedPhoto) setPhotoPreview(savedPhoto);
      if (savedHospital) setHospital(JSON.parse(savedHospital));
    }, []);

    useEffect(() => {
      if (!settings || loading) return;

      setHospital((prev) => ({
        ...prev,
        logo: settings.logo || null,
        sign: settings.sign || null,
        seal: settings.seal || null
      }));
    }, [settings, loading]);

  useEffect(() => {
  if (!settings || loading) return;

  setDoctor(prev => ({
    ...prev,
    fullName: settings.doctorName || "",
    email: settings.email || "",
    phone: settings.phone || "",
    specialization: settings.specialization || "",
    qualification: settings.qualification || "",
    experience: settings.experience || ""
  }));

  setClinic(prev => ({
    ...prev,
    name: settings.clinicName || "",
    address: settings.clinicAddress || "",
    phone: settings.clinicPhone || "",
    email: settings.clinicEmail || ""
  }));

  setBilling(prev => ({
    ...prev,
    defaultFee: settings.defaultFees || "",
    currency: settings.currency || "Indian Rupee (INR)"
  }));

}, [settings, loading]);

    const toggleMethod = (m) => {
      setBilling((prev) => {
        const exists = prev.methods.includes(m);
        return { ...prev, methods: exists ? prev.methods.filter((x) => x !== m) : [...prev.methods, m] };
      });
    };

   const stripPhone = (phone) => {
  if (!phone) return "";
  return String(phone).replace(/[^\d+]/g, "");
};
  const saveChanges = async () => {
    setSaving(true);

    // save locally
    localStorage.setItem("doctorSettings", JSON.stringify(doctor));
    localStorage.setItem("clinicSettings", JSON.stringify(clinic));
    localStorage.setItem("billingSettings", JSON.stringify(billing));
    localStorage.setItem("notifySettings", JSON.stringify(notify));
    if (photoPreview) {
  localStorage.setItem("profilePhoto", photoPreview);
}
    

    try {

      const formData = new FormData();

       formData.append("doctor_fullName", doctor.fullName);
formData.append("doctor_email", doctor.email);
formData.append("doctor_phone", stripPhone(doctor.phone));

formData.append("doctor_specialization", doctor.specialization);
formData.append("doctor_qualification", doctor.qualification);
formData.append("doctor_experience", doctor.experience);

// CLINIC
formData.append("clinic_name", clinic.name);
formData.append("clinic_address", clinic.address);
formData.append("clinic_phone", stripPhone(clinic.phone));
formData.append("clinic_email", clinic.email);
        // formData.append("billing", JSON.stringify(billing));
        // formData.append("notifications", JSON.stringify(notify));

        formData.append("billing_defaultFee", billing.defaultFee);
formData.append("billing_currency", billing.currency);

// NOTIFICATIONS
formData.append("notify_email", notify.email);
formData.append("notify_whatsapp", notify.whatsapp);
formData.append("notify_appointment", notify.appointment);
formData.append("notify_payment", notify.payment);
    

        if (hospital.logo instanceof File) {
  formData.append("logo", hospital.logo);
}

if (hospital.sign instanceof File) {
  formData.append("sign", hospital.sign);
}

if (hospital.seal instanceof File) {
  formData.append("seal", hospital.seal);
}
        if (photoFile) formData.append("profilePhoto", photoFile);

        await fetch(
          "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Clinic_details",
          {
            method: "POST",
            body: formData
          }
);

    } catch (err) {
      console.error("Webhook error:", err);
    }

    window.dispatchEvent(new Event("profileUpdated"));

    setTimeout(() => {
      setSaving(false);
      setShowSuccess(true);


    }, 5);
  };
    const openFilePicker = () => fileRef.current?.click();

const onPhotoPicked = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  setPhotoFile(file);
  setPhotoPreview(URL.createObjectURL(file));

  e.target.value = "";
};



const removePhoto = () => {
  setPhotoFile(null);
  setPhotoPreview(null);
  localStorage.removeItem("profilePhoto");
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
              <h1 className="text-3xl font-extrabold text-black tracking-tight">
                SETTINGS
              </h1>
              <p className="text-sm text-black/55 mt-1">
                Configure your clinic and preferences
              </p>
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

          {/* ✅ PLACE IT HERE */}
          {showSuccess && (
            <div className="mt-4 border-2 border-[#00C950] bg-[#EFFFF4] rounded-md p-3 flex items-center gap-2">
              <div className="h-8 w-8 border-2 border-black rounded-sm bg-[#00C950] flex items-center justify-center font-extrabold text-black">
                ✓
              </div>
              <div className="text-sm font-extrabold text-black">
                Changes saved successfully.
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <TabButton active={tab === "doctor"} icon={<FiUser />} label="Doctor Profile" onClick={() => setTab("doctor")} />
            <TabButton active={tab === "clinic"} icon={<FiHome />} label="Clinic Details" onClick={() => setTab("clinic")} />
            <TabButton
              active={tab === "billing"}
              icon={<span className="font-bold text-lg">{currencySymbol}</span>}
              label="Billing"
              onClick={() => setTab("billing")}
            />
            <TabButton
              active={tab === "notifications"}
              icon={<FiBell />}
              label="Notifications"
              onClick={() => setTab("notifications")}
            />
            <TabButton
    active={tab === "hospital"}
    icon={<FiFileText />}
    label="Clinical Documents"
    onClick={() => setTab("hospital")}
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
                     {photoPreview ? (
  <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
) : (
  <FiUser className="text-black text-2xl" />
)}
                    </div>

                    {photoPreview? (
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

                    {photoPreview ? (
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


              </div>
            )}

            {/* BILLING */}
            {tab === "billing" && (
              <SectionShell
                borderColor="border-[#F0B100]"
                title="Billing Settings"
                subtitle="Configure payment and fees"
                iconBoxBg="bg-[#F0B100]"
                icon={<span className="text-black text-xl font-bold">{currencySymbol}</span>}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Default Consultation Fee *</Label>
                    <div className="border-2 border-black rounded-sm bg-white h-11 px-3 flex items-center gap-2">
                      <span className="text-black/70 font-bold">{currencySymbol}</span>
                      <input
                        value={billing.defaultFee}
                        onChange={(e) =>
                          setBilling((p) => ({
                            ...p,
                            defaultFee: e.target.value.replace(/[^\d]/g, "")
                          }))
                        }
                        className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
                        placeholder="200"
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Currency *</Label>
                    <select
                      value={billing.currency}
                      onChange={(e) =>
                        setBilling((prev) => ({
                          ...prev,
                          currency: e.target.value,
                        }))
                      }
                      className="w-full h-11 border-2 border-black rounded-sm px-3 text-sm bg-white"
                    >
                      <option>Indian Rupee (INR)</option>
                      <option>US Dollar (USD)</option>
                      <option>Euro (EUR)</option>
                      <option>UAE Dirham (AED)</option>
                    </select>
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
                        The default consultation fee ({currencySymbol}{billing.defaultFee || "200"}){" "}
                        will be automatically applied to new appointments.

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
          {tab === "hospital" && (
    // <SectionShell
    //   borderColor="border-[#00B8DB]"
    //   title="Clinical Documents"
    //   subtitle="Documents used in patient reports"
    //   iconBoxBg="bg-[#00B8DB]"
    //   icon={<FiHome className="text-black text-xl" />}
    // >

<SectionShell
  borderColor="border-[#00B8DB]"
  title={
    <div className="flex items-center gap-2 relative group">
      Clinical Documents

     <div className="cursor-pointer text-black/70 hover:text-black text-lg">
  <FiInfo />
</div>

    <div className="
  absolute left-full top-1/2 -translate-y-1/2 ml-3
  whitespace-nowrap
  text-[8px]
  font-medium
  bg-[#EAFBFF]
  px-3 py-1.5
  rounded
  shadow-lg
  opacity-0
  pointer-events-none
  group-hover:opacity-100
  transition-all duration-150
  z-50
">
  Uploaded clinical documents will be automatically applied to patient reports and delivered via Email and Telegram.
</div>

    </div>
  }
  subtitle="Documents used in patient reports"
  iconBoxBg="bg-[#00B8DB]"
  icon={<FiFileText className="text-black text-xl" />}
>


      {/* hospital settings  page */}

    
{/* ================= IMAGE UPLOAD SECTION ================= */}

<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

  {/* ===== CLINIC LOGO ===== */}

  <div className="border-2 border-black rounded-md p-4 text-center">
    <div className="font-extrabold text-xs mb-2 uppercase">
      Clinic Logo
    </div>

    <label className="cursor-pointer">

      <div className="h-24 flex items-center justify-center border mb-2 bg-white hover:bg-gray-50 relative">

        {hospital.logo ? (
          <>
            <img
              src={
  hospital.logo
    ? hospital.logo instanceof File
      ? URL.createObjectURL(hospital.logo)
      : hospital.logo
    : ""
}
              className="h-full object-contain"
            />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setHospital(p => ({
                  ...p,
                  logo: null
                }));
              }}
              className="absolute top-1 right-1 bg-white rounded-full shadow p-1"
            >
              <FiX className="text-red-500 text-sm" />
            </button>
          </>
        ) : (
          <FiUpload className="text-2xl text-gray-400" />
        )}

      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {

          const file = e.target.files[0];
          if (!file) return;

          setHospital(p => ({
            ...p,
            logo: file
          }));
          e.target.value = ""; 

        }}
      />

    </label>

    <p className="text-xs text-gray-400">
      Recommended 500 × 200 px
    </p>

  </div>


  {/* ===== SIGNATURE ===== */}

  <div className="border-2 border-black rounded-md p-4 text-center">

    <div className="font-extrabold text-xs mb-2 uppercase">
      Doctor Signature
    </div>

    <label className="cursor-pointer">

      <div className="h-24 flex items-center justify-center border mb-2 bg-white hover:bg-gray-50 relative">

        {hospital.sign ? (
          <>
            <img
  src={
    hospital.sign instanceof File
      ? URL.createObjectURL(hospital.sign)
      : hospital.sign
  }
  className="h-full object-contain"
/>  

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setHospital(p => ({
                  ...p,
                  sign: null
                }));
                e.target.value = ""; 
              }}
              className="absolute top-1 right-1 bg-white rounded-full shadow p-1"
            >
              <FiX className="text-red-500 text-sm" />
            </button>
          </>
        ) : (
          <FiUpload className="text-2xl text-gray-400" />
        )}

      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {

          const file = e.target.files[0];
          if (!file) return;

          setHospital(p => ({
            ...p,
            sign: file
          }));
          e.target.value = ""; 
        }}
      />

    </label>

    <p className="text-xs text-gray-400">
      Recommended 400 × 150 px
    </p>

  </div>


  {/* ===== SEAL ===== */}

  <div className="border-2 border-black rounded-md p-4 text-center">

    <div className="font-extrabold text-xs mb-2 uppercase">
      Doctor Seal
    </div>

    <label className="cursor-pointer">

      <div className="h-24 flex items-center justify-center border mb-2 bg-white hover:bg-gray-50 relative">

        {hospital.seal ? (
          <>
            <img
  src={
    hospital.seal instanceof File
      ? URL.createObjectURL(hospital.seal)
      : hospital.seal
  }
  className="h-full object-contain"
/>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setHospital(p => ({
                  ...p,
                  seal: null
                }));
              }}
              className="absolute top-1 right-1 bg-white rounded-full shadow p-1"
            >
              <FiX className="text-red-500 text-sm" />
            </button>
          </>
        ) : (
          <FiUpload className="text-2xl text-gray-400" />
        )}

      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {

          const file = e.target.files[0];
          if (!file) return;

          setHospital(p => ({
            ...p,
            seal: file
          }));

        }}
      />

    </label>

    <p className="text-xs text-gray-400">
      Recommended 300 × 300 px
    </p>

  </div>

</div>

    </SectionShell>
  )}

          </div>
        </main>
      </div>
    );
}

