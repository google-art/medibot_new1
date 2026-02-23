
// import { motion } from "framer-motion";
// import {
//   Mail,
//   ShoppingCart,
//   Zap,
//   Target,
//   Users,
//   CheckCircle,
// } from "lucide-react";

// const messages = [
//   {
//     email: "jane@company.com",
//     subject: "Pricing inquiry",
//     time: "2 min ago",
//     text: "Hi, I'm interested in your premium plan. Can you share pricing?",
//     reply:
//       "Sure! Our premium plan includes automation, priority support, and unlimited usage.",
//   },
//   {
//     email: "robert@startup.io",
//     subject: "WhatsApp automation",
//     time: "6 min ago",
//     text: "Does this support WhatsApp & SMS?",
//     reply:
//       "Yes 🚀 We support Email, SMS, WhatsApp, and social platforms.",
//   },
//   {
//     email: "alex@agency.co",
//     subject: "Demo request",
//     time: "10 min ago",
//     text: "Can I book a demo next week?",
//     reply:
//       "Absolutely! Please share your preferred date and time.",
//   },
// ];

// export default function Aiautoreply() {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto py-16 font-inter overflow-hidden">
//       {/* LEFT PANEL */}
//       <motion.div
//         initial={{ x: -40, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="border-4 border-black bg-cyan-50 ml-4"
//       >
//         {/* Header */}
//         <div className="border-b-4 border-black p-5">
//           <h3 className="text-xl font-bold">
//             AI Auto-Reply & Follow-Up
//           </h3>

//           <div className="grid grid-cols-3 gap-4 mt-4">
//             <StatBox value="3" label="Auto-Replied" color="text-green-600" />
//             <StatBox value="45s" label="Avg Response" color="text-cyan-600" />
//             <StatBox value="98%" label="Success Rate" color="text-black" />
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="p-5 space-y-6">
//           {messages.map((msg, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: -24 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: i * 1.2, duration: 0.45 }}
//               className="border-4 border-black bg-white p-5 mx-3"
//             >
//               {/* Customer */}
//               <div className="flex justify-between items-start">
//                 <div className="flex gap-3">
//                   <div className="w-9 h-9 bg-cyan-400 flex items-center justify-center">
//                     <Mail className="w-4 h-4 text-black" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold">{msg.email}</p>
//                     <p className="text-xs text-gray-500">{msg.subject}</p>
//                   </div>
//                 </div>
//                 <span className="text-xs text-gray-400">{msg.time}</span>
//               </div>

//               <div className="border-2 border-gray-300 p-3 text-sm mt-3">
//                 {msg.text}
//               </div>

//               {/* Typing */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: i * 1.2 + 0.6 }}
//                 className="flex items-center gap-2 text-xs text-gray-500 mt-3"
//               >
//                 <span className="w-7 h-7 bg-cyan-200 flex items-center justify-center text-[11px] font-bold">
//                   AI
//                 </span>
//                 WYN AI is typing…
//               </motion.div>

//               {/* Reply */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: i * 1.2 + 1.1 }}
//                 className="border-2 border-cyan-500 bg-cyan-50 p-3 text-sm mt-2 mx-2"
//               >
//                 {msg.reply}
//               </motion.div>

//               {/* Sent */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: i * 1.2 + 1.5 }}
//                 className="flex justify-end mt-3"
//               >
//                 <span className="flex items-center gap-1 text-xs border-2 border-green-600 px-2 py-1 text-green-600">
//                   <CheckCircle className="w-3 h-3" /> Sent
//                 </span>
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* RIGHT PANEL */}
//       <motion.div
//         initial={{ x: 40, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="space-y-6 mr-4"
//       >
//         <div className="border-4 border-black p-6 relative mx-3">
//           <Mail
//             className="absolute top-5 right-5 w-6 h-6 text-cyan-500"
//             fill="currentColor"
//             stroke="none"
//           />

//           <h3 className="text-2xl font-bold">
//             AI Auto-Reply & Follow-Up
//           </h3>
//           <p className="text-sm text-cyan-600 mt-1">
//             Intelligent Message Automation
//           </p>

//           <p className="text-sm text-gray-700 mt-3">
//             Automatically respond to emails, SMS, and social messages using AI.
//           </p>

//           <div className="flex justify-between items-end mt-5">
//             <div>
//               <p className="text-3xl font-bold">
//                 $69<span className="text-base font-normal">/mo</span>
//               </p>
//               <p className="text-green-600 text-sm mt-1">
//                 ✓ 5-day free trial
//               </p>
//             </div>

