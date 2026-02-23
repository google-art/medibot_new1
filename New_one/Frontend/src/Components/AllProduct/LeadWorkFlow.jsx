import { useState, useEffect } from "react";

const TOTAL_STEPS = 5;

export default function LeadFlow() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [data, setData] = useState({
    role: "",
    business: "",
    website: "",
    email: "",
    phone: ""
  });
  
  const [underscoreVisible, setUnderscoreVisible] = useState(true);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const toggle = (item) => {
    setServices((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  };

  const handleRoleSelect = (role) => {
    setData({ ...data, role });
    setTimeout(next, 300);
  };

  // Underscore blinking animation
  useEffect(() => {
    const interval = setInterval(() => {
      setUnderscoreVisible(v => !v);
    }, 500); // Blink every 500ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">

      {/* Hero Section */}
      <section className="w-full text-center px-4">
        <div className="inline-block border-2 border-gray-700 px-5 py-1.5 rounded-full mb-6 text-sm font-semibold text-gray-300 animate-pulse">
          SMART LEAD CAPTURE
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          LEAD<span className="text-cyan-400">FLOW</span>
          <span className="text-yellow-400">
            <span className={underscoreVisible ? "opacity-100" : "opacity-0"}>_</span>AI
          </span>
        </h1>

        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Conversational lead generation that converts.
          <br />
          <span className="font-semibold text-cyan-400">Ask • Qualify • Convert</span> in under 60 seconds
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-gray-900 p-3 rounded-xl border border-gray-800 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-white text-sm">⏱</span>
            </div>
            <div>
              <div className="font-bold text-sm">Under 60s</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-900 p-3 rounded-xl border border-gray-800 hover:border-green-400 transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg flex items-center justify-center animate-pulse delay-100">
              <span className="text-white text-sm">📈</span>
            </div>
            <div>
              <div className="font-bold text-sm">85% Higher</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-900 p-3 rounded-xl border border-gray-800 hover:border-purple-400 transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center animate-pulse delay-200">
              <span className="text-white text-sm">🔐</span>
            </div>
            <div>
              <div className="font-bold text-sm">GDPR Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full max-w-2xl mt-4">

        {/* Introduction Card */}
        {!started && (
          <>
            <div className="w-full bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-400 rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
                <span className="text-2xl">✨</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
                Let's find the right solution for your business
              </h2>

              <p className="text-gray-400 mb-3">
                Answer a few quick questions and receive a tailored recommendation.
              </p>

              <p className="text-yellow-400 font-semibold mb-6 animate-pulse">
                ⚡ Takes less than 60 seconds
              </p>

              <button
                onClick={() => setStarted(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black w-full py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 hover:scale-105 duration-300"
              >
                Start Now →
              </button>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-gray-500 text-sm mb-3">TRUSTED BY 500+ BUSINESSES</p>
                <div className="flex justify-center gap-6 flex-wrap">
                  {["CompanyA", "CompanyB", "CompanyC"].map((company, index) => (
                    <div 
                      key={company} 
                      className="text-center"
                    >
                      <div className="font-semibold hover:text-cyan-400 transition-colors duration-300">{company}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mt-8 w-full">
              <div className="bg-gray-900 p-6 rounded-2xl border-2 border-cyan-400 text-center hover:scale-105 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-xl">🚀</span>
                </div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">
                  3X Conversion
                </h3>
                <p className="text-gray-400 text-sm">vs traditional forms</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl border-2 border-gray-300 text-center hover:scale-105 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-xl text-black">⚡</span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Under 60s
                </h3>
                <p className="text-gray-400 text-sm">Average completion</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl border-2 border-yellow-400 text-center hover:scale-105 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-xl text-black">🤖</span>
                </div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">
                  AI-Powered
                </h3>
                <p className="text-gray-400 text-sm">Smart routing</p>
              </div>
            </div>
          </>
        )}

        {/* Funnel */}
        {started && (
          <>
            {/* Progress Bar */}
            <div className="w-full mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2 font-medium">
                <span>STEP {step} OF {TOTAL_STEPS}</span>
                <span className="text-cyan-400">{step * 20}% Complete</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${step * 20}%` }}
                />
              </div>
            </div>

            {/* Step Card */}
            <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-800 p-6 sm:p-8">

              {step > 1 && (
                <button
                  onClick={back}
                  className="mb-6 text-gray-400 hover:text-white font-medium flex items-center gap-2 transition-colors group"
                >
                  <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
                  Back
                </button>
              )}

              {/* Step 1 */}
              {step === 1 && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Which best describes you?
                  </h2>
                  <p className="text-gray-400 mb-8">Select the option that fits your role</p>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Small Business Owner", icon: "🏢" },
                      { title: "Startup Founder", icon: "🚀" },
                      { title: "Agency", icon: "🎯" },
                      { title: "Freelancer", icon: "👨‍💻" }
                    ].map(({ title, icon }) => (
                      <button
                        key={title}
                        onClick={() => handleRoleSelect(title)}
                        className="border-2 border-gray-800 p-6 rounded-xl hover:border-cyan-400 hover:bg-gray-800/50 transition-all duration-300 group"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{icon}</div>
                        <div className="font-semibold group-hover:text-cyan-400 transition-colors duration-300">
                          {title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    What are you looking for?
                  </h2>
                  <p className="text-gray-400 text-center mb-8">Select all that apply</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Website Development",
                      "Marketing Services",
                      "CRM Setup",
                      "Automation",
                      "Lead Generation",
                      "Analytics & Tracking"
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => toggle(item)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          services.includes(item)
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400 text-cyan-300"
                            : "border-gray-800 hover:border-cyan-400 hover:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm sm:text-base">{item}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            services.includes(item)
                              ? "bg-cyan-400 border-cyan-400 scale-110"
                              : "border-gray-600"
                          }`}>
                            {services.includes(item) && (
                              <span className="text-black text-xs font-bold">✓</span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={next}
                    disabled={services.length === 0}
                    className={`mt-8 w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                      services.length > 0
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-90 shadow-lg shadow-cyan-500/30 hover:scale-105"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Tell us about your business
                  </h2>
                  <p className="text-gray-400 text-center mb-8">Just the basics</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-2 font-medium">Business Name *</label>
                      <input
                        placeholder="Enter your business name"
                        className="w-full bg-gray-900 border-2 border-gray-800 rounded-lg p-3 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder:text-gray-600"
                        value={data.business}
                        onChange={(e) => setData({ ...data, business: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2 font-medium">Website (optional)</label>
                      <input
                        placeholder="https://yourwebsite.com"
                        className="w-full bg-gray-900 border-2 border-gray-800 rounded-lg p-3 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder:text-gray-600"
                        value={data.website}
                        onChange={(e) => setData({ ...data, website: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    onClick={next}
                    disabled={!data.business.trim()}
                    className={`mt-8 w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                      data.business.trim()
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-90 shadow-lg shadow-cyan-500/30 hover:scale-105"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Where should we send your plan?
                  </h2>
                  <p className="text-gray-400 text-center mb-8">Get your customized recommendation</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-2 font-medium">Email Address *</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-gray-900 border-2 border-gray-800 rounded-lg p-3 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder:text-gray-600"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2 font-medium">Phone Number (optional)</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full bg-gray-900 border-2 border-gray-800 rounded-lg p-3 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder:text-gray-600"
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                      />
                    </div>
                    
                    <p className="text-gray-500 text-sm text-center mt-6">
                      🔒 No spam—ever. Your information is secure.
                    </p>
                  </div>

                  <button
                    onClick={next}
                    disabled={!data.email.trim()}
                    className={`mt-8 w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                      data.email.trim()
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-90 shadow-lg shadow-cyan-500/30 hover:scale-105"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 5 - Confirmation */}
              {step === 5 && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30">
                    <span className="text-3xl text-black">✓</span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    Your Custom Plan Is Ready!
                  </h2>

                  <p className="text-gray-400 mb-8">
                    Here's what we built based on your answers. Our team will reach out shortly with your customized plan.
                  </p>

                  {/* Summary Card */}
                  <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 mb-8 text-left">
                    <div className="space-y-4">
                      <div>
                        <div className="text-cyan-400 font-medium mb-1">Business Type</div>
                        <div className="text-xl font-bold">{data.role}</div>
                      </div>
                      
                      <div>
                        <div className="text-cyan-400 font-medium mb-1">Services Interested In</div>
                        <div className="text-xl font-bold mb-2">{services.length} selected</div>
                        <div className="flex flex-wrap gap-2">
                          {services.map((service) => (
                            <span 
                              key={service} 
                              className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 border border-cyan-400/30 hover:bg-cyan-400/10 transition-colors duration-300"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-cyan-400 font-medium mb-1">Business Name</div>
                        <div className="text-xl font-bold">{data.business}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 hover:scale-105 duration-300">
                      Book Demo
                    </button>
                    <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-yellow-500/30 hover:scale-105 duration-300">
                      Download Plan
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setStarted(false);
                      setStep(1);
                      setServices([]);
                      setData({
                        role: "",
                        business: "",
                        website: "",
                        email: "",
                        phone: ""
                      });
                    }}
                    className="mt-8 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
                  >
                    Start New Submission
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}