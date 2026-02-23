import { useNavigate } from "react-router-dom";
import { CheckCircle, Mic } from "lucide-react";
import { useRef } from "react";
import MedicalWorkable from "./MedicalWorkable";

export default function MedicalPage() {
  const navigate = useNavigate();
  const demoRef = useRef(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="bg-white text-black">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400" />

        <div className="max-w-7xl mx-auto px-10 py-10">
          <p className="text-cyan-400 mb-6">
            Home / Medical Practices / NoteWhisper
          </p>

          <div className="flex items-center gap-4 mb-6">
            <Mic size={36} className="text-cyan-400" />
            <h1 className="text-5xl font-bold text-cyan-400">
              NoteWhisper
            </h1>
            <span className="bg-green-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
              ● LIVE
            </span>
          </div>

          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Convert voice notes into structured medical documentation instantly.
          </p>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-5xl font-bold text-cyan-400">$49</span>
            <span className="text-xl text-gray-400">/month</span>
            <span className="bg-green-500 text-black px-4 py-1 rounded text-sm font-semibold">
              ✓ 14-day FREE trial
            </span>
          </div>

          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => navigate("/signup")}
              className="border-2 border-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-black transition"
            >
              🛒 Start 14-Day Free Trial
            </button>

            <button
              onClick={scrollToDemo}
              className="bg-cyan-400 text-black px-8 py-4 text-lg font-semibold hover:bg-cyan-300 transition"
            >
              ▶ Try Interactive Demo
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHAT IT DOES ================= */}
      <section className="max-w-7xl mx-auto px-10 py-10">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
          <CheckCircle className="text-cyan-400" size={32} />
          What It Does
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            "Transcribes voice to text in real-time",
            "Structures notes for medical records",
            "Supports medical terminology",
            "Integrates with EMR systems",
          ].map((item) => (
            <div
              key={item}
              className="border-l-4 border-cyan-400 bg-gray-50 p-6 text-lg"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= KEY BENEFITS ================= */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-10">
          <h2 className="text-4xl font-bold mb-12">✨ Key Benefits</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Faster documentation",
              "More time with patients",
              "Reduced typing fatigue",
            ].map((benefit) => (
              <div
                key={benefit}
                className="bg-white border border-gray-200 rounded-xl p-10 text-center text-lg font-semibold shadow-sm"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PERFECT FOR ================= */}
      <section className="max-w-7xl mx-auto px-10 py-10">
        <h2 className="text-4xl font-bold mb-12">👥 Perfect For</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-10">
            <div className="text-4xl mb-6">🧑‍⚕️</div>
            <h3 className="text-2xl font-bold mb-4">Doctors</h3>
            <p className="text-gray-600 text-lg">
              Capture patient notes effortlessly during consultations.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-10">
            <div className="text-4xl mb-6">👩‍⚕️</div>
            <h3 className="text-2xl font-bold mb-4">
              Nurses & Medical Staff
            </h3>
            <p className="text-gray-600 text-lg">
              Reduce typing workload and maintain accurate records.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LIVE DEMO ================= */}
      <MedicalWorkable demoRef={demoRef} />

      {/* ================= FINAL CTA (FULLY RESTORED) ================= */}
      <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400" />

        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="text-6xl mb-6">🎤</div>

          <h2 className="text-5xl font-bold text-cyan-400 mb-6">
            Ready to Get Started?
          </h2>

          <p className="text-xl text-gray-300 mb-12">
            Join businesses saving hours every week with AI automation
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => navigate("/signup")}
              className="bg-cyan-400 text-black px-12 py-5 font-semibold text-lg hover:bg-cyan-300 transition"
            >
              ▶ Get Started Now
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-12 py-5 font-semibold text-lg border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
