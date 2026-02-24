import React, { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiArrowLeft,
  FiCheck,
  FiCopy,
  FiFileText,
  FiMic,
  FiPause,
  FiPlay,
  FiSquare,
  FiUser,
  FiClock,
  FiX,
  FiUpload,
} from "react-icons/fi";

const PAGE_BG = "#FEFCE8";

/* ---------- helpers ---------- */

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// very simple WhatsApp share (works best on mobile / WhatsApp Desktop)
const openWhatsApp = (text) => {
  const url = `https://wa.me/?text=${encodeURIComponent(text || "")}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

/* ---------- atoms ---------- */

const PrimaryButton = ({
  children,
  onClick,
  className = "",
  leftIcon,
  disabled,
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={[
      "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
      disabled
        ? "bg-[#00B8DB]/60 cursor-not-allowed"
        : "bg-[#00B8DB] hover:brightness-95 active:brightness-90",
      "text-black",
      className,
    ].join(" ")}
  >
    {leftIcon}
    {children}
  </button>
);

const SecondaryButton = ({
  children,
  onClick,
  className = "",
  leftIcon,
  disabled,
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={[
      "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
      disabled
        ? "bg-white/60 cursor-not-allowed"
        : "bg-white hover:brightness-95 active:brightness-90",
      "text-black",
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

const Tag = ({ children, bg = "bg-white" }) => (
  <span
    className={`inline-flex items-center h-6 px-2 border-2 border-black rounded-sm text-[11px] font-extrabold ${bg}`}
  >
    {children}
  </span>
);

const Card = ({
  title,
  subtitle,
  rightSlot,
  children,
  borderColor = "border-[#00B8DB]",
}) => (
  <div className={`border-2 ${borderColor} bg-white rounded-md overflow-hidden`}>
    <div className="p-4 border-b border-black/10 flex items-start justify-between gap-3">
      <div>
        <div className="font-extrabold text-sm uppercase text-black">
          {title}
        </div>
        {subtitle ? (
          <div className="text-sm text-black/55 mt-1">{subtitle}</div>
        ) : null}
      </div>
      {rightSlot}
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const MiniVital = ({ label, value }) => (
  <div className="border-2 border-[#00B8DB] bg-[#EAFBFF] rounded-sm p-3">
    <div className="text-[10px] font-extrabold text-black/60 uppercase">
      {label}
    </div>
    <div className="mt-1 text-sm font-extrabold text-black">{value || "—"}</div>
  </div>
);

const Modal = ({
  open,
  title,
  children,
  onClose,
  widthClass = "max-w-[980px]",
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

function ProcessingStep({ label, done, active }) {
  return (
    <div
      className={[
        "h-12 flex items-center px-4 rounded-sm border-2 border-black",
        done ? "bg-[#00C950] text-black" : "bg-white text-black/50",
        active ? "animate-pulse" : "",
      ].join(" ")}
    >
      <span className="font-extrabold text-xs uppercase">{label}</span>
      {done ? <span className="ml-auto font-extrabold">✓</span> : null}
    </div>
  );
}

export default function Consultation() {
  // Draft from CaptureVitals / or existing consultation link
  const draft = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("consultationDraft") || "{}");
    } catch {
      return {};
    }
  }, []);

  // ✅ Robust detection for "existing patient consultation"
  const isExistingConsultation = useMemo(() => {
    try {
      const ssFlag = sessionStorage.getItem("existingConsultation") === "true";
      const draftFlag =
        draft?.isExistingConsultation === true ||
        draft?.existingConsultation === true;
      const urlFlag =
        new URLSearchParams(window.location.search).get("existing") === "1";

      return ssFlag || draftFlag || urlFlag;
    } catch {
      return false;
    }
  }, [draft]);

  const patientName = draft?.patientName || "—";
  const vitals = draft?.vitals || {};
  const capturedAt = draft?.capturedAt ? new Date(draft.capturedAt) : null;

  // Voice recording (SIMULATED timer)
// Voice recording (SIMULATED timer)
const [isRecording, setIsRecording] = useState(false);
const [isPaused, setIsPaused] = useState(false);
const [recordingTime, setRecordingTime] = useState(0);

// ⭐⭐⭐ ADD HERE (immediately below recordingTime line)
const [audioBlob, setAudioBlob] = useState(null);
const [audioUrl, setAudioUrl] = useState(null);
const audioRef = React.useRef(null);
const mediaRecorderRef = React.useRef(null);
const chunksRef = React.useRef([]);

const [isPlaying, setIsPlaying] = useState(false);
  // AI pipeline
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const [filled, setFilled] = useState(false);
  const [aiText, setAiText] = useState("");
  const [report, setReport] = useState(null);


  // UI bits
  const [isCopied, setIsCopied] = useState(false);

  // History UI (disabled for existing consultation)
  const [showHistory, setShowHistory] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  // Upload Report
  const [uploadedFile, setUploadedFile] = useState(null);

  const steps = useMemo(
    () => ["Audio Received", "Transcribing", "Extracting Data", "Generating Report"],
    []
  );

  // ✅ Safety: if existing consultation, never allow history modal to remain open
  useEffect(() => {
    if (isExistingConsultation && showHistory) {
      setShowHistory(false);
      setSelectedConsultation(null);
    }
  }, [isExistingConsultation, showHistory]);

  // Timer tick
  useEffect(() => {
    let t;
    if (isRecording && !isPaused) {
      t = setInterval(() => setRecordingTime((s) => s + 1), 1000);
    }
    return () => clearInterval(t);
  }, [isRecording, isPaused]);

  // AI pipeline simulation
  useEffect(() => {
    if (!sent) return;

    if (step < steps.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 900);
      return () => clearTimeout(t);
    }

    if (step === steps.length) {
      const t2 = setTimeout(() => setFilled(true), 600);
      return () => clearTimeout(t2);
    }
  }, [sent, step, steps.length]);


  const transcriptText = aiText;


 
  const canSendToAI = recordingTime > 0 && !sent;

const handleStart = async () => {
  setSent(false);
  setStep(0);
  setFilled(false);

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorderRef.current = mediaRecorder;
  chunksRef.current = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunksRef.current.push(e.data);
  };

  mediaRecorder.onstop = () => {
  const blob = new Blob(chunksRef.current, { type: "audio/webm" });
  const url = URL.createObjectURL(blob);

  setAudioBlob(blob);
  setAudioUrl(url);
  setIsPlaying(false);
};

  mediaRecorder.start();

  setIsRecording(true);
  setIsPaused(false);
  setRecordingTime(0);
};


const handleStop = () => {
  if (!mediaRecorderRef.current) return;

  mediaRecorderRef.current.stop();
  setIsRecording(false);
  setIsPaused(false);
};

  const handlePause = () => {
    if (!isRecording) return;
    setIsPaused((p) => !p);
  };

const handleSendToAI = async () => {
  if (!audioBlob) return;

  setSent(true);
  setStep(0);
  setFilled(false);

  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    const res = await fetch("http://localhost:3001/api/medibot/voice", {
      method: "POST",
      body: formData,
    });

    // 🔥 MISSING STEP — parse backend JSON
    const data = await res.json();
    console.log("🔥 RAW BACKEND DATA:", data);

    // 🔥 DEFINE ai safely
    const ai =
      Array.isArray(data) ? data[0] :
      Array.isArray(data?.data) ? data.data[0] :
      data;

      setReport({
  patient: patientName,
  symptoms: ai?.symptoms || "",
  diagnosis: ai?.diagnosis || "",
  medication: ai?.medicines || "",
  notes: ai?.doctor_notes || "",
  followup: ai?.follow_up_required
    ? "Follow-up required"
    : "No follow-up required",
});

    console.log("🔥 AI OBJECT:", ai);

    // ✅ Build clean summary (hide empty fields)
    const lines = [];

    if (ai?.patient_name?.trim()) lines.push(`Patient: ${ai.patient_name}`);
    if (ai?.symptoms?.trim()) lines.push(`Symptoms: ${ai.symptoms}`);
    if (ai?.medicines?.trim()) lines.push(`Medicines: ${ai.medicines}`);
    if (ai?.doctor_notes?.trim()) lines.push(`Doctor Notes: ${ai.doctor_notes}`);
    if (ai?.follow_up_required === true) lines.push(`Follow-up Required: Yes`);

    const replyText = lines.length ? lines.join("\n") : "No AI response";

    console.log("🔥 CLEAN SUMMARY:", replyText);

    setAiText(replyText);
    setFilled(true);

  } catch (err) {
    console.error("❌ AI send failed:", err);
    alert("Failed to send audio to AI");
  }
};


  const handleCopyTranscript = async () => {
    if (!filled) return;
    try {
      await navigator.clipboard.writeText(transcriptText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  const handleUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadedFile(f);
  };

  const buildShareText = () => {
    const lines = [
      `Medical Report`,
      `Patient: ${patientName}`,
      capturedAt
        ? `Captured: ${capturedAt.toLocaleDateString()} ${capturedAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        : null,
      "",
      `Vitals:`,
      `- Height: ${vitals.height || "—"}`,
      `- Weight: ${vitals.weight || "—"}`,
      `- BP: ${vitals.bp || "—"}`,
      `- Temp: ${vitals.temp || "—"}`,
      `- Pulse: ${vitals.pulse || "—"}`,
      "",
      `Diagnosis: ${report?.diagnosis || "—"}`,
      `Medication: ${report?.medication || "—"}`,
      `Symptoms: ${report?.symptoms || "—"}`,
      `Notes: ${report?.notes || "—"}`,
      `Follow-up: ${report?.followup || "—"}`,
      uploadedFile ? "" : null,
      uploadedFile ? `Uploaded: ${uploadedFile.name}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleSaveAndSend = async () => {
  if (!filled) return;

  try {
    const formData = new FormData();

    // 🔹 Append medical report details
    formData.append("patientName", patientName);
    formData.append("height", vitals.height || "");
    formData.append("weight", vitals.weight || "");
    formData.append("bp", vitals.bp || "");
    formData.append("temp", vitals.temp || "");
    formData.append("pulse", vitals.pulse || "");

    formData.append("diagnosis", report?.diagnosis || "");
    formData.append("medication", report?.medication || "");
    formData.append("symptoms", report?.symptoms || "");
    formData.append("notes", report?.notes || "");
    formData.append("followup", report?.followup || "");

    // 🔹 Append uploaded file (binary)
    if (uploadedFile) {
      formData.append("reportFile", uploadedFile);
    }

    const res = await fetch(
      "http://localhost:3001/api/medibot/confirm",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Medical report saved successfully!");
      openWhatsApp(buildShareText());
    }

  } catch (err) {
    console.error("❌ Save failed:", err);
    alert("Save failed");
  }
};

  // ✅ Keep mock consultations only for NON-existing flow (optional)
  const consultations = useMemo(
    () =>
      isExistingConsultation
        ? []
        : [
            {
              id: 1,
              name: "John Smith",
              age: "45Y Male",
              type: "Follow-up",
              date: "1/28/2026",
              time: "10:30 AM",
              duration: "12:34",
              status: "COMPLETED",
              presentHistory:
                "Chronic lower back pain for 6 months. Stiffness in morning. Pain worsens with prolonged sitting.",
              pastHistory:
                "Hypertension (2018), Hyperlipidemia (2020). Appendectomy (2015). Allergy: Penicillin.",
              vitalSigns: "BP: 132/84, HR: 72, Temp: 98.6°F, SpO2: 98%",
              diagnosis: "Chronic mechanical lower back pain",
              treatment: "PT referral, ibuprofen PRN, core strengthening exercises.",
            },
            {
              id: 2,
              name: "Sarah Johnson",
              age: "32Y Female",
              type: "Emergency",
              date: "1/28/2026",
              time: "11:15 AM",
              duration: "08:22",
              status: "COMPLETED",
              presentHistory:
                "Severe frontal headache with photophobia and nausea for 3 days. Sleep disturbance.",
              pastHistory:
                "No chronic conditions. Prior migraine episodes (2 in last year). Family history: migraines.",
              vitalSigns: "BP: 118/76, HR: 68, Temp: 98.2°F, SpO2: 99%",
              diagnosis: "Migraine without aura",
              treatment:
                "Sumatriptan PRN, hydration, dark room rest, follow-up if persistent.",
            },
          ],
    [isExistingConsultation]
  );

  const openHistory = (c) => {
    if (isExistingConsultation) return; // ✅ hard block
    setSelectedConsultation(c);
    setShowHistory(true);
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
              CONSULTATION
            </h1>
            <p className="text-sm text-black/55 mt-1">
              Voice record → AI processing → Report
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Tag bg="bg-white">
                <span className="inline-flex items-center gap-2">
                  <FiUser className="text-black/60" /> {patientName}
                </span>
              </Tag>
              <Tag bg="bg-[#EAFBFF]">BP: {vitals.bp || "—"}</Tag>
              {capturedAt ? (
                <Tag bg="bg-[#EAFBFF]">
                  <span className="inline-flex items-center gap-2">
                    <FiClock className="text-black/60" />{" "}
                    {capturedAt.toLocaleDateString()}{" "}
                    {capturedAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </Tag>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SecondaryButton
              onClick={() => window.history.back()}
              leftIcon={<FiArrowLeft />}
            >
              BACK
            </SecondaryButton>

            {/* ✅ Hide HISTORY button for existing consultation */}
            {!isExistingConsultation && (
              <PrimaryButton
                onClick={() => setShowHistory(true)}
                leftIcon={<FiFileText />}
              >
                HISTORY
              </PrimaryButton>
            )}
          </div>
        </div>

        {/* Row 1: Voice + Processing + Transcript */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* VOICE RECORD */}
          <Card
            title="VOICE RECORD"
            subtitle="Record the consultation audio (simulated timer)"
            borderColor="border-black"
            rightSlot={
              <IconSquare bg="bg-[#00B8DB]">
                <FiMic />
              </IconSquare>
            }
           >
            <div className="flex items-center justify-between gap-3 border-2 border-black rounded-md bg-white p-4">

    <div>
      <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
        DURATION
      </div>
      <div className="mt-1 text-3xl font-extrabold text-black font-mono">
        {formatTime(recordingTime)}
      </div>
    </div>

    <div className="flex items-center gap-2">
      {isRecording ? (
        <Tag bg="bg-[#EAFBFF]">{isPaused ? "PAUSED" : "RECORDING"}</Tag>
      ) : (
        audioBlob && (
          <button
  type="button"
  onClick={() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }}
  className="h-8 px-3 border-2 border-black rounded-sm bg-white text-xs font-extrabold uppercase inline-flex items-center gap-2"
>
  {isPlaying ? (
    <>
      <FiPause /> PAUSE
    </>
  ) : (
    <>
      <FiPlay /> PLAY
    </>
  )}
</button>
        )
      )}
    </div>

  </div>

  {/* 👇👇 ADD THIS RIGHT HERE 👇👇 */}
  {audioBlob && (
  <audio
    ref={audioRef}
    src={audioUrl}
    className="hidden"
    onEnded={() => setIsPlaying(false)}
  />
)}

  {/* THEN your START / STOP / PAUSE buttons continue below */}
  <div className="mt-4 grid grid-cols-3 gap-2"></div>


            <div className="mt-4 grid grid-cols-3 gap-2">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={handleStart}
                  className="h-10 border-2 border-black rounded-sm bg-[#00C950] text-black font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2"
                >
                  <FiPlay />
                  START
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStop}
                  className="h-10 border-2 border-black rounded-sm bg-[#FF2D2D] text-black font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2"
                >
                  <FiSquare />
                  STOP
                </button>
              )}

              <button
                type="button"
                onClick={handlePause}
                disabled={!isRecording}
                className={[
                  "h-10 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
                  isRecording
                    ? "bg-white text-black hover:brightness-95 active:brightness-90"
                    : "bg-white/60 text-black/40 cursor-not-allowed",
                ].join(" ")}
              >
                <FiPause />
                {isPaused ? "RESUME" : "PAUSE"}
              </button>

              <button
                type="button"
                onClick={handleStop}
                disabled={!isRecording}
                className={[
                  "h-10 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
                  isRecording
                    ? "bg-[#F0B100] text-black hover:brightness-95 active:brightness-90"
                    : "bg-[#F0B100]/60 text-black/40 cursor-not-allowed",
                ].join(" ")}
              >
                <FiSquare />
                END
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">

  {/* Upload Audio */}
  <label className="h-9 px-3 border-2 border-black rounded-sm bg-white text-xs font-extrabold uppercase inline-flex items-center gap-2 cursor-pointer hover:brightness-95 active:brightness-90">
    <FiUpload />
    UPLOAD AUDIO
    <input
      type="file"
      accept="audio/*"
      className="hidden"
      onChange={(e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  setAudioBlob(file);
  setAudioUrl(url);
  setIsRecording(false);
  setRecordingTime(0);
  setIsPlaying(false);

  alert("Audio uploaded successfully ✅");
}}
    />
  </label>

  {/* Smaller Send Button */}
  <PrimaryButton
    onClick={handleSendToAI}
    leftIcon={<FiCheck />}
    disabled={!audioBlob}
    className="min-w-[170px]"
  >
    {sent && !filled ? "PROCESSING..." : "SEND TO AI"}
  </PrimaryButton>

</div>

            <div className="mt-3 text-sm text-black/55">
              Tip: record for a few seconds, then click{" "}
              <span className="font-extrabold">SEND TO AI SYSTEM</span>.
            </div>
          </Card>

          {/* AI PROCESSING */}
          <Card
            title="AI PROCESSING"
            subtitle="Pipeline progress"
            borderColor="border-[#F0B100]"
            rightSlot={
              <IconSquare bg="bg-[#F0B100]">
                <FiActivity />
              </IconSquare>
            }
          >
            <div className="space-y-3">
              {steps.map((s, i) => (
                <ProcessingStep
                  key={s}
                  label={s}
                  done={i < step}
                  active={sent && i === step && step < steps.length}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <SecondaryButton
                onClick={() => {
                  setSent(false);
                  setStep(0);
                  setFilled(false);
                }}
                disabled={!sent && !filled}
              >
                RESET AI
              </SecondaryButton>
            </div>
          </Card>

          {/* TRANSCRIPT */}
          <Card
            title="TRANSCRIPT"
            subtitle="Generated after processing"
            rightSlot={
              <IconSquare bg="bg-[#00B8DB]">
                <FiFileText />
              </IconSquare>
            }
          >
            <div className="border-2 border-black rounded-md bg-white p-3 h-60 overflow-y-auto text-sm text-black/75">
              {filled ? (
                <p className="leading-relaxed whitespace-pre-line">
                  {transcriptText}
                </p>
              ) : (
                <div className="h-full flex items-center justify-center text-black/45 text-sm">
                  Transcript will appear after processing.
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <PrimaryButton
                onClick={handleCopyTranscript}
                leftIcon={<FiCopy />}
                disabled={!filled}
                className="min-w-[160px]"
              >
                {isCopied ? "COPIED" : "COPY"}
              </PrimaryButton>
            </div>
          </Card>
        </div>

        {/* Row 2: Vitals + Medical report */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* VITALS SNAPSHOT */}
          <Card
            title="VITALS SNAPSHOT"
            subtitle="From CaptureVitals"
            rightSlot={
              <IconSquare bg="bg-[#00B8DB]">
                <FiActivity />
              </IconSquare>
            }
          >
            <div className="grid grid-cols-1 gap-3">
              <MiniVital label="HEIGHT" value={vitals.height} />
              <MiniVital label="WEIGHT" value={vitals.weight} />
              <MiniVital label="BP" value={vitals.bp} />
              <MiniVital label="TEMP" value={vitals.temp} />
              <MiniVital label="PULSE" value={vitals.pulse} />
            </div>
          </Card>

          {/* MEDICAL REPORT */}
          <div className="lg:col-span-2">
            <Card
              title="MEDICAL REPORT"
              subtitle="Auto-filled after AI completes (mock)"
              rightSlot={
                <IconSquare bg="bg-[#00B8DB]">
                  <FiFileText />
                </IconSquare>
              }
            >
              {/* Upload report */}
              <div className="mb-4 border-2 border-black rounded-md bg-white p-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
                      UPLOAD REPORT (OPTIONAL)
                    </div>
                    <div className="text-xs text-black/55 mt-1">
                      Upload lab report / scan to attach with this consultation
                      (demo UI).
                    </div>
                  </div>

                  <label className="inline-flex items-center justify-center gap-2 h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs uppercase cursor-pointer hover:brightness-95 active:brightness-90">
                    <FiUpload />
                    CHOOSE FILE
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUpload}
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </label>
                </div>

                <div className="mt-2 text-sm text-black">
                  {uploadedFile ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="font-extrabold">Selected:</span>{" "}
                      {uploadedFile.name}
                    </span>
                  ) : (
                    <span className="text-black/50">No file selected.</span>
                  )}
                </div>
              </div>

              
                {/* Row 1 - 3 Columns */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  <div className="border-2 border-black rounded-md bg-white p-3">
    <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
      PATIENT
    </div>
    <div className="mt-1 text-sm text-black">
      {filled ? report?.patient || "—" : "—"}
    </div>
  </div>

  

  <div className="border-2 border-black rounded-md bg-white p-3">
    <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
      MEDICATION
    </div>
    <div className="mt-1 text-sm text-black">
      {filled ? report?.medication : "—"}
    </div>
  </div>

</div>


{/* Row 2 - 2 Columns */}
<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

  <div className="border-2 border-black rounded-md bg-white p-3">
    <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
      SYMPTOMS
    </div>
    <div className="mt-1 text-sm text-black">
      {filled ? report?.symptoms : "—"}
    </div>
  </div>

  <div className="border-2 border-black rounded-md bg-white p-3">
    <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
      DOCTOR NOTES
    </div>
    <div className="mt-1 text-sm text-black">
      {filled ? report?.notes : "—"}
    </div>
  </div>

</div>


{/* Row 3 - Full Width */}
<div className="mt-4 border-2 border-black rounded-md bg-white p-3">
  <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
    FOLLOW-UP INSTRUCTIONS
  </div>
  <div className="mt-1 text-sm text-black">
    {filled ? report?.followup : "—"}
  </div>
</div>

              <div className="mt-5 flex justify-end">
                <PrimaryButton onClick={handleSaveAndSend} disabled={!filled}>
                  SAVE & SEND (WHATSAPP)
                </PrimaryButton>
              </div>
            </Card>
          </div>
        </div>

        {/* ✅ REMOVED: Recent Consultations section for existing consultations
            If you still want it for NEW consultations only, you can re-add it with:
            {!isExistingConsultation && (...)}  */}
      </main>

      {/* ✅ HISTORY MODAL only for NON-existing consultations */}
      {!isExistingConsultation && (
        <Modal
          open={showHistory}
          title="CONSULTATION HISTORY"
          onClose={() => {
            setShowHistory(false);
            setSelectedConsultation(null);
          }}
          widthClass="max-w-[980px]"
        >
          {selectedConsultation ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Tag bg="bg-white">{selectedConsultation.name}</Tag>
                <Tag bg="bg-[#EAFBFF]">{selectedConsultation.age}</Tag>
                <Tag bg="bg-[#EAFBFF]">{selectedConsultation.type}</Tag>
                <Tag bg="bg-[#EAFBFF]">
                  {selectedConsultation.date} • {selectedConsultation.time}
                </Tag>
              </div>

              <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
                <div className="text-[11px] font-extrabold text-black/60 uppercase">
                  Present History
                </div>
                <div className="mt-1 text-sm text-black">
                  {selectedConsultation.presentHistory}
                </div>
              </div>

              <div className="border-2 border-[#F0B100] bg-white rounded-md p-4">
                <div className="text-[11px] font-extrabold text-black/60 uppercase">
                  Past History
                </div>
                <div className="mt-1 text-sm text-black">
                  {selectedConsultation.pastHistory}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-black bg-white rounded-md p-4">
                  <div className="text-[11px] font-extrabold text-black/60 uppercase">
                    Vital Signs
                  </div>
                  <div className="mt-1 text-sm text-black">
                    {selectedConsultation.vitalSigns}
                  </div>
                </div>
                <div className="border-2 border-black bg-white rounded-md p-4">
                  <div className="text-[11px] font-extrabold text-black/60 uppercase">
                    Diagnosis
                  </div>
                  <div className="mt-1 text-sm text-black">
                    {selectedConsultation.diagnosis}
                  </div>
                </div>
              </div>

              <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
                <div className="text-[11px] font-extrabold text-black/60 uppercase">
                  Treatment Plan
                </div>
                <div className="mt-1 text-sm text-black">
                  {selectedConsultation.treatment}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-black/60">
                Select a consultation to view details.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultations.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedConsultation(c)}
                    className="text-left border-2 border-[#00B8DB] bg-white rounded-md p-4 hover:brightness-95 active:brightness-90"
                  >
                    <div className="font-extrabold text-black">{c.name}</div>
                    <div className="text-sm text-black/60 mt-1">
                      {c.type} • {c.date} • {c.time}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setShowHistory(false);
                setSelectedConsultation(null);
              }}
              className="h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs uppercase"
            >
              BACK
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}