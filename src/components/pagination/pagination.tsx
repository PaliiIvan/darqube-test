/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '../button/button';
import { News } from '../../types/news.model';
import { ReactComponent as ArrowSvg } from '../../images/arrow.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/click-outside.hook';
import { mqMax } from '../../helpers/css-helper';

export type PaginationType = {
  news: Array<News>;
  setNewsToShow(n: Array<News>): void;
  onPageSizeChange?: (size: number) => void;
};

const generatePageNavigation = (
  currentPage: number,
  pagesCount: number,
  setCurrentPageCallback: (p: number) => void
) => {
  const pageList = [];

  if (pagesCount <= 9) {
    for (let index = 0; index <= 9 && index < pagesCount; index++) {
      const pageNumber = (
        <div
          key={index}
          className={index === currentPage ? 'active' : undefined}
          onClick={() => {
            setCurrentPageCallback(index);
          }}
        >
          {index + 1}
        </div>
      );

      pageList.push(pageNumber);
    }
    return pageList;
  }

  if (currentPage <= 5) {
    for (let index = 0; index < 9 && index < pagesCount; index++) {
      const pageNumber = (
        <div
          key={index}
          className={index === currentPage ? 'active' : undefined}
          onClick={() => {
            setCurrentPageCallback(index);
          }}
        >
          {index + 1}
        </div>
      );

      pageList.push(pageNumber);
    }
  }

  if (currentPage >= pagesCount - 4 && pagesCount > 9) {
    for (let index = pagesCount - 9; index < pagesCount; index++) {
      const pageNumber = (
        <div
          key={index}
          className={index === currentPage ? 'active' : undefined}
          onClick={() => {
            setCurrentPageCallback(index);
          }}
        >
          {index + 1}
        </div>
      );

      pageList.push(pageNumber);
    }
  }

  if (currentPage > 5 && currentPage < pagesCount - 4) {
    for (let index = currentPage - 4; index <= currentPage + 4; index++) {
      const pageNumber = (
        <div
          key={index}
          className={index === currentPage ? 'active' : undefined}
          onClick={() => {
            setCurrentPageCallback(index);
          }}
        >
          {index + 1}
        </div>
      );

      pageList.push(pageNumber);
    }
  }

  return pageList;
};

export const getNewsPage = (
  news: Array<News>,
  currentPage: number,
  pageSize: number
) => news.slice(pageSize * currentPage, pageSize * currentPage + pageSize);

