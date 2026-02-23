// import { useEffect, useRef, useState } from "react";

// export default function UniversalTools({ onSelect }) {
//   const tools = [
//     { icon: "🎯", label: "Lead Scraping & Enrichment", id: "lead-scraping" },
//     { icon: "📊", label: "Automatic Social Media Content", id: "automatic-social" },
//     { icon: "🔄", label: "Unified Lead Intake & CRM Sync", id: "unified-leads" },
//     { icon: "⭐", label: "Review & Reputation Management", id: "review-reputation" },
//     { icon: "✉️", label: "AI Auto-Reply & Follow-Up", id: "ai-auto-reply" },
//   ];

//   const sectionRef = useRef(null);
//   const [showText, setShowText] = useState(false);

//   // ✅ Default selected tool (Lead Scraping)
//   const [activeTool, setActiveTool] = useState(tools[0].id);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShowText(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.3 }
//     );

//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // ✅ Auto-scroll to Lead Scraping on first load
//   useEffect(() => {
//     const defaultSection = document.getElementById("lead-scraping");
//     if (defaultSection) {
//       defaultSection.scrollIntoView({ behavior: "smooth" });
//     }
//     onSelect?.("Lead Scraping & Enrichment");
//   }, []);

//   const handleClick = (tool) => {
//     setActiveTool(tool.id);
//     onSelect?.(tool.label);

//     const section = document.getElementById(tool.id);
//     if (section) section.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section ref={sectionRef} className="text-center mt-12 font-inter">

//       {/* Badge */}
//       <div
//         className={`inline-block border-2 border-black px-4 py-1 text-sm font-semibold mb-6
//         transition-all duration-700
//         ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
//       >
//         🔥 UNIVERSAL AI TOOLS
//       </div>

//       {/* Heading */}
//       <h1
//         className={`text-[42px] font-extrabold
//         transition-all duration-700 delay-150
//         ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
//       >
//         Works for Every Business
//       </h1>

//       {/* Subheading */}
//       <p
//         className={`text-gray-600 mt-3 mb-7
//         transition-all duration-700 delay-300
//         ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
//       >
//         Essential AI tools that work across all industries. Try them live below!
//       </p>

//       {/* TOOLS */}
//       <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
//         {tools.map((tool) => {
//           const isActive = activeTool === tool.id;

//           return (
//             <button
//               key={tool.id}
//               onClick={() => handleClick(tool)}
//               className={`
//                 border-4 px-6 py-3 text-sm font-semibold
//                 whitespace-nowrap flex items-center gap-2
//                 transition-all duration-300
//                 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
//                 hover:scale-105 active:scale-95
//                 ${
//                   isActive
//                     ? "border-cyan-400 bg-cyan-50 scale-105 shadow-lg"
//                     : "border-black bg-white"
//                 }
//               `}
//             >
//               <span className="text-lg">{tool.icon}</span>
//               <span>{tool.label}</span>
//             </button>
//           );
//         })}
//       </div>
//     </section>
//   );
// }



import { useEffect, useRef, useState } from "react";

export default function UniversalTools({ onSelect }) {
  const tools = [
    {
      icon: "🎯",
      label: "Lead Scraping & Enrichment",
      id: "lead-scraping",
    },
    {
      icon: "📊",
      label: "Automatic Social Media Content",
      id: "automatic-social",
    },
    {
      icon: "📄",
      label: "Auto Document",
      id: "auto-document",
    },
    {
      icon: "💳",
      label: "AI Invoicing & Payment",
      id: "ai-invoicing",
    },
    {
      icon: "📅",
      label: "Appointment Scheduling",
      id: "appointment-scheduling",
    },
    {
      icon: "✉️",
      label: "AI Auto-Reply & Follow-Up",
      id: "ai-auto-reply",
    },
  ];

  const sectionRef = useRef(null);
  const [showText, setShowText] = useState(false);

  // Default selected tool
  const [activeTool, setActiveTool] = useState(tools[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowText(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto select first tool
  useEffect(() => {
    onSelect?.(tools[0].label);
  }, []);

  const handleClick = (tool) => {
    setActiveTool(tool.id);
    onSelect?.(tool.label);

    const section = document.getElementById(tool.id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="text-center mt-12 font-inter">
      {/* Badge */}
      <div
        className={`inline-block border-2 border-black px-4 py-1 text-sm font-semibold mb-6
        transition-all duration-700
        ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        🔥 UNIVERSAL AI TOOLS
      </div>

      {/* Heading */}
      <h1
        className={`text-[42px] font-extrabold
        transition-all duration-700 delay-150
        ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        Works for Every Business
      </h1>

      {/* Subheading */}
      <p
        className={`text-gray-600 mt-3 mb-7
        transition-all duration-700 delay-300
        ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        Essential AI tools that work across all industries. Try them live below!
      </p>

      {/* TOOLS */}
      <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => handleClick(tool)}
              className={`
                border-4 px-6 py-3 text-sm font-semibold
                whitespace-nowrap flex items-center gap-2
                transition-all duration-300
                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
                hover:scale-105 active:scale-95
                ${
                  isActive
                    ? "border-cyan-400 bg-cyan-50 scale-105 shadow-lg"
                    : "border-black bg-white"
                }
              `}
            >
              <span className="text-lg">{tool.icon}</span>
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
