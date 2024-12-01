import { combineReducers } from "@reduxjs/toolkit";
import { queryApi } from "./api/query";
import { scheduleApi } from "./api/schedule";
import { roomApi } from "./api/room";
import { authApi } from "./api/auth";
import authSlice from "./slice/authSlice";



export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    authSlice: authSlice.reducer,
})