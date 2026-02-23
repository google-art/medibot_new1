// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  // Close dropdown on outside click + ESC
  useEffect(() => {
    const onClick = (e) => {
      if (
        open &&
        !btnRef.current?.contains(e.target) &&
        !panelRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);

    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const groups = useMemo(
    () => [
      {
        title: "MARKETING",
        color: "text-[#F0B100]",
        items: [
          {
            name: "AutoPost AI",
            desc: "AI social media post generator",
            route: "/autopost",
            icon: "✨",
          },
          {
            name: "Slogan AI",
            desc: "Catchy brand slogans instantly",
            route: "/slogan",
            icon: "✍️",
          },
          {
            name: "LeadFlow AI",
            desc: "Conversational lead workflow",
            route: "/leadworkflow",
            icon: "💬",
          },
        ],
      },
      {
        title: "INDUSTRY",
        color: "text-[#00B8DB]",
        items: [
          {
            name: "ClinNote AI",
            desc: "Voice-to-text clinical notes",
            route: "/voicetotext",
            icon: "🎙️",
          },
          {
            name: "Salon Booking",
            desc: "Instant salon appointment booking",
            route: "/saloon",
            icon: "✂️",
          },

          // ✅ NEW: Main Doctor Panel
          {
            name: "Doctor Panel",
            desc: "Dashboard, patients, billing & vitals",
            route: "/maindoctor", // change if your base route differs
            icon: "🩺",
            
          },
        ],
      },
      {
        title: "FINANCE & DOCS",
        color: "text-white/70",
        items: [
          {
            name: "Invoice AI",
            desc: "Smart invoice generation",
            route: "/invoice",
            icon: "🧾",
          },
          {
            name: "DocGen AI",
            desc: "Professional document creator",
            route: "/document",
            icon: "📄",
          },
          {
            name: "Tech Stack AI",
            desc: "Find the perfect tech stack",
            route: "/techstack",
            icon: "🧱",
          },
        ],
      },
    ],
    []
  );

  return (
    <nav className="bg-black border-b border-cyan-400 px-6 py-4 flex justify-between items-center relative z-50">
      {/* LEFT */}
      <div className="flex items-center gap-6 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <div className="bg-cyan-400 text-black font-bold px-2 py-1">W</div>
          <span className="text-cyan-400 font-semibold">WYN_AI</span>
        </Link>

        {/* Products button */}
        <button
          ref={btnRef}
          onClick={() => setOpen((v) => !v)}
          className="flex ps-10 items-center gap-1 text-cyan-400 font-semibold"
          type="button"
        >
          PRODUCTS {open ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {/* Dropdown */}
        {open && (
          <div
            ref={panelRef}
            className="absolute top-[56px] left-0 w-[980px] max-w-[92vw] rounded-2xl overflow-hidden border border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.75)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,12,18,0.98) 0%, rgba(5,8,12,0.98) 100%)",
            }}
          >
            <div
              className="h-[3px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,184,219,0.9), rgba(240,177,0,0.85))",
              }}
            />

            <div className="px-7 py-6 border-b border-white/10">
              <h3 className="text-white text-xl font-extrabold">
                All AI Products
              </h3>
              <p className="text-white/55 text-sm">Choose a product to continue</p>
            </div>

            <div className="px-7 py-7 grid grid-cols-1 md:grid-cols-3 gap-7">
              {groups.map((g) => (
                <div key={g.title}>
                  <div className={`text-sm font-extrabold ${g.color}`}>
                    {g.title}
                  </div>

                  <div className="mt-4 space-y-4">
                    {g.items.map((it) => {
                      const active = location.pathname === it.route;
                      const hasChildren = Array.isArray(it.children) && it.children.length > 0;

                      return (
                        <div key={it.name}>
                          {/* Parent link */}
                          <Link
                            to={it.route}
                            onClick={() => setOpen(false)}
                            className={[
                              "block w-full text-left p-4 rounded-xl border transition",
                              active
                                ? "border-cyan-400/70 bg-[#101A24]"
                                : "border-white/10 bg-[#0C131B] hover:bg-[#101A24] hover:border-cyan-400/40",
                            ].join(" ")}
                          >
                            <div className="flex gap-3 items-start">
                              <div className="h-10 w-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center">
                                {it.icon}
                              </div>
                              <div>
                                <div className="text-white font-bold">{it.name}</div>
                                <div className="text-white/50 text-sm">{it.desc}</div>
                              </div>
                            </div>
                          </Link>

                          {/* Children (Doctor panel routes) */}
                          {hasChildren && (
                            <div className="mt-2 ml-4 pl-3 border-l border-white/10 space-y-2">
                              {it.children.map((ch) => {
                                const childActive = location.pathname === ch.route;
                                return (
                                  <Link
                                    key={ch.route}
                                    to={ch.route}
                                    onClick={() => setOpen(false)}
                                    className={[
                                      "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition",
                                      childActive
                                        ? "border-cyan-400/60 bg-[#101A24] text-white"
                                        : "border-white/10 bg-[#0B1118] text-white/70 hover:text-white hover:bg-[#101A24] hover:border-cyan-400/30",
                                    ].join(" ")}
                                  >
                                    <span className="w-5 text-center">{ch.icon}</span>
                                    <span className="font-semibold">{ch.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-7 py-4 border-t border-white/10 text-xs text-white/40">
              Tip: Press <span className="text-white/70 font-semibold">ESC</span>{" "}
              to close
            </div>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <Link
        to="/login"
        className="border border-cyan-400 text-cyan-400 px-4 py-2 hover:bg-cyan-400 hover:text-black transition rounded-sm font-semibold"
      >
        → Login
      </Link>
    </nav>
  );
}
