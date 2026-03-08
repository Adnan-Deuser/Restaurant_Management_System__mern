
const createHttpError = require("http-errors");
const Order = require("../model/orderModel");
const { default: mongoose } = require("mongoose");

const addOrder = async (req, res, next) => {
    try {

        const existingOrder = await Order.findOne({
            table: req.body.table,
            orderStatus: "In Progress"
        });

        if (existingOrder) {
            return res.status(400).json({
                success: false,
                message: "Order already exists for this table"
            });
        }

        const order = new Order(req.body);
        await order.save();

        res.status(201).json({
            success: true,
            message: "Order Created",
            data: order
        });

    } catch (error) {
        next(error);
    }
};
const getOrderById = async (req, res, next)=>{

    try {

        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Invalid ID");
            return next(error);
        }

        const order = await Order.findById(id);
        if(!order){
            const error = createHttpError(404, "Order not Found");
            return next(error);
        }

        res.status(200).json({success:true, data: order})

    } catch (error) {
        next(error)
    }
}
const getOrders = async (req, res, next)=>{
    try {
        const orders = await Order.find().populate("table");
        res.status(200).json({data: orders})
    } catch (error) {
        next(error)
    }
}
const updateOrder = async (req, res, next)=>{
    try {
        const { orderStatus } = req.body;
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Invalid ID");
            return next(error);
        }
        const order = await Order.findByIdAndUpdate(id, {orderStatus}, {returnDocument : "after"} );
        if(!order) {
            const error = createHttpError(404, "Order Not Found");
            return next(error);
        }

        res.status(200).json({success: true, message: "Order Updated", data: order});

    } catch (error) {
        next(error);
    }
}

module.exports = { addOrder, getOrderById, getOrders, updateOrder};