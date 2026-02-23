// import {
//   ArrowLeft,
//   CheckCircle,
//   Clock,
//   ShoppingCart,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function SalonsProduct() {
//   const navigate = useNavigate();

//   const products = [
//     {
//       name: "Salon Workflow",
//       desc: "Complete Salon Management System",
//       text:
//         "End-to-end workflow automation for salons including booking, reminders, and client management.",
//       price: "$49",
//       icon: "✂️",
//       status: "COMING_SOON",
//       route: null,
//     },
//     {
//       name: "PromoWhiz",
//       desc: "Automated Client Promotions",
//       text:
//         "Sends birthday offers, refill reminders, and seasonal promos automatically.",
//       price: "$39",
//       icon: "🎁",
//       status: "COMING_SOON",
//       route: null,
//     },
//     {
//       name: "StyleGenie",
//       desc: "AI Style Recommendation Engine",
//       text:
//         "AI-powered hairstyle and color suggestions based on face shape and hair type.",
//       price: "$59",
//       icon: "💅",
//       status: "COMING_SOON",
//       route: null,
//     },
//   ];

//   return (
//     <div className="w-full bg-white">

//       {/* ================= HEADER ================= */}
//       <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white">
//         <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
//         <div className="absolute bottom-0 left-0 w-full h-[5px] bg-cyan-400" />

//         <div className="max-w-7xl mx-auto px-6 py-14">
//           <button
//             onClick={() => navigate("/#industry")}
//             className="flex items-center gap-2 text-cyan-400 mb-10"
//           >
//             <ArrowLeft size={16} /> Back to All Industries
//           </button>

//           <div className="flex items-start gap-8">
//             <div className="bg-cyan-400 text-black p-6 rounded-xl text-3xl">
//               ✂️
//             </div>

//             <div>
//               <h1 className="text-5xl font-bold text-cyan-400 mb-3">
//                 Salons
//               </h1>

//               <p className="text-lg text-gray-300 max-w-2xl">
//                 Automate bookings, engage clients, and boost repeat business
//               </p>

//               <div className="flex gap-8 mt-6">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="text-green-400" />
//                   <span className="font-semibold">0 Live Products</span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Clock className="text-yellow-400" />
//                   <span className="font-semibold">3 Coming Soon</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= TITLE ================= */}
//       <section className="max-w-7xl mx-auto px-6 py-12">
//         <h2 className="text-4xl font-bold">
//           AI Products for{" "}
//           <span className="text-cyan-500">Salons</span>
//         </h2>
//       </section>

//       {/* ================= PRODUCT CARDS ================= */}
//       {products.map((item, index) => (
//         <section key={index} className="max-w-7xl mx-auto px-6 mb-10">
//           <div className="relative rounded-xl border border-gray-200 bg-white p-8 flex flex-col md:flex-row justify-between gap-6 opacity-70 transition-all">

//             {/* Left cyan bar */}
//             <div className="absolute left-0 top-0 h-full w-[5px] bg-cyan-400 rounded-l-xl" />

//             <div className="flex gap-6">
//               <div className="text-4xl">{item.icon}</div>

//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <h3 className="text-2xl font-bold">{item.name}</h3>

//                   <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">
//                     ⏳ COMING SOON
//                   </span>
//                 </div>

//                 <p className="font-semibold mb-2">{item.desc}</p>
//                 <p className="text-gray-600 max-w-2xl mb-4">
//                   {item.text}
//                 </p>

//                 <span className="text-3xl font-bold">
//                   {item.price}
//                   <span className="text-base font-normal text-gray-500">
//                     /month
//                   </span>
//                 </span>
//               </div>
//             </div>

//             {/* Disabled actions */}
//             <div className="flex flex-col gap-4 min-w-[200px]">
//               <button
//                 disabled
//                 className="border-2 border-black px-6 py-3 flex items-center justify-center gap-2 font-semibold bg-gray-100 cursor-not-allowed"
//               >
//                 <ShoppingCart size={18} />
//                 Unavailable
//               </button>

