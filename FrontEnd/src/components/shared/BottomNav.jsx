import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { MdTableBar, MdOutlineReorder, MdOutlineAnalytics } from 'react-icons/md'
import { BiSolidDish } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from "./Modal"
import { setCustomer } from '../../redux/slices/customerSlice';
import { useDispatch } from 'react-redux';

const NAV_ITEMS = [
  { path: '/',        icon: FaHome,             label: 'Home'    },
  { path: '/orders',  icon: MdOutlineReorder,   label: 'Orders'  },
  { path: '/tables',  icon: MdTableBar,         label: 'Tables'  },
  { path: '/metrics', icon: MdOutlineAnalytics, label: 'Metrics' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests]           = useState(0);
  const [name,   setName]             = useState('');
  const [phone,  setPhone]            = useState('');

  const isActive  = (path) => location.pathname === path;
  const fabLocked = isActive('/tables') || isActive('/menu');

  const handleCreateOrder = () => {
    dispatch(setCustomer({ name, phone, guests }));
    navigate('/tables');
  };

  return (
    <>
      {/* ── Bar ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 h-16
                   bg-[#07090e]/95 backdrop-blur-xl
                   border-t border-white/[0.06]"
        style={{ boxShadow: '0 -8px 32px rgba(0,0,0,0.5)' }}
      >
        {/* amber top-line accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px
                        bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="flex items-center justify-around h-full px-2 max-w-lg mx-auto">

          {NAV_ITEMS.slice(0, 2).map(({ path, icon: Icon, label }) => (
            <NavBtn key={path} active={isActive(path)} onClick={() => navigate(path)}>
              <Icon size={19} />
              <span>{label}</span>
            </NavBtn>
          ))}

          {/* FAB gap */}
          <div className="w-16 flex-shrink-0" />

          {NAV_ITEMS.slice(2).map(({ path, icon: Icon, label }) => (
            <NavBtn key={path} active={isActive(path)} onClick={() => navigate(path)}>
              <Icon size={19} />
              <span>{label}</span>
            </NavBtn>
          ))}
        </div>

        {/* ── Floating Action Button ── */}
        <button
          disabled={fabLocked}
          onClick={() => setIsModalOpen(true)}
          className={`
            absolute left-1/2 -translate-x-1/2 -top-[1.6rem]
            w-14 h-14 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${fabLocked
              ? 'opacity-40 cursor-not-allowed bg-[#1a1a1a] border border-white/10'
              : 'hover:scale-110 active:scale-95'
            }
          `}
          style={fabLocked ? {} : {
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f97316 100%)',
            boxShadow: '0 0 24px rgba(245,158,11,0.45), 0 4px 16px rgba(0,0,0,0.5)',
          }}
        >
          <BiSolidDish
            size={24}
            className={fabLocked ? 'text-white/30' : 'text-[#0f0a00]'}
          />
          {/* ring pulse */}
          {!fabLocked && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }}
            />
          )}
        </button>
      </nav>

      {/* ── Create Order Modal ── */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Order">

        {/* Customer name */}
        <ModalField label="Customer Name">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. James Whitfield"
            className={inputCls}
          />
        </ModalField>

        {/* Phone */}
        <ModalField label="Phone Number">
          <input
            type="number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className={inputCls}
          />
        </ModalField>

        {/* Guests */}
        <ModalField label="Guests">
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => setGuests(g => Math.max(0, g - 1))}
              className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04]
                         text-amber-400 text-xl font-light
                         hover:bg-amber-400/10 hover:border-amber-400/30
                         transition-all duration-150 flex items-center justify-center"
            >
              −
            </button>
            <div className="flex flex-col items-center">
              <span className="text-white text-2xl font-bold leading-none"
                style={{ fontFamily: 'Barlow Condensed' }}>
                {guests}
              </span>
              <span className="text-white/20 text-[9px] tracking-widest uppercase mt-0.5"
                style={{ fontFamily: 'Barlow Condensed' }}>
                {guests === 1 ? 'guest' : 'guests'}
              </span>
            </div>
            <button
              onClick={() => setGuests(g => Math.min(6, g + 1))}
              disabled={guests >= 6}
              className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04]
                         text-amber-400 text-xl font-light
                         hover:bg-amber-400/10 hover:border-amber-400/30
                         disabled:opacity-30 disabled:cursor-not-allowed
                         transition-all duration-150 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </ModalField>

        {/* max-guests hint */}
        {guests === 6 && (
          <p className="text-[10px] text-amber-400/60 tracking-widest uppercase text-center -mt-2 mb-1"
            style={{ fontFamily: 'Barlow Condensed' }}>
            Maximum capacity reached
          </p>
        )}

        {/* CTA */}
        <button
          onClick={handleCreateOrder}
          className="relative mt-6 w-full py-3.5 rounded-lg overflow-hidden group
                     text-sm font-bold tracking-widest uppercase text-[#0f0a00]
                     transition-all duration-300"
          style={{ fontFamily: 'Barlow Condensed' }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400
                           group-hover:brightness-110 transition-all duration-300" />
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                           transition-transform duration-700
                           bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <span className="relative">Select Table →</span>
        </button>

      </Modal>
    </>
  );
};

/* ── Nav button ── */
const NavBtn = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl
      text-[10px] tracking-[0.15em] uppercase font-medium
      transition-all duration-200
      ${active
        ? 'text-amber-400'
        : 'text-white/30 hover:text-white/60'
      }
    `}
    style={{ fontFamily: 'Barlow Condensed' }}
  >
    {/* icon with active indicator line */}
    <span className="relative">
      {children[0]}
      {active && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1
                         rounded-full bg-amber-400" />
      )}
    </span>
    {children[1]}
  </button>
);

/* ── Modal field wrapper ── */
const ModalField = ({ label, children }) => (
  <div className="flex flex-col gap-1.5 mb-5">
    <label
      className="text-[10px] tracking-[0.2em] uppercase text-white/35"
      style={{ fontFamily: 'Barlow Condensed' }}
    >
      {label}
    </label>
    {children}
  </div>
);

const inputCls = `
  w-full bg-transparent text-white/85 text-sm placeholder-white/20
  border-b border-white/10 py-3
  focus:outline-none focus:border-amber-400/50
  transition-colors duration-200
`.trim();

export default BottomNav;