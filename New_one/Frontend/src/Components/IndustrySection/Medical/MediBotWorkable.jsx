export default function MedibotWorkable({ demoRef }) {
  return (
    <section ref={demoRef} className="py-12 bg-white">
      {/* TITLE */}
      <div className="max-w-5xl mx-auto px-4 text-center mb-10">
        <h2 className="text-5xl font-bold mb-4">
          Try <span className="text-cyan-400">Live Demo</span>
        </h2>
        <p className="text-lg text-gray-600">
          Experience how MediBot works in real-time.
        </p>
      </div>

      {/* DEMO CONTAINER */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl border-4 border-cyan-400 bg-white shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-cyan-400 px-6 py-4 flex justify-center items-center border-b-4 border-black font-mono">
            <span className="font-bold text-black text-lg">
              💬 CHAT WITH MEDIBOT
            </span>
          </div>

          {/* CHAT BODY */}
          <div className="p-6">
            {/* CHAT WINDOW */}
            <div className="border-4 border-black rounded-xl h-56 p-4 mb-4 font-mono text-gray-700">
              Hello! I'm MediBot. How can I help you today?
            </div>

            {/* INPUT AREA */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 border-4 border-black px-4 py-3 font-mono focus:outline-none"
              />
              <button className="bg-cyan-400 text-black px-6 py-3 border-4 border-black font-bold hover:bg-cyan-300 transition">
                SEND
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
