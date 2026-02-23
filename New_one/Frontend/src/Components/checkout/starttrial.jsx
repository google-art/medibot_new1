import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";

export default function StartTrial() {
  const navigate = useNavigate();
  const location = useLocation();
  const [agreed, setAgreed] = useState(false);

  // ✅ Dynamic product data from navigation
  const {
    productName = "AutoBook",
    productDesc = "Smart AI Booking Assistant",
    price = 49,
  } = location.state || {};

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">

      {/* ================= HEADER ================= */}
      <section className="text-center mb-12 mt-24">
        <h1 className="text-3xl font-bold mb-2">
          <span className="font-mono tracking-widest">WYN</span>{" "}
          <span className="text-cyan-500 font-mono tracking-widest">AI</span>
        </h1>
        <h2 className="text-2xl font-semibold">Complete Your Order</h2>
        <p className="text-gray-500 mt-1">
          Start your 14-day free trial today
        </p>
      </section>

      {/* ================= MAIN ================= */}
      <section className="max-w-6xl mx-auto w-full px-6 flex flex-col lg:flex-row gap-10">

        {/* ================= ORDER SUMMARY ================= */}
        <div className="w-full lg:w-1/3 border-2 border-black p-6 h-fit">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            🛒 Order Summary
          </h3>

          <div className="border p-4 mb-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-xl">📦</div>
              <div>
                <p className="font-semibold">{productName}</p>
                <p className="text-sm text-gray-500">
                  {productDesc}
                </p>
              </div>
            </div>

            <div className="border border-green-500 bg-green-50 text-green-700 text-sm px-3 py-2 mb-3">
              ✓ 14-Day Free Trial <br />
              <span className="text-xs">
                No charges until trial ends
              </span>
            </div>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Trial Period</span>
                <span>14 days</span>
              </div>
              <div className="flex justify-between">
                <span>Today's Charge</span>
                <span className="text-green-600 font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>After Trial</span>
                <span>${price}/mo</span>
              </div>
            </div>
          </div>

          <div className="border border-blue-500 bg-blue-50 text-blue-700 text-xs p-3">
            You can cancel anytime during your trial period.
            No charges will be made.
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="w-full lg:w-2/3 border-2 border-black p-8">
          <form className="space-y-8">

            {/* ACCOUNT INFO */}
            <div>
              <h3 className="font-bold mb-4">Account Information</h3>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-black px-4 py-2 mb-3"
              />

              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-black px-4 py-2"
              />
            </div>

            {/* PAYMENT INFO */}
            <div>
              <h3 className="font-bold mb-4">Payment Information</h3>

              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full border border-black px-4 py-2 mb-3"
              />

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 border border-black px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="123"
                  className="w-1/2 border border-black px-4 py-2"
                />
              </div>
            </div>

            {/* BILLING */}
            <div>
              <h3 className="font-bold mb-4">Billing Address</h3>

              <input
                type="text"
                placeholder="123 Main Street"
                className="w-full border border-black px-4 py-2 mb-3"
              />

              <div className="flex gap-4 mb-3">
                <input
                  type="text"
                  placeholder="New York"
                  className="w-1/2 border border-black px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="10001"
                  className="w-1/2 border border-black px-4 py-2"
                />
              </div>

              <input
                type="text"
                placeholder="United States"
                className="w-full border border-black px-4 py-2"
              />
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <p>
                I agree to the{" "}
                <span className="text-cyan-500 underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-cyan-500 underline cursor-pointer">
                  Privacy Policy
                </span>
                . I understand I will be charged ${price}/month after my
                14-day free trial unless I cancel.
              </p>
            </div>

            {/* SUBMIT */}
            <button
              disabled={!agreed}
              className={`w-full border-2 border-black py-4 font-semibold
                ${
                  agreed
                    ? "bg-white hover:bg-cyan-50"
                    : "bg-gray-100 cursor-not-allowed"
                }
              `}
            >
              ✓ Start 14-Day Free Trial
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock size={14} />
              Secure Checkout · 256-bit SSL Encryption
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
