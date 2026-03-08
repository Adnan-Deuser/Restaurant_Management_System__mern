import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import OrderCard from "../components/orders/OrderCard"
import BackButton from "../components/shared/BackButton"
import { useState } from "react"
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getOrders } from '../https'
import { enqueueSnackbar } from 'notistack'

const Orders = () => {
  const [status, setStatus] = useState("all");

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () =>{
      return await getOrders();
    },
    placeholderData: keepPreviousData
  });

  if(isError){
    enqueueSnackbar("Something went wrong", {variant:"error"})
  }
  return (
    <section className='bg-[#1f1f1f] h-[calc(99vh-4.5rem)] overflow-hidden'>
      
<div className='flex items-center justify-between px-8 py-5'>

  <div className='flex items-center gap-3'>
    <BackButton />
    <h1 className='text-2xl font-bold text-white tracking-wide'>
      Orders
    </h1>
  </div>

  <div className='flex items-center gap-3 bg-[#232323]/80 backdrop-blur-md 
                  px-3 py-2 rounded-2xl border border-[#2a2a2a] shadow-lg'>

    <button
      onClick={() => setStatus("all")}
      className={`relative px-5 py-2 rounded-xl text-sm font-semibold 
        transition-all duration-300
        ${status === "all"
          ? "bg-gradient-to-r from-[#02ca3a] to-[#00ff88] text-black shadow-md scale-105"
          : "text-[#ababab] hover:text-white hover:bg-[#2a2a2a]"
        }`}
    >
      All
    </button>

    <button
      onClick={() => setStatus("progress")}
      className={`relative px-5 py-2 rounded-xl text-sm font-semibold 
        transition-all duration-300
        ${status === "progress"
          ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-md scale-105"
          : "text-[#ababab] hover:text-white hover:bg-[#2a2a2a]"
        }`}
    >
      In Progress
    </button>

    <button
      onClick={() => setStatus("ready")}
      className={`relative px-5 py-2 rounded-xl text-sm font-semibold 
        transition-all duration-300
        ${status === "ready"
          ? "bg-gradient-to-r from-blue-400 to-cyan-400 text-black shadow-md scale-105"
          : "text-[#ababab] hover:text-white hover:bg-[#2a2a2a]"
        }`}
    >
      Ready
    </button>

    <button
      onClick={() => setStatus("completed")}
      className={`relative px-5 py-2 rounded-xl text-sm font-semibold 
        transition-all duration-300
        ${status === "completed"
          ? "bg-gradient-to-r from-purple-400 to-pink-400 text-black shadow-md scale-105"
          : "text-[#ababab] hover:text-white hover:bg-[#2a2a2a]"
        }`}
    >
      Completed
    </button>

  </div>
</div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10 py-2 overflow-y-scroll  no-scrollbar pb-28'>
        {
        resData?.data.data.length > 0 ? (
          resData.data.data.map((order) => {
            return <OrderCard key={order._id} order= {order} />
          })
        ) : <p className='col-span-3 text-gray-400'>No Order Available</p>
      }
      </div>

      <BottomNav />
    </section>
  )
}

export default Orders