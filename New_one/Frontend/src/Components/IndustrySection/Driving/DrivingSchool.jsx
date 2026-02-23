// import { ArrowLeft, CheckCircle, Clock, ShoppingCart } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function DrivingSchool() {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate("/#industry");
//   };

//   const products = [
//     {
//       name: "AutoBook",
//       desc: "Smart AI Booking Assistant (Drive Bot)",
//       text:
//         "AutoBook is an AI-powered booking chatbot that handles student inquiries, schedules classes, and manages payments automatically.",
//       price: "$49",
//       icon: "📘",
//     },
//     {
//       name: "ProgressPulse",
//       desc: "Student Progress & Performance Dashboard",
//       text:
//         "ProgressPulse turns instructor inputs and practice test results into clear, easy-to-understand student progress reports.",
//       price: "$39",
//       icon: "📊",
//     },
//     {
//       name: "ComplianceGen",
//       desc: "Auto-generated Logbooks & Compliance Reports",
//       text:
//         "Auto-generated logbooks and compliance reports per Transportstyrelsen format for driving schools.",
//       price: "$59",
//       icon: "📋",
//     },
//   ];

//   return (
//     <div className="w-full bg-white">

//       {/* ================= HEADER ================= */}
//       <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white">
//         <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
//         <div className="absolute bottom-0 left-0 w-full h-[5px] bg-cyan-400" />

//         <div className="max-w-7xl mx-auto px-6 py-14">
//           {/* BACK BUTTON */}
//           <button
//             onClick={handleBack}
//             className="flex items-center gap-2 text-cyan-400 mb-10 hover:underline cursor-pointer"
//           >
//             <ArrowLeft size={16} /> Back to All Industries
//           </button>

//           <div className="flex items-start gap-8">
//             <div className="bg-cyan-400 text-black p-6 rounded-xl">🚗</div>

//             <div>
//               <h1 className="text-5xl font-bold text-cyan-400 mb-3">
//                 Driving Schools
//               </h1>

//               <p className="text-lg text-gray-300 max-w-2xl">
//                 Reduce admin workload, improve student experience, increase bookings
//               </p>

//               <div className="flex gap-8 mt-6">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="text-green-400" />
//                   <span className="font-semibold">3 Live Products</span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Clock className="text-yellow-400" />
//                   <span className="font-semibold">0 Coming Soon</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= PRODUCTS TITLE ================= */}
//       <section className="max-w-7xl mx-auto px-6 py-12">
//         <h2 className="text-4xl font-bold">
//           AI Products for{" "}
//           <span className="text-cyan-500">Driving Schools</span>
//         </h2>
//       </section>

//       {/* ================= PRODUCT CARDS ================= */}
//       {products.map((item, index) => (
//         <section key={index} className="max-w-7xl mx-auto px-6 mb-10">
//           <div
//             className="
//               relative rounded-xl border border-gray-200 bg-white
//               p-8 flex flex-col md:flex-row justify-between gap-6
//               transition-all duration-300 ease-out
//               hover:bg-gradient-to-r hover:from-cyan-50 hover:to-cyan-100
//               hover:scale-[1.02]
//             "
//           >
//             {/* Left cyan line */}
//             <div className="absolute left-0 top-0 h-full w-[5px] bg-cyan-400 rounded-l-xl" />

//             <div className="flex gap-6">
//               <div className="text-4xl">{item.icon}</div>

//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <h3 className="text-2xl font-bold">{item.name}</h3>
//                   <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
//                     ● LIVE
//                   </span>
//                 </div>

//                 <p className="font-semibold mb-2">{item.desc}</p>
//                 <p className="text-gray-600 max-w-2xl mb-4">{item.text}</p>

//                 <div className="flex items-center gap-4">
//                   <span className="text-3xl font-bold">
//                     {item.price}
//                     <span className="text-base font-normal text-gray-500">
//                       /month
//                     </span>
//                   </span>

//                   <span className="bg-green-100 text-green-700 px-4 py-1 text-sm font-semibold rounded">
//                     ✓ 14-day FREE trial
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col gap-4 min-w-[200px]">
//               <button
//                 onClick={() => navigate("/drivingpage")}
//                 className="border-2 border-black px-6 py-3 flex items-center justify-center gap-2 font-semibold bg-white hover:bg-cyan-50 transition"
//               >
//                 <ShoppingCart size={18} /> Start Trial
//               </button>

//               <button
//                 onClick={() => navigate("/drivingpage")}
//                 className="border-2 border-black px-6 py-3 flex items-center justify-center gap-2 font-semibold bg-white hover:bg-cyan-50 transition"
//               >
//                 View Details →
//               </button>
//             </div>
//           </div>
//         </section>
//       ))}

//       {/* ================= CTA SECTION ================= */}
//       <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white mt-24">
//         <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
//         <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400" />

//         <div className="max-w-5xl mx-auto px-6 py-24 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
//             Ready to Transform Your Business?
//           </h2>

