/* eslint-disable @typescript-eslint/no-explicit-any */
// redux/slices/registrationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState = {};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        updateRegistration: (state, action: PayloadAction<Partial<any>>) => {
            return { ...state, ...action.payload }; 
        },
        clearRegistration: () => initialState,
    },
});

export const { updateRegistration, clearRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
