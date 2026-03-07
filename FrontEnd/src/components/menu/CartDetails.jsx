import React, { useEffect, useRef } from 'react'
import { FaNotesMedical } from 'react-icons/fa6'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { removeItems } from '../../redux/slices/cartSlice';

const CartDetails = () => {

  const CartData = useSelector((state) => state.cart);
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  },[CartData])

  const handleRemove = (itemId) => {
    dispatch(removeItems(itemId));
  }
  return (
        <div className='px-4 py-2'>
          <h1 className='text-lg text-[#e4e4e4] font-semibold tracking-wide'>Order Details</h1>
          <div className='mt-4 overflow-y-scroll scrollbar-hide h-[300px]' ref={scrollRef}>

            {CartData.length === 0 ? (
              <p className='text-[#ababab] text-sm flex justify-center items-center h-[380px]'>Your Cart is empty. Add Food to the cart</p>
            ) : CartData.map((item) => {
              return (
              <div className='bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2'>
              <div className='flex items-center justify-between'>
                <h1 className='text-[#ababab] font-semibold tracking-wide text-md'>
                 {item.name}
              </h1>
              <p className='text-[#ababab] font-semibold'>x{item.quantity}</p>
              </div>
              <div className='flex items-center justify-between mt-3'>
                <div className='flex items-center gap-3'>
                  <RiDeleteBin2Fill onClick={()=> handleRemove(item.id)}
                  className='text-[#ababab] cursor-pointer' size={15} />
                  <FaNotesMedical className='text-[#ababab] cursor-pointer' size={15} />
                </div>
                <p className='text-[#f5f5f5] text-md font-bold'>₹{item.price * item.quantity}</p>
              </div>
            </div>
              )     
            })
          }
          </div>
        </div>
  );
};

export default CartDetails