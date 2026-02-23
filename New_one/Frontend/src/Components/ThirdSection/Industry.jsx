import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Heart,
  Coffee,
  Scissors,
  ShoppingCart,
  Users,
  BarChart3,
  Scale,
  Laptop,
  Briefcase,
  Home,
  GraduationCap,
} from "lucide-react";

/* =========================
   INDUSTRY DATA (WITH ROUTES)
   ========================= */
const industries = [
  { icon: Car, title: "Driving Schools", tools: "3 TOOLS", live: "3 LIVE", route: "/driving" },
  { icon: Heart, title: "Medical Practices", tools: "3 TOOLS", live: "2 LIVE", route: "/MedicalProduct" },
  { icon: Coffee, title: "Restaurants", tools: "3 TOOLS", live: "1 LIVE", route: "/restaurants" },
  { icon: Scissors, title: "Salons", tools: "3 TOOLS", live: "2 LIVE", route: "/salonProduct" },

  { icon: ShoppingCart, title: "Retail Stores", tools: "2 TOOLS", route: "/retail" },
  { icon: Users, title: "HR & Talent Agencies", tools: "2 TOOLS", route: "/hr" },
  { icon: BarChart3, title: "Marketing Agencies", tools: "4 TOOLS", live: "2 LIVE", route: "/marketing" },
  { icon: Scale, title: "Admin & Legal", tools: "2 TOOLS", route: "/admin" },

  { icon: Laptop, title: "IT / Web Agencies", tools: "2 TOOLS", route: "/it" },
  { icon: Briefcase, title: "Solopreneurs", tools: "2 TOOLS", route: "/solopreneurs" },
  { icon: Home, title: "Real Estate Agents", tools: "2 TOOLS", route: "/real-estate" },
  { icon: GraduationCap, title: "EdTech Providers", tools: "2 TOOLS", route: "/edtech" },
];

/* =========================
   SPLIT INTO ROWS OF 4
   ========================= */
const rows = [];
for (let i = 0; i < industries.length; i += 4) {
  rows.push(industries.slice(i, i + 4));
}

/* =========================
   COMPONENT
   ========================= */
export default function Industry() {
  const navigate = useNavigate();
  const rowRefs = useRef([]);
  const [visibleRows, setVisibleRows] = useState([]);

  /* =========================
     SCROLL ANIMATION
     ========================= */
  useEffect(() => {
    rowRefs.current.forEach((row, index) => {
      if (!row) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleRows((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
            observer.disconnect();
          }
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -120px 0px",
        }
      );

      observer.observe(row);
    });
  }, []);

  /* =========================
     CLICK HANDLER
     ========================= */
  const handleIndustryClick = (route) => {
    if (route) navigate(route);
  };

  /* =========================
     RENDER
     ========================= */
  return (
    <section id="industry" className="py-20 font-inter scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block border-2 border-black px-5 py-1 text-sm font-semibold mb-4">
          SELECT YOUR INDUSTRY
        </div>

        <h2 className="text-4xl font-extrabold mb-2">
          Built for <span className="text-cyan-500">Your Business</span>
        </h2>

        <p className="text-gray-600 mb-12">
          Industry-specific AI tools designed to solve your unique challenges
        </p>

        <div className="space-y-14">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
                transition-all duration-500
                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
                ${
                  visibleRows.includes(rowIndex)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
            >
              {row.map((item, index) => {
                const Icon = item.icon;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleIndustryClick(item.route)}
                    className="
                      border-2 border-black bg-white p-7 text-center
                      transition-all duration-300
                      hover:bg-cyan-50 hover:border-cyan-500
                      active:scale-[0.98]
                      touch-manipulation
                    "
                  >
                    <Icon size={34} className="mx-auto mb-3 text-black" />

                    <h3 className="font-semibold text-base mb-3">
                      {item.title}
                    </h3>

                    <div className="flex justify-center gap-2 text-xs font-semibold">
                      <span className="bg-black text-white px-3 py-1">
                        {item.tools}
                      </span>

                      {item.live && (
                        <span className="bg-black text-white px-3 py-1">
                          {item.live}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
