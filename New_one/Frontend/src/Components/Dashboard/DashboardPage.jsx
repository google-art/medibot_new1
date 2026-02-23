import { Box, Calendar, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../FirstPage/DashboardNav";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-inter">
      {/* <DashboardNavbar /> */}

      {/* HEADER */}
      <section className="bg-black text-white border-b-2 border-cyan-400">
        <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Dashboard</h1>
            <p className="text-gray-300">Welcome back, durgasayyi!</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">Account Email</p>
            <p>durgasayyi@gmail.com</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <Stat icon={<Box />} label="Active Products" value="2" />
        <Stat icon="📈" label="Monthly Spend" value="$178" />
        <Stat icon={<Calendar />} label="Next Billing" value="2/1/2025" />
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="border-2 border-black p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Your Products</h2>

            {/* 🔥 THIS IS THE IMPORTANT PART */}
            <button
              onClick={() => navigate("/")}
              className="bg-cyan-400 px-4 py-2 font-semibold"
            >
              + Browse Products
            </button>
          </div>

          <Product
            title="Lead Scraping & Enrichment"
            badge="TRIAL"
            badgeColor="yellow"
            price="$99/month"
          />

          <Product
            title="Automatic Social Media Content"
            badge="ACTIVE"
            badgeColor="green"
            price="$79/month"
          />

          <Product
            title="AutoBook"
            badge="EXPIRED"
            badgeColor="red"
            price="$49/month"
            renew
          />
        </div>
      </section>

      {/* ACCOUNT SETTINGS */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="border-2 border-black p-6">
          <h2 className="text-xl font-bold flex gap-2 mb-6">
            <Settings /> Account Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Full Name" value="durgasayyi" />
            <Input label="Email Address" value="durgasayyi@gmail.com" />
            <Input label="Account Created" value="January 2, 2025" />
            <Input label="Account Status" value="Active" />
          </div>

          <div className="flex gap-4 mt-6">
            <button className="bg-cyan-400 px-6 py-2 font-semibold">
              Update Profile
            </button>
            <button className="border-2 border-black px-6 py-2 font-semibold">
              Change Password
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function Stat({ icon, label, value }) {
  return (
    <div className="border-2 border-black p-6 flex gap-4 items-center">
      <div className="text-cyan-400">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function Product({ title, badge, badgeColor, price, renew }) {
  const badgeStyles = {
    yellow: "bg-yellow-200 text-yellow-800",
    green: "bg-green-200 text-green-800",
    red: "bg-red-200 text-red-800",
  };

  return (
    <div className="border-2 border-black p-6 mb-6 flex justify-between">
      <div>
        <h3 className="font-bold text-lg">
          {title}
          <span className={`ml-3 text-xs px-2 py-1 ${badgeStyles[badgeColor]}`}>
            {badge}
          </span>
        </h3>
        <p className="mt-3 font-semibold">{price}</p>
      </div>

      <div className="flex flex-col gap-3">
        {renew ? (
          <button className="border-2 border-black px-6 py-2 font-semibold">
            Renew Now
          </button>
        ) : (
          <>
            <button className="bg-cyan-400 px-6 py-2 font-semibold">
              Open Product
            </button>
            <button className="border-2 border-black px-6 py-2 font-semibold">
              Manage
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Input({ label, value }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        disabled
        value={value}
        className="w-full border mt-2 px-3 py-2 bg-gray-100"
      />
    </div>
  );
}
