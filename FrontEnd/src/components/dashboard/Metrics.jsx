import React, { useState } from 'react'
import { itemsData, metricsData } from '../../constants'
import BackButton from '../shared/BackButton';
import BottomNav from '../shared/BottomNav';

const PERIODS = ['Today', 'This Week', 'Last Month', 'This Year'];

const Metrics = () => {
  const [activePeriod, setActivePeriod] = useState('Last Month');

  return (
    <div className="min-h-screen bg-[#0c1018] px-8 py-7">

      {/* ── Page header ── */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <BackButton />
            <div className="w-px h-4 bg-white/20" />
            <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Barlow Condensed' }}>
              Analytics
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-1"
            style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.03em' }}>
            Overall Performance
          </h1>
          <p className="text-white/45 text-sm mt-0.5 max-w-lg leading-relaxed">
            Track key restaurant metrics, item performance, and growth trends across your chosen period.
          </p>
        </div>

        {/* Period toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-white/[0.12]"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`px-3.5 py-2 rounded-lg text-xs tracking-widest uppercase
                          transition-all duration-200 font-medium
                          ${activePeriod === p
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                            : 'text-white/45 hover:text-white/70 border border-transparent'
                          }`}
              style={{ fontFamily: 'Barlow Condensed' }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ── Performance metrics ── */}
      <Section
        title="Performance Metrics"
        subtitle="Core KPIs for the selected period"
      />
      <div className="grid grid-cols-4 gap-4 mt-4">
        {metricsData.map((metric, i) => (
          <MetricCard key={i} metric={metric} />
        ))}
      </div>

      {/* ── Item details ── */}
      <Section
        title="Item Details"
        subtitle="Breakdown by menu category and item performance"
        className="mt-10"
      />
      <div className="grid grid-cols-4 gap-4 mt-4">
        {itemsData.map((item, i) => (
          <ItemCard key={i} item={item} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

/* ── Section heading ── */
const Section = ({ title, subtitle, className = '' }) => (
  <div className={className}>
    <div className="flex items-center gap-3 mb-1">
      <div className="w-1 h-4 rounded-full bg-amber-400" />
      <h2 className="text-white font-bold text-lg"
        style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.04em' }}>
        {title}
      </h2>
    </div>
    {subtitle && (
      <p className="text-white/40 text-xs ml-4 tracking-wide">{subtitle}</p>
    )}
  </div>
);

/* ── Metric card ── */
const MetricCard = ({ metric }) => {
  const up = metric.isIncrease;
  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden
                 border border-white/[0.12]
                 hover:border-white/25 transition-all duration-300 group"
      style={{ background: `linear-gradient(145deg, ${metric.color}33 0%, rgba(14,18,28,0.85) 100%)` }}
    >
      <span className="absolute top-0 left-0 w-12 h-px"
        style={{ background: `linear-gradient(to right, ${metric.color}, transparent)` }} />
      <span className="absolute top-0 left-0 w-px h-12"
        style={{ background: `linear-gradient(to bottom, ${metric.color}, transparent)` }} />

      <div className="flex justify-between items-start">
        <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase leading-tight"
          style={{ fontFamily: 'Barlow Condensed' }}>
          {metric.title}
        </p>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold
                         ${up ? 'bg-emerald-400/15 text-emerald-300' : 'bg-red-400/15 text-red-300'}`}
          style={{ fontFamily: 'Barlow Condensed' }}>
          <span>{up ? '▲' : '▼'}</span>
          <span>{metric.percentage}</span>
        </div>
      </div>

      <p className="mt-4 text-4xl font-bold text-white leading-none"
        style={{ fontFamily: 'Barlow Condensed' }}>
        {metric.value}
      </p>

      <div className="mt-4 h-0.5 rounded-full bg-white/[0.08] overflow-hidden">
        <div className="h-full rounded-full w-0 group-hover:w-full transition-all duration-700"
          style={{ background: `linear-gradient(to right, ${metric.color}, transparent)` }} />
      </div>
    </div>
  );
};

/* ── Item card ── */
const ItemCard = ({ item }) => (
  <div
    className="relative rounded-2xl p-5 overflow-hidden
               border border-white/[0.12]
               hover:border-white/25 transition-all duration-300 group"
    style={{ background: `linear-gradient(145deg, ${item.color}28 0%, rgba(14,18,28,0.85) 100%)` }}
  >
    <span className="absolute top-0 left-0 w-12 h-px"
      style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }} />
    <span className="absolute top-0 left-0 w-px h-12"
      style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }} />

    <div className="flex justify-between items-start">
      <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase"
        style={{ fontFamily: 'Barlow Condensed' }}>
        {item.title}
      </p>
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full
                      bg-emerald-400/15 text-emerald-300 text-[10px] font-semibold"
        style={{ fontFamily: 'Barlow Condensed' }}>
        <span>▲</span>
        <span>{item.percentage}</span>
      </div>
    </div>

    <p className="mt-4 text-4xl font-bold text-white leading-none"
      style={{ fontFamily: 'Barlow Condensed' }}>
      {item.value}
    </p>

    <div className="mt-4 h-0.5 rounded-full bg-white/[0.08] overflow-hidden">
      <div className="h-full rounded-full w-0 group-hover:w-full transition-all duration-700"
        style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }} />
    </div>
  </div>
);

export default Metrics;