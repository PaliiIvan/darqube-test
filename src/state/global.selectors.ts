import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "./store";


const getNews = (state: AppState) => state.newsPage.news;

export const isBookmarksPresentSelector = createSelector(getNews, (news) => news.some((n) => n.isInBookmarks));
export const getNewsSelector = createSelector(getNews, (news) => news);

export const getBookMarkNewsSelector = createSelector(getNews, (news) => news.filter((n) => n.isInBookmarks));

// page 1 | currentPage: 1, pageSize: 6
// 0 - 6
// .slice(0, 6);   .slice(currentPage - 1, pageSize)

//page 2   | currentPage: 2, pageSize: 6
// 6 - 12,
// slice(6, 12);   .slice(pageSize * currentPage, (pageSize * currentPage) + pageSize)

//page 3    | currentPage: 3, pageSize: 6
// 12 - 18,
// slice(12, 18);


