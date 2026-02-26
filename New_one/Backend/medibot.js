// // import express from "express";
// // import multer from "multer";

// // const router = express.Router();
// // const upload = multer();

// // /* 🔗 n8n Webhooks */
// // const VOICE_WEBHOOK =
// //   "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/prodvoicebasedurl";

// // const SAVE_WEBHOOK =
// //   "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/savetodrive";

// // /* ---------------- VOICE → n8n ---------------- */
// // router.post("/voice", upload.single("audio"), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ error: "No audio received" });
// //     }

// //     // ✅ Native FormData (Node 18+)
// //     const formData = new FormData();
// //     const audioBlob = new Blob([req.file.buffer], {
// //       type: "audio/wav",
// //     });

// //     formData.append("audio", audioBlob, "doctor_note.wav");

// //     const response = await fetch(VOICE_WEBHOOK, {
// //       method: "POST",
// //       body: formData,
// //     });

// //     const data = await response.json();
// //     res.json(data);

// //   } catch (err) {
// //     console.error("❌ Voice processing error:", err);
// //     res.status(500).json({ error: "Voice processing failed" });
// //   }
// // });

// // /* ---------------- SAVE CONFIRMED DATA ---------------- */
// // router.post("/confirm", async (req, res) => {
// //   try {
// //     await fetch(SAVE_WEBHOOK, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(req.body),
// //     });

// //     res.json({ success: true });

// //   } catch (err) {
// //     console.error("❌ Save error:", err);
// //     res.status(500).json({ error: "Save failed" });
// //   }
// // });

// // export default router;



// import express from "express";
// import multer from "multer";

// const router = express.Router();
// const upload = multer();

// const patients = [];

// const VOICE_WEBHOOK =
//   "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/prodvoicebasedurl";

// const SAVE_WEBHOOK =
//   "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/savetodrive";

// /* ---------- VOICE ---------- */
// router.post("/voice", upload.single("audio"), async (req, res) => {
//   try {
//     const formData = new FormData();
//     const audioBlob = new Blob([req.file.buffer], {
//       type: req.file.mimetype,
//     });

//     formData.append("audio", audioBlob, "doctor_note.wav");

//     const response = await fetch(VOICE_WEBHOOK, {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
//     res.json(data);
//   } catch {
//     res.status(500).json({ error: "Voice processing failed" });
//   }
// });

// /* ---------- CONFIRM ---------- */
// router.post("/confirm", async (req, res) => {
//   try {
//     const patient = {
//       ...req.body,
//       createdAt: new Date().toISOString(),
//     };

//     patients.push(patient);

//     await fetch(SAVE_WEBHOOK, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(patient),
//     });

//     res.json({ success: true });
//   } catch {
//     res.status(500).json({ error: "Save failed" });
//   }
// });

// /* ---------- DASHBOARD ---------- */
// router.get("/patients", (req, res) => {
//   res.json(patients);
// });

// export default router;


import express from "express";
console.log("✅ MEDIBOT ROUTER LOADED");
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/ping", (req, res) => {
  res.json({ message: "MediBot working" });
});

/* ---------- n8n WEBHOOKS ---------- */
const VOICE_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/prodvoicebasedurl";

const SAVE_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/savetodrive";

const PATIENT_ID_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/patient_id";

const SCHEDULE_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Schedules_data";

const GET_PATIENT_DETAILS_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Get_patient_details";

const PATIENT_REPORT_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Patient_Report_patient_pannel";

/* ---------- TEMP MEMORY DB ---------- */
const patients = [];

