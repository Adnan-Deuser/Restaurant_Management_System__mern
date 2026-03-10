import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
  const userData          = useSelector((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const getGreeting = (d) => {
    const h = d.getHours();
    if (h < 12) return { text: "Good Morning",   emoji: "🌤" };
    if (h < 18) return { text: "Good Afternoon",  emoji: "☀️" };
    return          { text: "Good Evening",    emoji: "🌙" };
  };

  const formatDate = (d) => {
    const months = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];
    const days   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return { day: days[d.getDay()], full: `${months[d.getMonth()]} ${String(d.getDate()).padStart(2,"0")}, ${d.getFullYear()}` };
  };

  const formatTime = (d) => {
    let h   = d.getHours();
    const m = String(d.getMinutes()).padStart(2,"0");
    const s = String(d.getSeconds()).padStart(2,"0");
    const a = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return { hm: `${String(h).padStart(2,"0")}:${m}`, sec: s, ampm: a };
  };

  const { text: greet, emoji } = getGreeting(dateTime);
  const { day, full: fullDate } = formatDate(dateTime);
  const { hm, sec, ampm }       = formatTime(dateTime);
  const first = (userData.name || "Chef").split(" ")[0];

  return (
    <div className="mx-7 mt-6">
      <div
        className="relative flex justify-between items-center px-7 py-5
                   rounded-2xl overflow-hidden
                   border border-white/[0.07]"
        style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(7,9,14,0) 60%)',
          boxShadow: 'inset 0 0 40px rgba(245,158,11,0.03)',
        }}
      >
        {/* decorative corner line */}
        <span className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-amber-400/50 to-transparent" />
        <span className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-amber-400/50 to-transparent" />

        {/* greeting */}
        <div>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-1.5"
            style={{ fontFamily: 'Barlow Condensed' }}>
            {emoji} &nbsp;{day}
          </p>
          <h1 className="text-2xl font-bold text-white/90"
            style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.02em' }}>
            {greet},&nbsp;
            <span className="text-amber-400">{first}</span>
          </h1>
          <p className="text-white/25 text-xs tracking-widest mt-1.5 uppercase"
            style={{ fontFamily: 'Barlow Condensed' }}>
            Serve with excellence
          </p>
        </div>

        {/* clock */}
        <div className="text-right">
          <div className="flex items-end justify-end gap-1.5">
            <span className="text-4xl font-bold text-white/90 leading-none tabular-nums"
              style={{ fontFamily: 'Barlow Condensed' }}>
              {hm}
            </span>
            <span className="text-xl font-bold text-amber-400/80 leading-none tabular-nums mb-0.5"
              style={{ fontFamily: 'Barlow Condensed' }}>
              :{sec}
            </span>
            <span className="text-xs text-white/30 tracking-widest uppercase mb-1"
              style={{ fontFamily: 'Barlow Condensed' }}>
              {ampm}
            </span>
          </div>
          <p className="text-white/25 text-xs tracking-widest mt-1.5 uppercase"
            style={{ fontFamily: 'Barlow Condensed' }}>
            {fullDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Greetings;