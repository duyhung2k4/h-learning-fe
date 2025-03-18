import authSlice from "./slice/authSlice";

import { combineReducers } from "@reduxjs/toolkit";
import { queryApi } from "./api/query";
import { authApi } from "./api/auth";
import { courseApi } from "./api/course";
import { courseRegisterApi } from "./api/course_register";



export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [courseRegisterApi.reducerPath]: courseRegisterApi.reducer,
    authSlice: authSlice.reducer,
})