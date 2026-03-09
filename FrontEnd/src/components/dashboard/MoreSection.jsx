import React from 'react';
import { FaBoxes, FaStar, FaTags, FaFileAlt } from 'react-icons/fa';

const cardStyle = "bg-[#1a1a1a] shadow-lg rounded-2xl p-6 border border-white/5 backdrop-blur-md";

const inventoryAlerts = [
  { id: 1, item: "Fresh Tomatoes", status: "Low Stock", qty: "2 kg" },
  { id: 2, item: "Mozzarella Cheese", status: "Critical", qty: "0.5 kg" },
  { id: 3, item: "Olive Oil", status: "Low Stock", qty: "3 L" },
];

const recentReviews = [
  { id: 1, author: "Sarah M.", rating: 5, text: "Absolutely loved the Hyderabadi Biryani! Will come back soon." },
  { id: 2, author: "Jake T.", rating: 4, text: "Great ambiance, but the drinks took a little while. Food was excellent." },
  { id: 3, author: "Emily R.", rating: 5, text: "The Midnight theme is so cool! Paneer Tikka was the highlight." },
];

const activePromotions = [
  { id: 1, title: "Happy Hour", desc: "20% off all beverages from 4 PM - 7 PM", code: "HAPPY20" },
  { id: 2, title: "Weekend Fiesta", desc: "Complimentary dessert with Main Course", code: "FIESTA" },
];

const MoreSection = () => {
  return (
    <div className="container mx-auto py-8 lg:px-6 min-h-screen bg-[#1f1f1f]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#f5f5f5] tracking-tight">Additional Tools</h2>
        <p className="text-[#6b6b6b] mt-1 text-sm">Inventory alerts, customer insights, and promotional controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Inventory Alerts */}
        <div className={`${cardStyle} flex items-start flex-col`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
              <FaBoxes className="text-orange-400 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#f5f5f5]">Inventory Alerts</h3>
          </div>
          <div className="w-full space-y-3">
            {inventoryAlerts.map(alert => (
              <div key={alert.id} className="flex justify-between items-center bg-[#222222] p-3 rounded-xl border border-white/5">
                <div>
                  <p className="text-sm font-medium text-gray-300">{alert.item}</p>
                  <p className={`text-xs font-bold mt-0.5 ${alert.status === 'Critical' ? 'text-red-400' : 'text-amber-400'}`}>
                    {alert.status}
                  </p>
                </div>
                <span className="text-sm text-gray-500 font-semibold">{alert.qty}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-5 py-2.5 rounded-xl border border-white/10 text-sm text-gray-300 font-medium hover:bg-white/5 transition-colors">
            Manage Inventory
          </button>
        </div>

        {/* Recent Reviews */}
        <div className={`${cardStyle} flex items-start flex-col xl:col-span-2`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <FaStar className="text-yellow-400 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#f5f5f5]">Recent Reviews</h3>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentReviews.map(review => (
              <div key={review.id} className="bg-[#222222] p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-gray-200">{review.author}</span>
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
                <p className="text-xs text-gray-400 italic">"{review.text}"</p>
              </div>
            ))}
          </div>
          <button className="mt-5 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            View All Reviews →
          </button>
        </div>

        {/* Active Promotions */}
        <div className={`${cardStyle} flex items-start flex-col xl:col-span-2`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <FaTags className="text-purple-400 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#f5f5f5]">Active Promotions</h3>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePromotions.map(promo => (
              <div key={promo.id} className="bg-gradient-to-br from-[#222222] to-[#1a1a1a] p-4 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full"></div>
                <h4 className="text-sm font-bold text-purple-300 mb-1">{promo.title}</h4>
                <p className="text-xs text-gray-400 mb-3">{promo.desc}</p>
                <code className="text-xs font-mono bg-black/40 px-2 py-1 rounded text-purple-200 border border-purple-500/20">
                  {promo.code}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reports */}
        <div className={`${cardStyle} flex items-start flex-col`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <FaFileAlt className="text-blue-400 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#f5f5f5]">Quick Reports</h3>
          </div>
          <div className="w-full space-y-3">
            <button className="w-full text-left px-4 py-3 bg-[#222222] hover:bg-[#2a2a2a] border border-white/5 rounded-xl text-sm text-gray-300 font-medium transition-colors flex justify-between items-center group">
              <span>End of Day Summary</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-[#222222] hover:bg-[#2a2a2a] border border-white/5 rounded-xl text-sm text-gray-300 font-medium transition-colors flex justify-between items-center group">
              <span>Staff Performance</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-[#222222] hover:bg-[#2a2a2a] border border-white/5 rounded-xl text-sm text-gray-300 font-medium transition-colors flex justify-between items-center group">
              <span>Tax & Ledger Exports</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MoreSection;
