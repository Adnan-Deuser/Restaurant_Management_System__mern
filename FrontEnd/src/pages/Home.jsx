import React from 'react'
import BottomNav from '../components/shared/BottomNav';
import Greetings from "../components/home/Greetings"
import MiniCard from "../components/home/MiniCard"
import { BsCashCoin } from 'react-icons/bs';
import { GrInProgress } from 'react-icons/gr';
import RecentOrders from '../components/home/RecentOrders';
import PopularDishes from '../components/home/PopularDishes';

const Home = () => {
  return (
    <section className="bg-[#07090e] h-[calc(100vh-4rem)] overflow-hidden flex gap-0">

      {/* ── Left / Main column ── */}
      <div className="flex flex-col flex-[3] overflow-hidden border-r border-white/[0.05]">
        <Greetings />
        <div className="flex items-stretch gap-4 px-7 mt-5">
          <MiniCard title="Total Earnings" icon={<BsCashCoin />} number={512}   footerNum={1.6} />
          <MiniCard title="In Progress"    icon={<GrInProgress />} number={16}  footerNum={3.6} />
        </div>
        <RecentOrders />
      </div>

      {/* ── Right / Popular dishes column ── */}
      <div className="flex-[1.4] overflow-hidden">
        <PopularDishes />
      </div>

      <BottomNav />
    </section>
  );
};

export default Home;