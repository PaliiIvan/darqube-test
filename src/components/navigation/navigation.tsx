/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mqMax } from '../../helpers/css-helper';
import { useAppSelector } from '../../hooks/reducer.hooks';
import { isBookmarksPresentSelector } from '../../state/global.selectors';
import { SearchInput } from '../search-input/search-input';

export const Navigation = () => {
  const [isNewsSelected, setIsNewsSelected] = useState(true);
  const navigate = useNavigate();
  const isBookmarksPresent = useAppSelector(isBookmarksPresentSelector);

  const style = {
    nav_container: css({
      listStyleType: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }),
    container: css({
      listStyleType: 'none',
      display: 'flex',
      padding: 0
    }),
    li: css({
      cursor: 'pointer',
      margin: '0rem 1rem 0 0',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#868787',
      [mqMax[750]]: {
        fontSize: '1rem'
      }
    }),
    active: css({
      color: 'white'
    }),
    disabled: css({
      opacity: 0.2,
      pointerEvents: 'none'
    }),
    search_container: css({
      width: '20rem'
    })
  };

  const onNavigationSelect = (page: 'news' | 'bookmarks') => {
    switch (page) {
      case 'news': {
        setIsNewsSelected(true);
        navigate('/news');
        break;
      }
      case 'bookmarks': {
        setIsNewsSelected(false);
        navigate('/bookmarks');
        break;
      }
      default:
        break;
    }
  };
  return (
    <nav css={style.nav_container}>
      <ul css={style.container}>
        <li
          onClick={() => onNavigationSelect('news')}
          css={[style.li, isNewsSelected && style.active]}
        >
          News
        </li>
        <li
          onClick={() => onNavigationSelect('bookmarks')}
          css={[
            style.li,
            !isNewsSelected && style.active,
            !isBookmarksPresent && style.disabled
          ]}
        >
          Bookmarks
        </li>
      </ul>
      <div css={style.search_container}>
        <SearchInput></SearchInput>
      </div>
    </nav>
  );
};
