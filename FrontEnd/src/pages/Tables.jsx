import React, { useState } from 'react'
import BottomNav from "../components/shared/BottomNav"
import BackButton from '../components/shared/BackButton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getTables } from '../https'
import { enqueueSnackbar } from 'notistack'

const Tables = () => {
  const [status,setStatus]= useState("all")

  const { data:resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData
  });

  if(isError) {
    enqueueSnackbar("Something went wrong", {variant: "error"})
  }

  console.log(resData);

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden'>
      <div className='flex items-center justify-between px-10 py-4'>
        <div className='flex items-center gap-4'>
          <BackButton />
          <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Tables</h1>
        </div>
        <div className='flex items-center gap-2 bg-[#1a1a1a] p-1 rounded-xl border border-white/5'>
          <button 
            onClick={() => setStatus("all")} 
            className={`px-5 py-2 text-sm font-semibold transition-all rounded-lg ${status === "all" ? "bg-[#383838] text-white" : "text-[#ababab]"}`}
          >
            All
          </button>
          <button 
            onClick={() => setStatus("booked")} 
            className={`px-5 py-2 text-sm font-semibold transition-all rounded-lg ${status === "booked" ? "bg-[#383838] text-white" : "text-[#ababab]"}`}
          >
            Booked
          </button>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto scrollbar-hide px-10 pb-32 h-[calc(100vh-9rem)]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
          {
          resData?.data.data.map((table)=>(
              <TableCard key={table.id} id={table._id} name={table.tableNo} status={table.status} initials={table?.currentOrder?.customerDetails.name} seats={table.seats}/>
          ))
          }
      </div>
    </div>
      <BottomNav />
    </section>
  )
}

export default Tables