//           <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
//             Explore our AI products and see how they can streamline your operations.
//           </p>

//           <div className="flex flex-col md:flex-row justify-center gap-6">
//             <button
//               onClick={() => navigate("/drivingpage")}
//               className="bg-cyan-400 text-black px-10 py-4 font-semibold border-2 border-white"
//             >
//               ▶ Explore Products
//             </button>

//             <button className="px-10 py-4 font-semibold border-2 border-cyan-400 text-cyan-400">
//               Talk to Sales
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



import { ArrowLeft, CheckCircle, Clock, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DrivingSchool() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/#industry");
  };

  const products = [
    {
      name: "AutoBook",
      desc: "Smart AI Booking Assistant (Drive Bot)",
      text:
        "AutoBook is an AI-powered booking chatbot that handles student inquiries, schedules classes, and manages payments automatically.",
      price: "$49",
      icon: "📘",
    },
    {
      name: "ProgressPulse",
      desc: "Student Progress & Performance Dashboard",
      text:
        "ProgressPulse turns instructor inputs and practice test results into clear, easy-to-understand student progress reports.",
      price: "$39",
      icon: "📊",
    },
    {
      name: "ComplianceGen",
      desc: "Auto-generated Logbooks & Compliance Reports",
      text:
        "Auto-generated logbooks and compliance reports per Transportstyrelsen format for driving schools.",
      price: "$59",
      icon: "📋",
    },
  ];

  return (
    <div className="w-full bg-white">

      {/* ================= HEADER ================= */}
      <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
        <div className="absolute bottom-0 left-0 w-full h-[5px] bg-cyan-400" />

        <div className="max-w-7xl mx-auto px-6 py-14">
          {/* BACK BUTTON */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-cyan-400 mb-10 hover:underline cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to All Industries
          </button>

          <div className="flex items-start gap-8">
            <div className="bg-cyan-400 text-black p-6 rounded-xl">🚗</div>

            <div>
              <h1 className="text-5xl font-bold text-cyan-400 mb-3">
                Driving Schools
              </h1>

              <p className="text-lg text-gray-300 max-w-2xl">
                Reduce admin workload, improve student experience, increase bookings
              </p>

              <div className="flex gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" />
                  <span className="font-semibold">3 Live Products</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="text-yellow-400" />
                  <span className="font-semibold">0 Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS TITLE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold">
          AI Products for{" "}
          <span className="text-cyan-500">Driving Schools</span>
        </h2>
      </section>

      {/* ================= PRODUCT CARDS ================= */}
      {products.map((item, index) => (
        <section key={index} className="max-w-7xl mx-auto px-6 mb-10">
          <div
            className="
              relative rounded-xl border border-gray-200 bg-white
              p-8 flex flex-col md:flex-row justify-between gap-6
              transition-all duration-300 ease-out
              hover:bg-gradient-to-r hover:from-cyan-50 hover:to-cyan-100
              hover:scale-[1.02]
            "
          >
            {/* Left cyan line */}
            <div className="absolute left-0 top-0 h-full w-[5px] bg-cyan-400 rounded-l-xl" />

            <div className="flex gap-6">
              <div className="text-4xl">{item.icon}</div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                    ● LIVE
                  </span>
                </div>

                <p className="font-semibold mb-2">{item.desc}</p>
                <p className="text-gray-600 max-w-2xl mb-4">{item.text}</p>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">
                    {item.price}
                    <span className="text-base font-normal text-gray-500">
                      /month
                    </span>
                  </span>

                  <span className="bg-green-100 text-green-700 px-4 py-1 text-sm font-semibold rounded">
                    ✓ 14-day FREE trial
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 min-w-[200px]">
              <button
               onClick={() =>
                  navigate("/starttrial", {
                    state: {
                      productName: item.name,
                      productDesc: item.desc,
                      price: item.price,
                    },
                  })
                }
                className="border-2 border-black px-6 py-3 flex items-center justify-center gap-2 font-semibold bg-white hover:bg-cyan-50 transition"
              >
                <ShoppingCart size={18} /> Start Trial
              </button>

              <button
                onClick={() => navigate("/drivingpage")}
                className="border-2 border-black px-6 py-3 flex items-center justify-center gap-2 font-semibold bg-white hover:bg-cyan-50 transition"
              >
                View Details →
              </button>
            </div>
          </div>
        </section>
      ))}

      {/* ================= CTA SECTION ================= */}
      <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white mt-24">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400" />

        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
            Ready to Transform Your Business?
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
            Explore our AI products and see how they can streamline your operations.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button
              onClick={() => navigate("/drivingpage")}
              className="bg-cyan-400 text-black px-10 py-4 font-semibold border-2 border-white"
            >
              ▶ Explore Products
            </button>

            <button className="px-10 py-4 font-semibold border-2 border-cyan-400 text-cyan-400">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
