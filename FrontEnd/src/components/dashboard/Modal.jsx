import { React } from 'react'
import { motion } from 'framer-motion'
import { IoMdClose } from "react-icons/io"
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react'
import { addTable } from '../../https';
import axios from 'axios';
import { menus } from '../../constants';

const Modal = ({ setIsModalOpen, actionType }) => {

    const [tableData, setTableData] = useState({
        tableNo: "",
        seats: ""
    });

    const [categoryData, setCategoryData] = useState({
        name: "",
        icon: "",
        color1: "#1d2569",
        color2: "#37499b"
    });

    const [dishData, setDishData] = useState({
        categoryName: menus[0]?.name || "",
        name: "",
        price: "",
        categoryType: "Vegetarian"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTableData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (actionType === "table") tableMutation.mutate(tableData);
        if (actionType === "category") categoryMutation.mutate(categoryData);
        if (actionType === "dishes") dishMutation.mutate(dishData);
    }
    const HandleCloseModal = () =>{
        setIsModalOpen(false)
    }

    const tableMutation = useMutation({
        mutationFn: (reqData) => addTable(reqData),
        onSuccess: (res) =>{
            setIsModalOpen(false);
            const { data } = res;
            enqueueSnackbar(data.message, {variant:"success"});
        },
        onError: (error) => {
            const { data } = error.response;
            enqueueSnackbar(data.message, { variant: "error"})
            console.log(error);
        }
    });

    const categoryMutation = useMutation({
        mutationFn: (reqData) => axios.post('http://localhost:3000/api/menu/category', reqData, { withCredentials: true }),
        onSuccess: (res) => {
            setIsModalOpen(false);
            enqueueSnackbar(res.data.message, {variant:"success"});
            setTimeout(() => window.location.reload(), 1000); // Reload to reflect static changes
        },
        onError: (error) => {
            enqueueSnackbar(error.response?.data?.message || "Error", { variant: "error"})
        }
    });

    const dishMutation = useMutation({
        mutationFn: (reqData) => axios.post('http://localhost:3000/api/menu/dish', reqData, { withCredentials: true }),
        onSuccess: (res) => {
            setIsModalOpen(false);
            enqueueSnackbar(res.data.message, {variant:"success"});
            setTimeout(() => window.location.reload(), 1000); // Reload to reflect static changes
        },
        onError: (error) => {
            enqueueSnackbar(error.response?.data?.message || "Error", { variant: "error"})
        }
    });
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <motion.div
        initial = {{opacity: 0, scale: 0.9}}
        animate= {{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0.9}}
        transition={{duration:0.3, ease: "easeInOut"}}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className='text-[#f5f5f5] text-xl font-semibold capitalize'>
                    Add {actionType}
                </h2>
                <button type="button" onClick={HandleCloseModal} className='text-[#f5f5f5] hover:text-red-500 '>
                    <IoMdClose size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4 mt-8'>
            {actionType === "table" && (
                <>
                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
                        Table Number
                    </label>
                    <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                        <input type="number"
                            name="tableNo"
                            value={tableData.tableNo}
                            onChange={(e) => setTableData({...tableData, tableNo: e.target.value})}
                            className='bg-transparent flex-1 text-white focus:outline-none'
                            required
                        /> 
                    </div>
                </div>
                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
                    Number of Seats
                    </label>
                    <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                        <input type="number"
                            name="seats"
                            value={tableData.seats}
                            onChange={(e) => setTableData({...tableData, seats: e.target.value})}
                            className='bg-transparent flex-1 text-white focus:outline-none'
                            required
                        /> 
                    </div>
                </div>
                </>
            )}

            {actionType === "category" && (
                <>
                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Category Name</label>
                    <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                        <input type="text" name="name" value={categoryData.name} onChange={(e) => setCategoryData({...categoryData, name: e.target.value})} className='bg-transparent flex-1 text-white focus:outline-none' placeholder="e.g. Starters" required /> 
                    </div>
                </div>
                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Emoji Icon</label>
                    <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                        <input type="text" name="icon" value={categoryData.icon} onChange={(e) => setCategoryData({...categoryData, icon: e.target.value})} className='bg-transparent flex-1 text-white focus:outline-none' placeholder="e.g. 🍲" required /> 
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Gradient Start</label>
                        <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                            <input type="color" name="color1" value={categoryData.color1} onChange={(e) => setCategoryData({...categoryData, color1: e.target.value})} className='bg-transparent flex-1 w-full h-8 cursor-pointer' /> 
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Gradient End</label>
                        <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                            <input type="color" name="color2" value={categoryData.color2} onChange={(e) => setCategoryData({...categoryData, color2: e.target.value})} className='bg-transparent flex-1 w-full h-8 cursor-pointer' /> 
                        </div>
                    </div>
                </div>
                </>
            )}

            {actionType === "dishes" && (
                <>
                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Select Category</label>
                    <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                        <select name="categoryName" value={dishData.categoryName} onChange={(e) => setDishData({...dishData, categoryName: e.target.value})} className='bg-transparent flex-1 text-white focus:outline-none' required>
                            {menus.map(m => <option key={m.id} value={m.name} className="bg-[#1f1f1f]">{m.name}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Dish Name</label>
                    <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                        <input type="text" name="name" value={dishData.name} onChange={(e) => setDishData({...dishData, name: e.target.value})} className='bg-transparent flex-1 text-white focus:outline-none' placeholder="e.g. Butter Chicken" required /> 
                    </div>
                </div>
                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Price (₹)</label>
                    <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                        <input type="number" name="price" value={dishData.price} onChange={(e) => setDishData({...dishData, price: e.target.value})} className='bg-transparent flex-1 text-white focus:outline-none' placeholder="e.g. 250" required /> 
                    </div>
                </div>
                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Dietary Type</label>
                    <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                        <select name="categoryType" value={dishData.categoryType} onChange={(e) => setDishData({...dishData, categoryType: e.target.value})} className='bg-transparent flex-1 text-white focus:outline-none' required>
                            <option value="Vegetarian" className="bg-[#1f1f1f]">Vegetarian</option>
                            <option value="Non-Vegetarian" className="bg-[#1f1f1f]">Non-Vegetarian</option>
                            <option value="Alcoholic" className="bg-[#1f1f1f]">Alcoholic</option>
                            <option value="Cold" className="bg-[#1f1f1f]">Cold</option>
                            <option value="Hot" className="bg-[#1f1f1f]">Hot</option>
                        </select>
                    </div>
                </div>
                </>
            )}

                <button
                type="submit"
                disabled={tableMutation.isPending || categoryMutation.isPending || dishMutation.isPending}
                className="w-full rounded-lg mt-6 py-3 text-lg 
                font-semibold text-white
                bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500
                shadow-lg shadow-orange-500/20
                transition-all duration-300
                hover:shadow-orange-500/40
                hover:-translate-y-[1px]
                active:scale-[0.98]
                disabled:opacity-50"
                >
                Submit </button>
            </form>
        </motion.div>
    </div>
  )
}

export default Modal