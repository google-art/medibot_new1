// import { motion } from "framer-motion";

// export default function AutomaticSocialPage() {
//   return (
//     <div className="w-full bg-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

//           {/* ================= LEFT PANEL (SLIDE FROM LEFT) ================= */}
//           <motion.div
//             initial={{ x: -40, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="border-[3px] border-black h-full flex flex-col"
//           >
//             {/* Header */}
//             <div className="p-6 border-b-[3px] border-black">
//               <h2 className="text-2xl font-bold mb-4">
//                 Automatic Social Media Content
//               </h2>

//               <div className="flex gap-3">
//                 <input
//                   type="text"
//                   placeholder="Enter topic or theme (e.g., 'Product Launch')"
//                   className="flex-1 border-[2px] border-black px-4 py-2"
//                 />
//                 <button className="border-[2px] border-black px-6 font-semibold flex items-center gap-2">
//                   ✨ Generate
//                 </button>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
//               <div className="text-4xl mb-4">🪄</div>
//               <p>
//                 Enter a topic and click <b>"Generate"</b> to create content
//               </p>
//             </div>
//           </motion.div>

//           {/* ================= RIGHT PANEL (SLIDE FROM RIGHT) ================= */}
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
//             className="flex flex-col gap-6"
//           >
//             {/* Intro / Pricing */}
//             <div className="border-[3px] border-black">
//               <div className="p-6 border-b-[3px] border-black">
//                 <h3 className="text-2xl font-bold mb-2">
//                   Automatic Social Media Content
//                 </h3>
//                 <p className="text-blue-600 font-medium">
//                   AI-Powered Content Creation & Scheduling
//                 </p>
//               </div>

//               <div className="p-6">
//                 <p className="text-gray-700 mb-6">
//                   Generate engaging social media posts, images, and videos automatically.
//                   Schedule content across all platforms with AI-optimized timing.
//                 </p>

//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-3xl font-bold">
//                       $79<span className="text-base font-medium">/mo</span>
//                     </p>
//                     <p className="text-green-600 mt-1">✓ 5-day free trial</p>
//                   </div>
//                   <button className="border-[2px] border-black px-6 py-3 font-semibold flex items-center gap-2">
//                     🛒 Start Trial
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* What It Does */}
//             <div className="border-[3px] border-black bg-cyan-50 p-6">
//               <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 ⚡ What It Does
//               </h4>
//               <ul className="space-y-2">
//                 <li>▶ Generates posts for Instagram, Facebook, LinkedIn, Twitter</li>
//                 <li>▶ Creates images and graphics with AI</li>
//                 <li>▶ Suggests optimal posting times</li>
//                 <li>▶ Auto-schedules content calendar</li>
//                 <li>▶ Provides hashtag and caption suggestions</li>
//               </ul>
//             </div>

//             {/* Key Benefits */}
//             <div className="border-[3px] border-black bg-yellow-50 p-6">
//               <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 🎯 Key Benefits
//               </h4>
//               <ul className="space-y-2">
//                 <li>✓ Post consistently without effort</li>
//                 <li>✓ Increase engagement rates</li>
//                 <li>✓ Save 15+ hours per week</li>
//                 <li>✓ Maintain brand voice automatically</li>
//               </ul>
//             </div>

//             {/* Ideal For */}
//             <div className="border-[3px] border-black p-6">
//               <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 👥 Ideal For
//               </h4>
//               <div className="flex flex-wrap gap-3">
//                 <span className="border-[2px] border-black px-4 py-2">
//                   Small business owners
//                 </span>
//                 <span className="border-[2px] border-black px-4 py-2">
//                   Social media managers
//                 </span>
//                 <span className="border-[2px] border-black px-4 py-2">
//                   Marketing teams
//                 </span>
//                 <span className="border-[2px] border-black px-4 py-2">
//                   Content creators
//                 </span>
//               </div>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// }



import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Maximize, Zap, Target, Users, ShoppingCart } from "lucide-react";

export default function AutomaticSocialPage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
      setDuration(videoRef.current.duration || 160);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT PANEL - DEMO VIDEO */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-4 border-black bg-cyan-50 flex flex-col"
          >
            <div className="border-b-4 border-black p-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-4.333v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5z" />
                </svg>
                Social Media AI Demo
              </h2>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <StatBox value="2:40" label="Video Length" color="text-blue-600" />
                <StatBox value="HD" label="Quality" color="text-green-600" />
                <StatBox value="4.7★" label="Rating" color="text-yellow-600" />
              </div>
            </div>

            <div className="p-5 flex-1">
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
                      SOCIAL AI DEMO
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
                  Watch AI Social Media Creation
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  See how AI generates engaging social media posts, creates images, 
                  and schedules content across all platforms automatically.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                      <span className="text-cyan-600 font-bold">📱</span>
                    </div>
                    <span>Multi-platform posts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">🎨</span>
                    </div>
                    <span>AI image generation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">📅</span>
                    </div>
                    <span>Auto-scheduling</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">#️⃣</span>
                    </div>
                    <span>Hashtag optimization</span>
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
                      Pause Social Demo
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Play Social Demo
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT PANEL - UNCHANGED */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="flex flex-col gap-6"
          >
            <div className="border-4 border-black">
              <div className="p-6 border-b-4 border-black">
                <h3 className="text-2xl font-bold mb-2">Automatic Social Media Content</h3>
                <p className="text-blue-600 font-medium">AI-Powered Content Creation & Scheduling</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Generate engaging social media posts, images, and videos automatically.
                  Schedule content across all platforms with AI-optimized timing.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">$79<span className="text-base font-medium">/mo</span></p>
                    <p className="text-green-600 mt-1">✓ 5-day free trial</p>
                  </div>
                  <button className="border-2 border-black px-6 py-3 font-semibold flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Start Trial
                  </button>
                </div>
              </div>
            </div>

            <div className="border-4 border-black bg-cyan-50 p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><Zap className="w-4 h-4" /> What It Does</h4>
              <ul className="space-y-2">
                <li>▶ Generates posts for Instagram, Facebook, LinkedIn, Twitter</li>
                <li>▶ Creates images and graphics with AI</li>
                <li>▶ Suggests optimal posting times</li>
                <li>▶ Auto-schedules content calendar</li>
                <li>▶ Provides hashtag and caption suggestions</li>
              </ul>
            </div>

            <div className="border-4 border-black bg-yellow-50 p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><Target className="w-4 h-4" /> Key Benefits</h4>
              <ul className="space-y-2">
                <li>✓ Post consistently without effort</li>
                <li>✓ Increase engagement rates</li>
                <li>✓ Save 15+ hours per week</li>
                <li>✓ Maintain brand voice automatically</li>
              </ul>
            </div>

            <div className="border-4 border-black p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> Ideal For</h4>
              <div className="flex flex-wrap gap-3">
                <span className="border-2 border-black px-4 py-2">Small business owners</span>
                <span className="border-2 border-black px-4 py-2">Social media managers</span>
                <span className="border-2 border-black px-4 py-2">Marketing teams</span>
                <span className="border-2 border-black px-4 py-2">Content creators</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
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