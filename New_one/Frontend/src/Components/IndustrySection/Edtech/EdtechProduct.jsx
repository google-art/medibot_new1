// import { useNavigate } from "react-router-dom";

// export default function EdTechProviders() {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate("/#industry");
//   };

//   return (
//     <div className="bg-black text-white">
//       {/* ================= HEADER ================= */}
//       <div className="px-10 py-16 bg-gradient-to-r from-black to-slate-900 border-b border-cyan-400">
//         <button
//           onClick={handleBack}
//           className="text-cyan-400 mb-4 hover:underline cursor-pointer"
//         >
//           &larr; Back to All Industries
//         </button>

//         <h1 className="text-4xl font-bold text-cyan-400">
//           EdTech Providers
//         </h1>

//         <p className="mt-3 text-gray-300">
//           Automate course creation, student support, and engagement
//         </p>
//       </div>

//       {/* ================= PRODUCTS ================= */}
//       <div className="bg-white text-black px-10 py-16">
//         <h2 className="text-2xl font-bold mb-8">
//           AI Products for{" "}
//           <span className="text-cyan-500">EdTech Providers</span>
//         </h2>

//         {/* PRODUCT 1 */}
//         <div className="border p-6 mb-6 rounded-lg flex justify-between items-start hover:bg-cyan-50 transition">
//           <div>
//             <h3 className="font-semibold text-lg">
//               CourseGenie{" "}
//               <span className="ml-2 text-xs bg-yellow-100 px-2 py-1 rounded">
//                 COMING SOON
//               </span>
//             </h3>

//             <p className="text-sm text-gray-600">
//               AI Course Content Generator
//             </p>

//             <p className="text-sm text-gray-500 mt-2 max-w-xl">
//               Auto-generate course descriptions, lessons, and quizzes.
//             </p>

//             <div className="mt-3 flex gap-2 items-center">
//               <strong>$49</strong>
//               <span className="text-gray-500">/month</span>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2 min-w-[140px]">
//             <button className="border px-4 py-2 hover:bg-gray-100 transition">
//               Start Trial
//             </button>
//             <button className="border px-4 py-2 hover:bg-gray-100 transition">
//               View Details →
//             </button>
//           </div>
//         </div>

//         {/* PRODUCT 2 */}
//         <div className="border p-6 rounded-lg flex justify-between items-start hover:bg-cyan-50 transition">
//           <div>
//             <h3 className="font-semibold text-lg">
//               LearnBot{" "}
//               <span className="ml-2 text-xs bg-yellow-100 px-2 py-1 rounded">
//                 COMING SOON
//               </span>
//             </h3>

//             <p className="text-sm text-gray-600">
//               AI Student Support Chatbot
//             </p>

//             <p className="text-sm text-gray-500 mt-2 max-w-xl">
//               Handles onboarding, doubt clarification, reminders.
//             </p>

//             <div className="mt-3 flex gap-2 items-center">
//               <strong>$39</strong>
//               <span className="text-gray-500">/month</span>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2 min-w-[140px]">
//             <button className="border px-4 py-2 hover:bg-gray-100 transition">
//               Start Trial
//             </button>
//             <button className="border px-4 py-2 hover:bg-gray-100 transition">
//               View Details →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EdTechProviders() {
  const navigate = useNavigate();

  const products = [
    {
      name: "CourseGenie",
      icon: "🎓",
      desc: "AI Course Content Generator",
      text:
        "Auto-generate course descriptions, lessons, quizzes, and learning paths.",
      price: 49,
      status: "COMING_SOON", // change to LIVE later
      route: "/products/course-genie",
    },
    {
      name: "LearnBot",
      icon: "🤖",
      desc: "AI Student Support Chatbot",
      text:
        "Handles onboarding, doubt clarification, reminders, and engagement 24/7.",
      price: 39,
      status: "COMING_SOON",
      route: "/products/learn-bot",
    },
  ];

  const liveCount = products.filter(p => p.status === "LIVE").length;
  const comingSoonCount = products.filter(p => p.status === "COMING_SOON").length;

  return (
    <div className="w-full bg-white">

      {/* ================= HEADER ================= */}
      <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
        <div className="absolute bottom-0 left-0 w-full h-[5px] bg-cyan-400" />

        <div className="max-w-7xl mx-auto px-6 py-14">
          <button
            onClick={() => navigate("/#industry")}
            className="flex items-center gap-2 text-cyan-400 mb-10 hover:underline"
          >
            <ArrowLeft size={16} /> Back to All Industries
          </button>

          <div className="flex items-start gap-8">
            <div className="bg-cyan-400 text-black p-6 rounded-xl text-3xl">
              🎓
            </div>

            <div>
              <h1 className="text-5xl font-bold text-cyan-400 mb-3">
                EdTech Providers
              </h1>

              <p className="text-lg text-gray-300 max-w-2xl">
                Automate course creation, student support, and engagement
              </p>

              <div className="flex gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" />
                  <span className="font-semibold">{liveCount} Live Products</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="text-yellow-400" />
                  <span className="font-semibold">
                    {comingSoonCount} Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TITLE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold">
          AI Products for{" "}
          <span className="text-cyan-500">EdTech Providers</span>
        </h2>
      </section>

      {/* ================= PRODUCT CARDS ================= */}
      {products.map((item, index) => {
        const isLive = item.status === "LIVE";

        return (
          <section key={index} className="max-w-7xl mx-auto px-6 mb-10">
            <div
              className={`
                relative rounded-xl border border-gray-200 bg-white
                p-8 flex flex-col md:flex-row justify-between gap-6
                transition-all duration-300
                ${isLive
                  ? "hover:bg-cyan-50 hover:scale-[1.02]"
                  : "opacity-70"
                }
              `}
            >
              {/* Cyan bar */}
              <div className="absolute left-0 top-0 h-full w-[5px] bg-cyan-400 rounded-l-xl" />

              <div className="flex gap-6">
                <div className="text-4xl">{item.icon}</div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{item.name}</h3>

                    {isLive ? (
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                        ● LIVE
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">
                        ⏳ COMING SOON
                      </span>
                    )}
                  </div>

                  <p className="font-semibold mb-2">{item.desc}</p>
                  <p className="text-gray-600 max-w-2xl mb-4">
                    {item.text}
                  </p>

                  <span className="text-3xl font-bold">
                    ${item.price}
                    <span className="text-base font-normal text-gray-500">
                      /month
                    </span>
                  </span>

                  {isLive && (
                    <span className="ml-4 text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded">
                      ✓ 14-day FREE trial
                    </span>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-4 min-w-[200px]">
                <button
                  onClick={() => isLive && navigate(item.route)}
                  disabled={!isLive}
                  className={`border-2 border-black px-6 py-3 flex items-center justify-center gap-2 font-semibold
                    ${isLive
                      ? "hover:bg-cyan-50"
                      : "bg-gray-100 cursor-not-allowed"
                    }
                  `}
                >
                  <ShoppingCart size={18} />
                  {isLive ? "Start Trial" : "Unavailable"}
                </button>

                <button
                  onClick={() => isLive && navigate(item.route)}
                  disabled={!isLive}
                  className={`border-2 border-black px-6 py-3 font-semibold
                    ${isLive
                      ? "hover:bg-cyan-50"
                      : "bg-gray-100 cursor-not-allowed"
                    }
                  `}
                >
                  View Details →
                </button>
              </div>
            </div>
          </section>
        );
      })}

    </div>
  );
}
