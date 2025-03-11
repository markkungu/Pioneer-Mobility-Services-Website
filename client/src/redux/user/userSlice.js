import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};
 
const userSlice = createSlice({
    name: "user", 
    initialState: {
        user: null,
    },
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUSerStart:(state) => {
            state.loading = true;
        },
        updateUSerSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUSerFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUSerStart:(state) => {
            state.loading = true;
        },
        deleteUSerSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        deleteUSerFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUSerStart:(state) => {
            state.loading = true;
        },
        signOutUSerSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signOutUSerFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { signInStart, signInSuccess, signInFailure, updateUSerStart, updateUSerSuccess, updateUSerFailure, deleteUSerStart, deleteUSerSuccess, deleteUSerFailure, signOutUSerStart, signOutUSerSuccess, signOutUSerFailure } = userSlice.actions;

export default userSlice.reducer;