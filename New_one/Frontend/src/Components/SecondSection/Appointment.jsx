// import { useEffect, useState } from "react";
// import {
//   Calendar,
//   Clock,
//   Bell,
//   RefreshCcw,
//   Users,
//   CheckCircle,
// } from "lucide-react";

// export default function Appointment() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12 font-inter">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

//         {/* ================= LEFT PANEL ================= */}
//         <div
//           className={`border-4 border-black bg-cyan-50 transition-all duration-700
//           ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
//         >
//           {/* Header */}
//           <div className="border-b-4 border-black p-4">
//             <h2 className="text-xl font-bold flex items-center gap-2">
//               <Calendar /> Appointment Scheduling Engine
//             </h2>

//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <StatCard label="Bookings Today" value="3" />
//               <StatCard label="No-Shows Prevented" value="2" success />
//             </div>
//           </div>

//           {/* Timeline */}
//           <div className="p-5 space-y-4 text-sm">
//             {[
//               "Client selects service & time",
//               "Slot validated with buffers",
//               "Calendar event created",
//               "Confirmation sent instantly",
//               "Automated reminders fired",
//             ].map((step, i) => (
//               <div
//                 key={i}
//                 className="border-2 border-black bg-white p-3 flex items-center gap-3"
//               >
//                 <CheckCircle className="text-green-600" size={18} />
//                 <span>{step}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= RIGHT PANEL ================= */}
//         <div
//           className={`space-y-6 transition-all duration-700
//           ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
//         >
//           {/* INFO CARD */}
//           <div className="border-4 border-black bg-white p-6 relative">
//             <RefreshCcw className="absolute top-6 right-6 w-8 h-8 text-cyan-600" />

//             <h2 className="text-2xl font-bold mb-2">
//               Appointment, Scheduling & Reminders
//             </h2>

//             <p className="text-cyan-600 font-semibold mb-4">
//               Bookings that just work — no setup pain
//             </p>

//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Let clients book themselves using a public link. Automatically
//               validate availability, sync calendars, send confirmations, and
//               prevent no-shows with smart reminders.
//             </p>

//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-4xl font-bold">
//                   $79
//                   <span className="text-lg text-gray-500 font-medium">/mo</span>
//                 </div>
//                 <p className="text-green-600 mt-1 font-medium">
//                   ✓ No-show reduction built-in
//                 </p>
//               </div>

//               <button className="border-2 border-black px-6 py-3 font-semibold flex items-center gap-2">
//                 <Calendar size={18} />
//                 Create Booking
//               </button>
//             </div>
//           </div>

//           {/* FEATURES */}
//           <InfoCard
//             title="Core Capabilities"
//             icon={<Clock />}
//             bg="bg-yellow-50"
//             items={[
//               "Public booking link",
//               "Timezone-safe scheduling",
//               "Buffer & conflict handling",
//               "Calendar auto-sync",
//             ]}
//           />

//           <InfoCard
//             title="Automation & Control"
//             icon={<Bell />}
//             bg="bg-cyan-50"
//             items={[
//               "24h & 2h reminders",
//               "No-show escalation",
//               "Reschedule & cancel links",
//               "Post-appointment triggers",
//             ]}
//           />

//           <div className="border-4 border-black bg-white p-6">
//             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//               <Users /> Ideal For
//             </h3>

//             <div className="flex flex-wrap gap-3">
//               {[
//                 "Consultants",
//                 "Coaches",
//                 "Agencies",
//                 "Service businesses",
//               ].map((item) => (
//                 <span
//                   key={item}
//                   className="border-2 border-black px-4 py-2 font-medium bg-white"
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= HELPERS ================= */

// function StatCard({ label, value, success }) {
//   return (
//     <div className="border-2 border-black p-3 bg-white">
//       <p className="text-sm text-gray-600">{label}</p>
//       <p className={`text-2xl font-bold ${success ? "text-green-600" : ""}`}>
//         {value}
//       </p>
//     </div>
//   );
// }

