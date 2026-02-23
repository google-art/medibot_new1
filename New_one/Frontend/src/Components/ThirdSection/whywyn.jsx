// // import { useEffect, useRef, useState } from "react";
// // import { Zap, Target, Rocket } from "lucide-react";

// // export default function WhyWyn() {
// //   const sectionRef = useRef(null);
// //   const [visible, setVisible] = useState(false);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           setVisible(true);
// //           observer.disconnect();
// //         }
// //       },
// //       { threshold: 0.25 }
// //     );

// //     if (sectionRef.current) observer.observe(sectionRef.current);
// //     return () => observer.disconnect();
// //   }, []);

// //   return (
// //     <section
// //       ref={sectionRef}
// //       className="bg-black text-white py-10 overflow-hidden"
// //     >
// //       <div className="max-w-7xl mx-auto px-3 text-center">

// //         {/* BADGE */}
// //         <div
// //   className={`inline-block bg-cyan-400 text-black border-2 border-white
// //   px-6 py-1 text-xs font-semibold tracking-wide mb-6
// //   transition-all duration-500 ease-out
// //   ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
// // >
// //   WHY WYN AI
// // </div>



// //         {/* HEADING */}
// //         <h2
// //           className={`text-4xl md:text-5xl font-light text-cyan-400 mb-10
// //           transition-all duration-700
// //           ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
// //         >
// //           Built for Simplicity
// //         </h2>

// //         {/* GRID */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

// //           {/* LEFT CARD */}
// //           <div
// //             className={`bg-cyan-500 text-black p-10 text-left md:ml-6
// //             transition-all duration-600
// //             [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
// //             ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"}`}
// //           >
// //             <Zap size={32} className="mb-6" />
// //             <h3 className="text-xl font-bold mb-3">Instant Setup</h3>
// //             <p className="text-sm leading-relaxed">
// //               No coding required. Get up and running in minutes with our
// //               pre-built AI solutions.
// //             </p>
// //           </div>

// //           {/* CENTER CARD */}
// //           <div
// //             className={`max-w-sm mx-auto text-left md:ml-6
// //             transition-all duration-600 delay-150
// //             [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
// //             ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
// //           >
// //             <Target size={28} className="mb-4 text-white" />

// //             <span className="inline-block  text-white px-3 py-1 text-lg font-semibold mb-4">
// //               Industry-Specific
// //             </span>

// //             <p className="text-sm text-gray-300 leading-relaxed">
// //               Tools designed specifically for your industry's unique
// //               needs and workflows.
// //             </p>
// //           </div>

// //           {/* RIGHT CARD */}
// //           <div
// //             className={`bg-yellow-400 text-black p-10 text-left md:ml-6
// //             transition-all duration-600 delay-300
// //             [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
// //             ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"}`}
// //           >
// //             <Rocket size={32} className="mb-6" />
// //             <h3 className="text-xl font-bold mb-3">Always Improving</h3>
// //             <p className="text-sm leading-relaxed">
// //               Regular updates with new features and tools based on
// //               your feedback.
// //             </p>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
import { useEffect, useRef, useState } from "react";
import { Zap, Target, Rocket } from "lucide-react";

export default function WhyWyn() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-16 overflow-hidden"
    >
      {/* TOP DOUBLE LINE */}
<div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />

      <div className="max-w-7xl mx-auto px-3 text-center relative z-10">

        {/* BADGE */}
        <div
          className={`inline-block bg-cyan-400 text-black border-2 border-white
          px-6 py-1 text-xs font-semibold tracking-wide mb-6
          transition-all duration-500 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          WHY WYN AI
        </div>

        {/* HEADING */}
        <h2
          className={`text-4xl md:text-5xl font-light text-cyan-400 mb-14
          transition-all duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Built for Simplicity
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

          {/* LEFT CARD */}
          <div
            className={`bg-cyan-500 text-black p-10 text-left
            transition-all duration-600
            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"}`}
          >
            <Zap size={32} className="mb-6" />
            <h3 className="text-xl font-bold mb-3">Instant Setup</h3>
            <p className="text-sm leading-relaxed">
              No coding required. Get up and running in minutes with our
              pre-built AI solutions.
            </p>
          </div>

          {/* CENTER CARD */}
          <div
            className={`max-w-sm mx-auto text-left
            transition-all duration-600 delay-150
            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Target size={28} className="mb-4 text-white" />

            <span className="inline-block text-white text-lg font-semibold mb-4">
              Industry-Specific
            </span>

            <p className="text-sm text-gray-300 leading-relaxed">
              Tools designed specifically for your industry's unique
              needs and workflows.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div
            className={`bg-yellow-400 text-black p-10 text-left
            transition-all duration-600 delay-300
            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"}`}
          >
            <Rocket size={32} className="mb-6" />
            <h3 className="text-xl font-bold mb-3">Always Improving</h3>
            <p className="text-sm leading-relaxed">
              Regular updates with new features and tools based on
              your feedback.
            </p>
          </div>

        </div>
      </div>

      {/* BOTTOM DOUBLE LINE */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400" />
 
    </section>
  );
}


