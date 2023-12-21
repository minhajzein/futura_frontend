import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../apis/apiSlice";
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'

// =================================================================

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        const allMiddlewares = [apiSlice.middleware]
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(...allMiddlewares)
    }
})


export default store