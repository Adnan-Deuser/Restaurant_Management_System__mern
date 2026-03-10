import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import OrderList from './OrderList'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { getOrders } from '../../https/index';
import { useNavigate } from 'react-router-dom';

const RecentOrders = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);

  const { data: resData, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => await getOrders(),
    placeholderData: keepPreviousData,
  });

  if (isError) enqueueSnackbar('Something went wrong', { variant: 'error' });

  const orders = resData?.data?.data ?? [];
  const filtered = orders.filter(o =>
    !search || o.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-7 mt-5 flex flex-col flex-1 min-h-0">
      <div
        className="flex flex-col rounded-2xl overflow-hidden flex-1 min-h-0
                   border border-white/[0.07]"
        style={{ background: 'rgba(255,255,255,0.015)' }}
      >
        {/* header */}
        <div className="flex justify-between items-center px-6 pt-5 pb-3 flex-shrink-0">
          <div>
            <h2
              className="text-white/85 text-base font-bold tracking-wide"
              style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.05em' }}
            >
              Recent Orders
            </h2>
            <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mt-0.5"
              style={{ fontFamily: 'Barlow Condensed' }}>
              {orders.length} total
            </p>
          </div>
          <button
            onClick={() => navigate('/orders')}
            className="text-[10px] tracking-[0.2em] uppercase text-amber-400/70
                       hover:text-amber-400 transition-colors duration-200 font-medium"
            style={{ fontFamily: 'Barlow Condensed' }}
          >
            View All →
          </button>
        </div>

        {/* search */}
        <div className="px-6 pb-3 flex-shrink-0">
          <div
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl
                        border transition-all duration-200
                        ${focused
                          ? 'border-amber-400/30 bg-white/[0.04]'
                          : 'border-white/[0.07] bg-white/[0.02]'
                        }`}
          >
            <FaSearch className={`text-xs flex-shrink-0 transition-colors duration-200
              ${focused ? 'text-amber-400/60' : 'text-white/20'}`}
            />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search by customer name…"
              className="bg-transparent text-white/75 text-sm
                         placeholder-white/20 outline-none w-full"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-white/25 hover:text-white/60 text-xs transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* divider */}
        <div className="mx-6 h-px bg-white/[0.05] flex-shrink-0" />

        {/* list */}
        <div className="flex-1 overflow-y-auto px-6 py-3 no-scrollbar">
          {filtered.length > 0 ? (
            filtered.map(order => (
              <OrderList key={order._id} order={order} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 py-8">
              <span className="text-white/10 text-4xl">🍽</span>
              <p className="text-white/25 text-xs tracking-widest uppercase"
                style={{ fontFamily: 'Barlow Condensed' }}>
                {search ? 'No matching orders' : 'No orders yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;