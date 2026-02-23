import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DrivingWorkable from "./DrivingWorkable";

export default function DrivingPage() {
  const navigate = useNavigate();
  const demoRef = useRef(null);

  const handleScrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-black">

      {/* ================= HERO ================= */}
      <section className="px-10 py-20 bg-gradient-to-r from-black via-slate-900 to-black text-white">
        
        {/* ===== Breadcrumb Navigation ===== */}
        <p className="text-cyan-400 mb-4 flex gap-2 text-sm">
          <span
            onClick={() => navigate("/#industry")}
            className="cursor-pointer hover:underline"
          >
            Home
          </span>
          /
          <span
            onClick={() => navigate("/driving")}
            className="cursor-pointer hover:underline"
          >
            Driving Schools
          </span>
          /
          <span
            onClick={() => navigate("/drivingpage")}
            className="font-semibold"
          >
            AutoBook
          </span>
        </p>

        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">
            AutoBook
            <span className="ml-3 text-sm bg-green-500 text-black px-3 py-1 rounded-full">
              LIVE
            </span>
          </h1>

          <p className="text-gray-300 mb-6">
            AutoBook is an AI-powered booking chatbot that handles student inquiries,
            schedules classes, and manages payments automatically.
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl text-cyan-400 font-bold">$49</span>
            <span className="text-gray-400">/month</span>
            <span className="bg-green-500 text-black px-3 py-1 rounded text-sm">
              ✓ 14-day FREE trial
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="border border-white px-6 py-3 hover:bg-white hover:text-black transition"
            >
              🛒 Start 14-Day Free Trial
            </button>

            <button
              onClick={handleScrollToDemo}
              className="border border-cyan-400 bg-cyan-400 text-black px-6 py-3 hover:opacity-90 transition"
            >
              ▶ Try Interactive Demo
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHAT IT DOES ================= */}
      <section className="bg-white px-10 py-10 ms-10">
        <h2 className="text-3xl font-bold mb-10">✔ What It Does</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            "Answers booking-related questions 24/7",
            "Schedules driving classes automatically",
            "Syncs with Google Calendar",
            "Handles online payments",
          ].map((item) => (
            <div
              key={item}
              className="border-l-4 border-cyan-400 bg-gray-50 p-5"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= KEY BENEFITS ================= */}
      <section className="bg-white px-10 py-8 ms-10">
        <h2 className="text-3xl font-bold mb-10">✨ Key Benefits</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
          {[
            "No manual scheduling calls",
            "Fewer missed bookings",
            "Faster confirmations",
          ].map((benefit) => (
            <div
              key={benefit}
              className="border border-gray-200 rounded-xl p-6 text-center"
            >
              {benefit}
            </div>
          ))}
        </div>
      </section>

      {/* ================= PERFECT FOR ================= */}
      <section className="bg-white px-10 py-10 ms-10">
        <h2 className="text-3xl font-bold mb-10">👥 Perfect For</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <div className="border border-gray-200 rounded-xl p-8">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-2">
              Driving School Owners
            </h3>
            <p className="text-gray-600">
              Automate student inquiries, bookings, and payments without hiring extra staff.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-8">
            <div className="text-4xl mb-4">🧑‍💼</div>
            <h3 className="text-xl font-semibold mb-2">
              Admin & Operations Teams
            </h3>
            <p className="text-gray-600">
              Reduce manual work, eliminate scheduling errors, and manage everything in one place.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LIVE DEMO ================= */}
      <div ref={demoRef}>
        <DrivingWorkable />
      </div>

      {/* ================= CTA ================= */}
      <section className="relative bg-gradient-to-br from-black via-slate-900 to-black text-white">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400" />

        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
            Ready to Get Started?
          </h2>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
            Join businesses saving hours every week with AI automation
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="bg-cyan-400 text-black px-10 py-4 font-semibold border-2 border-cyan-400 hover:bg-cyan-300 transition"
          >
            ▶ Get Started Now
          </button>
        </div>
      </section>

    </div>
  );
}