//             <button className="border-4 border-black px-6 py-2 flex items-center gap-2 text-sm font-semibold">
//               <ShoppingCart className="w-4 h-4" /> Start Trial
//             </button>
//           </div>
//         </div>

//         <InfoCard
//           title="What It Does"
//           icon={<Zap className="w-4 h-4 text-orange-500" />}
//           bg="bg-cyan-50"
//           items={[
//             "Instant auto-responses",
//             "Smart intent detection",
//             "Automated follow-ups",
//             "Multi-channel support",
//           ]}
//         />

//         <InfoCard
//           title="Key Benefits"
//           icon={<Target className="w-4 h-4 text-pink-500" />}
//           bg="bg-yellow-50"
//           items={[
//             "Never miss a lead",
//             "24/7 availability",
//             "Higher conversions",
//           ]}
//         />

//         <div className="border-4 border-black p-5 mx-3">
//           <h4 className="font-bold flex items-center gap-2 mb-3 text-sm">
//             <Users className="w-4 h-4 text-purple-600" />
//             Ideal For
//           </h4>

//           <div className="flex flex-wrap gap-3 text-sm">
//             {["Sales teams", "Support teams", "Agencies", "Founders"].map(
//               (item) => (
//                 <span key={item} className="border-2 border-black px-3 py-1">
//                   {item}
//                 </span>
//               )
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* ---------- SMALL COMPONENTS ---------- */

// function StatBox({ value, label, color }) {
//   return (
//     <div className="border-2 border-black bg-white p-3 text-center">
//       <p className={`text-lg font-bold ${color}`}>{value}</p>
//       <p className="text-xs text-gray-600 mt-1">{label}</p>
//     </div>
//   );
// }

// function InfoCard({ title, icon, items, bg }) {
//   return (
//     <div className={`border-4 border-black p-5 ${bg} mx-3`}>
//       <h4 className="font-bold flex items-center gap-2 mb-3 text-sm">
//         {icon} {title}
//       </h4>
//       <ul className="space-y-2 text-sm">
//         {items.map((item) => (
//           <li key={item} className="flex gap-2">
//             <span className="text-cyan-600">▶</span> {item}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ShoppingCart,
  Zap,
  Target,
  Users,
  CheckCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";

const messages = [
  {
    email: "jane@company.com",
    subject: "Pricing inquiry",
    time: "2 min ago",
    text: "Hi, I'm interested in your premium plan. Can you share pricing?",
    reply:
      "Sure! Our premium plan includes automation, priority support, and unlimited usage.",
  },
  {
    email: "robert@startup.io",
    subject: "WhatsApp automation",
    time: "6 min ago",
    text: "Does this support WhatsApp & SMS?",
    reply:
      "Yes 🚀 We support Email, SMS, WhatsApp, and social platforms.",
  },
  {
    email: "alex@agency.co",
    subject: "Demo request",
    time: "10 min ago",
    text: "Can I book a demo next week?",
    reply:
      "Absolutely! Please share your preferred date and time.",
  },
];

