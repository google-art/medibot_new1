// // import { useEffect, useState } from "react";
// // import {
// //   Star,
// //   MessageSquare,
// //   ShoppingCart,
// //   Sparkles,
// //   Target,
// //   Users,
// // } from "lucide-react";

// // export default function ReviewReputation() {
// //   const [mounted, setMounted] = useState(false);
// //   const [visibleReviews, setVisibleReviews] = useState(0);

// //   useEffect(() => {
// //     setMounted(true);

// //     const interval = setInterval(() => {
// //       setVisibleReviews((prev) => {
// //         if (prev < reviews.length) return prev + 1;
// //         clearInterval(interval);
// //         return prev;
// //       });
// //     }, 600);

// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="max-w-7xl mx-auto px-6 py-12 font-inter overflow-hidden">
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

// //         {/* LEFT PANEL */}
// //         <div
// //           className={`
// //             border-4 border-black bg-yellow-50 flex flex-col
// //             transition-all duration-700 ease-out
// //             ${mounted ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"}
// //           `}
// //         >
// //           {/* HEADER */}
// //           <div className="border-b-4 border-black p-5">
// //             <h2 className="text-2xl font-bold mb-5">
// //               Review & Reputation Management
// //             </h2>

// //             <div className="grid grid-cols-3 gap-4">
// //               <StatCard title="Avg Rating" value="4.8" icon={<Star />} />
// //               <StatCard title="This Month" value="+12%" green />
// //               <StatCard title="Total Reviews" value="247" />
// //             </div>
// //           </div>

// //           {/* REVIEWS */}
// //           <div className="flex-1 p-5 space-y-5 overflow-y-auto">
// //             {reviews.slice(0, visibleReviews).map((review, i) => (
// //               <ReviewCard key={i} {...review} />
// //             ))}
// //           </div>
// //         </div>

// //         {/* RIGHT PANEL */}
// //         <div
// //           className={`
// //             space-y-8
// //             transition-all duration-700 ease-out
// //             ${mounted ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}
// //           `}
// //         >
// //           {/* INFO CARD */}
// //           <div className="border-4 border-black p-6 relative">
// //             <Star className="absolute top-6 right-6 w-8 h-8 text-yellow-500" />

// //             <h2 className="text-3xl font-bold mb-2">
// //               Review & Reputation Management
// //             </h2>

// //             <p className="text-cyan-600 font-semibold mb-4">
// //               Monitor, Respond, and Improve Your Online Reputation
// //             </p>

// //             <p className="text-gray-700 mb-6 leading-relaxed">
// //               Monitor reviews across Google, Yelp, Facebook, and industry sites.
// //               Get AI-generated response suggestions and automate review requests
// //               to improve your ratings.
// //             </p>

// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <div className="text-4xl font-bold">
// //                   $89<span className="text-lg text-gray-500">/mo</span>
// //                 </div>
// //                 <p className="text-green-600 mt-1 font-medium">
// //                   ✓ 5-day free trial
// //                 </p>
// //               </div>

// //               <button className="border-2 border-black px-6 py-3 font-semibold flex items-center gap-2">
// //                 <ShoppingCart size={18} /> Start Trial
// //               </button>
// //             </div>
// //           </div>

// //           {/* WHAT IT DOES */}
// //           <InfoCard
// //             icon={<Sparkles />}
// //             title="What It Does"
// //             bg="bg-cyan-50"
// //             items={[
// //               "Monitors reviews across all platforms",
// //               "AI-generated review responses",
// //               "Automated review request campaigns",
// //               "Sentiment analysis and insights",
// //               "Competitor reputation tracking",
// //             ]}
// //           />

// //           {/* KEY BENEFITS */}
// //           <InfoCard
// //             icon={<Target />}
// //             title="Key Benefits"
// //             bg="bg-yellow-50"
// //             items={[
// //               "Improve star ratings faster",
// //               "Respond to reviews 10x faster",
// //               "Build trust with customers",
// //               "Track reputation trends",
// //             ]}
// //             check
// //           />

