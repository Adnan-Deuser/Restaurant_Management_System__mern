import React from 'react'

const palette = {
  "Total Earnings": {
    iconBg:   'rgba(245,158,11,0.12)',
    iconText: 'text-amber-400',
    accent:   'from-amber-400/20 to-transparent',
    corner:   'rgba(245,158,11,0.4)',
    numColor: 'text-amber-400',
  },
  "In Progress": {
    iconBg:   'rgba(56,189,248,0.10)',
    iconText: 'text-sky-400',
    accent:   'from-sky-400/15 to-transparent',
    corner:   'rgba(56,189,248,0.35)',
    numColor: 'text-sky-300',
  },
};

const MiniCard = ({ title, icon, number, footerNum }) => {
  const p = palette[title] ?? palette["In Progress"];
  const isEarnings = title === "Total Earnings";

  return (
    <div
      className="relative w-1/2 rounded-2xl px-6 py-5 overflow-hidden
                 border border-white/[0.07]
                 transition-all duration-300 hover:border-white/[0.13]"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(7,9,14,0) 100%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* top-left corner accent lines */}
      <span className="absolute top-0 left-0 w-10 h-px"
        style={{ background: `linear-gradient(to right, ${p.corner}, transparent)` }} />
      <span className="absolute top-0 left-0 w-px h-10"
        style={{ background: `linear-gradient(to bottom, ${p.corner}, transparent)` }} />

      {/* icon + title row */}
      <div className="flex items-start justify-between">
        <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-0.5"
          style={{ fontFamily: 'Barlow Condensed' }}>
          {title}
        </p>
        <div
          className={`p-2.5 rounded-xl text-lg flex items-center justify-center ${p.iconText}`}
          style={{ background: p.iconBg }}
        >
          {icon}
        </div>
      </div>

      {/* number */}
      <div className="mt-4">
        <h2
          className={`text-4xl font-bold leading-none ${p.numColor}`}
          style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.01em' }}
        >
          {isEarnings ? `₹${number}` : number}
        </h2>
      </div>

      {/* footer */}
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className="text-xs font-semibold tracking-wide"
          style={{ color: footerNum >= 0 ? '#34d399' : '#f87171' }}
        >
          {footerNum >= 0 ? '▲' : '▼'} {Math.abs(footerNum)}%
        </span>
        <span className="text-white/25 text-xs"
          style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.05em' }}>
          vs yesterday
        </span>
      </div>
    </div>
  );
};

export default MiniCard;