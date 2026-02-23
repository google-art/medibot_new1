

// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function MedicalWorkable({ demoRef }) {
//   const navigate = useNavigate();

//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const fileInputRef = useRef(null);

//   const [status, setStatus] = useState("READY");
//   const [isRecording, setIsRecording] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const [form, setForm] = useState({
//     patient_id: "",
//     patient_name: "",
//     symptoms: "",
//     medicines: "",
//     doctor_notes: "",
//     follow_up_required: false,
//   });

//   /* ================= START RECORDING ================= */
//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     audioChunksRef.current = []; // ✅ RESET
//     const recorder = new MediaRecorder(stream, {
//       mimeType: "audio/webm",
//     });

//     mediaRecorderRef.current = recorder;

//     recorder.ondataavailable = (e) => {
//       if (e.data && e.data.size > 0) {
//         audioChunksRef.current.push(e.data);
//       }
//     };

//     recorder.onstop = async () => {
//       const blob = new Blob(audioChunksRef.current, {
//         type: "audio/webm",
//       });

//       await sendAudio(blob, "recording.webm");
//       stream.getTracks().forEach((t) => t.stop());
//     };

//     recorder.start();
//     setIsRecording(true);
//     setStatus("RECORDING...");
//   };

//   /* ================= STOP RECORDING ================= */
//   const stopRecording = () => {
//     if (!mediaRecorderRef.current) return;

//     setIsRecording(false);
//     setStatus("PROCESSING...");
//     mediaRecorderRef.current.stop();
//   };

//   /* ================= UPLOAD AUDIO ================= */
//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setStatus("PROCESSING...");
//     await sendAudio(file, file.name);
//   };

//   /* ================= SEND AUDIO (COMMON) ================= */
//   const sendAudio = async (audio, filename) => {
//     try {
//       const formData = new FormData();
//       formData.append("audio", audio, filename);

//       const res = await fetch("http://localhost:3001/api/medibot/voice", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       // ✅ ALWAYS UPDATE FORM WITH NEW RESPONSE
//       setForm({
//         patient_id: data.patient_id || "",
//         patient_name: data.patient_name || "",
//         symptoms: data.symptoms || "",
//         medicines: data.medicines || "",
//         doctor_notes: data.doctor_notes || "",
//         follow_up_required: !!data.follow_up_required,
//       });

//       setShowForm(true);
//       setStatus("READY");
//     } catch (err) {
//       console.error(err);
//       setStatus("ERROR");
//     }
//   };

//   /* ================= CONFIRM ================= */
//   const confirmData = async () => {
//     await fetch("http://localhost:3001/api/medibot/confirm", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     navigate("/doctordashboard");
//   };

//   /* ================= UI — EXACT SAME ================= */
//   return (
//     <section ref={demoRef} className="py-12 bg-white">
//       <div className="max-w-5xl mx-auto px-4">

//         {/* LIVE DEMO UI */}
//         {!showForm && (
//           <div className="rounded-3xl border-4 border-cyan-400 bg-white shadow-xl overflow-hidden">

//             <div className="bg-cyan-400 px-6 py-4 flex justify-between items-center border-b-4 border-black font-mono">
//               <span>🎤 NOTEWHISPER</span>
//               <span className="border-2 border-black px-4 py-1 bg-white">
//                 {status}
//               </span>
//             </div>

//             <div className="p-6">
//               <div className="border-4 border-black px-6 py-6 flex justify-between items-center mb-6 font-mono">
//                 <span>VOICE_INPUT</span>

//                 <div className="flex gap-3">
//                   {!isRecording ? (
//                     <button
//                       onClick={startRecording}
//                       className="bg-red-500 text-white px-6 py-2 border-4 border-black font-bold"
//                     >
//                       ● START
//                     </button>
//                   ) : (
//                     <button
//                       onClick={stopRecording}
//                       className="bg-yellow-400 text-black px-6 py-2 border-4 border-black font-bold"
//                     >
//                       ■ STOP
//                     </button>
//                   )}

//                   {/* UPLOAD (UI SAFE) */}
//                   <button
//                     onClick={() => fileInputRef.current.click()}
//                     className="bg-blue-500 text-white px-6 py-2 border-4 border-black font-bold"
//                   >
//                     ⬆ UPLOAD
//                   </button>

//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="audio/*"
//                     hidden
//                     onChange={handleUpload}
//                   />
//                 </div>
//               </div>

//               <div className="border-4 border-black h-56 mb-4" />
//               <div className="text-center font-mono text-sm">
//                 Record or upload a medical voice note
//               </div>
//             </div>
//           </div>
//         )}

//         {/* FORM (UNCHANGED STRUCTURE) */}
//         {showForm && (
//           <div className="mt-10">
//             <input className="border w-full p-2 mb-3"
//               value={form.patient_id}
//               onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
//               placeholder="Patient ID" />

//             <input className="border w-full p-2 mb-3"
//               value={form.patient_name}
//               onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
//               placeholder="Patient Name" />

//             <input className="border w-full p-2 mb-3"
//               value={form.symptoms}
//               onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
//               placeholder="Symptoms" />

//             <input className="border w-full p-2 mb-3"
//               value={form.medicines}
//               onChange={(e) => setForm({ ...form, medicines: e.target.value })}
//               placeholder="Medicines" />

//             <textarea className="border w-full p-2 mb-3"
//               value={form.doctor_notes}
//               onChange={(e) => setForm({ ...form, doctor_notes: e.target.value })}
//               placeholder="Doctor Notes" />

//             <button
//               onClick={confirmData}
//               className="bg-green-500 text-white w-full py-2 font-bold"
//             >
//               ✅ CONFIRM
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


import { useEffect, useRef, useState } from "react";

export default function MedicalWorkable({ demoRef }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  // ✅ Pause video when browser tab changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // ✅ Pause video when component unmounts (tool switch)
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <section ref={demoRef} className="py-12 bg-white font-mono">
      <div className="max-w-5xl mx-auto px-4">

        {/* ===== NOTEWHISPER CONTAINER ===== */}
        <div className="rounded-3xl border-4 border-cyan-400 bg-white shadow-xl overflow-hidden">

          {/* ===== HEADER ===== */}
          <div className="bg-cyan-400 px-6 py-4 flex justify-between items-center border-b-4 border-black">
            <span className="text-lg font-bold flex items-center gap-2">
              🎤 NOTEWHISPER
            </span>

            <span className="border-2 border-black px-4 py-1 bg-white font-bold">
              DEMO
            </span>
          </div>

          {/* ===== BODY ===== */}
          <div className="p-6">

            {/* TITLE BAR */}
            <div className="border-4 border-black px-6 py-4 mb-6">
              LIVE DEMO PREVIEW
            </div>

            {/* VIDEO CONTAINER */}
            <div className="relative border-4 border-black overflow-hidden rounded-xl bg-black">

              {/* VIDEO */}
              <video
                ref={videoRef}
                src="/notewhisper video.mp4"
                controls={isPlaying}
                className="w-full h-[400px] object-cover"
              />

              {/* PLAY OVERLAY */}
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                >
                  <div className="bg-white border-4 border-black px-8 py-4 text-xl font-bold flex items-center gap-3 hover:scale-105 transition">
                    ▶ PLAY DEMO
                  </div>
                </button>
              )}
            </div>

            {/* FOOTER TEXT */}
            <div className="text-center text-sm mt-4">
              Click play to watch NoteWhisper convert voice into medical notes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