/* =========================================================
   🎙️ VOICE → n8n → RETURN CLEAN MEDICAL JSON
========================================================= */
router.post("/voice", upload.single("audio"), async (req, res) => {
  try {
    console.log("🎙️ /voice route hit");

    if (!req.file) {
      return res.status(400).json({ error: "Audio file missing" });
    }

    /* ---------- SEND AUDIO TO n8n ---------- */
    const formData = new FormData();
    formData.append("audio", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await fetch(VOICE_WEBHOOK, {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    console.log("📡 n8n status:", response.status);

    const data = await response.json();
    console.log("📨 Raw n8n response:", data);

    /* 🔥 IMPORTANT: return SAME JSON to frontend */
    return res.json(data);

  } catch (err) {
    console.error("🔥 VOICE ERROR:", err);
    res.status(500).json({ error: "Voice processing failed" });
  }
});


/* =========================================================
   💾 CONFIRM → SAVE TO n8n + MEMORY
========================================================= */
router.post(
  "/confirm",
  upload.single("reportFile"), // 👈 IMPORTANT
  async (req, res) => {
    try {
      const patient = {
        ...req.body,
        createdAt: new Date().toISOString(),
      };

      patients.push(patient);

      const formData = new FormData();

      // Append all text fields
      Object.keys(patient).forEach((key) => {
        formData.append(key, patient[key]);
      });

      // Append file if exists
      if (req.file) {
        formData.append("reportFile", req.file.buffer, {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        });
      }

      await fetch(SAVE_WEBHOOK, {
        method: "POST",
        body: formData,
        headers: formData.getHeaders(),
      });

      res.json({ success: true });

    } catch (err) {
      console.error("🔥 CONFIRM ERROR:", err);
      res.status(500).json({ error: "Save failed" });
    }
  }
);

/* =========================================================
   📊 DASHBOARD DATA
========================================================= */
router.get("/patients", (req, res) => {
  res.json(patients);
});

router.get("/generate-patient-id", async (req, res) => {
  try {
    const response = await fetch(PATIENT_ID_WEBHOOK, {
      method: "POST",
    });

    const data = await response.json();
    res.json(data); // { patientId: "P483920128" }

  } catch (err) {
    console.error("🔥 ID GENERATION ERROR:", err);
    res.status(500).json({ error: "ID generation failed" });
  }
});

/* =========================================================
   📅 GET LATEST BOOKINGS (For Notifications)
========================================================= */

const GET_ALL_BOOKINGS =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook/getalldata-solo";

router.get("/latest-booking", async (req, res) => {
  try {
    console.log("🔥 Calling n8n with POST");

    const response = await fetch(GET_ALL_BOOKINGS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    console.log("🔥 n8n RAW DATA:", data);

    // ✅ If n8n already sends { latest: {...} }
    if (data && data.latest) {
      return res.json({ latest: data.latest });
    }

    // Fallback safety
    return res.json({ latest: null });

  } catch (err) {
    console.error("🔥 ERROR:", err);
    res.status(500).json({ error: "Failed" });
  }
});

/* =========================================================
   📅 SAVE WEEK SCHEDULE → n8n
========================================================= */
router.post("/save-schedule", async (req, res) => {
  try {
    console.log("📅 /save-schedule route hit");

    const scheduleData = {
      ...req.body,
      savedAt: new Date().toISOString(),
    };

    const response = await fetch(SCHEDULE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scheduleData),
    });

    console.log("📡 n8n status:", response.status);

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        message: "n8n webhook failed",
      });
    }

    const data = await response.json();
    console.log("📨 n8n response:", data);

    return res.json({
      success: true,
      message: "Schedule saved successfully",
    });

  } catch (err) {
    console.error("🔥 SAVE SCHEDULE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "n8n not reachable",
    });
  }
});
/* =========================================================
   🔍 GET PATIENT DETAILS BY ID → n8n
========================================================= */
router.post("/get-patient-details", async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID required" });
    }

    console.log("🔎 Fetching patient:", patientId);

    const response = await fetch(GET_PATIENT_DETAILS_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patientId }),
    });

    const data = await response.json();

    console.log("📨 n8n patient data:", data);

    // Send n8n response directly to frontend
    res.json(data);

  } catch (err) {
    console.error("🔥 PATIENT FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch patient details" });
  }
});

/* =========================================================
   🧾 GENERATE PATIENT REPORT CARD → n8n
========================================================= */
router.post("/patient-report", async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID required" });
    }

    console.log("🧾 Generating report for:", patientId);

    const response = await fetch(PATIENT_REPORT_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patientId }),
    });

    const data = await response.json();

    console.log("📨 Report response from n8n:", data);

    // 🔥 Send n8n response directly to frontend
    res.json(data);

  } catch (err) {
    console.error("🔥 PATIENT REPORT ERROR:", err);
    res.status(500).json({ error: "Failed to generate patient report" });
  }
});

export default router;