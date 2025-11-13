import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import authReducer from "@/redux/features/authSlice";
import registrationSlice from "../features/registraction"
import languageReducer from '../features/languageSlice'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  language: languageReducer,
  registration: registrationSlice
});

export default rootReducer;