// function InfoCard({ title, icon, items, bg }) {
//   return (
//     <div className={`border-4 border-black p-6 ${bg}`}>
//       <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//         {icon} {title}
//       </h3>

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
  Calendar,
  Clock,
  Bell,
  RefreshCcw,
  Users,
  CheckCircle,
  Play,
  Pause,
  Maximize,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Appointment() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-inter">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT PANEL - DEMO VIDEO */}
        <div
          className={`border-4 border-black bg-cyan-50 transition-all duration-700
          ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
        >
          <div className="border-b-4 border-black p-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-4.333v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5z" />
              </svg>
              Appointment Scheduling Demo
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <StatCard label="Video Length" value="2:30" />
              <StatCard label="Quality" value="HD" success />
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
                  }
                }}
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/notewhisper video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
                  <div className="bg-black/80 text-white px-3 py-1 text-xs font-mono">
                    APPOINTMENT DEMO
                  </div>
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
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
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
                <Calendar className="w-5 h-5 text-blue-500" />
                Watch AI Scheduling in Action
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                See how clients can book appointments automatically with timezone 
                detection, calendar sync, and smart reminders.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Clock className="w-3 h-3 text-cyan-600" />
                  </div>
                  <span>Timezone detection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Bell className="w-3 h-3 text-green-600" />
                  </div>
                  <span>Smart reminders</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-purple-600" />
                  </div>
                  <span>Auto-confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-orange-600" />
                  </div>
                  <span>No-show prevention</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <button
                onClick={togglePlay}
                className="w-full border-4 border-black bg-black text-white py-3 font-bold hover:bg-gray-900 transition flex items-center justify-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause Scheduling Demo
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play Scheduling Demo
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - UNCHANGED */}
        <div
          className={`space-y-6 transition-all duration-700
          ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
        >
          <div className="border-4 border-black bg-white p-6 relative">
            <RefreshCcw className="absolute top-6 right-6 w-8 h-8 text-cyan-600" />
            <h2 className="text-2xl font-bold mb-2">Appointment, Scheduling & Reminders</h2>
            <p className="text-cyan-600 font-semibold mb-4">Bookings that just work — no setup pain</p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Let clients book themselves using a public link. Automatically validate availability, 
              sync calendars, send confirmations, and prevent no-shows with smart reminders.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">
                  $79<span className="text-lg text-gray-500 font-medium">/mo</span>
                </div>
                <p className="text-green-600 mt-1 font-medium">✓ No-show reduction built-in</p>
              </div>
              <button className="border-2 border-black px-6 py-3 font-semibold flex items-center gap-2">
                <Calendar size={18} /> Create Booking
              </button>
            </div>
          </div>

          <InfoCard
            title="Core Capabilities"
            icon={<Clock />}
            bg="bg-yellow-50"
            items={[
              "Public booking link",
              "Timezone-safe scheduling",
              "Buffer & conflict handling",
              "Calendar auto-sync",
            ]}
          />

          <InfoCard
            title="Automation & Control"
            icon={<Bell />}
            bg="bg-cyan-50"
            items={[
              "24h & 2h reminders",
              "No-show escalation",
              "Reschedule & cancel links",
              "Post-appointment triggers",
            ]}
          />

          <div className="border-4 border-black bg-white p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users /> Ideal For
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Consultants", "Coaches", "Agencies", "Service businesses"].map((item) => (
                <span key={item} className="border-2 border-black px-4 py-2 font-medium bg-white">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, success }) {
  return (
    <div className="border-2 border-black p-3 bg-white">
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-2xl font-bold ${success ? "text-green-600" : ""}`}>{value}</p>
    </div>
  );
}

function InfoCard({ title, icon, items, bg }) {
  return (
    <div className={`border-4 border-black p-6 ${bg}`}>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
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