// //           {/* IDEAL FOR */}
// //           <div className="border-4 border-black p-6">
// //             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
// //               <Users /> Ideal For
// //             </h3>

// //             <div className="flex flex-wrap gap-3">
// //               {[
// //                 "Local businesses",
// //                 "Restaurants and hospitality",
// //                 "Healthcare providers",
// //                 "Service businesses",
// //               ].map((item) => (
// //                 <span
// //                   key={item}
// //                   className="border-2 border-black px-4 py-2 font-semibold"
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

// // /* ---------------- COMPONENTS ---------------- */

// // function StatCard({ title, value, icon, green }) {
// //   return (
// //     <div className="border-2 border-black bg-white p-4 text-center">
// //       {icon && <div className="flex justify-center mb-1">{icon}</div>}
// //       <div className={`text-2xl font-bold ${green ? "text-green-600" : ""}`}>
// //         {value}
// //       </div>
// //       <p className="text-sm text-gray-600 mt-1">{title}</p>
// //     </div>
// //   );
// // }

// // function ReviewCard({ name, source, time, text, rating, tag, tagColor }) {
// //   return (
// //     <div
// //       className="
// //         border-4 border-black bg-white p-5
// //         transition-all duration-500 ease-out
// //         animate-[slideIn_0.5s_ease-out]
// //       "
// //     >
// //       <div className="flex justify-between items-start mb-2">
// //         <div>
// //           <p className="font-bold">{name}</p>
// //           <p className="text-sm text-gray-500">
// //             {source} · {time}
// //           </p>
// //         </div>

// //         <div className="flex">
// //           {Array.from({ length: 5 }).map((_, i) => (
// //             <Star
// //               key={i}
// //               size={16}
// //               className={i < rating ? "text-yellow-400" : "text-gray-300"}
// //               fill={i < rating ? "currentColor" : "none"}
// //             />
// //           ))}
// //         </div>
// //       </div>

// //       <p className="text-gray-700 mb-4">{text}</p>

// //       <div className="flex gap-3">
// //         <button className="border-2 border-black px-4 py-2 font-semibold bg-yellow-400 flex items-center gap-2">
// //           <MessageSquare size={16} /> AI Reply
// //         </button>

// //         <span
// //           className={`border-2 px-4 py-2 font-semibold ${tagColor}`}
// //         >
// //           {tag}
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// // function InfoCard({ icon, title, items, bg, check }) {
// //   return (
// //     <div className={`border-4 border-black p-6 ${bg}`}>
// //       <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
// //         {icon} {title}
// //       </h3>

// //       <ul className="space-y-2">
// //         {items.map((item) => (
// //           <li key={item} className="flex gap-2">
// //             {check ? "✓" : "▶"} {item}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // /* ---------------- DATA ---------------- */

// // const reviews = [
// //   {
// //     name: "Sarah M.",
// //     source: "Google",
// //     time: "2 days ago",
// //     rating: 5,
// //     text: "Amazing service! The team went above and beyond to help us.",
// //     tag: "😊 Positive",
// //     tagColor: "border-green-600 text-green-600",
// //   },
// //   {
// //     name: "John D.",
// //     source: "Yelp",
// //     time: "5 days ago",
// //     rating: 4,
// //     text: "Good experience overall, though the wait time was a bit long.",
// //     tag: "😐 Neutral",
// //     tagColor: "border-blue-600 text-blue-600",
// //   },
// //   {
// //     name: "Emily R.",
// //     source: "Facebook",
// //     time: "1 week ago",
// //     rating: 5,
// //     text: "Highly recommend! Professional and friendly staff.",
// //     tag: "😊 Positive",
// //     tagColor: "border-green-600 text-green-600",
// //   },
// // ];



// import { useEffect, useState } from "react";
// import {
//   Star,
//   MessageSquare,
//   ShoppingCart,
//   Sparkles,
//   Target,
//   Users,
// } from "lucide-react";

