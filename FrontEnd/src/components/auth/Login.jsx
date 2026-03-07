import { useMutation } from '@tanstack/react-query';
import { React, useState } from 'react'
import { login } from "../../https/index"
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        loginMutation.mutate(formData);
    }


    const loginMutation = useMutation ({
        mutationFn: (reqData) => login(reqData),
        onSuccess: (res) => {
            const { data } = res;
            console.log(data);
            const { _id, name, email, phone, role } = data.data;
            dispatch(setUser({_id, name, email, phone, role}));
            enqueueSnackbar(data.message, { variant: "success"});
            navigate("/");
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
                <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
                    Employee Email
                </label>
                <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
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
                <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
                    Password
                </label>
                <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                    <input type="password"
                        name="password"
                        autoComplete="current-pasword"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter Password'
                        className='bg-transparent flex-1 text-white focus:outline-none'
                        required
                    /> 
                </div>
            </div>
<button
  type="submit"
  className="w-full rounded-lg mt-6 py-3 text-lg 
             font-semibold text-white
             bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500
             shadow-lg shadow-orange-500/20
             transition-all duration-300
             hover:shadow-orange-500/40
             hover:-translate-y-[1px]
             active:scale-[0.98]"
>
  Sign In
</button>
        </form>
    </div>
  )
}

export default Login