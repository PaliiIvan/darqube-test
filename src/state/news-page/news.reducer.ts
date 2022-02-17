import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { News } from "../../types/news.model";
import * as NewsAPI from "../../servces/news.service";
import * as BookmarkService from "../../servces/bookmark.service";

export type NewsPageState = {
    news: Array<News>;
    isLoading: boolean;
}
const initialState: NewsPageState = {
    news: [],
    isLoading: false
};

export const fetchNews = createAsyncThunk(
    'news/fetch',
    async () => {
        const newsList = await NewsAPI.fetchNews();

        return newsList;
    }
);

const sliceData = createSlice({
    name: 'news',
    initialState: initialState,
    reducers: {
        addToBookmark: (state, action: PayloadAction<number>) => {
            const objectIndexToUpdate = state.news.findIndex((it) => it.id === action.payload);
            state.news[objectIndexToUpdate].isInBookmarks = true;
            BookmarkService.saveToStor(action.payload);

        },
        removeFromBookmark: (state, action: PayloadAction<number>) => {
            const objectIndexToUpdate = state.news.findIndex((it) => it.id === action.payload);
            state.news[objectIndexToUpdate].isInBookmarks = false;
            BookmarkService.removeFromStor(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNews.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            const inBookmarks = BookmarkService.readFromStor();
            action.payload.forEach((news) => inBookmarks.forEach((id) => {
                if (id === news.id) {
                    news.isInBookmarks = true;
                }
            }));
            state.news = action.payload;
            state.isLoading = false;
        });
    }
});
export const { actions: NewsPageAction, reducer: NewsPageReducer } = sliceData;