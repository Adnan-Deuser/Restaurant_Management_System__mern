import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const TinyModal = ({ status, payment, onClose }) => {

  const cartDetails = useSelector((state) => state.cart);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-[360px] rounded-2xl shadow-2xl p-6"
      >

        {/* Processing */}
        {status === "processing" && (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">Processing Payment</p>
            <p className="text-sm text-gray-400">
              Please wait while we confirm your transaction
            </p>
          </div>
        )}

        {/* Success */}
        {status === "success" && payment && (
          <>
            <div className="text-center mb-5">
              <div className="mx-auto mb-3 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <span className="text-green-600 text-xl">✓</span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                Payment Successful
              </h2>

              <p className="text-sm text-gray-400">
                Your transaction has been completed
              </p>
            </div>

            {/* Receipt */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Receipt</span>
                <span className="font-medium text-gray-800">
                  {payment.id}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-medium text-gray-800">
                  {payment.method}
                </span>
              </div>

              {/* Items Ordered */}
              <div className="border-t pt-3">
                <p className="text-gray-500 text-sm mb-2">Items</p>

                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {cartDetails.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-3 flex justify-between text-sm">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-semibold text-gray-900">
                  ₹{payment.amount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="text-green-600 font-medium">
                  {payment.status}
                </span>
              </div>

            </div>

            <button
              onClick={onClose}
              className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2.5 rounded-lg font-medium"
            >
              Done
            </button>
          </>
        )}

        {/* Failed */}
        {status === "failed" && (
          <div className="text-center py-6">
            <div className="mx-auto mb-3 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <span className="text-red-600 text-xl">✕</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              Payment Failed
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Something went wrong. Please try again.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default TinyModal;