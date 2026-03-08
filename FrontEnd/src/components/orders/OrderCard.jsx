import React from 'react'
import { FaCheckDouble, FaCircle } from 'react-icons/fa'
import { formatDateAndTime, getAvatarName } from "../../utils/index"

const OrderCard = ({key, order}) => {
  console.log(order)
  return (
    <div className="w-[360px] bg-gradient-to-br from-[#262626] to-[#1f1f1f] 
                    p-5 rounded-2xl border border-[#2e2e2e] 
                    shadow-lg hover:shadow-2xl 
                    hover:scale-[1.02] transition-all duration-300">

      <div className='flex items-start gap-4'>

        <div className="bg-gradient-to-br from-orange-400 to-orange-600 
                        h-12 w-12 flex items-center justify-center 
                        text-lg font-bold rounded-xl shadow-md">
          {getAvatarName(order.customerDetails.name)}
        </div>

        <div className='flex justify-between w-full'>

          <div className='flex flex-col gap-1'>
            <h1 className="text-white text-lg font-semibold tracking-wide">
              {order.customerDetails.name}
            </h1>
            <p className="text-[#9f9f9f] text-xs">
              #{Math.floor(new Date(order.orderDate).getTime())} /Dine-In
            </p>
            <p className="text-[#9f9f9f] text-sm">
            Table: {order.table.tableNo}
            </p>
          </div>

          <div className='flex flex-col items-end gap-2'>
            {order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-green-600" /> Ready to
                  serve
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCircle className="inline" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-xs">
                  <FaCircle className="inline text-yellow-600" /> Preparing your order
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="my-4 h-[1px] bg-gradient-to-r from-transparent via-[#3a3a3a] to-transparent" />

      <div className='text-[#b5b5b5] text-sm space-y-1'>
        <p>{formatDateAndTime(order.createdAt)}</p>
        <p>{order.items.length}</p>
      </div>

      <div className='flex justify-between items-center mt-5'>
        <h1 className='text-white text-lg font-semibold'>Total</h1>
        <p className="text-green-400 text-xl font-bold">₹{order.bills.totalWithTax.toFixed(2)}</p>
      </div>

    </div>
  )
}

export default OrderCard