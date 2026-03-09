import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";
import EmployeeManagement from "../components/dashboard/EmployeeManagement";
import MoreSection from "../components/dashboard/MoreSection";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["More", "Orders", "Staff", "Payments"];

const Dashboard = () => {

  const { role } = useSelector((state) => state.user);
  const isAdmin = role === "Admin";

  useEffect(() => {
    document.title = isAdmin ? "Administrator" : "Employee Portal";
  }, [isAdmin])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState("");
  const [activeTab, setActiveTab] = useState(isAdmin ? "More" : "Staff");

  const handleOpenModal = (action) => {
    setModalActionType(action);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#1f1f1f] h-[calc(100vh-5rem)]">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-4">
        <div className="flex items-center gap-3">
          {isAdmin && buttons.map(({ label, icon, action }) => {
            return (
              <button
                key={label}
                onClick={() => handleOpenModal(action)}
                className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2"
              >
                {label} {icon}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && tabs.map((tab) => {
            return (
              <button
                key={tab}
                className={`
                px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ${activeTab === tab
                    ? "bg-[#262626]"
                    : "bg-[#1a1a1a] hover:bg-[#262626]"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "More" && <MoreSection />}
      {activeTab === "Orders" && <RecentOrders />}
      {activeTab === "Staff" && <EmployeeManagement />}
      {activeTab === "Payments" &&
        <div className="text-white p-6 container mx-auto">
          Payment Component Coming Soon
        </div>
      }

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} actionType={modalActionType} />}
    </div>
  );
};

export default Dashboard;