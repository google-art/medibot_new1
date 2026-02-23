import { useEffect, useRef, useState } from "react";

const Browse = () => {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);

          // Button comes AFTER section animation
          setTimeout(() => {
            setButtonVisible(true);
          }, 300);

          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const section = document.getElementById("industry");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`
        relative flex min-h-[60vh] items-center justify-center bg-white overflow-hidden
        transform-gpu will-change-transform
        transition-all duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          sectionVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-24"
        }
      `}
    >
      {/* Decorative dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 h-2 w-2 rounded-full bg-cyan-400 opacity-70" />
        <div className="absolute top-24 right-32 h-3 w-3 rounded-full bg-cyan-300 opacity-60" />
        <div className="absolute bottom-20 left-40 h-2 w-2 rounded-full bg-sky-400 opacity-60" />
        <div className="absolute bottom-32 right-20 h-2 w-2 rounded-full bg-cyan-500 opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-black">
          Ready to{" "}
          <span className="text-cyan-500">Get Started?</span>
        </h2>

        <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
          Choose your industry above and explore our AI tools built
          specifically for your business.
        </p>

        {/* BUTTON – delayed animation */}
        <div
          className={`
            transition-all duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              buttonVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }
          `}
        >
          <button
            onClick={handleScroll}
            className="mt-5 inline-flex items-center gap-2
                       bg-cyan-500 px-8 py-4 text-lg font-semibold
                       text-black border-4 border-black
                       hover:bg-cyan-400 transition-colors duration-200"
          >
            ▶ Browse Industries
          </button>
        </div>
      </div>
    </section>
  );
};

export default Browse;
