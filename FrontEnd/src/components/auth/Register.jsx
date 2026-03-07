import React, { useState } from 'react'
import { register } from '../../https';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

const Register = ({setIsRegister}) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: ""
    });

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleRoleSelection = (selectedRole) =>{
        setFormData({...formData,role: selectedRole})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        registerMutation.mutate(formData);
    }

    const registerMutation = useMutation ({
        mutationFn: (reqData) => register(reqData),
        onSuccess: (res) => {
            const { data } = res;
            enqueueSnackbar(data.message, { variant: "success" });
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                role: ""
            })
            setTimeout(() => {
                setIsRegister(false);
            }, 1500);
        },
        onError: (error) =>{
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error"});
        }
    })

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label className='block text-[#ababab] mb-2 text-sm font-medium'>
                    Employee Name
                </label>
                <div className="flex items-center rounded-lg px-3 py-4 bg-[#1f1f1f]">
                    <input type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Enter Employee Name'
                        className='bg-transparent flex-1 text-white focus:outline-none'
                        required
                    /> 
                </div>
            </div>
            <div>
                <label className='block text-[#ababab] mb-2 mt-2 text-sm font-medium'>
                    Employee Email
                </label>
                <div className="flex items-center rounded-lg py-3 px-4 bg-[#1f1f1f]">
                    <input type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter Employee Email'
                        className='bg-transparent flex-1 text-white focus:outline-none'
                        required
                    /> 
                </div>
            </div>
            <div>
                <label className='block text-[#ababab] mb-2 mt-2 text-sm font-medium'>
                    Employee Phone
                </label>
                <div className="flex items-center rounded-lg py-3 px-4 bg-[#1f1f1f]">
                    <input type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='Enter Employee phone'
                        className='bg-transparent flex-1 text-white focus:outline-none'
                        required
                    /> 
                </div>
            </div>
            <div>
                <label className='block text-[#ababab] mb-2 mt-2 text-sm font-medium'>
                    Password
                </label>
                <div className="flex items-center rounded-lg py-3 px-4 bg-[#1f1f1f]">
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter Password'
                        className='bg-transparent flex-1 text-white focus:outline-none'
                        required
                    /> 
                </div>
            </div>
            <div>
                <label className='block text-[#ababab] mb-2 mt-2 text-sm font-medium'>
                    Choose your role
                </label>

                <div className="flex items-center gap-3 mt-4">
                    {["Admin", "Cashier", "Waiter"].map((role) =>{
                        return (
                        <button key={role} type='button'
                        onClick={()=> handleRoleSelection(role)}
                        className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] ${formData.role === role ? "bg-emerald-700 text-white":""}`}>
                            {role}
                        </button>
                        )
                    })}
                </div>
            </div>

            <button
            type="submit"
            className="w-full rounded-lg mt-6 py-3 text-lg 
                        font-semibold text-white
                        bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500
                        shadow-lg shadow-orange-500/30
                        transition-all duration-300
                        hover:shadow-orange-500/50
                        hover:-translate-y-[1px]
                        active:scale-[0.98]"
            >
                        Sign Up
                    </button>
        </form>
    </div>
  )
}

export default Register