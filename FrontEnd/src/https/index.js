import axios from "axios"


const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND,
    withCredentials: true,
    headers: {
        "Content-Type" : "application/json",
        Accept: "application/json"

    }
})


//endpoints
export const login = (data) => api.post("api/user/login", data);
export const register = (data) => api.post("api/user/register", data);
export const getUserData = () => api.get("api/user");
export const logout = () => api.post("api/user/logout");

export const addTable = (data) => api.post("api/table", data);
export const getTables = () => api.get("api/table");

export const getOrders = () => api.get("api/orders", data);
export const updateOrderStatus = (data) => api.post("api/table", data);