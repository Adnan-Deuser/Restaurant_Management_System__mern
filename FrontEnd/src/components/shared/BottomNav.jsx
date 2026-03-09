import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { MdTableBar, MdOutlineReorder } from 'react-icons/md'
import { CiCircleMore } from "react-icons/ci";
import { MdOutlineAnalytics } from "react-icons/md";
import { BiSolidDish } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from "./Modal"
import { setCustomer } from '../../redux/slices/customerSlice';
import { useDispatch } from 'react-redux';

const BottomNav = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [guests, setGuests] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreateOrder = () => {
    dispatch(setCustomer({ name, phone, guests }))
    navigate("/tables")
  }

  const addGuest = () => {
    if (guests >= 6) return;
    setGuests(prev => prev + 1);
  }

  const subGuest = () => {
    if (guests <= 0) return;
    setGuests(prev => prev - 1);
  }

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 bg-[#1c1c1c] backdrop-blur-md border-t border-[#2a2a2a] px-6 py-3 flex items-center justify-between z-50'>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-6 flex-1 justify-around">

          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
              ${isActive("/") 
                ? "bg-[#2f2f2f] text-white shadow-md" 
                : "text-gray-400 hover:text-white hover:bg-[#262626]"}
            `}
          >
            <FaHome size={18} />
            <span className="font-medium text-sm">Home</span>
          </button>

          <button
            onClick={() => navigate("/orders")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
              ${isActive("/orders") 
                ? "bg-[#2f2f2f] text-white shadow-md" 
                : "text-gray-400 hover:text-white hover:bg-[#262626]"}
            `}
          >
            <MdOutlineReorder size={18} />
            <span className="font-medium text-sm">Orders</span>
          </button>

          <button
            onClick={() => navigate("/tables")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
              ${isActive("/tables") 
                ? "bg-[#2f2f2f] text-white shadow-md" 
                : "text-gray-400 hover:text-white hover:bg-[#262626]"}
            `}
          >
            <MdTableBar size={18} />
            <span className="font-medium text-sm">Tables</span>
          </button>

          <button
            onClick={() => navigate("/metrics")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
              ${isActive("/metrics") 
                ? "bg-[#2f2f2f] text-white shadow-md" 
                : "text-gray-400 hover:text-white hover:bg-[#262626]"}
            `}
          >
            <MdOutlineAnalytics size={18} />
            <span className="font-medium text-sm">Metrics</span>
          </button>

        </div>

        {/* Floating Action Button */}
        <button
          disabled={isActive("/tables") || isActive("/menu")}
          onClick={openModal}
          className={`absolute -top-6 left-1/2 -translate-x-1/2
            bg-gradient-to-br from-yellow-400 to-orange-500
            text-black rounded-full p-4 shadow-xl
            transition-all duration-300
            ${(isActive("/tables") || isActive("/menu"))
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-110 hover:shadow-2xl"}
          `}
        >
          <BiSolidDish size={26} />
        </button>

      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">

        <div>
          <label className='block text-gray-400 mb-2 text-sm font-medium'>
            Customer Name
          </label>
          <div className='flex items-center rounded-xl px-4 py-3 bg-[#1f1f1f] border border-[#2a2a2a]'>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Customer Name"
              className='bg-transparent flex-1 text-white focus:outline-none'
            />
          </div>
        </div>

        <div>
          <label className='block text-gray-400 mb-2 mt-5 text-sm font-medium'>
            Phone Number
          </label>
          <div className='flex items-center rounded-xl px-4 py-3 bg-[#1f1f1f] border border-[#2a2a2a]'>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9999999999"
              className='bg-transparent flex-1 text-white focus:outline-none tracking-wider'
            />
          </div>
        </div>

        <div>
          <label className='block mb-2 mt-5 text-sm font-medium text-gray-400'>
            Guests
          </label>
          <div className='flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-xl border border-[#2a2a2a]'>
            <button onClick={subGuest} className='text-yellow-500 text-2xl'>
              &minus;
            </button>
            <span className='text-white font-semibold'>{guests}</span>
            <button onClick={addGuest} className='text-yellow-500 text-2xl'>
              &#43;
            </button>
          </div>
        </div>

        <button
          onClick={handleCreateOrder}
          className='w-full bg-gradient-to-r from-orange-400 to-yellow-500
          text-black rounded-xl py-3 mt-8 font-semibold
          hover:scale-[1.02] transition-all duration-200'
        >
          Create Order
        </button>

      </Modal>
    </>
  )
}

export default BottomNav;