// export default function ReviewReputation() {
//   const [mounted, setMounted] = useState(false);
//   const [visibleReviews, setVisibleReviews] = useState(0);

//   useEffect(() => {
//     setMounted(true);

//     const interval = setInterval(() => {
//       setVisibleReviews((prev) => {
//         if (prev < reviews.length) return prev + 1;
//         clearInterval(interval);
//         return prev;
//       });
//     }, 600);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 font-inter overflow-hidden">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

//         {/* LEFT PANEL */}
//         <div
//           className={`
//             border-4 border-black bg-yellow-50 flex flex-col
//             transition-all duration-700 ease-out
//             ${mounted ? "translate-x-0 opacity-100" : "-translate-x-14 opacity-0"}
//           `}
//         >
//           {/* HEADER */}
//           <div className="border-b-4 border-black p-4">
//             <h2 className="text-lg font-bold mb-4">
//               Review & Reputation Management
//             </h2>

//             <div className="grid grid-cols-3 gap-3">
//               <StatCard title="Avg Rating" value="4.8" icon={<Star size={16} />} />
//               <StatCard title="This Month" value="+12%" green />
//               <StatCard title="Total Reviews" value="247" />
//             </div>
//           </div>

//           {/* REVIEWS */}
//           <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//             {reviews.slice(0, visibleReviews).map((review, i) => (
//               <ReviewCard key={i} {...review} />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div
//           className={`
//             space-y-6
//             transition-all duration-700 ease-out
//             ${mounted ? "translate-x-0 opacity-100" : "translate-x-14 opacity-0"}
//           `}
//         >
//           {/* INFO CARD */}
//           <div className="border-4 border-black p-5 relative">
//             <Star
//   className="absolute top-5 right-5 w-6 h-6 text-yellow-500"
//   fill="currentColor"
//   stroke="none"
// />


//             <h2 className="text-2xl font-bold mb-1">
//               Review & Reputation Management
//             </h2>

//             <p className="text-cyan-600 text-sm font-semibold mb-3">
//               Monitor, Respond, and Improve Your Online Reputation
//             </p>

//             <p className="text-gray-700 text-sm leading-relaxed mb-5">
//               Monitor reviews across Google, Yelp, Facebook, and industry sites.
//               Get AI-generated response suggestions and automate review requests
//               to improve your ratings.
//             </p>

//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold">
//                   $89<span className="text-base text-gray-500">/mo</span>
//                 </div>
//                 <p className="text-green-600 text-sm mt-1 font-medium">
//                   ✓ 5-day free trial
//                 </p>
//               </div>

//               <button className="border-2 border-black px-5 py-2 text-sm font-semibold flex items-center gap-2">
//                 <ShoppingCart size={16} /> Start Trial
//               </button>
//             </div>
//           </div>

//           {/* WHAT IT DOES */}
//           <InfoCard
//             icon={<Sparkles size={16} />}
//             title="What It Does"
//             bg="bg-cyan-50"
//             items={[
//               "Monitors reviews across all platforms",
//               "AI-generated review responses",
//               "Automated review request campaigns",
//               "Sentiment analysis and insights",
//               "Competitor reputation tracking",
//             ]}
//           />

//           {/* KEY BENEFITS */}
//           <InfoCard
//             icon={<Target size={16} />}
//             title="Key Benefits"
//             bg="bg-yellow-50"
//             items={[
//               "Improve star ratings faster",
//               "Respond to reviews 10x faster",
//               "Build trust with customers",
//               "Track reputation trends",
//             ]}
//             check
//           />

//           {/* IDEAL FOR */}
//           <div className="border-4 border-black p-5">
//             <h3 className="text-base font-bold mb-3 flex items-center gap-2">
//               <Users size={16} /> Ideal For
//             </h3>

//             <div className="flex flex-wrap gap-2">
//               {[
//                 "Local businesses",
//                 "Restaurants and hospitality",
//                 "Healthcare providers",
//                 "Service businesses",
//               ].map((item) => (
//                 <span
//                   key={item}
//                   className="border-2 border-black px-3 py-1 text-sm font-semibold"
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