export default function Aiautoreply() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Video controls
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
      setDuration(videoRef.current.duration || 150); // Default 2:30 if can't get duration
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const changePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setPlaybackSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto py-16 font-inter overflow-hidden">
      {/* LEFT PANEL - DEMO VIDEO */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-4 border-black bg-cyan-50 ml-4"
      >
        {/* Header */}
        <div className="border-b-4 border-black p-5">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-4.333v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5z" />
            </svg>
            Live Demo Video
          </h3>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <StatBox value="2:30" label="Video Length" color="text-blue-600" />
            <StatBox value="4.8★" label="Rating" color="text-yellow-600" />
            <StatBox value="HD" label="Quality" color="text-green-600" />
          </div>
        </div>

        {/* Demo Video Container */}
        <div className="p-5">
          {/* Video Player */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative border-4 border-black bg-black overflow-hidden group"
          >
            {/* Actual Video */}
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
              poster="/demo-poster.jpg" // Optional: Add a poster image
            >
              <source src="/notewhisper video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Top Controls */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
                <div className="bg-black/80 text-white px-3 py-1 text-xs font-mono">
                  AI AUTO-REPLY DEMO
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="bg-black/80 text-white p-2 rounded-full hover:bg-black transition"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>

              {/* Center Play Button */}
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

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                {/* Progress Bar */}
                <div className="mb-3">
                  <input
                    type="range"
                    min="0"
                    max={duration || 150}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                  />
                  <div className="flex justify-between text-xs text-gray-300 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={skipBackward}
                      className="text-white hover:text-cyan-400 transition"
                      title="Skip back 10s"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-cyan-400 transition"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                    
                    <button
                      onClick={skipForward}
                      className="text-white hover:text-cyan-400 transition"
                      title="Skip forward 10s"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-cyan-400 transition"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Playback Speed */}
                    <button
                      onClick={changePlaybackSpeed}
                      className="text-xs text-white bg-black/50 px-3 py-1 rounded hover:bg-black transition"
                      title="Change playback speed"
                    >
                      {playbackSpeed}x
                    </button>
                    
                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-cyan-400 transition"
                      title="Fullscreen"
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Play button overlay when video is not playing */}
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

          {/* Video Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 border-2 border-gray-300 bg-white p-4"
          >
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              Watch AI Auto-Reply in Action
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              See our intelligent AI system automatically respond to customer inquiries 
              across multiple channels in real-time. No manual intervention needed.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-cyan-600" />
                </div>
                <span>Real-time responses</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span>Multi-language support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-3 h-3 text-purple-600" />
                </div>
                <span>Email & SMS integration</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <Target className="w-3 h-3 text-orange-600" />
                </div>
                <span>Smart intent detection</span>
              </div>
            </div>

            {/* Video Chapters */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h5 className="font-semibold text-sm mb-3">Video Chapters:</h5>
              <div className="flex flex-wrap gap-2">
                {[
                  { time: "0:00", title: "Introduction" },
                  { time: "0:30", title: "Email Automation" },
                  { time: "1:10", title: "SMS Responses" },
                  { time: "1:45", title: "AI Training" },
                  { time: "2:15", title: "Results & Analytics" },
                ].map((chapter, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (videoRef.current) {
                        const timeMap = [0, 30, 70, 105, 135];
                        videoRef.current.currentTime = timeMap[idx];
                        setCurrentTime(timeMap[idx]);
                        if (!isPlaying) {
                          videoRef.current.play();
                          setIsPlaying(true);
                        }
                      }
                    }}
                    className="border border-gray-300 px-3 py-1 text-xs rounded hover:bg-gray-100 transition"
                  >
                    <span className="font-mono">{chapter.time}</span> {chapter.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
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
                  Play Full Demo
                </>
              )}
            </button>
            <button className="border-4 border-black px-6 py-3 font-bold hover:bg-gray-100 transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              Download
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT PANEL - UNCHANGED */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 mr-4"
      >
        <div className="border-4 border-black p-6 relative mx-3">
          <Mail
            className="absolute top-5 right-5 w-6 h-6 text-cyan-500"
            fill="currentColor"
            stroke="none"
          />

          <h3 className="text-2xl font-bold">
            AI Auto-Reply & Follow-Up
          </h3>
          <p className="text-sm text-cyan-600 mt-1">
            Intelligent Message Automation
          </p>

          <p className="text-sm text-gray-700 mt-3">
            Automatically respond to emails, SMS, and social messages using AI.
          </p>

          <div className="flex justify-between items-end mt-5">
            <div>
              <p className="text-3xl font-bold">
                $69<span className="text-base font-normal">/mo</span>
              </p>
              <p className="text-green-600 text-sm mt-1">
                ✓ 5-day free trial
              </p>
            </div>

            <button className="border-4 border-black px-6 py-2 flex items-center gap-2 text-sm font-semibold">
              <ShoppingCart className="w-4 h-4" /> Start Trial
            </button>
          </div>
        </div>

        <InfoCard
          title="What It Does"
          icon={<Zap className="w-4 h-4 text-orange-500" />}
          bg="bg-cyan-50"
          items={[
            "Instant auto-responses",
            "Smart intent detection",
            "Automated follow-ups",
            "Multi-channel support",
          ]}
        />

        <InfoCard
          title="Key Benefits"
          icon={<Target className="w-4 h-4 text-pink-500" />}
          bg="bg-yellow-50"
          items={[
            "Never miss a lead",
            "24/7 availability",
            "Higher conversions",
          ]}
        />

        <div className="border-4 border-black p-5 mx-3">
          <h4 className="font-bold flex items-center gap-2 mb-3 text-sm">
            <Users className="w-4 h-4 text-purple-600" />
            Ideal For
          </h4>

          <div className="flex flex-wrap gap-3 text-sm">
            {["Sales teams", "Support teams", "Agencies", "Founders"].map(
              (item) => (
                <span key={item} className="border-2 border-black px-3 py-1">
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function StatBox({ value, label, color }) {
  return (
    <div className="border-2 border-black bg-white p-3 text-center">
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  );
}

function InfoCard({ title, icon, items, bg }) {
  return (
    <div className={`border-4 border-black p-5 ${bg} mx-3`}>
      <h4 className="font-bold flex items-center gap-2 mb-3 text-sm">
        {icon} {title}
      </h4>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-cyan-600">▶</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}