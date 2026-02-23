import React, { useState, useRef } from "react";
import { 
  Download, Share2, CheckCircle, FileText, Calendar, Clock, 
  ChevronLeft, ChevronRight, Check, IndianRupee, Receipt, Building2, 
  User, Package, Eye, Plus, Upload, Mail, Phone, MapPin,
  Trash2, Edit2, Printer, Copy, CheckSquare, Send, Save, Lightbulb,
  AlertCircle, Image as ImageIcon, X
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Invoice() {
  const [step, setStep] = useState(1);
  const [showItems, setShowItems] = useState(true);
  const [tab, setTab] = useState("ai");
  const [discount, setDiscount] = useState(0);
  const [invoiceSettings, setInvoiceSettings] = useState({
    template: "Modern",
    showGST: true,
    showLogo: true,
    currency: "INR"
  });

  const [business, setBusiness] = useState({
    name: "WYN AI Solutions",
    gst: "27AABCU9603R1ZM",
    address: "123 Tech Park, Mumbai, Maharashtra 400001",
    phone: "+91 98765 43210",
    email: "contact@wynai.com",
    logo: null,
    logoPreview: null
  });

  const [client, setClient] = useState({
    name: "Client Corporation Pvt Ltd",
    gst: "27XYZU9603R1ZA",
    billing: "456 Business Center, Delhi, 110001",
    phone: "+91 98765 43219",
    email: "billing@clientcorp.com"
  });

  const [items, setItems] = useState([
    { id: 1, item: "Web Development", desc: "Full-stack website development with React", qty: 1, rate: 25000, tax: 18 },
    { id: 2, item: "UI/UX Design", desc: "User interface and experience design", qty: 1, rate: 15000, tax: 18 },
    { id: 3, item: "Monthly Maintenance", desc: "Technical support and updates", qty: 3, rate: 5000, tax: 18 }
  ]);

  const [previousInvoices] = useState([
    { id: "INV-245", date: "2024-01-15", status: "Paid", amount: "₹25,000" },
    { id: "INV-198", date: "2023-12-10", status: "Paid", amount: "₹18,500" }
  ]);

  const [invoiceStatus, setInvoiceStatus] = useState("Pending");
  const [isProcessing, setIsProcessing] = useState(false);
  const invoiceRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setBusiness(prev => ({
        ...prev,
        logo: file,
        logoPreview: e.target.result
      }));
    };
    reader.readAsDataURL(file);
    
    alert('✅ Logo uploaded successfully!');
  };

  // Remove logo
  const removeLogo = () => {
    setBusiness(prev => ({
      ...prev,
      logo: null,
      logoPreview: null
    }));
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    alert('🗑️ Logo removed');
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updateItem = (id, key, val) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [key]: val } : item
    ));
  };

  const addNewItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, {
      id: newId,
      item: "New Item",
      desc: "Item description",
      qty: 1,
      rate: 0,
      tax: 18
    }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = items.reduce((s, i) => s + (i.qty * i.rate * i.tax) / 100, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + tax - discountAmount;

  const handleSettingsChange = (key, value) => {
    setInvoiceSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleBusinessChange = (key, value) => {
    setBusiness(prev => ({ ...prev, [key]: value }));
  };

  const handleClientChange = (key, value) => {
    setClient(prev => ({ ...prev, [key]: value }));
  };

  // Generate invoice number
  const invoiceNumber = `INV-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  const invoiceDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  // Download PDF Function
  const downloadPDF = async () => {
    setIsProcessing(true);
    try {
      const input = invoiceRef.current;
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${invoiceNumber}.pdf`);
      
      alert(`✅ Invoice downloaded successfully as invoice-${invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('❌ Failed to generate PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Share WhatsApp Function
  const shareWhatsApp = () => {
    const message = `Invoice ${invoiceNumber} from ${business.name}\nTotal Amount: ₹${total.toFixed(2)}\nDate: ${invoiceDate}\n\nView invoice details:`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`📱 Opening WhatsApp to share invoice ${invoiceNumber}`);
  };

  // Mark as Paid Function
  const markAsPaid = () => {
    if (window.confirm(`Mark invoice ${invoiceNumber} as Paid? This action cannot be undone.`)) {
      setInvoiceStatus("Paid");
      alert(`✅ Invoice ${invoiceNumber} marked as Paid!`);
    }
  };

  // Save as Draft Function
  const saveAsDraft = () => {
    const draftData = {
      business,
      client,
      items,
      subtotal,
      tax,
      discount,
      total,
      invoiceNumber,
      invoiceDate,
      status: "Draft"
    };
    
    localStorage.setItem('invoiceDraft', JSON.stringify(draftData));
    alert(`💾 Invoice saved as draft (${invoiceNumber})`);
  };

  // Schedule Send Function
  const scheduleSend = () => {
    const scheduleDate = prompt("Enter date to send invoice (YYYY-MM-DD):", 
      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    
    if (scheduleDate) {
      alert(`📅 Invoice scheduled to be sent on ${scheduleDate}`);
    }
  };

  // Set Reminder Function
  const setReminder = () => {
    const reminderDays = prompt("Set reminder for how many days before due date?", "3");
    if (reminderDays) {
      alert(`⏰ Reminder set for ${reminderDays} days before due date`);
    }
  };

  // Copy Invoice Function
  const copyInvoice = () => {
    const invoiceText = `INVOICE ${invoiceNumber}\n\nFrom: ${business.name}\nTo: ${client.name}\nTotal: ₹${total.toFixed(2)}\nDate: ${invoiceDate}`;
    navigator.clipboard.writeText(invoiceText)
      .then(() => alert('📋 Invoice details copied to clipboard'))
      .catch(() => alert('❌ Failed to copy to clipboard'));
  };

  // Print Invoice Function
  const printInvoice = () => {
    const printContent = invoiceRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
      <style>
        @media print {
          @page { margin: 0; }
          body { margin: 1.6cm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact; }
        }
      </style>
      ${printContent}
      <div class="no-print" style="text-align: center; margin-top: 20px;">
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #06b6d4; color: white; border: none; border-radius: 5px;">
          Back to Editor
        </button>
      </div>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-cyan-600">CREATE_INVOICE</h1>
            <p className="text-gray-600 mt-2">AI-powered invoice generation for your business</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
              Step {step} of 4
            </span>
            {invoiceStatus === "Paid" && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                <CheckCircle size={12} /> Paid
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="bg-white rounded-xl p-2 mb-8 border-4 border-cyan-400">
        <div className="flex flex-wrap items-center justify-between">
          <Step label="BUSINESS" active={step === 1} number={1} />
          <Line />
          <Step label="CLIENT" active={step === 2} number={2} />
          <Line />
          <Step label="ITEMS" active={step === 3} number={3} />
          <Line />
          <Step label="PREVIEW" active={step === 4} number={4} />
        </div>
      </div>

      {/* ================= BUSINESS ================= */}
      {step === 1 && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl p-8 border-4 border-cyan-400">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center">
                <Building2 className="text-cyan-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-cyan-600">Business Details</h2>
                <p className="text-gray-600">Enter your business information</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Business Name *</label>
                  <input
                    type="text"
                    value={business.name}
                    onChange={(e) => handleBusinessChange('name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-800"
                    placeholder="Enter business name"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">GST Number</label>
                  <input
                    type="text"
                    value={business.gst}
                    onChange={(e) => handleBusinessChange('gst', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white text-gray-800"
                    placeholder="27AABCU9603R1ZM"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Business Address *</label>
                <textarea
                  value={business.address}
                  onChange={(e) => handleBusinessChange('address', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-800"
                  placeholder="Enter complete business address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={business.phone}
                      onChange={(e) => handleBusinessChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl bg-white text-gray-800"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={business.email}
                      onChange={(e) => handleBusinessChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl bg-white text-gray-800"
                      placeholder="business@example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Business Logo</label>
                <div className="border-4 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-cyan-400 transition-colors relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    className="hidden"
                  />
                  
                  {business.logoPreview ? (
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <img 
                          src={business.logoPreview} 
                          alt="Business Logo" 
                          className="w-32 h-32 object-contain rounded-lg border-2 border-gray-300"
                        />
                        <button
                          onClick={removeLogo}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-green-600 mb-2">✅ Logo uploaded successfully!</p>
                      <button 
                        onClick={triggerFileInput}
                        className="px-6 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors font-medium"
                      >
                        Change Logo
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto text-gray-400 mb-3" size={28} />
                      <p className="text-gray-600 mb-2">Upload your business logo (PNG, JPG)</p>
                      <p className="text-sm text-gray-500 mb-4">Recommended size: 200x200px</p>
                      <button 
                        onClick={triggerFileInput}
                        className="px-6 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors font-medium"
                      >
                        Choose File
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveDefault"
                  className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="saveDefault" className="ml-3 text-gray-700">
                  Save as default business profile
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-4 border-yellow-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Eye className="text-yellow-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-yellow-600">✨ QUICK PREVIEW</h3>
              </div>
              
              <div className="border-2 border-gray-300 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  {business.logoPreview ? (
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src={business.logoPreview} 
                        alt="Business Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{business.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-gray-800">{business.name}</h4>
                    <p className="text-sm text-gray-600">{business.address}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    <span>{business.email}</span>
                  </div>
                  {business.gst && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">GST:</span>
                      <span className="font-medium">{business.gst}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 p-4 bg-cyan-50 rounded-xl border-2 border-cyan-400">
                <p className="text-sm text-cyan-700">
                  <span className="font-medium">Tip:</span> This information appears on all your invoices. Enable "Save as default" to reuse it.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CLIENT ================= */}
      {step === 2 && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl p-8 border-4 border-cyan-400">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center">
                <User className="text-cyan-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-cyan-600">Client Details</h2>
                <p className="text-gray-600">Enter client information</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Client Name *</label>
                  <input
                    type="text"
                    value={client.name}
                    onChange={(e) => handleClientChange('name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-800"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">GST Number (Optional)</label>
                  <input
                    type="text"
                    value={client.gst}
                    onChange={(e) => handleClientChange('gst', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white text-gray-800"
                    placeholder="27XYZU9603R1ZA"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={client.phone}
                      onChange={(e) => handleClientChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl bg-white text-gray-800"
                      placeholder="+91 98765 43219"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={client.email}
                      onChange={(e) => handleClientChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl bg-white text-gray-800"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Billing Address *</label>
                <textarea
                  value={client.billing}
                  onChange={(e) => handleClientChange('billing', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-800"
                  placeholder="Enter complete billing address"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => alert("Would open client database modal")}
                  className="flex items-center gap-2 px-5 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors font-medium"
                >
                  <Plus size={20} />
                  <span>Add New Client to Database</span>
                </button>
                <button 
                  onClick={copyInvoice}
                  className="flex items-center gap-2 px-5 py-3 border-2 border-cyan-400 text-cyan-600 rounded-xl hover:bg-cyan-50 transition-colors"
                >
                  <Copy size={18} />
                  <span>Copy from Existing</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-4 border-yellow-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <User className="text-yellow-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-yellow-600">CLIENT SUMMARY</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Client Name</p>
                  <p className="font-bold text-lg text-gray-800">{client.name || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium text-gray-800">{client.phone || "Not set"}</p>
                </div>
                {client.gst && (
                  <div>
                    <p className="text-sm text-gray-600">GST Number</p>
                    <p className="font-medium text-gray-800">{client.gst}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-4 border-yellow-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Receipt className="text-yellow-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-yellow-600">PREVIOUS INVOICES</h3>
              </div>
              
              <div className="space-y-3">
                {previousInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div>
                      <p className="font-medium text-gray-800">{invoice.id}</p>
                      <p className="text-sm text-gray-600">{invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        invoice.status === "Paid" 
                          ? "bg-green-100 text-green-800 border-2 border-green-300" 
                          : "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                      }`}>
                        <CheckCircle size={12} className="mr-1" />
                        {invoice.status}
                      </span>
                      <p className="font-bold text-gray-900 mt-1">{invoice.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-cyan-50 rounded-xl border-2 border-cyan-400">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-cyan-600" />
                  <span className="font-medium text-cyan-700">On-time Payer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ITEMS ================= */}
      {step === 3 && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl p-8 border-4 border-cyan-400">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center">
                  <Package className="text-cyan-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-cyan-600">Items & Pricing</h2>
                  <p className="text-gray-600">Add items and set pricing</p>
                </div>
              </div>
              <button
                onClick={addNewItem}
                className="flex items-center gap-2 px-5 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors font-medium"
              >
                <Plus size={20} />
                <span>Add Item</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="text-left p-4 font-bold rounded-tl-xl">ITEM</th>
                    <th className="text-left p-4 font-bold">DESCRIPTION</th>
                    <th className="text-left p-4 font-bold">QTY</th>
                    <th className="text-left p-4 font-bold">RATE</th>
                    <th className="text-left p-4 font-bold">TAX %</th>
                    <th className="text-left p-4 font-bold">AMOUNT</th>
                    <th className="text-left p-4 font-bold rounded-tr-xl">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const amount = item.qty * item.rate;
                    const taxAmount = (amount * item.tax) / 100;
                    return (
                      <tr key={item.id} className="border-b-2 border-gray-200 hover:bg-gray-50">
                        <td className="p-4">
                          <input
                            type="text"
                            value={item.item}
                            onChange={(e) => updateItem(item.id, 'item', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-800"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            value={item.desc}
                            onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-800"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-800"
                            min="0"
                          />
                        </td>
                        <td className="p-4">
                          <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">₹</span>
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateItem(item.id, 'rate', parseInt(e.target.value) || 0)}
                              className="w-32 pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-800"
                              min="0"
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            value={item.tax}
                            onChange={(e) => updateItem(item.id, 'tax', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-800"
                            min="0"
                            max="100"
                          />
                        </td>
                        <td className="p-4 font-bold text-gray-800">
                          ₹{(amount + taxAmount).toFixed(2)}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg border-2 border-red-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-medium">% Discount</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                    className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-800"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="roundOff"
                    className="w-5 h-5 rounded border-2 border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="roundOff" className="text-gray-700">Round off total</label>
                </div>
              </div>

              <div className="border-4 border-black rounded-xl p-6">
                <div className="space-y-3">
                  <Row label="Subtotal" value={subtotal} />
                  <Row label="Tax" value={tax} />
                  {discount > 0 && (
                    <Row label={`Discount (${discount}%)`} value={-discountAmount} />
                  )}
                  <hr className="border-black my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-cyan-600">Total</span>
                    <span className="text-2xl font-bold text-cyan-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-4 border-yellow-400">
              <div className="bg-black rounded-full flex mb-6 overflow-hidden">
                <button
                  onClick={() => setTab("ai")}
                  className={`flex-1 py-3 font-bold ${tab === "ai" ? "bg-cyan-500 text-white" : "text-white"}`}
                >
                  AI Assist
                </button>
                <button
                  onClick={() => setTab("tax")}
                  className={`flex-1 py-3 font-bold ${tab === "tax" ? "bg-cyan-500 text-white" : "text-white"}`}
                >
                  Tax
                </button>
                <button
                  onClick={() => setTab("tips")}
                  className={`flex-1 py-3 font-bold ${tab === "tips" ? "bg-cyan-500 text-white" : "text-white"}`}
                >
                  Tips
                </button>
              </div>

              {tab === "ai" && (
                <div className="space-y-4">
                  <div className="border-2 border-cyan-400 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Lightbulb className="text-cyan-500" size={18} /> Improve descriptions
                    </h4>
                    <p className="text-sm text-gray-600">Make item descriptions more professional</p>
                  </div>
                  <div className="border-2 border-gray-300 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-2">Add payment terms</h4>
                    <p className="text-sm text-gray-600">Generate standard payment terms</p>
                  </div>
                  <div className="border-2 border-yellow-400 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-2">Suggest discounts</h4>
                    <p className="text-sm text-gray-600">AI-recommended discount strategies</p>
                  </div>
                </div>
              )}

              {tab === "tax" && (
                <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-300">
                  <h4 className="font-bold text-yellow-600 mb-4">Tax Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal (pre-tax)</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Tax</span>
                      <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t-2 border-gray-300">
                      <div className="flex justify-between font-bold">
                        <span>Grand Total</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === "tips" && (
                <div className="space-y-4">
                  <div className="border-2 border-cyan-400 p-4 rounded-xl">
                    <h4 className="font-bold text-cyan-600 mb-1">Pro Tip</h4>
                    <p className="text-sm text-gray-600">Add detailed descriptions to reduce client queries</p>
                  </div>
                  <div className="border-2 border-gray-300 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-1">Reminder</h4>
                    <p className="text-sm text-gray-600">GST is calculated per item based on tax %</p>
                  </div>
                  <div className="border-2 border-yellow-400 p-4 rounded-xl">
                    <h4 className="font-bold text-yellow-600 mb-1">Best Practice</h4>
                    <p className="text-sm text-gray-600">Include payment terms in the notes section</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= PREVIEW ================= */}
      {step === 4 && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customize Invoice */}
            <div className="bg-white rounded-xl border-4 border-cyan-400 p-6">
              <h2 className="text-cyan-500 text-xl font-bold mb-4">
                CUSTOMIZE INVOICE
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {["Classic", "Modern", "Minimal"].map((t, i) => (
                  <div
                    key={i}
                    className={`border-2 rounded-lg p-4 text-center cursor-pointer ${
                      invoiceSettings.template === t
                        ? "border-cyan-400 bg-cyan-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleSettingsChange("template", t)}
                  >
                    <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
                      📄
                    </div>
                    {t}
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Show GST Number</span>
                  <div className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer ${invoiceSettings.showGST ? "bg-cyan-500" : "bg-gray-300"}`}>
                    <div className={`bg-white w-4 h-4 rounded-full transform ${invoiceSettings.showGST ? "translate-x-5" : ""}`} />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Show Logo</span>
                  <div className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer ${invoiceSettings.showLogo ? "bg-cyan-500" : "bg-gray-300"}`}>
                    <div className={`bg-white w-4 h-4 rounded-full transform ${invoiceSettings.showLogo ? "translate-x-5" : ""}`} />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">Currency</label>
                  <div className="border-2 border-cyan-400 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <IndianRupee size={18} className="text-cyan-500" />
                      <span className="font-medium">INR - Indian Rupee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* INVOICE PREVIEW */}
            <div ref={invoiceRef} className="bg-white text-black rounded-xl border-2 border-gray-300 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">INVOICE PREVIEW</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={printInvoice}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg border-2 border-gray-300"
                    title="Print Invoice"
                  >
                    <Printer size={18} />
                  </button>
                  <button 
                    onClick={copyInvoice}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg border-2 border-gray-300"
                    title="Copy Invoice Details"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              <div className="border-2 border-gray-300 p-6 rounded-lg">
                <div className="flex justify-between mb-4">
                  <div className="flex items-start gap-4">
                    {invoiceSettings.showLogo && business.logoPreview ? (
                      <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                        <img 
                          src={business.logoPreview} 
                          alt="Business Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : null}
                    <div>
                      <h3 className="font-bold text-lg">{business.name}</h3>
                      <p className="text-gray-500">{business.address}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <h2 className="text-2xl font-bold">INVOICE</h2>
                    <p className="text-sm text-gray-500">Date: {invoiceDate}</p>
                    <p className="text-sm text-gray-500">Invoice #: {invoiceNumber}</p>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        invoiceStatus === "Paid" 
                          ? "bg-green-100 text-green-800 border-2 border-green-300" 
                          : "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                      }`}>
                        <CheckCircle size={12} className="mr-1" />
                        {invoiceStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="my-4 border-gray-300" />

                <div className="mb-6">
                  <p className="font-bold">BILL TO:</p>
                  <p>{client.name}</p>
                  <p className="text-gray-500">{client.billing}</p>
                </div>

                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between mb-1">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span>Tax:</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between mb-2 text-red-600">
                        <span>Discount ({discount}%):</span>
                        <span>-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <hr className="border-black my-2" />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-cyan-500">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-300">
                  <p className="text-sm text-gray-600 text-center">
                    Thank you for your business!
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={downloadPDF}
                disabled={isProcessing}
                className={`bg-cyan-500 text-black px-6 py-3 rounded-lg flex items-center gap-2 font-bold hover:bg-cyan-600 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Download size={18} /> Download PDF
                  </>
                )}
              </button>

              <button 
                onClick={shareWhatsApp}
                className="border-2 border-yellow-400 text-yellow-600 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-yellow-50"
              >
                <Share2 size={18} /> Share WhatsApp
              </button>

              <button 
                onClick={markAsPaid}
                className={`border-2 ${invoiceStatus === "Paid" ? "border-green-400 text-green-600" : "border-gray-300 text-gray-700"} px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-50`}
                disabled={invoiceStatus === "Paid"}
              >
                <CheckCircle size={18} /> 
                {invoiceStatus === "Paid" ? "Already Paid" : "Mark as Paid"}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            {/* FINAL SUMMARY */}
            <div className="bg-white rounded-xl border-4 border-cyan-400 p-6">
              <h3 className="text-cyan-500 font-bold text-xl mb-4">
                FINAL SUMMARY
              </h3>

              <div className="border-2 border-black p-4 rounded-lg mb-4">
                <Row label="Subtotal" value={subtotal} />
                <Row label="Tax" value={tax} />
                {discount > 0 && (
                  <Row label={`Discount (${discount}%)`} value={-discountAmount} />
                )}
                <hr className="border-black my-2" />
                <div className="flex justify-between font-bold text-lg text-cyan-500">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-cyan-400 text-black p-4 rounded-lg flex gap-3 items-start">
                <CheckCircle />
                <div>
                  <p className="font-bold">Ready to Send!</p>
                  <p className="text-sm">
                    Your invoice looks professional and complete.
                  </p>
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckSquare size={14} />
                      <span>All required fields completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckSquare size={14} />
                      <span>Tax calculations verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckSquare size={14} />
                      <span>Format optimized for PDF</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-xl border-4 border-yellow-400 p-6">
              <h3 className="text-yellow-500 font-bold mb-4">
                QUICK ACTIONS
              </h3>

              <div className="space-y-3">
                <button 
                  onClick={saveAsDraft}
                  className="w-full border-2 border-gray-300 p-3 rounded-lg flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="text-gray-700">Save as Draft</span>
                  <FileText size={16} />
                </button>
                <button 
                  onClick={scheduleSend}
                  className="w-full border-2 border-gray-300 p-3 rounded-lg flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="text-gray-700">Schedule Send</span>
                  <Calendar size={16} />
                </button>
                <button 
                  onClick={setReminder}
                  className="w-full border-2 border-gray-300 p-3 rounded-lg flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="text-gray-700">Set Reminder</span>
                  <Clock size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setStep(s => Math.max(1, s - 1))}
          className="flex items-center gap-2 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-6 py-3 rounded-lg transition-colors font-medium"
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>
        
        <div className="text-center">
          <div className="text-gray-600">Step {step} of 4</div>
          {invoiceStatus === "Paid" && step === 4 && (
            <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle size={12} /> Invoice Paid
            </div>
          )}
        </div>
        
        <button
          onClick={() => {
            if (step < 4) {
              setStep(s => Math.min(4, s + 1));
            } else {
              const confirmSend = window.confirm(`Send invoice ${invoiceNumber} to ${client.name}?`);
              if (confirmSend) {
                alert(`📧 Invoice ${invoiceNumber} sent to ${client.email}`);
                setInvoiceStatus("Sent");
              }
            }
          }}
          className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold transition-colors"
        >
          <span>{step === 4 ? "Send Invoice" : "Next"}</span>
          {step < 4 && <ChevronRight size={18} />}
        </button>
      </div>

      {/* Install Dependencies Alert */}
      
    </div>
  );
}

/* Helper Components */
function Step({ label, active, number }) {
  return (
    <div className={`flex items-center gap-2 ${active ? "text-cyan-500" : "text-gray-400"}`}>
      <div className={`w-10 h-10 border-2 rounded flex items-center justify-center text-lg font-bold
        ${active ? "border-cyan-400 bg-cyan-50" : "border-gray-300"}`}>
        {number}
      </div>
      <span className={`font-bold ${active ? "text-cyan-500" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  );
}

function Line() {
  return <div className="flex-1 h-px bg-gray-300 mx-2 hidden md:block" />;
}

function Row({ label, value }) {
  const isNegative = value < 0;
  return (
    <div className="flex justify-between mb-2">
      <span className="text-gray-600">{label}:</span>
      <span className={`font-bold ${isNegative ? 'text-red-600' : ''}`}>
        {isNegative ? '-' : ''}₹{Math.abs(value).toFixed(2)}
      </span>
    </div>
  );
}