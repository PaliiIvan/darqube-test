import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { News } from "../../types/news.model";
import * as NewsAPI from "../../servces/news.service";

export type PaginationType = {
    currentPage: number,
    pageSize: number,
    pagesCount: number
}

export type NewsPageState = {
    news: Array<News>;
    lastSearchNews?: News;
    pagination: PaginationType
}
const initialState: NewsPageState = {
    news: [],
    lastSearchNews: null,
    pagination: {
        currentPage: 0,
        pageSize: 6,
        pagesCount: 0
    }
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
        nextNewsPage: (state) => {

            state.pagination.currentPage += 1;
        },
        previousNewsPage: (state) => {
            state.pagination.currentPage -= 1;
        },
        addToBookmark: (state, action: PayloadAction<number>) => {
            const objectIndexToUpdate = state.news.findIndex((it) => it.id === action.payload);
            state.news[objectIndexToUpdate].isInBookmarks = true;
        },
        removeFromBookmark: (state, action: PayloadAction<number>) => {
            const objectIndexToUpdate = state.news.findIndex((it) => it.id === action.payload);

            state.news[objectIndexToUpdate].isInBookmarks = false;
        },
        resetPagination: (state) => {
            state.pagination = initialState.pagination;
        },
        changePage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        changePageSize: (state, action: PayloadAction<number>) => {
            state.pagination.pageSize = action.payload;
            state.pagination.pagesCount = Math.floor(state.news.length / action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.news = action.payload;
            state.pagination.pagesCount = Math.ceil(action.payload.length / state.pagination.pageSize);
        });
    }
});

export const { actions: NewsPageAction, reducer: NewsPageReducer } = sliceData;
