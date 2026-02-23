
import { useState, useEffect } from "react";

const cards = [
  { id: "invoice", title: "INVOICE", desc: "Professional billing document", color: "cyan", icon: "📄" },
  { id: "agreement", title: "AGREEMENT", desc: "Legal contract template", color: "white", icon: "📝" },
  { id: "offer", title: "OFFER LETTER", desc: "Job offer document", color: "yellow", icon: "💼" },
  { id: "certificate", title: "CERTIFICATE", desc: "Achievement certificate", color: "cyan", icon: "🏆" },
  { id: "report", title: "REPORT", desc: "Business report", color: "white", icon: "📊" }
];

const borderMap = {
  cyan: "border-cyan-400",
  yellow: "border-yellow-400",
  white: "border-white",
};

export default function Docgen() {
  const [selected, setSelected] = useState(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [docColor, setDocColor] = useState("text-cyan-700");
  const [formAnimation, setFormAnimation] = useState(false);
  const [underscoreVisible, setUnderscoreVisible] = useState(true);

  // ================= FORM STATES =================
  const [invoice, setInvoice] = useState({
    title: "INVOICE", 
    client: "Client Name", 
    email: "client@example.com", 
    date: new Date().toISOString().split('T')[0], 
    number: "INV-2024-001", 
    items: "1. Web Development - $1,500\n2. UI/UX Design - $800\n3. Maintenance - $300\n\nTotal: $2,600"
  });

  const [agreement, setAgreement] = useState({
    title: "AGREEMENT", 
    partyA: "Your Company", 
    partyB: "Other Party", 
    terms: "1. This agreement is binding for 12 months.\n2. Payments are due within 30 days.\n3. Both parties agree to maintain confidentiality.\n4. Termination requires 30 days notice.", 
    date: new Date().toISOString().split('T')[0]
  });

  const [offer, setOffer] = useState({
    title: "OFFER LETTER", 
    name: "John Doe", 
    position: "Senior Developer", 
    salary: "$85,000 annually", 
    start: new Date().toISOString().split('T')[0]
  });

  const [certificate, setCertificate] = useState({
    title: "CERTIFICATE OF ACHIEVEMENT", 
    awarded: "Jane Smith", 
    achievement: "For outstanding performance and dedication in completing the Advanced React Development course with excellence and demonstrating exceptional skills in modern web development.", 
    date: new Date().toISOString().split('T')[0]
  });

  const [report, setReport] = useState({
    title: "QUARTERLY REPORT", 
    type: "Business Performance", 
    content: "Executive Summary:\nQ4 showed significant growth with a 25% increase in revenue.\n\nKey Findings:\n1. Customer acquisition increased by 30%\n2. Operational costs decreased by 15%\n3. Team productivity improved by 40%\n\nRecommendations:\n1. Expand marketing budget\n2. Hire additional support staff\n3. Implement new CRM system", 
    date: new Date().toISOString().split('T')[0]
  });

  // Underscore blinking animation
  useEffect(() => {
    const interval = setInterval(() => {
      setUnderscoreVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Handle card click with animation
  const handleCardClick = (cardId) => {
    setFormAnimation(false);
    setSelected(cardId);
    setTimeout(() => {
      setFormAnimation(true);
    }, 100);
  };

  // ================= PREVIEW DATA =================
  const previewMap = {
    invoice: {
      title: invoice.title || "INVOICE",
      content: `INVOICE #${invoice.number || "INV-0001"}\n\nDate: ${invoice.date || new Date().toLocaleDateString()}\nClient: ${invoice.client || "Client Name"}\nEmail: ${invoice.email || "client@email.com"}\n\nITEMS:\n${invoice.items || "No items listed"}\n\nThank you for your business!`
    },
    agreement: {
      title: agreement.title || "AGREEMENT",
      content: `AGREEMENT\n\nDate: ${agreement.date || new Date().toLocaleDateString()}\n\nPARTY A: ${agreement.partyA || "Your Company"}\nPARTY B: ${agreement.partyB || "Other Party"}\n\nTERMS & CONDITIONS:\n${agreement.terms || "Terms will appear here"}\n\nSignatures:\n___________________          ___________________\n${agreement.partyA || "Party A"}          ${agreement.partyB || "Party B"}`
    },
    offer: {
      title: offer.title || "OFFER LETTER",
      content: `OFFER LETTER\n\nDate: ${new Date().toLocaleDateString()}\n\nDear ${offer.name || "Candidate"},\n\nWe are pleased to offer you the position of:\n\nPOSITION: ${offer.position || "Position Title"}\nSALARY: ${offer.salary || "Competitive"}\nSTART DATE: ${offer.start || "To be determined"}\n\nWe look forward to welcoming you to our team!\n\nSincerely,\nHR Department`
    },
    certificate: {
      title: certificate.title || "CERTIFICATE",
      content: `CERTIFICATE OF ACHIEVEMENT\n\nThis certifies that\n\n${certificate.awarded || "Recipient Name"}\n\nHas successfully demonstrated excellence in\n\n${certificate.achievement || "Achievement description"}\n\nDate of Issue: ${certificate.date || new Date().toLocaleDateString()}\n\nIssued by: WYN AI Certifications`
    },
    report: {
      title: report.title || "REPORT",
      content: `${report.type || "BUSINESS"} REPORT\n\nDate: ${report.date || new Date().toLocaleDateString()}\n\nCONTENT:\n${report.content || "Report content will appear here"}\n\nPrepared by: WYN AI Report Generator\nGenerated on: ${new Date().toLocaleDateString()}`
    }
  };

  // Get current form values for preview
  const getCurrentForm = () => {
    switch(selected) {
      case "invoice": return invoice;
      case "agreement": return agreement;
      case "offer": return offer;
      case "certificate": return certificate;
      case "report": return report;
      default: return null;
    }
  };

  const getCurrentFormSetter = () => {
    switch(selected) {
      case "invoice": return setInvoice;
      case "agreement": return setAgreement;
      case "offer": return setOffer;
      case "certificate": return setCertificate;
      case "report": return setReport;
      default: return null;
    }
  };

  // Handle form reset
  const handleReset = () => {
    const setter = getCurrentFormSetter();
    if (!setter) return;
    
    switch(selected) {
      case "invoice":
        setInvoice({
          title: "INVOICE", 
          client: "", 
          email: "", 
          date: new Date().toISOString().split('T')[0], 
          number: "", 
          items: ""
        });
        break;
      case "agreement":
        setAgreement({
          title: "AGREEMENT", 
          partyA: "", 
          partyB: "", 
          terms: "", 
          date: new Date().toISOString().split('T')[0]
        });
        break;
      case "offer":
        setOffer({
          title: "OFFER LETTER", 
          name: "", 
          position: "", 
          salary: "", 
          start: new Date().toISOString().split('T')[0]
        });
        break;
      case "certificate":
        setCertificate({
          title: "CERTIFICATE", 
          awarded: "", 
          achievement: "", 
          date: new Date().toISOString().split('T')[0]
        });
        break;
      case "report":
        setReport({
          title: "REPORT", 
          type: "", 
          content: "", 
          date: new Date().toISOString().split('T')[0]
        });
        break;
    }
  };

  // Handle form save (in real app, this would save to backend)
  const handleSave = () => {
    const formData = getCurrentForm();
    if (!formData) return;
    
    console.log("Saving document:", { type: selected, ...formData });
    alert(`Document saved successfully!\nType: ${selected.toUpperCase()}\nTitle: ${formData.title}`);
  };

  // Handle generate (in real app, this would generate PDF/download)
  const handleGenerate = () => {
    const formData = getCurrentForm();
    if (!formData) return;
    
    console.log("Generating document:", { type: selected, ...formData });
    alert(`Document generated successfully!\nCheck your downloads for ${selected.toUpperCase()} document.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-black text-white px-4 sm:px-6 lg:px-10 pb-20">

      {/* ================= UPDATED HERO SECTION ================= */}
      <div className="pt-12 pb-10 text-center">

  <div className="inline-flex items-center gap-2 border-2 border-cyan-400 px-6 py-2 text-cyan-400 mb-8 tracking-wider">
    📄 AI DOCUMENT CREATION
  </div>

  <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
    DOC<span className="text-yellow-400">GEN</span>
    <span className="text-cyan-400">_</span>AI
  </h1>

  <p className="text-gray-300 text-xl mt-4">
    Create professional documents in seconds with AI.
  </p>

  <p className="text-yellow-400 text-xl mt-2 font-medium">
    Select • Fill • Generate instantly
  </p>

  <div className="flex justify-center gap-8 mt-6 text-gray-400 text-base">
    <span className="flex items-center gap-2">✨ AI-Powered</span>
    <span className="flex items-center gap-2">⚡ Instant Generation</span>
    <span className="flex items-center gap-2">🛡 Professional Quality</span>
  </div>
  

</div>

        {/* ================= FEATURE HIGHLIGHTS ================= */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-14">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <div className="w-7 h-7 bg-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">AI</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-base">AI-Powered</p>
              <p className="text-gray-400 text-sm">Smart document generation</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">⚡</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-base">Instant Generation</p>
              <p className="text-gray-400 text-sm">Documents in seconds</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">★</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-base">Professional Quality</p>
              <p className="text-gray-400 text-sm">Industry-standard docs</p>
            </div>
          </div>
        </div>

        {/* ================= CARD ROW - MEDIUM CARDS ================= */}
        <h2 className="text-center text-cyan-400 text-2xl font-bold mb-10 tracking-widest">
          SELECT DOCUMENT TYPE
        </h2>
        
        <div className="flex justify-center items-stretch gap-4 mb-16">
          {cards.map(c => (
            <div
              key={c.id}
              onClick={() => handleCardClick(c.id)}
              className={`w-48 p-5 cursor-pointer rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border-4 transition-all duration-300
              ${borderMap[c.color]} ${selected === c.id ? "scale-105 shadow-2xl shadow-cyan-500/30" : "hover:scale-105 hover:shadow-lg"}`}
            >
              <div className="text-4xl mb-3 text-center">{c.icon}</div>
              <h3 className="text-lg font-bold text-center">{c.title}</h3>
              <p className="text-gray-400 text-center text-sm mt-1">{c.desc}</p>
              {selected === c.id && (
                <div className="mt-2 text-center">
                  <div className="inline-block w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
    
      </div>

      {selected && (
        <div className={`grid md:grid-cols-2 gap-12 transition-all duration-500 ${formAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* ================= FORMS ================= */}
          <div className={`border-4 border-white p-7 space-y-4 bg-gradient-to-br from-slate-900/80 to-black/50 rounded-xl transition-all duration-500 ${formAnimation ? 'translate-x-0' : '-translate-x-10'}`}>

            {selected === "invoice" && (
              <>
                <Input label="Title" value={invoice.title} onChange={v => setInvoice({ ...invoice, title: v })}/>
                <Input label="Client Name" value={invoice.client} onChange={v => setInvoice({ ...invoice, client: v })}/>
                <Input label="Email" value={invoice.email} onChange={v => setInvoice({ ...invoice, email: v })}/>
                <Input type="date" label="Date" value={invoice.date} onChange={v => setInvoice({ ...invoice, date: v })}/>
                <Input label="Invoice Number" value={invoice.number} onChange={v => setInvoice({ ...invoice, number: v })}/>
                <Textarea label="Line Items" value={invoice.items} onChange={v => setInvoice({ ...invoice, items: v })}/>
              </>
            )}

            {selected === "agreement" && (
              <>
                <Input label="Title" value={agreement.title} onChange={v => setAgreement({ ...agreement, title: v })}/>
                <Input label="Party A" value={agreement.partyA} onChange={v => setAgreement({ ...agreement, partyA: v })}/>
                <Input label="Party B" value={agreement.partyB} onChange={v => setAgreement({ ...agreement, partyB: v })}/>
                <Input type="date" label="Date" value={agreement.date} onChange={v => setAgreement({ ...agreement, date: v })}/>
                <Textarea label="Terms & Conditions" value={agreement.terms} onChange={v => setAgreement({ ...agreement, terms: v })}/>
              </>
            )}

            {selected === "offer" && (
              <>
                <Input label="Title" value={offer.title} onChange={v => setOffer({ ...offer, title: v })}/>
                <Input label="Candidate Name" value={offer.name} onChange={v => setOffer({ ...offer, name: v })}/>
                <Input label="Position" value={offer.position} onChange={v => setOffer({ ...offer, position: v })}/>
                <Input label="Salary" value={offer.salary} onChange={v => setOffer({ ...offer, salary: v })}/>
                <Input type="date" label="Start Date" value={offer.start} onChange={v => setOffer({ ...offer, start: v })}/>
              </>
            )}

            {selected === "certificate" && (
              <>
                <Input label="Title" value={certificate.title} onChange={v => setCertificate({ ...certificate, title: v })}/>
                <Input label="Awarded To" value={certificate.awarded} onChange={v => setCertificate({ ...certificate, awarded: v })}/>
                <Input type="date" label="Date" value={certificate.date} onChange={v => setCertificate({ ...certificate, date: v })}/>
                <Textarea label="Achievement" value={certificate.achievement} onChange={v => setCertificate({ ...certificate, achievement: v })}/>
              </>
            )}

            {selected === "report" && (
              <>
                <Input label="Title" value={report.title} onChange={v => setReport({ ...report, title: v })}/>
                <Input label="Report Type" value={report.type} onChange={v => setReport({ ...report, type: v })}/>
                <Input type="date" label="Date" value={report.date} onChange={v => setReport({ ...report, date: v })}/>
                <Textarea label="Report Content" value={report.content} onChange={v => setReport({ ...report, content: v })}/>
              </>
            )}

            {/* CUSTOMIZATION */}
            <div className="border-2 border-gray-700 mt-6 rounded-lg overflow-hidden">
              <div onClick={() => setShowCustomize(!showCustomize)} className="flex justify-between p-4 cursor-pointer bg-slate-800/50 hover:bg-slate-800/80 transition-colors">
                <span className="text-cyan-400 font-semibold">🎨 CUSTOMIZATION OPTIONS</span>
                <span className="text-xl transform transition-transform duration-300">{showCustomize ? "▲" : "▼"}</span>
              </div>
              {showCustomize && (
                <div className="p-4 flex gap-3 flex-wrap bg-black/30">
                  {[
                    {value: "text-cyan-700", label: "CYAN", border: "border-cyan-400"},
                    {value: "text-yellow-700", label: "YELLOW", border: "border-yellow-400"},
                    {value: "text-blue-700", label: "BLUE", border: "border-blue-400"},
                    {value: "text-purple-700", label: "PURPLE", border: "border-purple-400"},
                    {value: "text-green-700", label: "GREEN", border: "border-green-400"},
                    {value: "text-gray-900", label: "BLACK", border: "border-gray-400"}
                  ].map(c => (
                    <button 
                      key={c.value}
                      onClick={() => setDocColor(c.value)} 
                      className={`px-4 py-2 border-2 transition-all duration-300 ${c.border} ${docColor === c.value ? 'bg-opacity-20' : 'hover:bg-opacity-10'} ${c.value.includes('cyan') && docColor === c.value ? 'bg-cyan-400' : ''} ${c.value.includes('yellow') && docColor === c.value ? 'bg-yellow-400' : ''} ${c.value.includes('blue') && docColor === c.value ? 'bg-blue-400' : ''} ${c.value.includes('purple') && docColor === c.value ? 'bg-purple-400' : ''} ${c.value.includes('green') && docColor === c.value ? 'bg-green-400' : ''} ${c.value.includes('gray') && docColor === c.value ? 'bg-gray-400' : ''}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= PREVIEW ================= */}
          <div className={`border-4 border-yellow-400 p-7 bg-gradient-to-br from-slate-900/80 to-black/50 rounded-xl transition-all duration-500 delay-100 ${formAnimation ? 'translate-x-0' : 'translate-x-10'}`}>
            <h3 className="text-yellow-400 text-xl mb-4 font-bold">LIVE PREVIEW</h3>

            <div className={`bg-white min-h-[480px] p-7 shadow-xl ${docColor} rounded-lg transition-colors duration-300`}>
              <h2 className="text-2xl font-bold mb-2">{previewMap[selected]?.title || "Untitled Document"}</h2>
              <p className="mb-4 text-base">Date: {getCurrentForm()?.date || new Date().toLocaleDateString()}</p>
              <hr className="mb-5 border-gray-400" />
              <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                {previewMap[selected]?.content || "Start filling the form to see preview..."}
              </pre>
              <hr className="my-5 border-gray-400" />
              <p className="text-xs text-gray-600 text-center">
                Generated by WYN AI DocGen Platform • {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* ACTION BUTTONS BELOW PREVIEW */}
            <div className="flex gap-4 mt-7 flex-wrap">
              <button 
                onClick={handleGenerate}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-7 py-3 font-bold rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 flex-1 min-w-[190px] text-base"
              >
                GENERATE DOCUMENT
              </button>
              <button 
                onClick={handleSave}
                className="border-2 border-yellow-400 text-yellow-400 px-7 py-3 font-bold rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-105 flex-1 min-w-[140px] text-base"
              >
                SAVE DRAFT
              </button>
              <button 
                onClick={handleReset}
                className="border-2 border-gray-400 text-gray-400 px-7 py-3 font-bold rounded-lg hover:bg-gray-400 hover:text-black transition-all duration-300 hover:scale-105 flex-1 min-w-[140px] text-base"
              >
                RESET FORM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type="text" }) {
  return (
    <div>
      <p className="mb-1 text-gray-300 font-medium text-sm">{label}</p>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-black border border-cyan-400 p-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <p className="mb-1 text-gray-300 font-medium text-sm">{label}</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-black border border-cyan-400 p-3 min-h-[120px] text-sm outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
      />
    </div>
  );
}
