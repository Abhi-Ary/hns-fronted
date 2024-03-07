import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Convert to boolean if needed
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {} // Parse JSON if needed
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

// export const {} = authSlice.actions;
export default authSlice.reducer;