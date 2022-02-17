/** @jsxImportSource @emotion/react */
import { useCallback, useState } from 'react';
import { Cart } from 'src/components/cart/cart';
import { Pagination } from '../components/pagination/pagination';
import { useAppDispatch } from '../hooks/reducer.hooks';
import { NewsPageAction } from '../state/news-page/news.reducer';
import { css } from '@emotion/react';
import { News } from '../types/news.model';
import { useCurrentPageName } from '../hooks/navigation.hook';
import { CSSMediaQueryValues, mqMax } from '../helpers/css-helper';

const NewsPage = ({ news }: { news: Array<News> }) => {
  const [pageSize, setPageSize] = useState<number>();
  const [newsToShow, setNewsToShow] = useState<Array<News>>([]);
  const dispatch = useAppDispatch();
  const location = useCurrentPageName();
  const lastNews = news[news?.length - 1];

  const generateStyleRelatedOnPageSize = (
    size: number,
    forSize?: CSSMediaQueryValues
  ) => {
    switch (size) {
      case 6: {
        if (location !== 'news') {
          if (forSize === 860) {
            return '50% 50%';
          }
          if (forSize === 750) {
            return '100%';
          }
          return '33% 33% 33%';
        }

        switch (forSize) {
          case 750: {
            return '100%';
          }
          case 860: {
            return '50% 50%';
          }
          case 1064: {
            return '1fr 30% 30%';
          }
          default: {
            return '1fr 20% 20% 20%';
          }
        }
      }
      case 9: {
        if (location !== 'news') {
          if (forSize === 860) {
            return '50% 50%';
          }
          if (forSize === 750) {
            return '100%';
          }
          return '33% 33% 33%';
        }

        switch (forSize) {
          case 1064:
          case 1188:
            return '1fr 30% 30%';
          case 860: {
            return '50% 50%';
          }
          case 750: {
            return '100%';
          }
          default: {
            return '1fr 20% 20% 20%';
          }
        }
      }
      default: {
        return '';
      }
    }
  };

  const getPageRowsSize = (size: number, forSize?: CSSMediaQueryValues) => {
    switch (size) {
      case 6: {
        switch (forSize) {
          case 750: {
            if (location !== 'news') {
              return 'repeat(5, 25rem)';
            }
            return 'repeat(7, 25rem)';
          }
          case 860: {
            if (location !== 'news') {
              return 'repeat(3, 25rem)';
            }
            return 'repeat(4, 25rem)';
          }
          case 1064: {
            if (location !== 'news') {
              return 'repeat(2, 25rem)';
            }
            return 'repeat(3, 25rem)';
          }
          default: {
            return '22rem 22rem ';
          }
        }
      }
      case 9: {
        switch (forSize) {
          case 750: {
            if (location !== 'news') {
              return 'repeat(9, 25rem)';
            }
            return 'repeat(10,25rem)';
          }
          case 860: {
            return 'repeat(6, 25rem)';
          }
          case 1064:
          case 1188: {
            if (location !== 'news') {
              return 'repeat(6, 25rem)';
            }
            return 'repeat(5, 25rem)';
          }

          default:
            return 'repeat(3,25rem)';
        }
      }
    }
    return '50% 50%';
  };

  const style = {
    container: css({
      display: 'flex',
      flexDirection: 'column'
    }),
    grid_container: css({
      color: 'white',
      display: 'grid',
      gridTemplateColumns: generateStyleRelatedOnPageSize(pageSize),
      gridTemplateRows: getPageRowsSize(pageSize),
      gridGap: '1rem',
      [mqMax[1188]]: {
        gridTemplateColumns: generateStyleRelatedOnPageSize(pageSize, 1188),
        gridTemplateRows: getPageRowsSize(pageSize, 1188),
        height: pageSize === 9 && '100%'
      },
      [mqMax[1064]]: {
        gridTemplateColumns: generateStyleRelatedOnPageSize(pageSize, 1064),
        gridTemplateRows: getPageRowsSize(pageSize, 1064),
        height: '100%'
      },
      [mqMax[860]]: {
        gridTemplateColumns: generateStyleRelatedOnPageSize(pageSize, 860),
        gridTemplateRows: getPageRowsSize(pageSize, 860)
      },
      [mqMax[750]]: {
        gridTemplateColumns: generateStyleRelatedOnPageSize(pageSize, 750),
        gridTemplateRows: getPageRowsSize(pageSize, 750)
      }
    }),
    last_search_item: css({
      gridRowStart: 1,
      gridRowEnd: 4,
      height: '25rem',
      [mqMax[1188]]: {
        gridRowEnd: pageSize === 9 ? 6 : 4
      },
      [mqMax[860]]: {
        gridRowStart: 1,
        gridRowEnd: 1,
        gridColumnStart: 1,
        gridColumnEnd: 3
      },
      [mqMax['750']]: {
        gridRowStart: 1,
        gridRowEnd: 1,
        gridColumnStart: 1,
        gridColumnEnd: 1
      }
    })
  };

  const addToBookmark = useCallback(
    (id: number) => dispatch(NewsPageAction.addToBookmark(id)),
    [dispatch]
  );

  const removeFromBookmark = useCallback(
    (id: number) => dispatch(NewsPageAction.removeFromBookmark(id)),
    [dispatch]
  );

  return (
    <div css={style.container}>
      <div css={style.grid_container}>
        {location === 'news' && lastNews && (
          <div css={style.last_search_item}>
            <Cart
              size="medium"
              news={lastNews}
              addToBookmarkCallback={addToBookmark}
              removeFromBookmarkCallback={removeFromBookmark}
              isResearchedCart={true}
            ></Cart>
          </div>
        )}
        {newsToShow.map((n) => {
          return (
            <Cart
              key={n.id}
              news={n}
              size={pageSize === 6 ? 'medium' : 'small'}
              addToBookmarkCallback={addToBookmark}
              removeFromBookmarkCallback={removeFromBookmark}
            ></Cart>
          );
        })}
      </div>
      <Pagination
        key={location === 'news' ? 'news' : 'book'}
        news={news}
        setNewsToShow={setNewsToShow}
        onPageSizeChange={setPageSize}
      ></Pagination>
    </div>
  );
};

export default NewsPage;
