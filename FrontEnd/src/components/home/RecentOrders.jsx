import React from 'react'
import { FaSearch } from 'react-icons/fa'
import OrderList from './OrderList'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { getOrders } from '../../https/index';

const RecentOrders = () => {
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
    <div className='px-8 mt-3'>
        <div className='bg-[#1a1a1a] w-full h-[370px] rounded-lg'>
            <div className="flex justify-between items-center px-6 py-4">
                <h1 className='text-[#f5f5f5] text-lg font-semibold'>Recent Orders</h1>
                <a href="" className='text-[#025cca] text-sm font-semibold tracking-wide'>View all</a>
            </div>
            <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6 ">
                <FaSearch className="text-[#f5f5f5]"/>
                <input 
                    type="text"
                    placeholder='Search Recent Orders'
                    className='bg-[#1f1f1f] text-[#f5f5f5] outline-none'
                />
            </div>
            {/* orderlist */}
            <div className="mt-4 px-6 overflow-y-scroll h-[70%] scrollbar-hide">
                {
                    resData?.data.data.length > 0 ? (
                        resData.data.data.map((order) => {
                        return <OrderList key={order._id} order= {order} />
                    })
                    ) : 
                    <p className='col-span-3 text-gray-400'>No Order Available</p>
                      }
            </div>
        </div>
    </div>
  )
}

export default RecentOrders