
// SalonBooking.jsx
import React, { useState, useEffect } from 'react';

const SalonBooking = () => {
  // State for booking flow
  const [currentStep, setCurrentStep] = useState('landing');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingInfo, setBookingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  
  // Underscore blinking animation
  const [underscoreVisible, setUnderscoreVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnderscoreVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Categories
  const categories = [
    { id: 'hair', name: 'HAIR', icon: '✂️' },
    { id: 'skin', name: 'SKIN', icon: '✨' },
    { id: 'spa', name: 'SPA', icon: '🛁' },
    { id: 'grooming', name: 'GROOMING', icon: '👔' }
  ];

  // Services data
  const services = {
    hair: [
      { id: 1, name: 'Precision Cut', description: 'Expert cutting technique with style consultation', duration: '45 min', price: '$65', popular: true },
      { id: 2, name: 'Color Transform', description: 'Professional color application and styling', duration: '90 min', price: '$120', popular: false },
      { id: 3, name: 'Event Styling', description: 'Special occasion hair design', duration: '60 min', price: '$85', popular: false }
    ],
    skin: [
      { id: 4, name: 'Deep Cleanse Facial', description: 'Rejuvenating facial treatment', duration: '60 min', price: '$95', popular: true },
      { id: 5, name: 'Anti-Aging Treatment', description: 'Advanced skincare therapy', duration: '75 min', price: '$150', popular: false }
    ],
    spa: [
      { id: 6, name: 'Relaxation Massage', description: 'Full body stress relief', duration: '60 min', price: '$110', popular: true },
      { id: 7, name: 'Spa Day Package', description: 'Complete wellness experience', duration: '180 min', price: '$280', popular: false }
    ],
    grooming: [
      { id: 8, name: 'Premium Manicure', description: 'Nail care and polish', duration: '30 min', price: '$45', popular: false },
      { id: 9, name: 'Deluxe Pedicure', description: 'Foot care and massage', duration: '45 min', price: '$65', popular: false }
    ]
  };

  // Dates for selection
  const dates = [
    { id: 'today', label: 'TODAY' },
    { id: 'tomorrow', label: 'TOMORROW' },
    { id: 'sat', label: 'SAT' },
    { id: 'sun', label: 'SUN' },
    { id: 'mon', label: 'MON' }
  ];

  // Time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Stats
  const stats = [
    { value: '2,500+', label: 'Happy Clients' },
    { value: '10K+', label: 'Services Booked' },
    { value: '4.9★', label: 'Avg Rating' }
  ];

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep('services');
  };

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep('datetime');
  };

  // Handle date/time selection
  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep('information');
    }
  };

  // Handle information submission
  const handleInfoSubmit = () => {
    // Generate booking details
    const details = {
      id: 'SB980699',
      service: selectedService?.name || 'Precision Cut',
      date: selectedDate || '2024-02-01',
      time: selectedTime || '09:30',
      duration: selectedService?.duration || '45 min',
      location: '123 Beauty Street',
      total: selectedService?.price || '$65'
    };
    
    setBookingDetails(details);
    setBookingConfirmed(true);
    setCurrentStep('confirmation');
  };

  // Reset booking
  const resetBooking = () => {
    setCurrentStep('landing');
    setSelectedCategory('');
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setBookingInfo({
      fullName: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setBookingConfirmed(false);
  };

  // Render hero section
  const renderHero = () => (
   <div className="relative bg-gradient-to-br from-cyan-50 to-cyan-100 border-b border-cyan-200 py-10">

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block border-2 border-cyan-400 text-cyan-600 px-5 py-1.5 rounded-full text-sm font-semibold mb-6 animate-pulse">
            INSTANT SALON BOOKING
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SALONBOOK<span className="text-cyan-500"></span>
            <span className="text-cyan-500">
              <span className={underscoreVisible ? "opacity-100" : "opacity-0"}>_</span>AI
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Book your professional beauty services in seconds.
            <br />
            <span className="text-cyan-600 font-semibold">Choose • Schedule • Confirm instantly</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white p-4 rounded-xl border border-gray-300 hover:border-cyan-400 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg">★</span>
              </div>
              <span className="font-medium text-gray-800">5-Star Professionals</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-4 rounded-xl border border-gray-300 hover:border-green-400 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg">✓</span>
              </div>
              <span className="font-medium text-gray-800">Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-4 rounded-xl border border-gray-300 hover:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg">🔒</span>
              </div>
              <span className="font-medium text-gray-800">Safe & Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render landing page
  const renderLandingPage = () => (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-2 border-cyan-400 rounded-2xl p-8 md:p-10 text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-6">
            BOOK YOUR APPOINTMENT IN JUST A FEW TAPS
          </h2>
          <p className="text-gray-600 text-center mb-8 text-lg">
            Discover professional beauty services and book instantly.
            <br />
            No phone calls. No waiting. Just tap and go.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gray-50 p-6 rounded-xl border border-gray-300 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setCurrentStep('categories')}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 hover:scale-105 duration-300"
            >
              BOOK NOW →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render categories page
  const renderCategories = () => (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">
          CHOOSE YOUR SERVICE TYPE
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Select a category to explore services
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="bg-white border-2 border-gray-300 rounded-xl p-8 text-center hover:border-cyan-400 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">{category.name}</h3>
            </button>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={() => setCurrentStep('landing')}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300 px-4 py-2"
          >
            ← BACK
          </button>
        </div>
      </div>
    </div>
  );

  // Render services page
  const renderServices = () => (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">
          {selectedCategory.toUpperCase()} SERVICES
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Select your preferred service
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services[selectedCategory]?.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border-2 border-gray-300 overflow-hidden hover:border-cyan-400 transition-all duration-300 hover:scale-105 group shadow-md hover:shadow-xl"
            >
              {service.popular && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm font-bold px-4 py-1.5 inline-block">
                  POPULAR
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">{service.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-700 font-medium">{service.duration}</div>
                  <div className="text-2xl font-bold text-cyan-600">{service.price}</div>
                </div>
                
                <button
                  onClick={() => handleServiceSelect(service)}
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 hover:scale-105 duration-300"
                >
                  SELECT SERVICE
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={() => setCurrentStep('categories')}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300 px-4 py-2"
          >
            ← BACK TO CATEGORIES
          </button>
        </div>
      </div>
    </div>
  );

  // Render date/time selection
  const renderDateTime = () => (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">
          PICK DATE & TIME
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Choose your preferred appointment slot
        </p>
        
        <div className="bg-white border-2 border-gray-300 rounded-xl p-8 mb-8 shadow-md">
          <div className="mb-8 p-5 bg-cyan-50 rounded-lg border border-cyan-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900">{selectedService?.name}</h3>
              <div className="text-2xl font-bold text-cyan-600">{selectedService?.price}</div>
            </div>
            <p className="text-gray-600 mb-2 text-sm">{selectedService?.description}</p>
            <div className="text-gray-700 font-medium">{selectedService?.duration}</div>
          </div>
          
          <div className="mb-8">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">SELECT DATE</h4>
            <div className="flex flex-wrap gap-3">
              {dates.map((date) => (
                <button
                  key={date.id}
                  onClick={() => setSelectedDate(date.id)}
                  className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedDate === date.id
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:border-cyan-400 hover:bg-cyan-50 hover:text-gray-900'
                  }`}
                >
                  {date.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">SELECT TIME</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedTime === time
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:border-cyan-400 hover:bg-cyan-50 hover:text-gray-900'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep('services')}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300 px-4 py-2"
          >
            ← BACK
          </button>
          <button
            onClick={handleDateTimeSelect}
            disabled={!selectedDate || !selectedTime}
            className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
              selectedDate && selectedTime
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:opacity-90 shadow-lg shadow-cyan-500/30 hover:scale-105'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
            }`}
          >
            CONTINUE →
          </button>
        </div>
      </div>
    </div>
  );

  // Render information form
  const renderInformation = () => (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">
          YOUR INFORMATION
        </h2>
        <p className="text-gray-600 text-center mb-8">
          We'll send your booking confirmation here
        </p>
        
        <div className="bg-white border-2 border-gray-300 rounded-xl p-8 mb-8 shadow-md">
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={bookingInfo.fullName}
                onChange={(e) => setBookingInfo({...bookingInfo, fullName: e.target.value})}
                className="w-full bg-white border-2 border-gray-300 rounded-lg p-4 text-gray-900 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={bookingInfo.email}
                onChange={(e) => setBookingInfo({...bookingInfo, email: e.target.value})}
                className="w-full bg-white border-2 border-gray-300 rounded-lg p-4 text-gray-900 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-2">Phone Number (optional)</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={bookingInfo.phone}
                onChange={(e) => setBookingInfo({...bookingInfo, phone: e.target.value})}
                className="w-full bg-white border-2 border-gray-300 rounded-lg p-4 text-gray-900 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-2">Special Requests (optional)</label>
              <textarea
                placeholder="Any special requests or preferences..."
                value={bookingInfo.specialRequests}
                onChange={(e) => setBookingInfo({...bookingInfo, specialRequests: e.target.value})}
                rows={4}
                className="w-full bg-white border-2 border-gray-300 rounded-lg p-4 text-gray-900 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep('datetime')}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300 px-4 py-2"
          >
            ← BACK
          </button>
          <button
            onClick={handleInfoSubmit}
            disabled={!bookingInfo.fullName.trim() || !bookingInfo.email.trim()}
            className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
              bookingInfo.fullName.trim() && bookingInfo.email.trim()
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:opacity-90 shadow-lg shadow-cyan-500/30 hover:scale-105'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
            }`}
          >
            BOOK APPOINTMENT →
          </button>
        </div>
      </div>
    </div>
  );

  // Render confirmation page
  const renderConfirmation = () => (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30">
            <span className="text-3xl text-white">✓</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">BOOKING CONFIRMED!</h2>
          <p className="text-gray-600">
            Your appointment has been successfully booked.
            <br />
            Check your email for confirmation details.
          </p>
        </div>
        
        <div className="bg-white border-2 border-gray-300 rounded-xl p-8 mb-8 shadow-md">
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-bold text-gray-900">{bookingDetails?.id}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Service</span>
              <span className="font-bold text-gray-900">{bookingDetails?.service}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Date</span>
              <span className="font-bold text-gray-900">{bookingDetails?.date}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Time</span>
              <span className="font-bold text-gray-900">{bookingDetails?.time}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Duration</span>
              <span className="font-bold text-gray-900">{bookingDetails?.duration}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Location</span>
              <span className="font-bold text-gray-900">{bookingDetails?.location}</span>
            </div>
            <div className="flex justify-between pt-3">
              <span className="text-gray-600">Total</span>
              <span className="text-2xl font-bold text-cyan-600">{bookingDetails?.total}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all duration-300 border border-gray-300 hover:shadow-md">
            ADD TO CALENDAR
          </button>
          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 duration-300 hover:scale-105">
            EMAIL RECEIPT
          </button>
        </div>
        
        <div className="text-center">
          <button
            onClick={resetBooking}
            className="text-cyan-600 hover:text-cyan-700 font-bold transition-colors duration-300 text-lg"
          >
            BOOK ANOTHER APPOINTMENT →
          </button>
        </div>
      </div>
    </div>
  );

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return renderLandingPage();
      case 'categories':
        return renderCategories();
      case 'services':
        return renderServices();
      case 'datetime':
        return renderDateTime();
      case 'information':
        return renderInformation();
      case 'confirmation':
        return renderConfirmation();
      default:
        return renderLandingPage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {renderHero()}
      {renderCurrentStep()}
      
      {/* Footer note */}
      {/* <div className="text-center text-gray-500 text-sm py-8 px-6">
        Powered by AI + Automation Technology
      </div> */}
    </div>
  );
};

export default SalonBooking;