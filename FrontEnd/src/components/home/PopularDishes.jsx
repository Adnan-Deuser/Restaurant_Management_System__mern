import React from 'react'
import { popularDishes } from '../../constants'

const PopularDishes = () => {
  return (
    <div className="flex flex-col h-full pt-6 pr-6 pl-4">
      <div
        className="flex flex-col rounded-2xl overflow-hidden h-full
                   border border-white/[0.07]"
        style={{ background: 'rgba(255,255,255,0.015)' }}
      >
        {/* header */}
        <div className="flex justify-between items-center px-5 pt-5 pb-4 flex-shrink-0">
          <div>
            <h2
              className="text-white/85 text-base font-bold"
              style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.05em' }}
            >
              Popular Dishes
            </h2>
            <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mt-0.5"
              style={{ fontFamily: 'Barlow Condensed' }}>
              This week
            </p>
          </div>
          <button
            className="text-[10px] tracking-[0.2em] uppercase text-amber-400/70
                       hover:text-amber-400 transition-colors duration-200"
            style={{ fontFamily: 'Barlow Condensed' }}
          >
            View All →
          </button>
        </div>

        {/* divider */}
        <div className="mx-5 h-px bg-white/[0.05] flex-shrink-0" />

        {/* list */}
        <div className="flex-1 overflow-y-auto px-5 py-3 no-scrollbar space-y-1">
          {popularDishes.map((dish, idx) => (
            <DishRow key={dish.id} dish={dish} rank={idx + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DishRow = ({ dish, rank }) => {
  const isTop = rank <= 3;
  const rankColors = ['text-amber-400', 'text-white/50', 'text-amber-700/80'];
  const rankColor  = isTop ? rankColors[rank - 1] : 'text-white/20';

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                 border border-transparent
                 hover:bg-white/[0.03] hover:border-white/[0.06]
                 transition-all duration-200 group cursor-default"
    >
      {/* rank */}
      <span
        className={`w-5 text-xs font-bold tabular-nums flex-shrink-0 ${rankColor}`}
        style={{ fontFamily: 'Barlow Condensed' }}
      >
        {String(rank).padStart(2, '0')}
      </span>

      {/* image */}
      <div className="relative flex-shrink-0">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-10 h-10 rounded-xl object-cover"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        />
        {isTop && rank === 1 && (
          <span className="absolute -top-1.5 -right-1.5 text-[10px]">👑</span>
        )}
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-sm font-medium truncate leading-tight"
          style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.02em' }}>
          {dish.name}
        </p>
        <p className="text-white/25 text-[10px] tracking-widest uppercase mt-0.5"
          style={{ fontFamily: 'Barlow Condensed' }}>
          {dish.numberOfOrders} orders
        </p>
      </div>

      {/* mini bar */}
      <div className="w-14 flex-shrink-0">
        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
            style={{ width: `${Math.min(100, (dish.numberOfOrders / popularDishes[0].numberOfOrders) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;