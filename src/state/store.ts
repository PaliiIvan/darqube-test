import { configureStore } from "@reduxjs/toolkit";
import {NewsPageReducer} from "../state/news-page/news.reducer";

export const store = configureStore({
    reducer: {
        newsPage: NewsPageReducer
    }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;