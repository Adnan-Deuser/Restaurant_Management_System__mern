import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { FaSearch, FaBell } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../https/index"
import { MdDashboard, MdEventNote } from 'react-icons/md';

const Header = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const userData   = useSelector((state) => state.user);
  const [searchFocused, setSearchFocused] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => { dispatch(removeUser()); navigate('/auth'); },
    onError:   (e) => console.log(e),
  });

  const isAdmin = userData.role === 'Admin';

  /* role badge colour */
  const rolePalette = {
    Admin:   { dot: 'bg-amber-400',   text: 'text-amber-400'   },
    Cashier: { dot: 'bg-sky-400',     text: 'text-sky-400'     },
    Waiter:  { dot: 'bg-emerald-400', text: 'text-emerald-400' },
  };
  const rp = rolePalette[userData.role] ?? { dot: 'bg-white/40', text: 'text-white/40' };

  return (
    <header className="relative flex items-center justify-between
                       px-6 py-0 h-16
                       bg-[#07090e] border-b border-white/[0.06]
                       z-50 select-none">

      {/* subtle amber glow top-left */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-64
                      bg-gradient-to-r from-amber-500/[0.04] to-transparent" />

      {/* ── Logo ── */}
      <div
        onClick={() => navigate('/')}
        className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-amber-400/10 blur-md
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src="/logo.png"
            className="relative h-9 w-9 rounded-xl object-cover"
            style={{ border: '1px solid rgba(245,158,11,0.25)' }}
            alt="Logo"
          />
        </div>
        <div className="flex flex-col leading-none">
          <span
            className="text-white/90 text-sm font-bold tracking-widest uppercase"
            style={{ fontFamily: 'Barlow Condensed' }}
          >
            Hell's Kitchen
          </span>
          <span className="text-amber-400/50 text-[9px] tracking-[0.3em] uppercase mt-0.5"
            style={{ fontFamily: 'Barlow Condensed' }}>
            Restaurant OS
          </span>
        </div>
      </div>

      {/* ── Search ── */}
      <div
        className={`
          flex items-center gap-3 w-[420px] px-4 py-2.5 rounded-xl
          border transition-all duration-300
          ${searchFocused
            ? 'bg-white/[0.05] border-amber-400/30 shadow-[0_0_20px_rgba(245,158,11,0.07)]'
            : 'bg-white/[0.03] border-white/[0.07]'
          }
        `}
      >
        <FaSearch className={`text-sm flex-shrink-0 transition-colors duration-200
          ${searchFocused ? 'text-amber-400/70' : 'text-white/25'}`}
        />
        <input
          type="text"
          placeholder="Search orders, tables, staff…"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="bg-transparent text-white/80 text-sm placeholder-white/20
                     outline-none w-full"
        />
        {/* kbd hint */}
        <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
          <kbd className="text-[9px] text-white/20 bg-white/[0.05] border border-white/10
                          rounded px-1.5 py-0.5 tracking-widest" style={{fontFamily:'Barlow Condensed'}}>
            ⌘K
          </kbd>
        </div>
      </div>

      {/* ── Right cluster ── */}
      <div className="flex items-center gap-2">

        {/* Dashboard / Leave portal */}
        <NavButton
          onClick={() => navigate('/dashboard')}
          title={isAdmin ? 'Dashboard' : 'Leave Portal'}
        >
          {isAdmin
            ? <MdDashboard className="text-white/60 text-lg group-hover:text-amber-400 transition-colors" />
            : <MdEventNote className="text-white/60 text-lg group-hover:text-amber-400 transition-colors" />
          }
        </NavButton>

        {/* Notifications */}
        <NavButton title="Notifications">
          <div className="relative">
            <FaBell className="text-white/60 text-base group-hover:text-amber-400 transition-colors" />
            {/* unread badge */}
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400
                             ring-2 ring-[#07090e]" />
          </div>
        </NavButton>

        {/* divider */}
        <div className="w-px h-6 bg-white/[0.08] mx-1" />

        {/* User card */}
        <div className="flex items-center gap-3 pl-1">
          {/* avatar placeholder */}
          <div className="relative flex-shrink-0">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center
                         text-xs font-bold text-[#07090e]"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}
            >
              {(userData.name || 'U').charAt(0).toUpperCase()}
            </div>
            {/* online dot */}
            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full
                              ${rp.dot} ring-2 ring-[#07090e]`} />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-white/85 text-sm font-medium"
              style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.03em' }}>
              {userData.name || 'User'}
            </span>
            <span className={`text-[10px] tracking-[0.18em] uppercase ${rp.text}`}
              style={{ fontFamily: 'Barlow Condensed' }}>
              {userData.role || 'Staff'}
            </span>
          </div>

          {/* logout */}
          <button
            onClick={() => logoutMutation.mutate()}
            title="Sign out"
            className="ml-1 p-2 rounded-lg text-white/25 hover:text-red-400
                       hover:bg-red-400/08 border border-transparent
                       hover:border-red-400/20
                       transition-all duration-200"
          >
            <IoLogOut size={18} />
          </button>
        </div>

      </div>
    </header>
  );
};

/* ── tiny icon button ── */
const NavButton = ({ children, onClick, title }) => (
  <button
    onClick={onClick}
    title={title}
    className="group relative p-2.5 rounded-xl
               text-white/50 hover:text-white
               border border-transparent hover:border-white/10
               hover:bg-white/[0.04]
               transition-all duration-200"
  >
    {children}
  </button>
);

export default Header;