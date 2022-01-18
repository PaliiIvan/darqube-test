import { createSelector } from "@reduxjs/toolkit";
import { PaginationType } from "./news-page/news.reducer";
import { AppState } from "./store";

export const getNewsPage = (state: AppState, { currentPage, pageSize }: PaginationType) =>
    state.newsPage.news.slice((pageSize) * currentPage, ((pageSize) * currentPage) + pageSize);

export const getBookmarkNewsPage = (state: AppState, { currentPage, pageSize }: PaginationType) =>
    state.newsPage.news.filter((n) => n.isInBookmarks)
        .slice((pageSize - 1) * currentPage, (pageSize * currentPage) + pageSize);


const getNews = (state: AppState) => state.newsPage.news;

export const isBookmarksPresentSelector = createSelector(getNews, (news) => news.some((n) => n.isInBookmarks));


// page 1 | currentPage: 1, pageSize: 6
// 0 - 6
// .slice(0, 6);   .slice(currentPage - 1, pageSize)

//page 2   | currentPage: 2, pageSize: 6
// 6 - 12,
// slice(6, 12);   .slice(pageSize * currentPage, (pageSize * currentPage) + pageSize)

//page 3    | currentPage: 3, pageSize: 6
// 12 - 18,
// slice(12, 18);


