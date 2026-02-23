// // import { useEffect, useState } from "react";
// // import {
// //   RefreshCcw,
// //   Globe,
// //   MessageCircle,
// //   Mail,
// //   ArrowRight,
// //   ShoppingCart,
// // } from "lucide-react";

// // export default function UnifiedLeadMake() {
// //   const [mounted, setMounted] = useState(false);
// //   const [showLeads, setShowLeads] = useState(false);

// //   useEffect(() => {
// //     setMounted(true);

// //     const timer = setTimeout(() => {
// //       setShowLeads(true);
// //     }, 1000);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <div className="max-w-7xl mx-auto px-6 py-10 font-inter overflow-hidden">
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

// //         {/* LEFT PANEL */}
// //         <div
// //           className={`
// //             border-4 border-black flex flex-col
// //             transition-all duration-700 ease-out
// //             ${mounted ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"}
// //           `}
// //         >
// //           {/* HEADER */}
// //           <div className="bg-yellow-50 border-b-4 border-black p-4">
// //             <h2 className="text-xl font-semibold">
// //               Unified Lead Intake & CRM Sync
// //             </h2>

// //             <div className="grid grid-cols-2 gap-4 mt-4">
// //               <div className="border-2 border-black p-3">
// //                 <p className="text-sm text-gray-600">New Leads Today</p>
// //                 <p className="text-2xl font-bold">4</p>
// //               </div>
// //               <div className="border-2 border-black p-3">
// //                 <p className="text-sm text-gray-600">Auto-Synced</p>
// //                 <p className="text-2xl font-bold text-green-600">3</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* LEADS */}
// //           <div className="flex-1 p-4 space-y-4">
// //             {!showLeads && (
// //               <p className="text-center text-gray-400 mt-10">
// //                 Fetching leads...
// //               </p>
// //             )}

// //             {showLeads && (
// //               <>
// //                 {/* Lead 1 */}
// //                 <LeadCard
// //                   icon={<Globe />}
// //                   name="Jane Smith"
// //                   source="Website Form"
// //                   status="New"
// //                   color="cyan"
// //                   delay="delay-0"
// //                 />

// //                 {/* Lead 2 */}
// //                 <LeadCard
// //                   icon={<MessageCircle />}
// //                   name="Robert Williams"
// //                   source="Facebook Messenger"
// //                   status="Contacted"
// //                   color="blue"
// //                   delay="delay-150"
// //                 />

// //                 {/* Lead 3 */}
// //                 <LeadCard
// //                   icon={<Mail />}
// //                   name="Lisa Anderson"
// //                   source="Email Inquiry"
// //                   status="Synced to CRM"
// //                   color="green"
// //                   delay="delay-300"
// //                 />
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* RIGHT PANEL */}
// //         <div
// //           className={`
// //             space-y-6
// //             transition-all duration-700 ease-out
// //             ${mounted ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}
// //           `}
// //         >
// //           {/* INFO */}
// //           <div className="border-4 border-black p-6 relative">
// //             <RefreshCcw className="absolute top-6 right-6 w-8 h-8 text-cyan-600" />

// //             <h2 className="text-2xl font-semibold mb-2">
// //               Unified Lead Intake & CRM Sync
// //             </h2>

// //             <p className="text-cyan-600 font-medium mb-4">
// //               Centralized Lead Management Across All Channels
// //             </p>

// //             <p className="text-gray-600 mb-6">
// //               Capture leads from websites, social media, emails, and calls.
// //               Automatically sync them to your CRM with intelligent routing and
// //               follow-up workflows.
// //             </p>

// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <div className="text-4xl font-bold">
// //                   $129
// //                   <span className="text-lg text-gray-500">/mo</span>
// //                 </div>
// //                 <p className="text-green-600 mt-1">✓ 5-day free trial</p>
// //               </div>

// //               <button className="border-2 border-black px-6 py-3 font-semibold flex items-center gap-2">
// //                 <ShoppingCart size={18} /> Start Trial
// //               </button>
// //             </div>
// //           </div>

// //           {/* WHAT IT DOES */}
// //           <div className="border-4 border-black bg-cyan-50 p-6">
// //             <h3 className="text-xl font-semibold mb-4">⚡ What It Does</h3>
// //             <ul className="space-y-2">
// //               <li>▶ Captures leads from website, social, email, phone</li>
// //               <li>▶ Auto-syncs to CRM platforms</li>
// //               <li>▶ Intelligent lead routing</li>
// //               <li>▶ Automated follow-up workflows</li>
// //             </ul>
// //           </div>

// //           {/* KEY BENEFITS */}
// //           <div className="border-4 border-black bg-yellow-50 p-6">
// //             <h3 className="text-xl font-semibold mb-4">🎯 Key Benefits</h3>
// //             <ul className="space-y-2">
// //               <li>✓ Never lose a lead again</li>
// //               <li>✓ Eliminate manual data entry</li>
// //               <li>✓ Faster responses</li>
// //               <li>✓ Full visibility</li>
// //             </ul>
// //           </div>

// //           {/* IDEAL FOR */}
// //           <div className="border-4 border-black p-6">
// //             <h3 className="text-xl font-semibold mb-4">👥 Ideal For</h3>
// //             <div className="flex flex-wrap gap-3">
// //               {[
// //                 "Sales teams",
// //                 "Customer service teams",
// //                 "Marketing operations",
// //                 "Agency owners",
// //               ].map((item) => (
// //                 <span
// //                   key={item}
// //                   className="border-2 border-black px-4 py-2 font-medium"
// //                 >
// //                   {item}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ---------------- COMPONENT ---------------- */

// // function LeadCard({ icon, name, source, status, color, delay }) {
// //   return (
// //     <div
// //       className={`
// //         border-2 border-black p-4
// //         flex items-center justify-between
// //         transition-all duration-500 ease-out
// //         translate-x-0 opacity-100
// //         animate-in slide-in-from-left
// //         ${delay}
// //       `}
// //     >
// //       <div className="flex items-start gap-3">
// //         <div
// //           className={`border-2 border-black p-2 bg-${color}-100 text-${color}-600`}
// //         >
// //           {icon}
// //         </div>

// //         <div>
// //           <p className="font-semibold">{name}</p>
// //           <p className="text-sm text-gray-600">{source}</p>
// //           <span
// //             className={`inline-block mt-2 px-3 py-1 text-sm border-2 border-${color}-600 text-${color}-600`}
// //           >
// //             {status}
// //           </span>
// //         </div>
// //       </div>

// //       <span className="text-gray-500 flex items-center gap-1">
// //         Salesforce <ArrowRight size={16} />
// //       </span>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import {
//   RefreshCcw,
//   Globe,
//   MessageCircle,
//   Mail,
//   ArrowRight,
//   ShoppingCart,
//   Zap,
//   CheckCircle,
//   Users,
// } from "lucide-react";

// /* ---------------- DATA ---------------- */

// const LEADS = [
//   {
//     id: 1,
//     name: "Jane Smith",
//     source: "Website Form",
//     status: "New",
//     color: "cyan",
//     icon: Globe,
//     time: "2 min ago",
//   },
//   {
//     id: 2,
//     name: "Robert Williams",
//     source: "Facebook Messenger",
//     status: "Contacted",
//     color: "blue",
//     icon: MessageCircle,
//     time: "15 min ago",
//   },
//   {
//     id: 3,
//     name: "Lisa Anderson",
//     source: "Email Inquiry",
//     status: "Synced to CRM",
//     color: "green",
//     icon: Mail,
//     time: "1 hour ago",
//   },
// ];

// /* ---------------- MAIN ---------------- */

// export default function UnifiedLeadMake() {
//   const [mounted, setMounted] = useState(false);
//   const [visibleLeads, setVisibleLeads] = useState([]);

//   useEffect(() => {
//     setMounted(true);

//     LEADS.forEach((lead, index) => {
//       setTimeout(() => {
//         setVisibleLeads((prev) => [...prev, lead]);
//       }, 900 + index * 700);
//     });
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12 font-inter overflow-hidden">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

//         {/* ================= LEFT PANEL ================= */}
//         <div
//           className={`border-4 border-black bg-yellow-50 transition-all duration-700
//           ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
//         >
//           {/* Header */}
//           <div className="border-b-4 border-black p-4">
//             <h2 className="text-xl font-bold">
//               Unified Lead Intake & CRM Sync
//             </h2>

//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <StatCard label="New Leads Today" value="4" />
//               <StatCard label="Auto-Synced" value="3" success />
//             </div>
//           </div>

//           {/* Leads */}
//           <div className="p-4 space-y-4">
//             {visibleLeads.length === 0 && (
//               <p className="text-center text-gray-400 py-12">
//                 Fetching leads…
//               </p>
//             )}

//             {visibleLeads.map((lead, index) => (
//               <LeadCard key={lead.id} lead={lead} index={index} />
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
//               Unified Lead Intake & CRM Sync
//             </h2>

//             <p className="text-cyan-600 font-semibold mb-4">
//               Centralized Lead Management Across All Channels
//             </p>

//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Capture leads from websites, social media, emails, and calls.
//               Automatically sync them to your CRM with intelligent routing and
//               follow-up workflows.
//             </p>

//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-4xl font-bold">
//                   $129
//                   <span className="text-lg text-gray-500 font-medium">/mo</span>
//                 </div>
//                 <p className="text-green-600 mt-1 font-medium">
//                   ✓ 5-day free trial
//                 </p>
//               </div>

//               <button className="border-2 border-black px-6 py-3 font-semibold flex items-center gap-2">
//                 <ShoppingCart size={18} />
//                 Start Trial
//               </button>
//             </div>
//           </div>

