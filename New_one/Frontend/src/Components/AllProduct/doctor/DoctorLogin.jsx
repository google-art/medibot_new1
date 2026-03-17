// 10/03/2026  - Create and Work By Prathibha 


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);

  // URL to fetch credentials from
  const CREDENTIALS_URL = "https://dharinisrisubramanian.n8n-wsk.com/webhook/Get_login_details";

  // Fetch credentials from URL on component mount
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        // Add timeout to fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(CREDENTIALS_URL, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const data = await response.json();
        console.log("Fetched credentials:", data);
        setCredentials(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching credentials:", err);
        // Use default credentials if fetch fails
        const defaultCredentials = {
          "email": "doctor@wyn.ai",
          "password": "doctor123"
        };
        console.log("Using default credentials due to fetch error");
        setCredentials(defaultCredentials);
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!credentials) {
      setError("Credentials not loaded yet");
      return;
    }

    console.log("Entered email:", email); // Debug
    console.log("Entered password:", password); // Debug
    console.log("Expected email:", credentials.email); // Debug
    console.log("Expected password:", credentials.password); // Debug

    if (email === credentials.email && password === credentials.password) {
      // Store login status
      localStorage.setItem("doctorLoggedIn", "true");
      // Navigate to dashboard
      navigate("/maindoctor/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FEFCE8" }}>
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FEFCE8" }}>
      {/* Login Card */}
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#00B8DB] to-[#F0B100] mb-4 border-2 border-black">
              <span className="text-4xl">🩺</span>
            </div>
            <h1 className="text-3xl font-extrabold text-black mb-2">Doctor Panel</h1>
            <p className="text-gray-600 text-sm">Your clinic command center - AI-powered insights at a glance</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8DB] transition bg-white text-black placeholder-gray-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the password"
                required
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8DB] transition bg-white text-black placeholder-gray-400"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                <p className="text-red-600 text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00B8DB] to-[#00A0C6] text-white font-bold rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              → Login
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Powered by <span className="font-bold text-[#00B8DB]">WYN.AI</span>
        </p>
      </div>
    </div>
  );
}