export const Pagination = ({
  news,
  setNewsToShow,
  onPageSizeChange
}: PaginationType) => {
  const pageSizeList = [6, 9];
  const [opened, setIsOpened] = useState(false);
  const pageListDropDownRef = useRef<HTMLDivElement>();
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(
    Math.ceil(news.length / pageSize)
  );
  const [dropDownTop, setDropDownTop] = useState(false);

  const recalculateDirection = () => {
    if (pageListDropDownRef.current) {
      const { bottom } = pageListDropDownRef.current.getBoundingClientRect();

      if (bottom + 60 >= window.innerHeight) {
        setDropDownTop(true);
      } else {
        setDropDownTop(false);
      }
    }
  };

  useEffect(() => {
    recalculateDirection();
  }, []);

  useEffect(() => {
    setPagesCount(Math.ceil(news.length / pageSize));
    onPageSizeChange(pageSize);
  }, [news.length, onPageSizeChange, pageSize]);

  useEffect(() => {
    setNewsToShow(getNewsPage(news, currentPage, pageSize));
  }, [currentPage, news, pageSize, setNewsToShow]);

  const style = {
    pagination: css({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'end',
      marginTop: '2rem',
      [mqMax['750']]: {
        alignSelf: 'center'
      }
    }),
    navigation: css({
      fontSize: '0.9rem',
      label: 'navigation',
      display: 'flex',
      gap: '0.1rem',
      border: '2px solid #3D3D3D',
      borderRadius: '2rem',
      width: '30rem',
      height: '4rem',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#242525',
      color: 'white',
      [mqMax[500]]: {
        width: '19rem',
        fontSize: '0.7rem'
      }
    }),
    navigation_page_count: css({
      opacity: 0.25,
      marginLeft: '0.5rem'
    }),
    disabled: css({
      pointerEvents: 'none',
      opacity: 0.5
    }),

    pages: css({
      'label': 'pages',
      'display': 'flex',
      'gap': '0.5rem',
      'alignItems': 'baseline',
      'fontSize': '0.7rem',
      'color': '#8D8E8E',
      'fontWeight': 'bold',
      [mqMax['500']]: {
        gap: '0.1rem'
      },
      '& div': {
        'cursor': 'pointer',
        'width': '1rem',
        'height': '1rem',
        'borderRadius': '5rem',
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'space-around',

        ':hover': {
          backgroundColor: '#383838',
          cursor: 'pointer',
          width: '1rem',
          height: '1rem',
          borderRadius: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }
      },
      '& .active': {
        ':hover': {
          backgroundColor: 'white'
        },
        'backgroundColor': 'white',
        'width': '1rem',
        'height': '1rem',
        'borderRadius': '5rem',
        'display': 'flex',
        'alignItems': 'center',
        'color': 'black',
        'justifyContent': 'space-around'
      }
    }),
    btn: css({
      label: 'btn',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#D6D6D6'
    }),
    btn_left: css({
      label: 'btn_left',
      transform: 'rotate(180deg)'
    }),
    btn_right: css({
      label: 'btn_right',
      transform: 'rotate(0deg)'
    }),
    btn_bottom: css({
      'label': 'btn_right',
      'transform': 'rotate(90deg)',
      'backgroundColor': '#212020',
      'marginLeft': '1rem',
      '& path': {
        stroke: 'white',
        opacity: 0.5
      }
    }),
    button_container: css({
      display: 'flex',
      gap: '0.7rem'
    }),
    page_count_dd: css({
      label: 'page_count_dd',
      display: 'flex',
      alignItems: 'baseline',
      backgroundColor: '#191818',
      padding: '0.4rem 0.4rem',
      color: 'white',
      position: 'relative',
      borderRadius: '0.3rem'
    }),
    pagination_props: css({
      label: 'pagination_props',
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.5rem'
    }),
    page_count_list: css({
      'label': 'page_count_list',
      'display': 'flex',
      'flexDirection': 'column',
      'position': 'absolute',
      'background': '#191818',
      'width': '-webkit-fill-available;',
      'left': 0,
      'top': dropDownTop ? '-3.5rem' : '1.8rem',
      'borderBottomLeftRadius': '0.3rem',
      'borderBottomRightRadius': '0.3rem',
      '& div': {
        'padding': '0.437rem 0.437rem',
        ':hover': {
          backgroundColor: '#383838',
          cursor: 'pointer'
        }
      },
      [mqMax['500']]: {
        top: dropDownTop ? '-3.1rem' : '1.8rem'
      }
    }),
    current_page_count: css({}),
    show_text: css({
      opacity: 0.3,
      [mqMax['500']]: {
        display: 'none'
      }
    })
  };

  const onListOutsideClick = useCallback(() => {
    setIsOpened(false);
  }, []);

  const onPageSizeSelect = (size: number) => {
    setIsOpened(false);
    setPageSize(size);
  };

  const goToNextPage = useCallback(
    () => setCurrentPage(currentPage + 1),
    [currentPage]
  );
  const goToPreviousPage = useCallback(
    () => setCurrentPage(currentPage - 1),
    [currentPage]
  );
  const goToPage = useCallback((page: number) => setCurrentPage(page), []);

  useOutsideClick({
    ref: pageListDropDownRef,
    callback: onListOutsideClick,
    isActive: opened
  });

  return (
    <div css={style.pagination}>
      <div css={style.navigation}>
        <div css={style.pagination_props}>
          <div css={style.show_text}>Show</div>
          <div ref={pageListDropDownRef} css={style.page_count_dd}>
            <div css={style.current_page_count}>{pageSize}</div>
            {opened && (
              <div css={style.page_count_list}>
                {pageSizeList.map((size) => (
                  <div key={size} onClick={() => onPageSizeSelect(size)}>
                    {size}
                  </div>
                ))}
              </div>
            )}

            <Button
              css={[style.btn, style.btn_bottom]}
              onClick={() => {
                recalculateDirection();
                setIsOpened((state) => !state);
              }}
            >
              <ArrowSvg />
            </Button>
          </div>
        </div>
        <div css={style.pages}>
          {generatePageNavigation(currentPage, pagesCount, goToPage)}
        </div>
        <div>|</div>
        <div css={style.button_container}>
          <Button
            css={[style.btn, style.btn_left]}
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            <ArrowSvg />
          </Button>
          <Button
            css={[style.btn, style.btn_right]}
            onClick={goToNextPage}
            disabled={currentPage === pagesCount - 1}
          >
            <ArrowSvg />
          </Button>
        </div>
      </div>
    </div>
  );
};
