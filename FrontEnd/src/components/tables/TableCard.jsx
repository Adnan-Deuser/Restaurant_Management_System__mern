import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateTable } from '../../redux/slices/customerSlice';
import { getAvatarName } from '../../utils';

const TableCard = ({ name, status, initials, seats }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "Booked") return;
    dispatch(updateTable({ tableNo: name }))
    navigate("/menu");
  }

  const isBooked = status === "Booked";

  return (
    <div
      onClick={handleClick}
      className={`w-[360px] p-6 rounded-2xl cursor-pointer
      transition-all duration-300 border
      ${isBooked
        ? "bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border-[#3a3a3a]"
        : "bg-gradient-to-br from-[#1f2d2a] to-[#1a1f1d] border-[#2f4f46] hover:scale-[1.03] hover:shadow-xl"}
      `}
    >

      <div className='flex items-center justify-between'>
        <h1 className='text-white text-xl font-bold tracking-wide'>
          Table {name}
        </h1>

        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full
          ${isBooked
            ? "bg-red-500/20 text-red-400"
            : "bg-green-500/20 text-green-400"}
          `}
        >
          {status}
        </span>
      </div>

      <div className='flex justify-center my-6'>
        <div
          className={`h-20 w-20 flex items-center justify-center
          rounded-full text-2xl font-bold shadow-lg
          ${isBooked
            ? "bg-red-600 text-white"
            : "bg-gradient-to-br from-green-400 to-emerald-600 text-black"}
          `}
        >
          {getAvatarName(initials) || "N/A"}
        </div>
      </div>

      <div className='flex justify-between items-center text-sm'>
        <span className='text-[#9f9f9f]'>
          Seats
        </span>
        <span className='text-white font-semibold'>
          {seats}
        </span>
      </div>

    </div>
  )
}

export default TableCard