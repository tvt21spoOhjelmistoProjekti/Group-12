import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    fullname: null,
    idUsers: null,
    username: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload;
        },
        addFullname: (state, action) => {
            state.fullname = action.payload;
        },
        addUserId: (state, action) => {
            state.idUsers = action.payload;
        },
        addUsername: (state, action) => {
            state.username = action.payload;
        },
        logOut: (state) => {
            state.token = null;
            state.fullname = null;
            state.idUsers = null;
            state.username = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToken, addFullname, addUserId, addUsername, logOut } = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectFullname = (state) => state.user.fullname;
export const selectUserId = (state) => state.user.idUsers;
export const selectUsername = (state) => state.user.username;

export default userSlice.reducer;