import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import  axiosInstance  from "../../Helpers/axiosInstance";

const storedData = localStorage.getItem('data');
let parsedData = {};
try {
    parsedData = storedData ? JSON.parse(storedData) : {};
} catch (error) {
    console.error('Error parsing stored data:', error);
}

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Convert to boolean if needed
    role: localStorage.getItem('role') || "",
    data: parsedData // Parse JSON if needed
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data); // backend api
        toast.promise(res, {
            loading: "wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data); // backend api
        toast.promise(res, {
            loading: "wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async() =>{
    try {
        const res = axiosInstance.post("user/logout"); // backend api
        toast.promise(res, {
            loading: "wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to logout"
        });
        
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(login.fulfilled, (state, action) =>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state) =>{
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;