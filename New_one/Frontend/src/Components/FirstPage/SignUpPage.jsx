// src/pages/Signup.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // later you can add signup API logic here
    navigate("/dashboard"); // ✅ go to home
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-2">WYN AI</h1>
      <h2 className="text-2xl font-semibold mb-1">Create Your Account</h2>
      <p className="text-gray-600 mb-6">
        Start your AI automation journey today
      </p>

      <form
        onSubmit={handleSignup}
        className="bg-white border-2 border-black p-8 w-[450px]"
      >
        <label className="block mb-2 font-semibold">Full Name</label>
        <input
          type="text"
          required
          placeholder="John Doe"
          className="w-full border-2 border-black px-3 py-2 mb-4"
        />

        <label className="block mb-2 font-semibold">Email Address</label>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="w-full border-2 border-black px-3 py-2 mb-4"
        />

        <label className="block mb-2 font-semibold">
          Company Name <span className="text-gray-500">(Optional)</span>
        </label>
        <input
          type="text"
          placeholder="Your Company Inc."
          className="w-full border-2 border-black px-3 py-2 mb-4"
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          required
          placeholder="••••••••"
          className="w-full border-2 border-black px-3 py-2 mb-4"
        />

        <label className="block mb-2 font-semibold">Confirm Password</label>
        <input
          type="password"
          required
          placeholder="••••••••"
          className="w-full border-2 border-black px-3 py-2 mb-4"
        />

        <label className="flex items-center gap-2 mb-4 text-sm">
          <input type="checkbox" required />
          I agree to the{" "}
          <span className="text-cyan-500">Terms of Service</span> and{" "}
          <span className="text-cyan-500">Privacy Policy</span>
        </label>

        <button
          type="submit"
          className="w-full border-2 border-black py-3 font-semibold mb-4 hover:bg-gray-100 transition"
        >
          👤+ Create Account
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-500 font-semibold">
            Sign in
          </Link>
        </p>
      </form>

      <Link to="/" className="mt-6 text-gray-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
