import React from 'react'
import { FaCheckDouble, FaCircle } from 'react-icons/fa'
import { getAvatarName } from '../../utils'

const OrderList = ({key, order}) => {
  return (
    <div className="flex items-center gap-5 mb-3 
                    bg-[#1a1a1a]/70 backdrop-blur-sm border border-[#2a2a2a] 
                    p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
        
        <button className="bg-emerald-400 p-3 text-xl font-bold rounded-lg shadow-md hover:scale-105 transition-transform">
          {getAvatarName(order.customerDetails.name)}
        </button>

        <div className='flex items-center justify-between w-[100%]'>
            
            <div className='flex flex-col items-start gap-1'>
                <h1 className="text-cyan-400 text-lg font-semibold tracking-wide drop-shadow-md">
                  {order.customerDetails.name}
                </h1>
                <p className="text-[#ababab] text-sm">{order.items.length} items</p>
            </div>

            <div>
                <h1 className='text-yellow-400 font-semibold border border-yellow-400 rounded-lg p-1 shadow-md'>
                  Table {order.table.tableNo}
                </h1>
            </div>

            <div className='flex flex-col items-end gap-2'>
{order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline" /> {order.orderStatus}
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCircle className="inline" /> {order.orderStatus}
                </p>
              </>
            )}
            </div>

        </div>
    </div>
  )
}

export default OrderList