//           {/* WHAT IT DOES */}
//           <InfoCard
//             title="What It Does"
//             icon={<Zap />}
//             bg="bg-cyan-50"
//             items={[
//               "Captures leads from website, social, email, phone",
//               "Auto-syncs to CRM platforms",
//               "Intelligent lead routing",
//               "Automated follow-up workflows",
//             ]}
//           />

//           {/* KEY BENEFITS */}
//           <InfoCard
//             title="Key Benefits"
//             icon={<CheckCircle />}
//             bg="bg-yellow-50"
//             items={[
//               "Never lose a lead again",
//               "Eliminate manual data entry",
//               "Faster response times",
//               "Complete lead visibility",
//             ]}
//           />

//           {/* IDEAL FOR */}
//           <div className="border-4 border-black bg-white p-6">
//             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//               <Users /> Ideal For
//             </h3>

//             <div className="flex flex-wrap gap-3">
//               {[
//                 "Sales teams",
//                 "Customer service teams",
//                 "Marketing operations",
//                 "Agency owners",
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

//       {/* Keyframes */}
//       <style>
//         {`
//           @keyframes leadEnter {
//             from {
//               opacity: 0;
//               transform: translateX(-16px);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

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

// function LeadCard({ lead, index }) {
//   const Icon = lead.icon;

//   return (
//     <div
//       className="border-2 border-black bg-white p-4"
//       style={{
//         animation: `leadEnter 0.5s ease-out ${index * 0.15}s both`,
//       }}
//     >
//       <div className="flex justify-between items-start">
//         <div className="flex gap-3">
//           <div className="border-2 border-black p-2 bg-gray-100">
//             <Icon size={18} />
//           </div>

//           <div>
//             <p className="font-semibold">{lead.name}</p>
//             <p className="text-sm text-gray-600">{lead.source}</p>
//           </div>
//         </div>

//         <span className="text-sm text-gray-500">{lead.time}</span>
//       </div>

//       <div className="h-1 bg-cyan-500 my-3" />

//       <div className="flex justify-between items-center">
//         <span className="px-3 py-1 text-sm border-2 border-black">
//           {lead.status}
//         </span>

//         <span className="text-gray-500 flex items-center gap-1">
//           Salesforce <ArrowRight size={16} />
//         </span>
//       </div>
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
import { Play, Pause, RefreshCcw, Globe, MessageCircle, Mail, ArrowRight, ShoppingCart, Zap, CheckCircle, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function UnifiedLeadMake() {
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
      setDuration(videoRef.current.duration || 170);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-inter overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT PANEL - DEMO VIDEO */}
        <div
          className={`border-4 border-black bg-yellow-50 transition-all duration-700
          ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
        >
          <div className="border-b-4 border-black p-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-4.333v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5z" />
              </svg>
              Lead Management Demo
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <StatCard label="Video Length" value="2:50" />
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
                    LEAD MANAGEMENT DEMO
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
                <Zap className="w-5 h-5 text-orange-500" />
                Watch Lead Management Automation
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                See how AI captures leads from multiple channels, enriches data, 
                and syncs to your CRM automatically.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Globe className="w-3 h-3 text-cyan-600" />
                  </div>
                  <span>Multi-channel capture</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <span>Social media integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="w-3 h-3 text-purple-600" />
                  </div>
                  <span>Email automation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-orange-600" />
                  </div>
                  <span>CRM sync</span>
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
                    Pause Lead Demo
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play Lead Demo
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
            <h2 className="text-2xl font-bold mb-2">Unified Lead Intake & CRM Sync</h2>
            <p className="text-cyan-600 font-semibold mb-4">Centralized Lead Management Across All Channels</p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Capture leads from websites, social media, emails, and calls.
              Automatically sync them to your CRM with intelligent routing and
              follow-up workflows.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">$129<span className="text-lg text-gray-500 font-medium">/mo</span></div>
                <p className="text-green-600 mt-1 font-medium">✓ 5-day free trial</p>
              </div>
              <button className="border-2 border-black px-6 py-3 font-semibold flex items-center gap-2">
                <ShoppingCart size={18} /> Start Trial
              </button>
            </div>
          </div>

          <InfoCard
            title="What It Does"
            icon={<Zap />}
            bg="bg-cyan-50"
            items={[
              "Captures leads from website, social, email, phone",
              "Auto-syncs to CRM platforms",
              "Intelligent lead routing",
              "Automated follow-up workflows",
            ]}
          />

          <InfoCard
            title="Key Benefits"
            icon={<CheckCircle />}
            bg="bg-yellow-50"
            items={[
              "Never lose a lead again",
              "Eliminate manual data entry",
              "Faster response times",
              "Complete lead visibility",
            ]}
          />

          <div className="border-4 border-black bg-white p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users /> Ideal For
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Sales teams", "Customer service teams", "Marketing operations", "Agency owners"].map((item) => (
                <span key={item} className="border-2 border-black px-4 py-2 font-medium bg-white">{item}</span>
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