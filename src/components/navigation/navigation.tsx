import React, { useState } from 'react';

import { StyleSheet, css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reducer.hooks';
import { NewsPageAction } from '../../state/news-page/news.reducer';
import { isBookmarksPresentSelector } from '../../state/global.selectors';
import { SearchInput } from '../search-input/search-input';

export const Navigation = () => {
  const [isNewsSelected, setIsNewsSelected] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isBookmarksPresent = useAppSelector(isBookmarksPresentSelector);

  const style = StyleSheet.create({
    nav_container: {
      listStyleType: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    container: {
      listStyleType: 'none',
      display: 'flex',
      padding: 0
    },
    li: {
      cursor: 'pointer',
      margin: '0rem 1rem 0 0',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#868787'
    },
    active: {
      color: 'white'
    },
    disabled: {
      opacity: 0.2,
      pointerEvents: 'none'
    },
    search_container: {
      width: '20rem'
    }
  });

  const onNavigationSelect = (page: 'news' | 'bookmarks') => {
    switch (page) {
      case 'news': {
        setIsNewsSelected(true);
        dispatch(NewsPageAction.resetPagination());
        navigate('/news');
        break;
      }
      case 'bookmarks': {
        setIsNewsSelected(false);
        dispatch(NewsPageAction.resetPagination());
        navigate('/bookmarks');
        break;
      }
      default:
        break;
    }
  };
  return (
    <nav className={css(style.nav_container)}>
      <ul className={css(style.container)}>
        <li
          onClick={() => onNavigationSelect('news')}
          className={css(style.li, isNewsSelected && style.active)}
        >
          News
        </li>
        <li
          onClick={() => onNavigationSelect('bookmarks')}
          className={css(
            style.li,
            !isNewsSelected && style.active,
            !isBookmarksPresent && style.disabled
          )}
        >
          Bookmarks
        </li>
      </ul>
      <div className={css(style.search_container)}>
        <SearchInput></SearchInput>
      </div>
    </nav>
  );
};
