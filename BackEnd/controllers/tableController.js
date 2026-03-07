const createHttpError = require("http-errors");
const Table = require("../model/tableModel");
const mongoose = require("mongoose")

const addTable = async (req, res, next) => {
    try {
        const { tableNo, seats } = req.body;
        if(!tableNo){
            const error = createHttpError(404, "Please provide TableNo");
            return next(error);
        }

        const isTablePresent = await Table.findOne({tableNo});
        if(isTablePresent){
            const error = createHttpError(400, "Table already exists");
            return next(error);
        }

        const newTable = new Table({tableNo, seats});
        await newTable.save();

        res.status(201).json({success: true, message: "Table Created", data: newTable})
    } catch (error) {
        next(error)
    }
}
const getTables = async (req, res, next) => {
    try {
        const tables = await Table.find().populate({
            path: "currentOrder",
            select: "customerDetails"
        });
        if(tables.length === 0){
            const error = createHttpError(404, "Tables is empty");
            return next(error);
        }
        res.status(200).json({succes:true, message:"Tables Fetched successfully", data: tables})
    } catch (error) {
        next(error)
    }
}
const updateTable = async (req, res, next) => {
    try {
        if(!req.body){
            return next(createHttpError(404, "Value Not Present"))
        }
        const { status, orderId } = req.body;

        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Invalid ID");
            return next(error);
        }

        const table = await Table.findByIdAndUpdate(
            id,
            { status, currentOrder : orderId },
            {returnDocument: "after"}
        );
        if(!table){
            const error = createHttpError(404, "Table not found");
            return next(error);
        }
        res.status(201).json({success: true, message:"Table Updated", data: table})

    } catch (error) {
        next(error);
    }
}

module.exports = { addTable, getTables, updateTable }