// /* ---------------- COMPONENTS ---------------- */

// function StatCard({ title, value, icon, green }) {
//   return (
//     <div className="border-2 border-black bg-white p-3 text-center">
//       {icon && <div className="flex justify-center mb-1">{icon}</div>}
//       <div className={`text-xl font-bold ${green ? "text-green-600" : ""}`}>
//         {value}
//       </div>
//       <p className="text-xs text-gray-600 mt-1">{title}</p>
//     </div>
//   );
// }

// function ReviewCard({ name, source, time, text, rating, tag, tagColor }) {
//   return (
//     <div
//       className="
//         border-4 border-black bg-white p-4
//         transition-all duration-500 ease-out
//         animate-[slideIn_0.5s_ease-out]
//       "
//     >
//       <div className="flex justify-between items-start mb-1">
//         <div>
//           <p className="font-bold text-sm">{name}</p>
//           <p className="text-xs text-gray-500">
//             {source} · {time}
//           </p>
//         </div>

//         <div className="flex">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star
//               key={i}
//               size={14}
//               className={i < rating ? "text-yellow-400" : "text-gray-300"}
//               fill={i < rating ? "currentColor" : "none"}
//             />
//           ))}
//         </div>
//       </div>

//       <p className="text-sm text-gray-700 mb-3">{text}</p>

//       <div className="flex gap-2">
//         <button className="border-2 border-black px-3 py-1.5 text-sm font-semibold bg-yellow-400 flex items-center gap-2">
//           <MessageSquare size={14} /> AI Reply
//         </button>

//         <span className={`border-2 px-3 py-1.5 text-sm font-semibold ${tagColor}`}>
//           {tag}
//         </span>
//       </div>
//     </div>
//   );
// }

// function InfoCard({ icon, title, items, bg, check }) {
//   return (
//     <div className={`border-4 border-black p-5 ${bg}`}>
//       <h3 className="text-base font-bold mb-3 flex items-center gap-2">
//         {icon} {title}
//       </h3>

//       <ul className="space-y-2 text-sm">
//         {items.map((item) => (
//           <li key={item} className="flex gap-2">
//             {check ? "✓" : "▶"} {item}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// /* ---------------- DATA ---------------- */

// const reviews = [
//   {
//     name: "Sarah M.",
//     source: "Google",
//     time: "2 days ago",
//     rating: 5,
//     text: "Amazing service! The team went above and beyond to help us.",
//     tag: "😊 Positive",
//     tagColor: "border-green-600 text-green-600",
//   },
//   {
//     name: "John D.",
//     source: "Yelp",
//     time: "5 days ago",
//     rating: 4,
//     text: "Good experience overall, though the wait time was a bit long.",
//     tag: "😐 Neutral",
//     tagColor: "border-blue-600 text-blue-600",
//   },
//   {
//     name: "Emily R.",
//     source: "Facebook",
//     time: "1 week ago",
//     rating: 5,
//     text: "Highly recommend! Professional and friendly staff.",
//     tag: "😊 Positive",
//     tagColor: "border-green-600 text-green-600",
//   },
// ];


