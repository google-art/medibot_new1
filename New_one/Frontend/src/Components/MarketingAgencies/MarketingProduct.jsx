// import {
//   ArrowLeft,
//   CheckCircle,
//   Clock,
//   ShoppingCart,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function MarketingAgencies() {
//   const navigate = useNavigate();

//   const products = [
//     {
//       name: "Lead Generation",
//       desc: "AI-Powered Lead Capture",
//       text:
//         "Automated lead generation system with smart qualification and nurturing.",
//       price: "$49",
//       icon: "🎯",
//       status: "LIVE",
//       route: "/products/lead-generation",
//     },
//     {
//       name: "Post Automation",
//       desc: "Social Media Automation",
//       text:
//         "Automated social media posting with AI-generated content and scheduling.",
//       price: "$39",
//       icon: "📱",
//       status: "LIVE",
//       route: "/products/post-automation",
//     },
//     {
//       name: "SEOwriter Pro",
//       desc: "AI Blog & Ad Writer",
//       text:
//         "AI-powered blog and ad writer with SEO keyword optimization.",
//       price: "$59",
//       icon: "✍️",
//       status: "COMING_SOON",
//       route: null,
//     },
//     {
//       name: "ClientSnapshot",
//       desc: "Automated Brand Brief Generator",
//       text:
//         "Automatically generates brand briefs from client answers or uploads.",
//       price: "$49",
//       icon: "📊",
//       status: "COMING_SOON",
//       route: null,
//     },
//   ];

//   const liveCount = products.filter(p => p.status === "LIVE").length;
//   const comingSoonCount = products.filter(p => p.status === "COMING_SOON").length;

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
//               📢
//             </div>

//             <div>
//               <h1 className="text-5xl font-bold text-cyan-400 mb-3">
//                 Marketing Agencies
//               </h1>

//               <p className="text-lg text-gray-300 max-w-2xl">
//                 Automate content creation, lead generation, and campaign management
//               </p>

//               <div className="flex gap-8 mt-6">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="text-green-400" />
//                   <span className="font-semibold">{liveCount} Live Products</span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Clock className="text-yellow-400" />
//                   <span className="font-semibold">
//                     {comingSoonCount} Coming Soon
//                   </span>
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
//           <span className="text-cyan-500">Marketing Agencies</span>
//         </h2>
//       </section>

//       {/* ================= PRODUCT CARDS ================= */}
//       {products.map((item, index) => (
//         <section key={index} className="max-w-7xl mx-auto px-6 mb-10">
//           <div
//             className={`relative rounded-xl border border-gray-200 bg-white p-8 flex flex-col md:flex-row justify-between gap-6 transition-all ${
//               item.status === "COMING_SOON" ? "opacity-70" : ""
//             }`}
//           >
//             {/* Left cyan bar */}
//             <div className="absolute left-0 top-0 h-full w-[5px] bg-cyan-400 rounded-l-xl" />

//             <div className="flex gap-6">
//               <div className="text-4xl">{item.icon}</div>

//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <h3 className="text-2xl font-bold">{item.name}</h3>

//                   {item.status === "LIVE" ? (
//                     <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
//                       ● LIVE
//                     </span>
//                   ) : (
//                     <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">
//                       ⏳ COMING SOON
//                     </span>
//                   )}
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

//                 {item.status === "LIVE" && (
//                   <span className="ml-4 text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded">
//                     ✓ 14-day FREE trial
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex flex-col gap-4 min-w-[200px]">
//               <button
//                 onClick={() => item.route && navigate(item.route)}
//                 disabled={item.status !== "LIVE"}
//                 className={`border-2 border-black px-6 py-3 flex items-center justify-center gap-2 font-semibold ${
//                   item.status === "LIVE"
//                     ? "hover:bg-cyan-50"
//                     : "bg-gray-100 cursor-not-allowed"
//                 }`}
//               >
//                 <ShoppingCart size={18} />
//                 {item.status === "LIVE" ? "Start Trial" : "Unavailable"}
//               </button>

//               <button
//                 onClick={() => item.route && navigate(item.route)}
//                 disabled={item.status !== "LIVE"}
//                 className={`border-2 border-black px-6 py-3 font-semibold ${
//                   item.status === "LIVE"
//                     ? "hover:bg-cyan-50"
//                     : "bg-gray-100 cursor-not-allowed"
//                 }`}
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
//             Scale Your Agency with AI
//           </h2>

//           <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
//             Launch campaigns faster, convert more leads, and automate repetitive
//             marketing work using AI-powered tools.
//           </p>

//           <div className="flex justify-center gap-6">
//             <button className="bg-cyan-400 text-black px-10 py-4 font-semibold border-2 border-cyan-400 hover:bg-cyan-300">
//               ▶ Explore Products
//             </button>

//             <button className="border-2 border-cyan-400 px-10 py-4 font-semibold text-cyan-400 hover:bg-cyan-400 hover:text-black">
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

export default function MarketingAgencies() {
  const navigate = useNavigate();

  const products = [
    {
      name: "Lead Generation",
      desc: "AI-Powered Lead Capture",
      text:
        "Automated lead generation system with smart qualification and nurturing.",
      price: 49,
      icon: "🎯",
      status: "LIVE",
      detailsRoute: "/products/lead-generation",
    },
    {
      name: "Post Automation",
      desc: "Social Media Automation",
      text:
        "Automated social media posting with AI-generated content and scheduling.",
      price: 39,
      icon: "📱",
      status: "LIVE",
      detailsRoute: "/products/post-automation",
    },
    {
      name: "SEOwriter Pro",
      desc: "AI Blog & Ad Writer",
      text:
        "AI-powered blog and ad writer with SEO keyword optimization.",
      price: 59,
      icon: "✍️",
      status: "COMING_SOON",
      detailsRoute: "/products/seowriter-pro",
    },
    {
      name: "ClientSnapshot",
      desc: "Automated Brand Brief Generator",
      text:
        "Automatically generates brand briefs from client answers or uploads.",
      price: 49,
      icon: "📊",
      status: "COMING_SOON",
      detailsRoute: "/products/client-snapshot",
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
              📢
            </div>

            <div>
              <h1 className="text-5xl font-bold text-cyan-400 mb-3">
                Marketing Agencies
              </h1>

              <p className="text-lg text-gray-300 max-w-2xl">
                Automate content creation, lead generation, and campaign management
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
          <span className="text-cyan-500">Marketing Agencies</span>
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

                  {isLive && (
                    <span className="ml-4 text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded">
                      ✓ 14-day FREE trial
                    </span>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-4 min-w-[200px]">
                <button
                  disabled={!isLive}
                  onClick={() =>
                    isLive &&
                    navigate("/starttrial", {
                      state: {
                        industry: "Marketing Agencies",
                        productName: item.name,
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
            Scale Your Agency with AI
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
            Launch campaigns faster, convert more leads, and automate repetitive
            marketing work using AI-powered tools.
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate("/products")}
              className="bg-cyan-400 text-black px-10 py-4 font-semibold border-2 border-cyan-400 hover:bg-cyan-300"
            >
              ▶ Explore Products
            </button>

            <button className="border-2 border-cyan-400 px-10 py-4 font-semibold text-cyan-400 hover:bg-cyan-400 hover:text-black">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
