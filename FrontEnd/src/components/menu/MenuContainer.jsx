import React, { useState } from 'react'
import { menus } from '../../constants'
import { GrRadialSelected } from 'react-icons/gr'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'

const MenuContainer = () => {

    const [select, setSelect] = useState(menus[0])
    const [items, setItems] = useState({})
    const dispatch = useDispatch();

    const addItems = (id) => {
        setItems(prev => ({
            ...prev,
            [id]: prev[id] ? Math.min(prev[id] + 1, 4) : 1
        }))
    }

    const subItems = (id) => {
        setItems(prev => ({
            ...prev,
            [id]: prev[id] && prev[id] > 0 ? prev[id] - 1 : 0
        }))
    }

    const HandleAddtoCart = (item) => {

        const uniqueId = `${select.id}-${item.id}`
        const quantity = items[uniqueId] || 0;

        if (quantity === 0) return;

        const newObj = {
            id: uniqueId,
            name: item.name,
            price: item.price,
            quantity: quantity,
            totalPrice: item.price * quantity
        };

        dispatch(addToCart(newObj));

        setItems(prev => ({
            ...prev,
            [uniqueId]: 0
        }));
    };

    return (
        <div className="pb-10">

            <div className='grid grid-cols-4 gap-5 px-10 py-6 h-[34vh] overflow-y-auto scrollbar-hide'>
                {menus.map((menu) => (
                    <div
                        key={menu.id}
                        onClick={() => setSelect(menu)}
                        className={`p-5 rounded-2xl cursor-pointer transition-all duration-300
                        ${select.id === menu.id
                                ? "ring-2 ring-white scale-[1.03]"
                                : "hover:scale-[1.02] hover:shadow-xl"}
                        `}
                        style={{ backgroundImage: menu.bgColor }}
                    >
                        <div className='flex items-center justify-between'>
                            <h1 className='text-white text-lg font-bold tracking-wide'>
                                {menu.icon} {menu.name}
                            </h1>

                            {select.id === menu.id && (
                                <GrRadialSelected className='text-white' size={20} />
                            )}
                        </div>

                        <p className='text-white/70 text-sm mt-2 font-medium'>
                            {menu.items.length} Items
                        </p>
                    </div>
                ))}
            </div>

            <hr className='border-[#2a2a2a]' />

            <div className='grid grid-cols-4 gap-6 px-10 py-8 h-[330px] overflow-y-auto scrollbar-hide'>

                {select.items.map((item) => {

                    const uniqueId = `${select.id}-${item.id}`

                    return (
                        <div
                            key={item.id}
                            className='bg-[#1a1a1a] rounded-2xl p-5
                            transition-all duration-300
                            hover:shadow-xl hover:scale-[1.02] border border-[#2a2a2a]'
                        >

                            <div className='flex items-center justify-between mb-4'>
                                <h1 className='text-white text-lg font-semibold'>
                                    {item.name}
                                </h1>

                                <button
                                    onClick={() => HandleAddtoCart(item)}
                                    className='bg-emerald-600 hover:bg-emerald-500 transition
                                    p-2 rounded-xl text-white shadow-md'
                                >
                                    <FaShoppingCart size={18} />
                                </button>
                            </div>

                            <p className='text-lg font-bold text-white mb-5'>
                                ₹{item.price}
                            </p>

                            <div className='flex items-center justify-between bg-[#121212]
                                rounded-xl overflow-hidden border border-[#2a2a2a]'
                            >
                                <button
                                    onClick={() => subItems(uniqueId)}
                                    className='px-5 py-2 text-xl text-yellow-500
                                    hover:bg-[#1f1f1f] transition'
                                >
                                    −
                                </button>

                                <span className='text-white font-semibold text-lg'>
                                    {items[uniqueId] || 0}
                                </span>

                                <button
                                    onClick={() => addItems(uniqueId)}
                                    className='px-5 py-2 text-xl text-yellow-500
                                    hover:bg-[#1f1f1f] transition'
                                >
                                    +
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default MenuContainer