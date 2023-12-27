import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        loading: null,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess:(state, action) => {
            state.loading = false;
            state.currentUser = action.payload
        },
        logout: (state) => {
            state.currentUser = null
        }
    },
});

export const { loginStart, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;


