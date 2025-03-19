import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { queryApi } from "./api/query";
import { authApi } from "./api/auth";
import { courseApi } from "./api/course";
import { courseRegisterApi } from "./api/course_register";
import { lessionApi } from "./api/lession";



const middleware = [
  authApi.middleware,
  queryApi.middleware,
  courseApi.middleware,
  courseRegisterApi.middleware,
  lessionApi.middleware,
]

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch