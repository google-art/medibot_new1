import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";
import {
  FiUser,
  FiFileText,
  FiPlus,
  FiSearch,
  FiPhone,
  FiMail,
  FiMapPin,
  FiActivity,
  FiClock,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

const PAGE_BG = "#FEFCE8";

// ✅ base path for doctor module (MUST match your Sidebar/MainDoctor mount)
const DOCTOR_BASE = "/maindoctor";

const StatCard = ({ title, value, subtitle, border, iconBg, icon }) => {
  return (
    <div
      className={`border-2 ${border} bg-white rounded-md p-5 flex items-start justify-between`}
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
        className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${iconBg}`}
      >
        <div className="text-black text-xl">{icon}</div>
      </div>
    </div>
  );
};

const PrimaryButton = ({ children, onClick, className = "", leftIcon }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
      "bg-[#00B8DB] text-black hover:brightness-95 active:brightness-90",
      className,
    ].join(" ")}
  >
    {leftIcon}
    {children}
  </button>
);

const SecondaryButton = ({ children, onClick, className = "", leftIcon }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
      "bg-[#F0B100] text-black hover:brightness-95 active:brightness-90",
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

const Modal = ({
  open,
  title,
  children,
  onClose,
  widthClass = "max-w-[820px]",
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

const Tag = ({ children, bg = "bg-white" }) => (
  <span
    className={`inline-flex items-center h-6 px-2 border-2 border-black rounded-sm text-[11px] font-extrabold ${bg}`}
  >
    {children}
  </span>
);

// Report Summary Card Component (for list view)
const ReportSummaryCard = ({ report, onClick }) => {
  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4 hover:bg-[#EAFBFF] transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="font-extrabold text-sm text-black">{report.title}</div>
            <Tag bg="bg-[#00B8DB] text-[10px]">{report.type}</Tag>
          </div>

          <div className="flex items-center gap-4 text-xs text-black/70">
            {/* DATE (no icon) */}
            <div className="flex items-center gap-1">
              <span>{report.date}</span>
            </div>

            {/* TIME (with clock icon) */}
            <div className="flex items-center gap-1">
              <FiClock className="text-black/50" />
              <span>{report.time}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onClick(report)}
          className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] text-black font-extrabold text-xs uppercase inline-flex items-center gap-2 hover:brightness-95"
        >
          OPEN
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

const PatientCard = ({ p, onNewConsult, onOpenReport }) => {
  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-5">
      <div className="flex items-start gap-4">
        <IconSquare bg="bg-[#00B8DB]">
          <FiUser />
        </IconSquare>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-extrabold text-lg text-black">{p.name}</div>
            <Tag bg="bg-white">ID: {p.id}</Tag>
            <Tag bg="bg-[#EAFBFF]">{p.age} years</Tag>
          </div>

          <div className="mt-3 text-sm text-black/70 space-y-1">
            <div className="flex items-center gap-2">
              <FiPhone className="text-black/60" /> <span>{p.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="text-black/60" /> <span>{p.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-black/60" /> <span>{p.location}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNewConsult(p)}
              className="h-9 min-w-[260px] flex-1 md:flex-none px-4 border-2 border-black rounded-sm bg-[#00B8DB] text-black font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2"
            >
              <FiActivity />
              NEW CONSULTATION
            </button>

            <button
              type="button"
              onClick={() => onOpenReport(p)}
              className="h-9 w-10 border-2 border-black rounded-sm bg-[#F0B100] flex items-center justify-center"
              title="View report history"
            >
              <FiFileText className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function FullReportView({ item, onBack, setShowPdfPreview }) {
  return (
    <div className="border-2 border-[#00B8DB] rounded-md bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-extrabold text-lg text-black">{item.title}</div>
          <div className="flex items-center gap-3 mt-1 text-xs text-black/60">
            <span>{item.date}</span>
            <span></span>
            <span>{item.time}</span>
            <Tag bg="bg-[#EAFBFF]">{item.type.toUpperCase()}</Tag>
          </div>
          <div className="text-xs text-black/50 mt-1">{item.reportId}</div>
        </div>
        <div className="flex gap-2">
  <button
    onClick={() => setShowPdfPreview(true)}
    className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] font-extrabold text-xs uppercase"
  >
    PREVIEW PDF
  </button>

  <button
    onClick={onBack}
    className="h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs uppercase hover:bg-gray-50"
  >
    BACK TO LIST
  </button>
</div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <MiniVital label="HEIGHT" value={item.vitals.height} />
        <MiniVital label="WEIGHT" value={item.vitals.weight} />
        <MiniVital label="BP" value={item.vitals.bp} />
      </div>

      <div className="mt-4 space-y-3">
        <ReportBlock title="MEDICATION" value={item.medication} />
        <ReportBlock title="SYMPTOMS" value={item.symptoms} />
        <ReportBlock title="DOCTOR NOTES" value={item.doctorNotes} />
      </div>
    </div>
  );
}

function MiniVital({ label, value }) {
  return (
    <div className="border-2 border-[#00B8DB] bg-[#EAFBFF] rounded-sm p-3">
      <div className="text-[10px] font-extrabold text-black/60 uppercase">
        {label}
      </div>
      <div className="mt-1 text-sm font-extrabold text-black">{value}</div>
    </div>
  );
}

function ReportBlock({ title, value }) {
  return (
    <div>
      <div className="text-[11px] font-extrabold text-black/60 uppercase">
        {title}
      </div>
      <div className="mt-1 text-sm text-black">{value}</div>
    </div>
  );
}

export default function Patients() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showReports, setShowReports] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportHistory, setReportHistory] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportError, setReportError] = useState(null);

  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [allReports, setAllReports] = useState([]);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  // ===============================
  // FETCH PATIENTS ONLY
  // ===============================
  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      setReportError(null);

      console.log("🔍 Fetching patients...");

      const response = await fetch(
        "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Patient_Report_patient_pannel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "patients" }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Patients data received:", data);

      const formattedPatients = data.map((item) => ({
        id: item.PatientId || `P${Math.random().toString(36).substr(2, 9)}`,
        name: item.Patient_Name || "Unknown Patient",
        age: item.Age || "N/A",
        phone: item.Patient_Phone?.toString() || "N/A",
        email: item.Patient_Email || "N/A",
        location: item.Location || "N/A",

        vitals: {
          height: item.Height ? String(item.Height) : "",
          weight: item.Weight ? String(item.Weight) : "",
          bp: item.BP ? String(item.BP) : "",
          temp: item.Temp ? String(item.Temp) : "",
          pulse: item.Pulse ? String(item.Pulse) : "",
        }
      }));
      setPatients(formattedPatients);

    } catch (err) {
      console.error("❌ Failed to fetch patients:", err);
      setReportError(`Failed to load patients: ${err.message}`);

      // Set mock patients for testing
      const mockPatients = [

      ];
      setPatients(mockPatients);
    } finally {
      setLoadingPatients(false);
    }
  };

  // ===============================
  // FETCH ALL REPORTS FOR STATS (OPTIONAL)
  // ===============================
  const fetchAllReports = async () => {
    try {
      // This is optional - if it fails, we just set empty array
      const response = await fetch(
        "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Patient_Report_patient_report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "allReports" }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAllReports(data || []);
      }
    } catch (err) {
      console.log("⚠️ Optional: Failed to fetch all reports for stats:", err);
      setAllReports([]);
    }
  };

  // ✅ Initial load - only fetch patients, reports are optional
  useEffect(() => {
    const loadData = async () => {
      await fetchPatients();
      // Don't await this - it's optional
      fetchAllReports().catch(() => { });
    };

    loadData();

    const interval = setInterval(() => {
      fetchPatients();
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, []);

  // ===============================
  // FETCH REPORTS FOR SELECTED PATIENT
  // ===============================
  const fetchReportsForPatient = async (patientId) => {
    try {
      setLoadingReport(true);
      setReportError(null);

      console.log(`🔍 Fetching reports for patient: ${patientId}`);

      const response = await fetch(
        "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Patient_Report_patient_report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Patient reports received:", data);

      const formattedReports = data.map((item, index) => ({
        reportId: `R${index + 1}`,
        patientId: item.PatientId || patientId,
        type: "report",
        title: "Medical Report",
        date: item.Booked_date || "-",
        time: item.Booked_time || "-",
        vitals: {
          height: item.Height ? `${item.Height} cm` : "-",
          weight: item.Weight ? `${item.Weight} kg` : "-",
          bp: item.BP ? `${item.BP}` : "-",
        },
        medication: item.Medication || "-",
        symptoms: item.Symptoms || "-",
        doctorNotes: item.Notes || "-",
      }));

      setReportHistory(formattedReports);

    } catch (err) {
      console.error("❌ Failed to fetch patient reports:", err);
      setReportError(`Failed to load reports: ${err.message}`);

      // Set mock data for testing
      const mockReports = [

      ];
      setReportHistory(mockReports);
    } finally {
      setLoadingReport(false);
    }
  };

  const stats = {
    totalPatients: patients.length,
    todaysConsults: 0,
    reportsGenerated: allReports.length,
    avgWait: 0,
  };

  useEffect(() => {
    localStorage.setItem(
      "totalReportsGenerated",
      reportHistory.length
    );
  }, [reportHistory]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.id && p.id.toLowerCase().includes(q)) ||
        (p.phone && p.phone.toLowerCase().includes(q))
    );
  }, [patients, query]);

  const openHistory = (p) => {
    setSelectedPatient(p);
    setShowFullReport(false);
    setSelectedReport(null);
    setShowReports(true);
    setReportError(null);
    fetchReportsForPatient(p.id);
  };

  const openFullReport = (report) => {
    setSelectedReport(report);
    setShowFullReport(true);
  };

  const closeReports = () => {
    setShowReports(false);
    setShowFullReport(false);
    setSelectedReport(null);
    setSelectedPatient(null);
    setReportError(null);
  };

  const goNewPatient = () => navigate(`${DOCTOR_BASE}/capture`);

  const goNewConsultation = (p) => {
    const payload = {
      patientId: p.id,
      patientName: p.name,
      location: p.location,
      age: p.age,
      email: p.email,
      phone: p.phone,
      vitals: p.vitals || {},
      mode: "fresh" // indicates this is a new consultation, not from report history
    };

    console.log("🚀 NAV PAYLOAD:", payload);

    sessionStorage.setItem("capturePatient", JSON.stringify(payload));
    navigate(`${DOCTOR_BASE}/capture/${p.id}`, { state: payload });
  };

  // ===============================
  // DOWNLOAD PATIENT LIST EXCEL
  // ===============================
  const downloadPatientListExcel = () => {
    if (patients.length === 0) {
      alert("No patients available to download.");
      return;
    }

    const data = patients.map((p) => ({
      "Patient ID": p.id,
      "Patient Name": p.name,
      Age: p.age,
      "Phone Number": p.phone,
      Email: p.email,
      Location: p.location,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const columnWidths = Object.keys(data[0]).map((key) => ({
      wch:
        Math.max(
          key.length,
          ...data.map((row) => String(row[key]).length)
        ) + 5,
    }));

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patient List");

    XLSX.writeFile(workbook, "Patient_List.xlsx");
  };

  // ===============================
  // DOWNLOAD SELECTED PATIENT CSV
  // ===============================

  const handleDownloadPDF = () => {
  const element = document.getElementById("pdf-content");

  const fileName = `${selectedPatient.name}_${selectedReport.date}.pdf`;

  const opt = {
    margin: 0.5,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
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
              PATIENTS
            </h1>
            <p className="text-sm text-black/55 mt-1">
              Manage patient records and consultations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SecondaryButton
              onClick={downloadPatientListExcel}
              leftIcon={<FiFileText />}
            >
              DOWNLOAD PATIENT REPORT
            </SecondaryButton>

            <PrimaryButton onClick={goNewPatient} leftIcon={<FiPlus />}>
              NEW PATIENT
            </PrimaryButton>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="TOTAL PATIENTS"
            value={stats.totalPatients}
            subtitle="Active patients"
            border="border-[#00B8DB]"
            iconBg="bg-[#00B8DB]"
            icon={<FiUser />}
          />
          <StatCard
            title="TODAY'S CONSULTATIONS"
            value={stats.todaysConsults}
            subtitle={
              <span className="inline-flex items-center gap-2">
                <span className="text-[#00C950] font-extrabold">▲</span>
                <span className="text-black/60">+2 from yesterday</span>
              </span>
            }
            border="border-black"
            iconBg="bg-white"
            icon={<FiActivity />}
          />
          <StatCard
            title="REPORTS GENERATED"
            value={stats.reportsGenerated}
            subtitle="Total records"
            border="border-[#F0B100]"
            iconBg="bg-[#F0B100]"
            icon={<FiFileText />}
          />
          <StatCard
            title="AVG. WAIT TIME"
            value={`${stats.avgWait} min`}
            subtitle={
              <span className="inline-flex items-center gap-2">
                <span className="text-[#FF2D2D] font-extrabold">▼</span>
                <span className="text-black/60">Below target</span>
              </span>
            }
            border="border-[#00B8DB]"
            iconBg="bg-[#00B8DB]"
            icon={<FiClock />}
          />
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
          <div className="text-lg font-extrabold text-black">PATIENT LIST</div>

          <div className="w-full md:w-[420px] border-2 border-black bg-white rounded-md px-3 h-11 flex items-center gap-2">
            <FiSearch className="text-black/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name / ID / phone..."
              className="w-full outline-none bg-transparent text-sm text-black placeholder:text-black/35"
            />
          </div>
        </div>

        {loadingPatients ? (
          <div className="mt-4 border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
            Loading patients...
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <PatientCard
                key={p.id}
                p={p}
                onNewConsult={goNewConsultation}
                onOpenReport={openHistory}
              />
            ))}
          </div>
        )}

        {!loadingPatients && filtered.length === 0 && (
          <div className="mt-4 border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
            No patients match your search.
          </div>
        )}
      </main>

      <Modal
        open={showReports}
        title={showFullReport ? "FULL REPORT" : "MEDICAL REPORTS"}
        onClose={closeReports}
        widthClass={showFullReport ? "max-w-[980px]" : "max-w-[720px]"}
      >
        {selectedPatient ? (
          <>
            {!showFullReport && (
              <div className="text-sm text-black/70 mb-3">
                <span className="font-extrabold text-black">Reports for</span>{" "}
                <span className="font-extrabold">{selectedPatient.name}</span>{" "}
                <span className="text-black/50">({selectedPatient.id})</span>
              </div>
            )}

            {reportError && !loadingReport && (
              <div className="mb-4 p-3 border-2 border-yellow-500 bg-yellow-50 rounded-md text-sm text-yellow-800">
                <strong>Note:</strong> {reportError}
                <p className="mt-2 text-xs">
                  Showing sample data for demonstration.
                </p>
              </div>
            )}

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {loadingReport ? (
                <div className="text-sm text-black/60">
                  Loading reports...
                </div>
              ) : showFullReport && selectedReport ? (
                <FullReportView
  item={selectedReport}
  onBack={() => {
    setShowFullReport(false);
    setSelectedReport(null);
  }}
  setShowPdfPreview={setShowPdfPreview}
/>
              ) : reportHistory.length === 0 ? (
                <div className="border-2 border-black bg-white rounded-md p-6 text-sm text-black/60">
                  No report history found for this patient.
                </div>
              ) : (
                reportHistory
                  .filter(r => r.patientId === selectedPatient.id)
                  .map((item, index) => (
                    <ReportSummaryCard
                      key={index}
                      report={item}
                      onClick={openFullReport}
                    />
                  ))
              )}
            </div>

            {!showFullReport && (
  <div className="mt-4 flex justify-end">
    <button
      type="button"
      onClick={closeReports}
      className="h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs uppercase"
    >
      CLOSE
    </button>
  </div>
)}
          </>
        ) : (
          <div className="text-sm text-black/60">
            Select a patient to view history.
          </div>
        )}
      </Modal>
      <Modal
  open={showPdfPreview}
  title="PDF PREVIEW"
  onClose={() => setShowPdfPreview(false)}
  widthClass="max-w-[900px]"
>
  <div id="pdf-content" className="bg-white p-6">

    <h2 className="text-xl font-bold mb-2">Medical Report</h2>

    <p><strong>Patient:</strong> {selectedPatient?.name}</p>
    <p><strong>Date:</strong> {selectedReport?.date}</p>
    <p><strong>Time:</strong> {selectedReport?.time}</p>

    <hr className="my-3" />

    <p><strong>Height:</strong> {selectedReport?.vitals.height}</p>
    <p><strong>Weight:</strong> {selectedReport?.vitals.weight}</p>
    <p><strong>BP:</strong> {selectedReport?.vitals.bp}</p>

    <hr className="my-3" />

    <p><strong>Medication:</strong> {selectedReport?.medication}</p>
    <p><strong>Symptoms:</strong> {selectedReport?.symptoms}</p>
    <p><strong>Doctor Notes:</strong> {selectedReport?.doctorNotes}</p>

  </div>

  <div className="mt-4 flex justify-end gap-2">
    <button
      onClick={handleDownloadPDF}
      className="h-9 px-4 border-2 border-black rounded-sm bg-[#00B8DB] font-extrabold text-xs uppercase"
    >
      DOWNLOAD PDF
    </button>

    <button
      onClick={() => setShowPdfPreview(false)}
      className="h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs uppercase"
    >
      CLOSE
    </button>
  </div>
</Modal>
    </div>
  );
}
