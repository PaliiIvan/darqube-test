import React, { useCallback, useEffect, useState } from 'react';
import { Cart } from 'src/components/cart/cart';
import { Pagination } from '../components/pagination/pagination';
import { useAppDispatch, useAppSelector } from '../hooks/reducer.hooks';
import { NewsPageAction } from '../state/news-page/news.reducer';

import { StyleSheet, css } from 'aphrodite';
import { getNewsPage } from '../state/global.selectors';

const NewsPage = () => {
  const { pagination, news } = useAppSelector((state) => state.newsPage);

  const newsToShow = useAppSelector((state) => getNewsPage(state, pagination));
  const dispatch = useAppDispatch();

  const style = StyleSheet.create({
    container: {
      color: 'white',
      display: 'grid',
      height: '85vh',
      gridTemplateColumns: '2fr 20% 20% 20%',
      gridTemplateRows: '45% 45% 5rem',
      gridGap: '1rem'
    },
    last_search_item: {
      gridRowStart: '1',
      gridRowEnd: '3',
      height: '80%'
    },
    pagination: {
      gridColumnStart: '2',
      gridColumnEnd: '5'
    }
  });

  const goToNextPage = useCallback(
    () => dispatch(NewsPageAction.nextNewsPage()),
    [dispatch]
  );
  const goToPreviousPage = useCallback(
    () => dispatch(NewsPageAction.previousNewsPage()),
    [dispatch]
  );
  const goToPage = useCallback(
    (page: number) => dispatch(NewsPageAction.changePage(page)),
    [dispatch]
  );
  const changePageSize = useCallback(
    (size: number) => {
      dispatch(NewsPageAction.changePageSize(size));
    },
    [dispatch]
  );

  const addToBookmark = (id: number) =>
    dispatch(NewsPageAction.addToBookmark(id));
  const removeFromBookmark = (id: number) =>
    dispatch(NewsPageAction.removeFromBookmark(id));

  return (
    <div className={css(style.container)}>
      <div className={css(style.last_search_item)}>
        <Cart
          related={news[news.length - 1]?.related}
          date={new Date(news[news.length - 1]?.datetime)}
          headline={news[news.length - 1]?.headline}
          summary={news[news.length - 1]?.summary}
          image={news[news.length - 1]?.image}
          addToBookmarkCallback={() => {
            addToBookmark(news[news.length - 1]?.id);
          }}
          removeFromBookmarkCallback={() =>
            removeFromBookmark(news[news.length - 1]?.id)
          }
          isInBookmark={news[news.length - 1]?.isInBookmarks}
          isResearchedCart={true}
        ></Cart>
      </div>
      {newsToShow.map((n) => {
        return (
          <Cart
            related={n.related}
            date={new Date(n.datetime)}
            headline={n.headline}
            summary={n.summary}
            image={n.image}
            addToBookmarkCallback={() => {
              addToBookmark(n.id);
            }}
            removeFromBookmarkCallback={() => removeFromBookmark(n.id)}
            isInBookmark={n.isInBookmarks}
          ></Cart>
        );
      })}
      <Pagination
        setPageSize={changePageSize}
        pageSize={pagination.pageSize}
        setCurrentPageCallback={goToPage}
        allItemsCount={news.length}
        currentPage={pagination.currentPage}
        nextClickCallback={goToNextPage}
        previousClickCallback={goToPreviousPage}
        pagesCount={pagination.pagesCount}
      ></Pagination>
    </div>
  );
};

export default NewsPage;
