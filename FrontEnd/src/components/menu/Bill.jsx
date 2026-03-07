import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getTotalPrice } from '../../redux/slices/cartSlice';
import { enqueueSnackbar } from 'notistack';
import TinyModal from './TinyModal';

const Bill = () => {

    const cartData = useSelector((state) => state.cart);
    const total = useSelector(getTotalPrice);
    const taxRate = 6.25;
    const tax = (total * taxRate) /100;
    const totalPriceWithTax = total + tax;
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("idle");
    const [paymentMethod, setPaymentMethod] = useState();
    const [paymentData, setPaymentData] = useState(null);

    const handlePlaceOrder = async () => {
    if (!paymentMethod) {
        enqueueSnackbar("Please Select a payment method", { variant: "warning" });
        return;
    }

  setShowPaymentModal(true);
  setPaymentStatus("processing");

    try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const fakePayment = {
        id: "rcpt_" + Date.now(),
        method: paymentMethod,
        amount: totalPriceWithTax,
        status: "success"
        };

    setPaymentData(fakePayment);
    setPaymentStatus("success");

    } catch (error) {
        setPaymentStatus("failed");
    }
    };
  return (
    <>
        <div className='flex items-center justify-between px-5 mt-2'>
            <p className='text-xs text-[#ababab] font-medium mt-2'>Items({cartData.length})</p>
            <h1 className='text-[#f5f5f5] text-md font-bold'>₹{total.toFixed(2)}</h1>
        </div>
        <div className='flex items-center justify-between px-5 mt-2'>
            <p className='text-xs text-[#ababab] font-medium mt-2'>Tax({taxRate})</p>
            <h1 className='text-[#f5f5f5] text-md font-bold'>₹{tax.toFixed(2)}</h1>
        </div>
        <div className='flex items-center justify-between px-5 mt-2'>
            <p className='text-xs text-[#ababab] font-medium mt-2'>Total with Tax</p>
            <h1 className='text-[#f5f5f5] text-md font-bold'>₹{totalPriceWithTax.toFixed(2)}</h1>
        </div>
        <div className='flex items-center gap-3 px-5 mt-4'>
            <button onClick={()=> setPaymentMethod("Cash")}className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${paymentMethod === "Cash" ? "bg-[#383737]" : "" }`}>Cash</button>
            <button onClick={()=> setPaymentMethod("Online")}className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${paymentMethod === "Online" ? "bg-[#383737]" : "" }`}>Online</button>
        </div>
        <div className='flex items-center gap-3 px-5 mt-4'>
            <button className='bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg'>Print Receipt</button>
            <button onClick={handlePlaceOrder} className='bg-yellow-400 px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg'>Place Order</button>
        </div>
        {showPaymentModal && (
        <TinyModal
            status={paymentStatus}
            payment={paymentData}
            onClose={() => setShowPaymentModal(false)}
        />
        )}
    </>
  )
}

export default Bill