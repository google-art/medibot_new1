// import { useEffect, useState } from "react";

// export default function DrivingWorkable() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [sessionId, setSessionId] = useState("");

//   /* ---------------- INIT ---------------- */
//   useEffect(() => {
//     const newSessionId =
//       "session-" + Math.random().toString(36).substring(2, 10);

//     setSessionId(newSessionId);

//     setMessages([
//       {
//         sender: "bot",
//         text: "Hi! I'm AutoBook AI. How can I help you today?",
//       },
//     ]);
//   }, []);

//   /* ---------------- SEND MESSAGE ---------------- */
//   const sendMessage = async () => {
//     if (!input.trim() || isLoading) return;

//     const userText = input.trim();
//     setInput("");
//     setIsLoading(true);

//     setMessages((prev) => [...prev, { sender: "user", text: userText }]);
//     setMessages((prev) => [
//       ...prev,
//       { sender: "bot", text: "Typing..." },
//     ]);

//     try {
//       const res = await fetch("http://localhost:3001/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userText, sessionId }),
//       });

//       const data = await res.json();

//       setMessages((prev) => prev.slice(0, -1)); // remove "Typing..."
//       setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
//     } catch {
//       setMessages((prev) => prev.slice(0, -1));
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "❌ Server error. Try again." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="w-full max-w-4xl border-[4px] border-black bg-white shadow-2xl">

//         {/* TITLE BAR */}
//         <div className="flex items-center justify-between bg-cyan-500 px-4 py-3 border-b-[4px] border-black">
//           <div className="font-bold text-black">🤖 AUTObOOK_AI</div>
//           <div className="flex gap-2">
//             <div className="w-4 h-4 bg-yellow-400 border border-black" />
//             <div className="w-4 h-4 bg-red-500 border border-black" />
//           </div>
//         </div>

//         {/* CHAT AREA (STATIC) */}
//         <div className="h-[420px] p-6 overflow-y-auto bg-white">
//           {messages.map((msg, index) => (
//             <div key={index} className="mb-4">
//               {msg.sender === "bot" ? (
//                 <div className="inline-block bg-cyan-100 border-2 border-black px-4 py-3 font-mono text-sm">
//                   {msg.text}
//                 </div>
//               ) : (
//                 <div className="flex justify-end">
//                   <div className="inline-block bg-gray-200 border-2 border-black px-4 py-3 font-mono text-sm">
//                     {msg.text}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* INPUT BAR */}
//         <div className="flex items-center gap-3 border-t-[4px] border-black p-4 bg-gray-100">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="TYPE_MESSAGE..."
//             disabled={isLoading}
//             className="flex-1 px-4 py-3 border-2 border-black outline-none font-mono text-sm bg-white"
//           />

//           <button
//             onClick={sendMessage}
//             disabled={isLoading}
//             className="px-6 py-3 border-2 border-black bg-black text-cyan-400 font-mono hover:bg-cyan-400 hover:text-black transition"
//           >
//             SEND
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";

export default function DrivingWorkable() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const chatRef = useRef(null);

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    const newSessionId =
      "session-" + Math.random().toString(36).substring(2, 10);

    setSessionId(newSessionId);

    setMessages([
      {
        sender: "bot",
        text: "Hi! I'm AutoBook AI. How can I help you today?",
      },
    ]);
  }, []);

  /* ---------------- AUTO SCROLL (CHAT ONLY) ---------------- */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
      { sender: "bot", text: "Typing..." },
    ]);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, sessionId }),
      });

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove "Typing..."
        updated.push({ sender: "bot", text: data.reply });
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        updated.push({
          sender: "bot",
          text: "❌ Server error. Try again.",
        });
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl border-[4px] border-black bg-white shadow-2xl">

        {/* TITLE BAR */}
        <div className="flex items-center justify-between bg-cyan-500 px-4 py-3 border-b-[4px] border-black">
          <div className="font-bold text-black">🤖 AUTObOOK_AI</div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-yellow-400 border border-black" />
            <div className="w-4 h-4 bg-red-500 border border-black" />
          </div>
        </div>

        {/* CHAT AREA (AUTO-SCROLLING ONLY) */}
        <div
          ref={chatRef}
          className="h-[420px] p-6 overflow-y-auto bg-white"
        >
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              {msg.sender === "bot" ? (
                <div className="inline-block bg-cyan-100 border-2 border-black px-4 py-3 font-mono text-sm">
                  {msg.text}
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="inline-block bg-gray-200 border-2 border-black px-4 py-3 font-mono text-sm">
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <div className="flex items-center gap-3 border-t-[4px] border-black p-4 bg-gray-100">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="TYPE_MESSAGE..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border-2 border-black outline-none font-mono text-sm bg-white"
          />

          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="px-6 py-3 border-2 border-black bg-black text-cyan-400 font-mono hover:bg-cyan-400 hover:text-black transition"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
