// import { useEffect, useState } from "react";
// import {
//   FileText,
//   CreditCard,
//   Clock,
//   Bell,
//   CheckCircle,
//   Zap,
//   ArrowRight,
// } from "lucide-react";

// export default function AIInvoice() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <section
//       id="ai-invoice"
//       className="max-w-7xl mx-auto px-6 py-16 font-inter"
//     >
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

//         {/* ================= LEFT : WORKFLOW PREVIEW ================= */}
//         <div
//           className={`border-4 border-black bg-cyan-50 transition-all duration-700
//           ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
//         >
//           <div className="border-b-4 border-black p-4">
//             <h2 className="text-xl font-bold">
//               AI Invoicing & Payment Flow
//             </h2>
//             <p className="text-sm text-gray-600 mt-1">
//               From quote → invoice → paid (automated)
//             </p>
//           </div>

//           <div className="p-6 space-y-4">

//             <Step
//               icon={<FileText />}
//               title="Invoice Generated"
//               desc="Auto-created from proposal or form input"
//             />

//             <Arrow />

//             <Step
//               icon={<CreditCard />}
//               title="Payment Link Attached"
//               desc="Secure payment link generated instantly"
//             />

//             <Arrow />

//             <Step
//               icon={<Bell />}
//               title="Smart Reminders"
//               desc="Before & after due date reminders"
//             />

//             <Arrow />

//             <Step
//               icon={<CheckCircle />}
//               title="Marked as Paid"
//               desc="Auto-sync or manual override"
//               success
//             />
//           </div>
//         </div>

//         {/* ================= RIGHT : INFO ================= */}
//         <div
//           className={`space-y-6 transition-all duration-700
//           ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
//         >
//           {/* INFO CARD */}
//           <div className="border-4 border-black bg-white p-6 relative">
//             <Zap className="absolute top-6 right-6 w-8 h-8 text-cyan-600" />

//             <h2 className="text-2xl font-bold mb-2">
//               AI Invoicing, Payments & Follow-Up
//             </h2>

//             <p className="text-cyan-600 font-semibold mb-4">
//               Never Miss a Payment Again
//             </p>

//             <p className="text-gray-600 leading-relaxed mb-6">
//               Automatically generate invoices, attach payment links, track
//               status, and send reminders — without spreadsheets, accounting
//               tools, or manual chasing.
//             </p>

//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-4xl font-bold">
//                   $99
//                   <span className="text-lg text-gray-500 font-medium">/mo</span>
//                 </div>
//                 <p className="text-green-600 mt-1 font-medium">
//                   ✓ Includes reminders & payments
//                 </p>
//               </div>

//               <button className="border-2 border-black px-6 py-3 font-semibold">
//                 Start Free Trial
//               </button>
//             </div>
//           </div>

//           {/* WHAT IT AUTOMATES */}
//           <InfoCard
//             title="What It Automates"
//             items={[
//               "Invoice generation from quotes or forms",
//               "Payment link creation",
//               "Invoice PDF branding & storage",
//               "Automated reminder scheduling",
//             ]}
//           />

//           {/* IDEAL FOR */}
//           <InfoCard
//             title="Ideal For"
//             items={[
//               "Freelancers & consultants",
//               "Agencies & service businesses",
//               "Solopreneurs",
//               "SMBs without accounting teams",
//             ]}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ================= SUB COMPONENTS ================= */

// function Step({ icon, title, desc, success }) {
//   return (
//     <div
//       className={`border-2 border-black p-4 bg-white flex gap-4 items-start
//       ${success ? "bg-green-50" : ""}`}
//     >
//       <div className="border-2 border-black p-2 bg-gray-100">
//         {icon}
//       </div>

//       <div>
//         <p className="font-semibold">{title}</p>
//         <p className="text-sm text-gray-600">{desc}</p>
//       </div>
//     </div>
//   );
// }

// function Arrow() {
//   return (
//     <div className="flex justify-center">
//       <Clock className="text-gray-400" />
//     </div>
//   );
// }

// function InfoCard({ title, items }) {
//   return (
//     <div className="border-4 border-black bg-yellow-50 p-6">
//       <h3 className="text-xl font-bold mb-4">{title}</h3>
//       <ul className="space-y-2 text-gray-700">
//         {items.map((item) => (
//           <li key={item} className="flex gap-2">
//             <span>▶</span>
//             {item}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { useEffect, useState, useRef } from "react";
import {
  FileText,
  CreditCard,
  Clock,
  Bell,
  CheckCircle,
  Zap,
  ArrowRight,
  ShoppingCart,
  Users,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AIInvoice() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 150);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(err => {
          console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <section id="ai-invoice" className="max-w-7xl mx-auto px-6 py-16 font-inter">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* LEFT PANEL - DEMO VIDEO */}
        <div
          className={`border-4 border-black bg-cyan-50 transition-all duration-700
          ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
        >
          <div className="border-b-4 border-black p-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-4.333v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5z" />
              </svg>
              AI Invoice Generation Demo
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <StatBox value="2:15" label="Video Length" color="text-blue-600" />
              <StatBox value="HD" label="Quality" color="text-green-600" />
              <StatBox value="4.9★" label="Rating" color="text-yellow-600" />
            </div>
          </div>

          <div className="p-5">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative border-4 border-black bg-black overflow-hidden group"
            >
              <video
                ref={videoRef}
                className="w-full aspect-video"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setDuration(videoRef.current.duration);
                    videoRef.current.volume = volume;
                  }
                }}
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/notewhisper video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
                  <div className="bg-black/80 text-white px-3 py-1 text-xs font-mono">
                    AI INVOICE DEMO
                  </div>
                  <button
                    onClick={toggleFullscreen}
                    className="bg-black/80 text-white p-2 rounded-full hover:bg-black transition"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center border-2 border-white/30"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </motion.button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <div className="mb-3">
                    <input
                      type="range"
                      min="0"
                      max={duration || 135}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                    />
                    <div className="flex justify-between text-xs text-gray-300 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={togglePlay}
                    className="bg-black/60 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center border-4 border-white/20 hover:border-white/40 transition-all"
                  >
                    <Play className="w-12 h-12 text-white ml-2" />
                  </motion.button>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 border-2 border-gray-300 bg-white p-4"
            >
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Watch AI Invoice Automation
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                See how our AI automatically generates invoices, attaches payment links, 
                and sends reminders - all without manual intervention.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                    <FileText className="w-3 h-3 text-cyan-600" />
                  </div>
                  <span>Auto-generated invoices</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-3 h-3 text-green-600" />
                  </div>
                  <span>Payment link integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bell className="w-3 h-3 text-purple-600" />
                  </div>
                  <span>Smart reminders</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-orange-600" />
                  </div>
                  <span>Auto payment tracking</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex gap-3"
            >
              <button
                onClick={togglePlay}
                className="flex-1 border-4 border-black bg-black text-white py-3 font-bold hover:bg-gray-900 transition flex items-center justify-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause Demo
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play Demo
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - UNCHANGED */}
        <div
          className={`space-y-6 transition-all duration-700
          ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
        >
          <div className="border-4 border-black bg-white p-6 relative">
            <Zap className="absolute top-6 right-6 w-8 h-8 text-cyan-600" />
            <h2 className="text-2xl font-bold mb-2">AI Invoicing, Payments & Follow-Up</h2>
            <p className="text-cyan-600 font-semibold mb-4">Never Miss a Payment Again</p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Automatically generate invoices, attach payment links, track status, 
              and send reminders — without spreadsheets, accounting tools, or manual chasing.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">
                  $99<span className="text-lg text-gray-500 font-medium">/mo</span>
                </div>
                <p className="text-green-600 mt-1 font-medium">✓ Includes reminders & payments</p>
              </div>
              <button className="border-2 border-black px-6 py-3 font-semibold">Start Free Trial</button>
            </div>
          </div>

          <InfoCard
            title="What It Automates"
            items={[
              "Invoice generation from quotes or forms",
              "Payment link creation",
              "Invoice PDF branding & storage",
              "Automated reminder scheduling",
            ]}
          />

          <InfoCard
            title="Ideal For"
            items={[
              "Freelancers & consultants",
              "Agencies & service businesses",
              "Solopreneurs",
              "SMBs without accounting teams",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function StatBox({ value, label, color }) {
  return (
    <div className="border-2 border-black bg-white p-3 text-center">
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  );
}

function InfoCard({ title, items }) {
  return (
    <div className="border-4 border-black bg-yellow-50 p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2 text-gray-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span>▶</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}