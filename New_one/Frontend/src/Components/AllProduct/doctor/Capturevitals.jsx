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

  const [contact, setContact] = useState({
    age: "",
    location: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);


  // ✅ Resolve PatientId + Name from params OR navigate state OR session storage
  const [resolvedPatientId, setResolvedPatientId] = useState(patientIdParam || "");




  useEffect(() => {

    // ❗ If no patientId in URL → new patient
    if (!patientIdParam) {
      setResolvedPatientId("");
      setPatientName("");
      return;
    }

    const stateName = location?.state?.patientName || "";
    const stateId = location?.state?.patientId || "";
    // fallback from sessionStorage
    let storageName = "";
    let storageId = "";

    try {
      const raw = sessionStorage.getItem("capturePatient");
      const parsed = raw ? JSON.parse(raw) : null;

      storageName = parsed?.patientName || "";
      storageId = parsed?.patientId || "";
    } catch { }

    const stateData = location?.state || {};

    const finalName = stateName || storageName;
    const finalId = patientIdParam || stateId || storageId;

    if (finalId) setResolvedPatientId(finalId);

    if (finalName) setPatientName(finalName);

    // ⭐ ADD THIS BLOCK
    if (stateData) {
      setContact({
        age: stateData.age || "",
        location: stateData.location || "",
        email: stateData.email || "",
        phone: stateData.phone || "",
      });
    }

  }, [location?.state, patientIdParam]);

  // 🔍 Fetch patient details from backend
  const fetchPatientDetails = async (id) => {
    const trimmedId = id.trim();

    // ❌ If less than 7 characters → clear everything
    if (trimmedId.length < 7) {
      setPatientName("");
      setContact({
        age: "",
        location: "",
        email: "",
        phone: "",
      });
      setNotFound(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setNotFound(false);

    try {
      // ⏳ 4 second timeout protection
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(
        "http://localhost:3001/api/medibot/get-patient-details",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId: trimmedId }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      const response = await res.json();

      if (!Array.isArray(response) || response.length === 0) {
        setNotFound(true);
        setPatientName("");
        setContact({
          age: "",
          location: "",
          email: "",
          phone: "",
        });
      } else {
        const data = response[0];

        // 🔥 CLEAN + SAFE MAPPING
        setPatientName(data?.Name || "");

        setContact({
          age: data["Age"] || "",
          location: data["location"] || "",
          email: data["Email"] || "",
          phone: String(
            data["Phone Number"] ||
            data["Phone Number "] ||
            data["Phone_Number"] ||
            data["phone_number"] ||
            ""
          ),
        });
      }

    } catch (err) {
      console.error("Timeout or error:", err);

      setNotFound(true);
      setPatientName("");
      setContact({
        age: "",
        location: "",
        email: "",
        phone: "",
      });
    } finally {
      setLoading(false);
    }
  };

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
                value={resolvedPatientId}
                onChange={(val) => {
                  setResolvedPatientId(val);
                  fetchPatientDetails(val);   // 👈 THIS is the key change
                }}
                placeholder="Enter Patient ID"
                leftIcon={<FiHash />}
              />
              {loading && (
                <div className="text-xs text-blue-600 mt-2">
                  🔄 Fetching patient details...
                </div>
              )}

              {notFound && (
                <div className="text-xs text-red-600 mt-2">
                  ❌ No patient found for this ID
                </div>
              )}
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

        <div className="mt-6 border-2 border-black bg-white rounded-md p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div>
              <Label>Location</Label>
              <Field
                value={contact.location}
                onChange={(v) =>
                  setContact((p) => ({ ...p, location: v }))
                }
                placeholder="Enter location"
              />
            </div>

            <div>
              <Label>Age</Label>
              <Field
                value={contact.age}
                onChange={(v) =>
                  setContact((p) => ({ ...p, age: v }))
                }
                placeholder="Enter a Age"
              />
            </div>

            <div>
              <Label>Email ID</Label>
              <Field
                value={contact.email}
                onChange={(v) =>
                  setContact((p) => ({ ...p, email: v }))
                }
                placeholder="Enter email address"
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Field
                value={contact.phone}
                onChange={(v) =>
                  setContact((p) => ({ ...p, phone: v }))
                }
                placeholder="Enter phone number"
              />
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
