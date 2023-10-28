import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer/reducer";

const store = configureStore({
    reducer: {
        todo: todoReducer
    }
})

export default store