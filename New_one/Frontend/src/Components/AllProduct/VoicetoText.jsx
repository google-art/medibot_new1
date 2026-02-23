// import { useState, useEffect } from "react";

// export default function ClinNoteAI() {
//   const [sent, setSent] = useState(false);
//   const [step, setStep] = useState(0);
//   const [filled, setFilled] = useState(false);

//   const steps = [
//     "Audio Received",
//     "Transcribing",
//     "Extracting Data",
//     "Generating Report",
//   ];

//   useEffect(() => {
//     if (sent && step < steps.length) {
//       const t = setTimeout(() => setStep(s => s + 1), 900);
//       return () => clearTimeout(t);
//     }

//     if (step === steps.length) {
//       setTimeout(() => setFilled(true), 600);
//     }
//   }, [sent, step]);

//   return (
//     <div className="min-h-screen bg-black text-white">

//       {/* HERO */}
//       <section className="text-center py-16 border-b border-cyan-500">
//         <span className="border px-4 py-1 text-sm text-gray-400">
//           AI MEDICAL DOCUMENTATION
//         </span>

//         <h1 className="text-5xl font-extrabold mt-6">
//           CLIN<span className="text-cyan-400">NOTE_AI</span>
//         </h1>

//         <p className="text-gray-400 mt-3">
//           Voice-first medical documentation for doctors & clinics
//         </p>
//       </section>

//       <div className="grid md:grid-cols-3 gap-6 p-8">

//         {/* LEFT */}
//         <div className="space-y-6">

//           <div className="border-2 border-cyan-400 rounded p-5 space-y-4">
//             <h3 className="text-cyan-400 font-semibold">PATIENT_SELECT</h3>

//             <select className="w-full bg-black border border-cyan-400 p-2 rounded">
//               <option>Select patient...</option>
//               <option>Sarah John - 32Y Female</option>
//               <option>John Smith - 45Y Male</option>
//             </select>

//             <select className="w-full bg-black border border-cyan-400 p-2 rounded">
//               <option>Consultation</option>
//               <option>Follow-up</option>
//               <option>Emergency</option>
//             </select>
//           </div>

//           <div className="border-2 border-white rounded p-5 text-center space-y-3">
//             <h3 className="font-semibold">VOICE_RECORD</h3>

//             <div className="text-cyan-400 text-3xl font-mono">00:00</div>

//             <div className="flex gap-2">
//               <button className="bg-teal-700 flex-1 py-2 rounded">START</button>
//               <button className="bg-gray-600 flex-1 py-2 rounded">PAUSE</button>
//               <button className="bg-yellow-500 flex-1 py-2 rounded text-black font-semibold">
//                 STOP
//               </button>
//             </div>

//             <button
//               onClick={() => setSent(true)}
//               className="bg-cyan-500 w-full py-2 rounded text-black font-semibold"
//             >
//               SEND TO AI SYSTEM
//             </button>
//           </div>
//         </div>

//         {/* MIDDLE */}
//         <div className="space-y-6">

//           <div className="border-2 border-yellow-500 rounded p-5 space-y-3">
//             <h3 className="text-yellow-400 font-semibold">AI_PROCESSING</h3>

//             {steps.map((s, i) => (
//               <div
//                 key={i}
//                 className={`h-12 flex items-center px-4 rounded
//                 ${i < step ? "bg-green-500 text-black" : "bg-slate-900 text-gray-400"}`}
//               >
//                 {s}
//               </div>
//             ))}
//           </div>

//           <div className="border-2 border-white rounded p-5">
//             <h3 className="text-cyan-400 font-semibold mb-3">TRANSCRIPT</h3>

//             <div className="bg-slate-900 rounded p-4 h-60 overflow-y-auto text-gray-300">
//               {filled &&
//                 "Patient presents with persistent frontal headache for three days, photophobia and sleep disturbance. Occasional ibuprofen use. Vitals normal and neurological exam unremarkable."
//               }
//             </div>

//             <button className="mt-4 bg-cyan-500 text-black px-5 py-2 rounded font-semibold">
//               COPY
//             </button>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="border-2 border-cyan-400 rounded p-5 h-[540px] flex flex-col">

//           <h3 className="text-cyan-400 font-semibold mb-4">MEDICAL_REPORT</h3>

//           <div className="flex-1 overflow-y-auto space-y-4 pr-2">

//             <div className="grid grid-cols-3 gap-3">
//               <input className="bg-slate-900 p-2 rounded" placeholder="Patient" readOnly />
//               <input className="bg-slate-900 p-2 rounded" placeholder="Age" readOnly />
//               <input className="bg-slate-900 p-2 rounded" placeholder="Gender" readOnly />
//             </div>

//             <textarea className="bg-slate-900 rounded p-3 h-24 w-full" placeholder="Symptoms" readOnly
//               value={filled ? "Persistent frontal headache, photophobia, sleep disturbance" : ""} />

//             <textarea className="bg-slate-900 rounded p-3 h-24 w-full" placeholder="Diagnosis" readOnly
//               value={filled ? "Tension-type headache, rule out migraine" : ""} />

//             <textarea className="bg-slate-900 rounded p-3 h-24 w-full" placeholder="Medication" readOnly
//               value={filled ? "Ibuprofen 400mg TID PRN" : ""} />

//             <textarea className="bg-slate-900 rounded p-3 h-24 w-full" placeholder="Doctor Notes" readOnly
//               value={filled ? "Stress management and sleep hygiene advised" : ""} />

//             <textarea className="bg-slate-900 rounded p-3 h-24 w-full" placeholder="Follow-up Instructions" readOnly
//               value={filled ? "Follow up in 2 weeks" : ""} />
//           </div>

//           <div className="flex gap-4 pt-4">
//             <button className="bg-cyan-500 text-black px-6 py-2 rounded font-semibold w-full">
//               SAVE
//             </button>
//             <button className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold w-full">
//               EXPORT
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RECENT CONSULTATIONS (DEFAULT VISIBLE) */}
//       <div className="mx-8 mb-10 border border-white rounded overflow-hidden">

//         <div className="bg-slate-900 flex justify-between items-center p-4">
//           <span className="font-semibold">RECENT_CONSULTATIONS</span>
//           <span className="bg-cyan-400 text-black px-3 py-1 rounded">2</span>
//         </div>

//         <div className="space-y-4 p-4">

//           <div className="border border-slate-700 p-4 rounded bg-slate-900 flex justify-between">
//             <div>
//               <p className="font-semibold">John Smith</p>
//               <p className="text-gray-400 text-sm">1/28/2024, 10:30 AM • 12:34</p>
//             </div>
//             <span className="bg-green-500 text-black px-3 py-1 rounded">COMPLETED</span>
//           </div>

//           <div className="border border-slate-700 p-4 rounded bg-slate-900 flex justify-between">
//             <div>
//               <p className="font-semibold">Sarah Johnson</p>
//               <p className="text-gray-400 text-sm">1/28/2024, 11:15 AM • 08:22</p>
//             </div>
//             <span className="bg-green-500 text-black px-3 py-1 rounded">COMPLETED</span>
//           </div>

//         </div>
//       </div>

//       {/* FEATURES */}
//       <div className="grid md:grid-cols-4 gap-6 px-8 pb-16">

//         <div className="border-2 border-cyan-400 p-6 rounded text-center">
//           HIPAA Compliant
//           <p className="text-gray-400 mt-1">Secure & encrypted</p>
//         </div>

//         <div className="border-2 border-yellow-500 p-6 rounded text-center">
//           Lightning Fast
//           <p className="text-gray-400 mt-1">Process in seconds</p>
//         </div>

//         <div className="border-2 border-white p-6 rounded text-center">
//           AI-Powered
//           <p className="text-gray-400 mt-1">Smart extraction</p>
//         </div>

//         <div className="border-2 border-cyan-400 p-6 rounded text-center">
//           EMR Integration
//           <p className="text-gray-400 mt-1">Seamless export</p>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function ClinNoteAI() {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const [filled, setFilled] = useState(false);
  const [showConsultations, setShowConsultations] = useState(false);
  const [showUnderscore, setShowUnderscore] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [visitType, setVisitType] = useState("Consultation");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const steps = [
    "Audio Received",
    "Transcribing",
    "Extracting Data",
    "Generating Report",
  ];

  // Underscore animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowUnderscore(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (sent && step < steps.length) {
      const t = setTimeout(() => setStep(s => s + 1), 900);
      return () => clearTimeout(t);
    }

    if (step === steps.length) {
      setTimeout(() => setFilled(true), 600);
    }
  }, [sent, step]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    if (selectedPatient) {
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  const handlePauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const handleSendToAI = () => {
    if (recordingTime > 0) {
      setSent(true);
      setStep(0);
      setFilled(false);
    }
  };

  const handleCopyTranscript = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    // In real app, copy transcript text to clipboard
    console.log("Transcript copied!");
  };

  const handleSaveReport = () => {
    if (filled) {
      alert("Medical report saved successfully!");
      console.log("Report saved");
    }
  };

  const handleExportReport = () => {
    if (filled) {
      alert("Medical report exported to EMR system!");
      console.log("Report exported");
    }
  };

  const consultations = [
    {
      id: 1,
      name: "John Smith",
      age: "45Y Male",
      type: "Follow-up",
      date: "1/28/2024",
      time: "10:30 AM",
      duration: "12:34",
      status: "COMPLETED",
      presentHistory: "Patient presents with chronic lower back pain for 6 months. Reports stiffness in morning, pain worsens with prolonged sitting. No radiating pain. Taking ibuprofen 200mg as needed.",
      pastHistory: "Hypertension (diagnosed 2018), Hyperlipidemia (diagnosed 2020). Previous surgery: Appendectomy (2015). Allergies: Penicillin. Medications: Lisinopril 10mg daily, Atorvastatin 20mg daily.",
      vitalSigns: "BP: 132/84, HR: 72, Temp: 98.6°F, SpO2: 98%",
      diagnosis: "Chronic mechanical lower back pain",
      treatment: "Physical therapy referral, Continue ibuprofen PRN, Core strengthening exercises"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: "32Y Female",
      type: "Emergency",
      date: "1/28/2024",
      time: "11:15 AM",
      duration: "08:22",
      status: "COMPLETED",
      presentHistory: "Acute onset of severe frontal headache with photophobia and nausea for 3 days. Reports sleep disturbance. No fever, no visual disturbances. Pain intensity 8/10.",
      pastHistory: "No chronic medical conditions. Previous migraine episodes (2 in past year). Allergies: None known. Medications: Occasional ibuprofen. Family history: Mother with migraines.",
      vitalSigns: "BP: 118/76, HR: 68, Temp: 98.2°F, SpO2: 99%",
      diagnosis: "Migraine without aura",
      treatment: "Sumatriptan 50mg PRN, Hydration, Dark room rest, Follow-up if symptoms persist"
    }
  ];

  const handlePatientSelect = (consultation) => {
    setSelectedConsultation(consultation);
    setShowPopup(true);
    setSelectedPatient(`${consultation.name} - ${consultation.age}`);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedConsultation(null);
  };

  const patients = [
    "Select patient...",
    "Sarah Johnson - 32Y Female",
    "John Smith - 45Y Male",
    "Michael Brown - 58Y Male",
    "Emma Wilson - 41Y Female"
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="text-center py-16 border-b border-cyan-500">
        <span className="border border-cyan-500 px-4 py-1 text-sm text-gray-300">
          AI MEDICAL DOCUMENTATION
        </span>

        <h1 className="text-5xl font-extrabold mt-6">
          CLIN<span className="text-cyan-400">NOTE</span>
          <span className="text-cyan-400">_AI</span>
          <span className={`text-cyan-400 transition-opacity duration-100 ${showUnderscore ? "opacity-100" : "opacity-0"}`}>
            _
          </span>
        </h1>

        <p className="text-gray-300 mt-3 text-lg">
          Voice-first medical documentation for doctors and clinics.
        </p>
        
        <div className="mt-4 flex justify-center gap-4">
          <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 border border-cyan-500 rounded-full text-sm">
            HIPAA Compliant
          </span>
          <span className="px-3 py-1 bg-yellow-900/50 text-yellow-300 border border-yellow-500 rounded-full text-sm">
            90% Time Saved
          </span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-300 border border-blue-500 rounded-full text-sm">
            AI-Powered
          </span>
        </div>
        
        <p className="text-gray-400 mt-6 text-sm">
          Record • Process • Export in seconds
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6 p-8">

        {/* LEFT */}
        <div className="space-y-6">
          <div className="border-2 border-cyan-400 rounded p-5 space-y-4">
            <h3 className="text-cyan-400 font-semibold">PATIENT_SELECT</h3>
            
            <div>
              <p className="text-gray-400 text-sm mb-2">Patient</p>
              <select 
                className="w-full bg-black border border-cyan-400 p-2 rounded cursor-pointer hover:border-cyan-300 transition-colors"
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
              >
                {patients.map((patient, index) => (
                  <option key={index} value={patient}>{patient}</option>
                ))}
              </select>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-2">Visit Type</p>
              <select 
                className="w-full bg-black border border-cyan-400 p-2 rounded cursor-pointer hover:border-cyan-300 transition-colors"
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
              >
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
                <option value="Annual Checkup">Annual Checkup</option>
              </select>
            </div>

            {selectedPatient && selectedPatient !== "Select patient..." && (
              <div className="p-3 bg-cyan-900/20 border border-cyan-500/30 rounded">
                <p className="text-cyan-300 text-sm font-medium">Selected: {selectedPatient}</p>
                <p className="text-gray-400 text-xs">{visitType} Visit</p>
              </div>
            )}
          </div>

          <div className="border-2 border-white rounded p-5 text-center space-y-3">
            <h3 className="font-semibold">VOICE_RECORD</h3>

            <div className={`text-3xl font-mono ${isRecording ? 'text-cyan-300' : 'text-cyan-400'}`}>
              {formatTime(recordingTime)}
            </div>

            <div className="flex gap-2">
              {!isRecording ? (
                <button 
                  onClick={handleStartRecording}
                  disabled={!selectedPatient || selectedPatient === "Select patient..."}
                  className={`flex-1 py-2 rounded transition-all ${selectedPatient && selectedPatient !== "Select patient..." ? 'bg-teal-700 hover:bg-teal-600 cursor-pointer' : 'bg-gray-700 cursor-not-allowed'}`}
                >
                  START
                </button>
              ) : (
                <button 
                  onClick={handleStopRecording}
                  className="flex-1 py-2 rounded bg-red-600 hover:bg-red-500 transition-all cursor-pointer"
                >
                  STOP
                </button>
              )}
              
              <button 
                onClick={handlePauseRecording}
                disabled={!isRecording}
                className={`flex-1 py-2 rounded transition-all ${isRecording ? 'bg-gray-600 hover:bg-gray-500 cursor-pointer' : 'bg-gray-700 cursor-not-allowed'}`}
              >
                {isPaused ? 'RESUME' : 'PAUSE'}
              </button>
              
              <button 
                onClick={handleStopRecording}
                disabled={!isRecording}
                className={`flex-1 py-2 rounded text-black font-semibold transition-all ${isRecording ? 'bg-yellow-500 hover:bg-yellow-400 cursor-pointer' : 'bg-yellow-500/50 cursor-not-allowed'}`}
              >
                STOP
              </button>
            </div>

            {isRecording && (
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`}></div>
                <span className={isPaused ? 'text-yellow-400' : 'text-red-400'}>
                  {isPaused ? 'PAUSED' : 'RECORDING...'}
                </span>
              </div>
            )}

            <button
              onClick={handleSendToAI}
              disabled={recordingTime === 0 || sent}
              className={`w-full py-2 rounded font-semibold transition-all ${
                recordingTime > 0 && !sent 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-black cursor-pointer' 
                  : 'bg-cyan-500/50 cursor-not-allowed text-gray-700'
              }`}
            >
              {sent ? 'PROCESSING...' : 'SEND TO AI SYSTEM'}
            </button>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="space-y-6">
          <div className="border-2 border-yellow-500 rounded p-5 space-y-3">
            <h3 className="text-yellow-400 font-semibold">AI_PROCESSING</h3>

            {steps.map((s, i) => (
              <div
                key={i}
                className={`h-12 flex items-center px-4 rounded transition-all duration-300 ${
                  i < step 
                    ? "bg-green-500 text-black font-semibold" 
                    : "bg-slate-900 text-gray-400"
                } ${i === step ? 'animate-pulse' : ''}`}
              >
                {s}
                {i < step && (
                  <span className="ml-auto text-black">✓</span>
                )}
              </div>
            ))}
          </div>

          <div className="border-2 border-white rounded p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-cyan-400 font-semibold">TRANSCRIPT</h3>
              <button 
                onClick={handleCopyTranscript}
                disabled={!filled}
                className={`px-4 py-1 rounded font-semibold text-sm transition-all ${
                  filled 
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-black cursor-pointer' 
                    : 'bg-cyan-500/50 cursor-not-allowed text-gray-700'
                }`}
              >
                {isCopied ? 'COPIED!' : 'COPY'}
              </button>
            </div>

            <div className="bg-slate-900 rounded p-4 h-60 overflow-y-auto text-gray-300">
              {filled ? (
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <span className="text-cyan-300 font-medium">Patient presents</span> with complaints of persistent headache for the past three days. Pain is described as throbbing, primarily located in the frontal region.
                  </p>
                  <p className="leading-relaxed">
                    <span className="text-cyan-300 font-medium">Patient reports</span> difficulty sleeping and sensitivity to light. No fever. No previous history of migraines. Patient takes occasional ibuprofen for pain relief.
                  </p>
                  <p className="leading-relaxed">
                    <span className="text-cyan-300 font-medium">Physical examination</span> reveals normal vital signs. Neurological examination is unremarkable.
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-cyan-400 text-lg mb-2">🎤</div>
                  <p className="text-gray-400">Recording complete. Ready to process.</p>
                  <p className="text-gray-500 text-sm mt-1">Click "SEND TO AI SYSTEM" to begin processing</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border-2 border-cyan-400 rounded p-5 h-[540px] flex flex-col">
          <h3 className="text-cyan-400 font-semibold mb-4">MEDICAL_REPORT</h3>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Patient</p>
                <div className="bg-slate-900 p-2 rounded">
                  {filled ? "Sarah Johnson" : "—"}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Age</p>
                <div className="bg-slate-900 p-2 rounded">
                  {filled ? "32" : "—"}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Gender</p>
                <div className="bg-slate-900 p-2 rounded">
                  {filled ? "Female" : "—"}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-sm">Symptoms</p>
              <div className="bg-slate-900 rounded p-3 h-20 w-full overflow-y-auto">
                {filled ? "Persistent frontal headache for 3 days, photophobia, sleep disturbance" : "—"}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-sm">Diagnosis</p>
              <div className="bg-slate-900 rounded p-3 h-20 w-full overflow-y-auto">
                {filled ? "Tension-type headache, rule out migraine" : "—"}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-sm">Medication</p>
              <div className="bg-slate-900 rounded p-3 h-20 w-full overflow-y-auto">
                {filled ? "Ibuprofen 400mg TID PRN" : "—"}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-sm">Doctor Notes</p>
              <div className="bg-slate-900 rounded p-3 h-20 w-full overflow-y-auto">
                {filled ? "Patient advised on stress management and sleep hygiene. Monitor frequency and severity of episodes." : "—"}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-sm">Follow-up Instructions</p>
              <div className="bg-slate-900 rounded p-3 h-20 w-full overflow-y-auto">
                {filled ? "Follow-up in 2 weeks if symptoms persist. Return immediately if worsening symptoms occur." : "—"}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={handleSaveReport}
              disabled={!filled}
              className={`px-6 py-2 rounded font-semibold w-full transition-all ${
                filled 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-black cursor-pointer' 
                  : 'bg-cyan-500/50 cursor-not-allowed text-gray-700'
              }`}
            >
              SAVE
            </button>
            <button 
              onClick={handleExportReport}
              disabled={!filled}
              className={`px-6 py-2 rounded font-semibold w-full transition-all ${
                filled 
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-black cursor-pointer' 
                  : 'bg-yellow-500/50 cursor-not-allowed text-gray-700'
              }`}
            >
              EXPORT
            </button>
          </div>
        </div>
      </div>

      {/* RECENT CONSULTATIONS (DROPDOWN STYLE) */}
      <div className="mx-8 mb-10 border border-white rounded overflow-hidden">
        <div 
          className="bg-slate-900 flex justify-between items-center p-4 cursor-pointer hover:bg-slate-800 transition-colors"
          onClick={() => setShowConsultations(!showConsultations)}
        >
          <span className="font-semibold">RECENT_CONSULTATIONS</span>
          <div className="flex items-center gap-2">
            <span className="bg-cyan-400 text-black px-2 py-1 rounded text-sm">{consultations.length}</span>
            <span className="text-gray-400 text-sm">{showConsultations ? 'Hide' : 'Show'} details</span>
            <span className="text-gray-400">{showConsultations ? '▼' : '▶'}</span>
          </div>
        </div>

        {showConsultations && (
          <div className="space-y-4 p-4 border-t border-slate-700">
            {consultations.map((consult) => (
              <div 
                key={consult.id} 
                className="border border-slate-700 p-4 rounded bg-slate-900 hover:bg-slate-800 cursor-pointer transition-colors"
                onClick={() => handlePatientSelect(consult)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{consult.name} - {consult.age}</p>
                    <p className="text-gray-400 text-sm">{consult.type} • {consult.date}, {consult.time}</p>
                    <p className="text-gray-500 text-xs">Duration: {consult.duration}</p>
                    <div className="mt-2">
                      <span className="text-xs bg-slate-800 text-cyan-300 px-2 py-1 rounded">Click to view full history</span>
                    </div>
                  </div>
                  <span className="bg-green-500 text-black px-3 py-1 rounded text-sm">{consult.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PATIENT HISTORY POPUP */}
      {showPopup && selectedConsultation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-cyan-500 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800 border-b border-cyan-500 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-cyan-300">{selectedConsultation.name}'s Medical History</h2>
                <p className="text-gray-400 text-sm">{selectedConsultation.age} • {selectedConsultation.type} Visit • {selectedConsultation.date}</p>
              </div>
              <button 
                onClick={handleClosePopup}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
              {/* Present History */}
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  PRESENT HISTORY
                </h3>
                <div className="bg-slate-800 border border-slate-700 rounded p-4">
                  <p className="text-gray-300">{selectedConsultation.presentHistory}</p>
                </div>
              </div>

              {/* Past History */}
              <div>
                <h3 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  PAST MEDICAL HISTORY
                </h3>
                <div className="bg-slate-800 border border-slate-700 rounded p-4">
                  <p className="text-gray-300">{selectedConsultation.pastHistory}</p>
                </div>
              </div>

              {/* Vital Signs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-green-400 font-semibold mb-2">VITAL SIGNS</h3>
                  <div className="bg-slate-800 border border-slate-700 rounded p-4">
                    <p className="text-gray-300">{selectedConsultation.vitalSigns}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">DIAGNOSIS</h3>
                  <div className="bg-slate-800 border border-slate-700 rounded p-4">
                    <p className="text-gray-300">{selectedConsultation.diagnosis}</p>
                  </div>
                </div>
              </div>

              {/* Treatment */}
              <div>
                <h3 className="text-emerald-400 font-semibold mb-2">TREATMENT PLAN</h3>
                <div className="bg-slate-800 border border-slate-700 rounded p-4">
                  <p className="text-gray-300">{selectedConsultation.treatment}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => {
                    setSelectedPatient(`${selectedConsultation.name} - ${selectedConsultation.age}`);
                    handleClosePopup();
                  }}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded transition-colors"
                >
                  Select This Patient
                </button>
                <button 
                  onClick={handleClosePopup}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 font-semibold py-2 rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FEATURES */}
      <div className="grid md:grid-cols-4 gap-6 px-8 pb-16">
        <div className="border-2 border-cyan-400 p-6 rounded text-center hover:bg-cyan-400/10 transition-colors cursor-pointer">
          <p className="font-semibold">HIPAA Compliant</p>
          <p className="text-gray-400 mt-1 text-sm">Secure & encrypted</p>
        </div>

        <div className="border-2 border-yellow-500 p-6 rounded text-center hover:bg-yellow-500/10 transition-colors cursor-pointer">
          <p className="font-semibold">Lightning Fast</p>
          <p className="text-gray-400 mt-1 text-sm">Process in seconds</p>
        </div>

        <div className="border-2 border-white p-6 rounded text-center hover:bg-white/10 transition-colors cursor-pointer">
          <p className="font-semibold">AI-Powered</p>
          <p className="text-gray-400 mt-1 text-sm">Smart extraction</p>
        </div>

        <div className="border-2 border-cyan-400 p-6 rounded text-center hover:bg-cyan-400/10 transition-colors cursor-pointer">
          <p className="font-semibold">EMR Integration</p>
          <p className="text-gray-400 mt-1 text-sm">Seamless export</p>
        </div>
      </div>
      
      {/* FOOTER */}
      
    </div>
  );
}