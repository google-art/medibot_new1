const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-300 pt-14 pb-6 overflow-hidden">
      
      {/* TOP SINGLE CYAN LINE */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400" />

      <div className="max-w-7xl mx-auto px-6">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LOGO + DESC */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-cyan-400 text-black font-bold px-3 py-2">
                W
              </div>
              <span className="text-cyan-400 font-semibold text-lg">
                WYN_AI
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-3">
              AI + Automation Products
            </p>

            <p className="text-xs text-gray-500">
              © 2026 All Rights Reserved
            </p>
          </div>

          {/* INDUSTRIES */}
          <div>
            <h4 className="text-cyan-400 font-medium mb-4">Industries</h4>
            <ul className="space-y-3 text-sm">
              <li>► Driving Schools</li>
              <li>► Medical Practices</li>
              <li>► Restaurants</li>
              <li>► Salons</li>
            </ul>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="text-cyan-400 font-medium mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>► How It Works</li>
              <li>► Pricing</li>
              <li>► Integrations</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-cyan-400 font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>► About</li>
              <li>► Contact</li>
              <li>► Email Us</li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="mt-10 border-t border-gray-700 opacity-40" />

        {/* BOTTOM TEXT */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Powered by AI + Automation Technology
        </p>
      </div>
    </footer>
  );
};

export default Footer;
