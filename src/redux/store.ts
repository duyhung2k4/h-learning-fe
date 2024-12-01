import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { queryApi } from "./api/query";
import { scheduleApi } from "./api/schedule";
import { roomApi } from "./api/room";
import { authApi } from "./api/auth";



const middleware = [
    authApi.middleware,
    queryApi.middleware,
    scheduleApi.middleware,
    roomApi.middleware,
]

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch