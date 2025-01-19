import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notify: {
        message: "",
        seconds: 0,
    },
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        messageText: (state, action) => {
            const { message, seconds } = action.payload;
            
            state.notify = { message, seconds, };
        },
        clearMessage: (state) => {
            state.notify = initialState.notify;
        },
    }
});

export const notificationSelector = (state) => state.notification.notify;

export const { messageText, clearMessage } = notificationSlice.actions;

export default notificationSlice.reducer;

