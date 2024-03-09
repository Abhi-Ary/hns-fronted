import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import toast from "react-hot-toast";
import  axiosInstance  from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Convert to boolean if needed
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {} // Parse JSON if needed
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;