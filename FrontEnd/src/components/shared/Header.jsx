import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { FaSearch, FaUserCircle, FaBell } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5';
import { useDispatch, useSelector} from 'react-redux';
import { removeUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../https/index"
import { MdDashboard, MdEventNote } from 'react-icons/md';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state)=> state.user);

  const logoutMutation = useMutation({
    mutationFn: ()=> logout(),
    onSuccess: (data) =>{
      console.log(data);
      dispatch(removeUser());
      navigate("/auth")
    },
    onError: (error) =>{
      console.log(error);
    }
  })

  const handleLogout = () =>{
    logoutMutation.mutate();
  }

  return (
    <header className="flex justify-between items-center py-3 px-6
                   bg-gradient-to-br from-[#031107] via-[#042510] to-[#05391a]
                   backdrop-blur-md border-b border-[#111] shadow-lg">

      <div onClick={()=> navigate("/")} className="flex items-center gap-3 cursor-pointer">
        <img src='/logo.png' className="h-10 w-10 rounded-xl shadow-md" alt="Hotel Logo" />
        <h1 className="text-md font-bold text-white drop-shadow-md">Hell's Kitchen</h1>
      </div>

      <div className="flex items-center gap-3 bg-[#1f1f1f]/90 backdrop-blur-sm rounded-2xl px-5 py-2 shadow-md w-[480px] transition-all hover:scale-105">
        <FaSearch className="text-white text-md" />
        <input 
          type="text"
          placeholder='Search Your Desires'
          className='bg-transparent text-[#f5f5f5] placeholder:text-neutral-400 outline-none w-full'
        />
      </div>

      <div className="flex items-center gap-6">
        {
          userData.role === "Admin" ? (
            <div onClick={()=> navigate("/dashboard")} className="bg-[#111111]/80 backdrop-blur-sm rounded-xl p-3 cursor-pointer shadow-md hover:scale-110 transition-transform header-tooltip" title="Admin Dashboard">
              <MdDashboard className="text-[#f5f5f5] text-2xl drop-shadow-md" />
            </div>
          ) : (
            <div onClick={()=> navigate("/dashboard")} className="bg-[#111111]/80 backdrop-blur-sm rounded-xl p-3 cursor-pointer shadow-md hover:scale-110 transition-transform header-tooltip" title="Leave Portal">
              <MdEventNote className="text-emerald-400 text-2xl drop-shadow-md" />
            </div>
          )
        }
        <div className="bg-[#111111]/80 backdrop-blur-sm rounded-xl p-3 cursor-pointer shadow-md hover:scale-110 transition-transform">
          <FaBell className="text-[#f5f5f5] text-2xl drop-shadow-md" />
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-4xl drop-shadow-md" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-emerald-400 font-semibold drop-shadow-md">{userData.name || "TEST USER"}</h1>
            <p className="text-xs text-gray-500 font-medium">{userData.role || "Role"}</p>
          </div>
          <IoLogOut onClick={handleLogout} className='text-[#f5f5f5] ml-2 hover:text-red-400' size={35} />
        </div>
      </div>

    </header>
  );
};

export default Header