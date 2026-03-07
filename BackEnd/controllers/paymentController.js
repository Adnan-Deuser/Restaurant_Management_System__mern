const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const fakeOrder = {
      id: "order_" + Math.random().toString(36).substring(2, 10),
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      status: "created"
    };

    // simulate network delay (optional)
    setTimeout(() => {
      res.status(200).json({
        success: true,
        order: fakeOrder
      });
    }, 800);

  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res) => {
  res.json({
    success: true,
    paymentId: "pay_" + Math.random().toString(36).substring(2, 10)
  });
};
const handlePayment = async () => {
  const { data } = await createOrder({ amount: total });

  setTimeout(async () => {
    await verifyPayment({
      orderId: data.order.id,
      paymentId: "pay_" + Date.now()
    });

    enqueueSnackbar("Payment Successful", { variant: "success" });
  }, 1200);
};
module.exports = { createOrder,verifyPayment,handlePayment };