//               <button
//                 disabled
//                 className="border-2 border-black px-6 py-3 flex items-center justify-center gap-2 font-semibold bg-gray-100 cursor-not-allowed"
//               >
//                 View Details →
//               </button>
//             </div>
//           </div>
//         </section>
//       ))}

//       {/* ================= CTA ================= */}
//       <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white mt-24">
//         <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
//         <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400" />

//         <div className="max-w-5xl mx-auto px-6 py-24 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
//             Salon AI Tools Are Coming Soon
//           </h2>

//           <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
//             We’re building AI tools to help salons automate operations,
//             personalize experiences, and grow revenue.
//           </p>

//           <div className="flex flex-col md:flex-row justify-center gap-6">
//             <button className="bg-cyan-400 text-black px-10 py-4 font-semibold border-2 border-white">
//               Notify Me
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


import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SalonsProduct() {
  const navigate = useNavigate();

  const products = [
    {
      name: "Salon Workflow",
      desc: "Complete Salon Management System",
      text:
        "End-to-end workflow automation for salons including booking, reminders, and client management.",
      price: 49,
      icon: "✂️",
      status: "COMING_SOON",
      detailsRoute: "/salon-workflow",
    },
    {
      name: "PromoWhiz",
      desc: "Automated Client Promotions",
      text:
        "Sends birthday offers, refill reminders, and seasonal promos automatically.",
      price: 39,
      icon: "🎁",
      status: "COMING_SOON",
      detailsRoute: "/promowhiz",
    },
    {
      name: "StyleGenie",
      desc: "AI Style Recommendation Engine",
      text:
        "AI-powered hairstyle and color suggestions based on face shape and hair type.",
      price: 59,
      icon: "💅",
      status: "COMING_SOON",
      detailsRoute: "/stylegenie",
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
              ✂️
            </div>

            <div>
              <h1 className="text-5xl font-bold text-cyan-400 mb-3">
                Salons
              </h1>

              <p className="text-lg text-gray-300 max-w-2xl">
                Automate bookings, engage clients, and boost repeat business
              </p>

              <div className="flex gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" />
                  <span className="font-semibold">
                    {liveCount} Live Products
                  </span>
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
          <span className="text-cyan-500">Salons</span>
        </h2>
      </section>

      {/* ================= PRODUCT CARDS ================= */}
      {products.map((item, index) => {
        const isLive = item.status === "LIVE";

        return (
          <section key={index} className="max-w-7xl mx-auto px-6 mb-10">
            <div className="relative rounded-xl border border-gray-200 bg-white p-8 flex flex-col md:flex-row justify-between gap-6 transition-all">

              {/* Left cyan bar */}
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
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-4 min-w-[200px]">
                <button
                  disabled={!isLive}
                  onClick={() =>
                    isLive &&
                    navigate("/start-trial", {
                      state: {
                        productName: item.name,
                        productDesc: item.desc,
                        price: item.price,
                      },
                    })
                  }
                  className={`border-2 border-black px-6 py-3 flex items-center justify-center gap-2 font-semibold
                    ${
                      isLive
                        ? "hover:bg-cyan-50"
                        : "bg-gray-100 cursor-not-allowed"
                    }
                  `}
                >
                  <ShoppingCart size={18} />
                  {isLive ? "Start Trial" : "Unavailable"}
                </button>

                <button
                  disabled={!isLive}
                  onClick={() => isLive && navigate(item.detailsRoute)}
                  className={`border-2 border-black px-6 py-3 font-semibold
                    ${
                      isLive
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

      {/* ================= CTA ================= */}
      <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white mt-24">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400" />

        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
            Salon AI Tools Are Coming Soon
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
            We’re building AI tools to help salons automate operations,
            personalize experiences, and grow revenue.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button className="bg-cyan-400 text-black px-10 py-4 font-semibold border-2 border-white">
              Notify Me
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
