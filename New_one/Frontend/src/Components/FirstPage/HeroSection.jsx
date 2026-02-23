// import bgVideo from "../../assets/bg.avif"; // your video
// import chip from "../../assets/chips.png";
// import nodes from "../../assets/diamond.png";
// import spark from "../../assets/crystal.png";
// import Box from "../../assets/box.png"
// import "./styles/HeroSection.css"
// export default function HeroSection() {
//   return (
//     <section className="relative min-h-screen border-b-4 border-cyan-400 bg-black overflow-hidden flex items-center justify-center text-center">

     
//       {/* DARK OVERLAY */}
//       <div className="absolute inset-0 bg-black/60 grid-box " />

//       {/* FLOATING ELEMENTS */}
//       <img
//         src={chip}
//         alt="AI Chip"
//         className="absolute nodes3 right-20 bottom-20 w-15 "
//       />

//       <img
//         src={chip}
//         alt="AI Chip"
//         className="absolute nodes3 left-20 bottom-25 w-15 "
//       />

//        <img
//         src={Box}
//         alt="Box"
//         className="absolute nodes4 left-20 top-20 w-20 "
//       />

//        <img
//         src={Box}
//         alt="Box"
//         className="absolute nodes5 right-20 top-20 w-20 "
//       />

//       <img
//         src={nodes}
//         alt="Nodes"
//         className="nodes1 absolute right-130 bottom-60 w-15"
//       />

//        <img
//         src={nodes}
//         alt="Nodes"
//         className="nodes2 absolute right-80 bottom-70 w-12"
//       />

//       <div
//         className="absolute left-1/4 bottom-60 "
//       >
//         <h1 className="line h-0.5 flex justify-center items-center w-30 child rotate-30 bg-pink-700">
//            <h1 className="inside"></h1>
//            <h1 className="inside inanimate absolute"></h1>
//         </h1>
//       </div>

//       {/* CONTENT */}
//       <div className="relative z-10 max-w-3xl px-6">
//         <div className="inline-flex items-center bg-cyan-400 gap-2 border-2 border-white text-cyan-400 px-4 py-2 mb-6 text-sm tracking-widest">
//              <h1 style={{fontSize:'10px'}} className="text-white header">⚡ AI AUTOMATION FOR EVERY INDUSTRY</h1>
//         </div>

//         <h1 className="text-6xl md:text-7xl header font-extrabold text-cyan-400 tracking-widest mb-4">
//           WYN <span className="animate-pulse opacity-0 animate-infinite">AI</span>
//         </h1>

//         <p className="header text-sm md:text-md text-white mb-4">
//           Ready-to-Use AI Products
//         </p>

//         <p className="text-gray-400 mb-8">
//           No complex setup. No technical knowledge required.
//           <br />
//           Just activate and run.
//         </p>

//         <button className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 text-lg hover:bg-cyan-400 hover:text-black transition">
//           ▶ Choose Your Industry
//         </button>
//       </div>
//     </section>
//   );
// }


// // import React from "react";

// // export default function HeroSection(){
// //     return(
// //     <div className="flex items-center justify-center min-h-screen bg-black">
// //       <div className="grid-box w-80 h-48 rounded-lg" />
// //     </div>
// //   );
// // }


import { useNavigate } from "react-router-dom";

import bgVideo from "../../assets/bg.avif";
import chip from "../../assets/chips.png";
import nodes from "../../assets/diamond.png";
import spark from "../../assets/crystal.png";
import Box from "../../assets/box.png";

import "./styles/HeroSection.css";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen border-b-4 border-cyan-400 bg-black overflow-hidden flex items-center justify-center text-center">
      
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 grid-box" />

      {/* FLOATING ELEMENTS */}
      <img
        src={chip}
        alt="AI Chip"
        className="absolute nodes3 right-20 bottom-20 w-15"
      />

      <img
        src={chip}
        alt="AI Chip"
        className="absolute nodes3 left-20 bottom-25 w-15"
      />

      <img
        src={Box}
        alt="Box"
        className="absolute nodes4 left-20 top-20 w-20"
      />

      <img
        src={Box}
        alt="Box"
        className="absolute nodes5 right-20 top-20 w-20"
      />

      <img
        src={nodes}
        alt="Nodes"
        className="nodes1 absolute right-130 bottom-60 w-15"
      />

      <img
        src={nodes}
        alt="Nodes"
        className="nodes2 absolute right-80 bottom-70 w-12"
      />

      <div className="absolute left-1/4 bottom-60">
        <h1 className="line h-0.5 flex justify-center items-center w-30 child rotate-30 bg-pink-700">
          <span className="inside"></span>
          <span className="inside inanimate absolute"></span>
        </h1>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl px-6">
        <div className="inline-flex items-center bg-cyan-400 gap-2 border-2 border-white px-4 py-2 mb-6 text-sm tracking-widest">
          <span
            style={{ fontSize: "10px" }}
            className="text-white header"
          >
            ⚡ AI AUTOMATION FOR EVERY INDUSTRY
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl header font-extrabold text-cyan-400 tracking-widest mb-4">
          WYN <span className="animate-pulse">AI</span>
        </h1>

        <p className="header text-sm md:text-md text-white mb-4">
          Ready-to-Use AI Products
        </p>

        <p className="text-gray-400 mb-8">
          No complex setup. No technical knowledge required.
          <br />
          Just activate and run.
        </p>

        <button
          onClick={() => navigate("/industry")}
          className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 text-lg hover:bg-cyan-400 hover:text-black transition"
        >
          ▶ Choose Your Industry
        </button>
      </div>
    </section>
  );
}