import { useEffect, useState, useRef } from "react";
import { Play, Pause, Star, MessageSquare, ShoppingCart, Zap, Target, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewReputation() {
  const [mounted, setMounted] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setVisibleReviews((prev) => {
        if (prev < reviews.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 600);

    return () => clearInterval(interval);
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
      setDuration(videoRef.current.duration || 130);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-inter overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* LEFT PANEL - DEMO VIDEO */}
        <div
          className={`
            border-4 border-black bg-yellow-50 flex flex-col
            transition-all duration-700 ease-out
            ${mounted ? "translate-x-0 opacity-100" : "-translate-x-14 opacity-0"}
          `}
        >
          <div className="border-b-4 border-black p-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-4.333v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5z" />
              </svg>
              Review AI Demo
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <StatBox value="2:10" label="Video Length" />
              <StatBox value="HD" label="Quality" success />
              <StatBox value="4.9★" label="Rating" />
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
                    REVIEW AI DEMO
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
                <Star className="w-5 h-5 text-yellow-500" />
                Watch Review AI in Action
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                See how AI monitors reviews across platforms, generates responses, 
                and manages your online reputation automatically.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                    <span className="text-cyan-600 font-bold">📊</span>
                  </div>
                  <span>Multi-platform monitoring</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 text-green-600" />
                  </div>
                  <span>AI response generation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">📈</span>
                  </div>
                  <span>Sentiment analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">🔔</span>
                  </div>
                  <span>Real-time alerts</span>
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
                    Pause Review Demo
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play Review Demo
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - UNCHANGED */}
        <div
          className={`
            space-y-6
            transition-all duration-700 ease-out
            ${mounted ? "translate-x-0 opacity-100" : "translate-x-14 opacity-0"}
          `}
        >
          <div className="border-4 border-black p-5 relative">
            <Star className="absolute top-5 right-5 w-6 h-6 text-yellow-500" fill="currentColor" stroke="none" />
            <h2 className="text-2xl font-bold mb-1">Review & Reputation Management</h2>
            <p className="text-cyan-600 text-sm font-semibold mb-3">Monitor, Respond, and Improve Your Online Reputation</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-5">
              Monitor reviews across Google, Yelp, Facebook, and industry sites.
              Get AI-generated response suggestions and automate review requests
              to improve your ratings.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">$89<span className="text-base text-gray-500">/mo</span></div>
                <p className="text-green-600 text-sm mt-1 font-medium">✓ 5-day free trial</p>
              </div>
              <button className="border-2 border-black px-5 py-2 text-sm font-semibold flex items-center gap-2">
                <ShoppingCart size={16} /> Start Trial
              </button>
            </div>
          </div>

          <InfoCard
            icon={<Zap size={16} />}
            title="What It Does"
            bg="bg-cyan-50"
            items={[
              "Monitors reviews across all platforms",
              "AI-generated review responses",
              "Automated review request campaigns",
              "Sentiment analysis and insights",
              "Competitor reputation tracking",
            ]}
          />

          <InfoCard
            icon={<Target size={16} />}
            title="Key Benefits"
            bg="bg-yellow-50"
            items={[
              "Improve star ratings faster",
              "Respond to reviews 10x faster",
              "Build trust with customers",
              "Track reputation trends",
            ]}
            check
          />

          <div className="border-4 border-black p-5">
            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
              <Users size={16} /> Ideal For
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Local businesses", "Restaurants and hospitality", "Healthcare providers", "Service businesses"].map((item) => (
                <span key={item} className="border-2 border-black px-3 py-1 text-sm font-semibold">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label, success }) {
  return (
    <div className="border-2 border-black bg-white p-3 text-center">
      <div className={`text-lg font-bold ${success ? "text-green-600" : ""}`}>{value}</div>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  );
}

function InfoCard({ icon, title, items, bg, check }) {
  return (
    <div className={`border-4 border-black p-5 ${bg}`}>
      <h3 className="text-base font-bold mb-3 flex items-center gap-2">
        {icon} {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            {check ? "✓" : "▶"} {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const reviews = [
  {
    name: "Sarah M.",
    source: "Google",
    time: "2 days ago",
    rating: 5,
    text: "Amazing service! The team went above and beyond to help us.",
    tag: "😊 Positive",
    tagColor: "border-green-600 text-green-600",
  },
  {
    name: "John D.",
    source: "Yelp",
    time: "5 days ago",
    rating: 4,
    text: "Good experience overall, though the wait time was a bit long.",
    tag: "😐 Neutral",
    tagColor: "border-blue-600 text-blue-600",
  },
  {
    name: "Emily R.",
    source: "Facebook",
    time: "1 week ago",
    rating: 5,
    text: "Highly recommend! Professional and friendly staff.",
    tag: "😊 Positive",
    tagColor: "border-green-600 text-green-600",
  },
];