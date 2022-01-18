/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '../button/button';
import { EmptyFn } from '../../types/news.model';
import { ReactComponent as ArrowSvg } from '../../images/arrow.svg';
import { SetStateAction, useState } from 'react';

export type PaginationType = {
  currentPage: number;
  pageSize: number;
  allItemsCount: number;
  pagesCount: number;
  nextClickCallback: EmptyFn<void>;
  previousClickCallback: EmptyFn<void>;
  setCurrentPageCallback: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

const generatePageNavigation = (
  currentPage: number,
  pagesCount: number,
  setCurrentPageCallback: (p: number) => void
) => {
  const pageList = [];

  if (currentPage <= 5) {
    for (let index = 0; index < 9; index++) {
      const pageNumber = (
        <div
          className={index === currentPage && 'active'}
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

  if (currentPage >= pagesCount - 4) {
    for (let index = pagesCount - 9; index < pagesCount; index++) {
      const pageNumber = (
        <div
          className={index === currentPage && 'active'}
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
          className={index === currentPage && 'active'}
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

export const Pagination = ({
  pageSize,
  setPageSize,
  currentPage,
  nextClickCallback,
  previousClickCallback,
  setCurrentPageCallback,
  allItemsCount,
  pagesCount
}: PaginationType) => {
  const pageSizeList = [3, 6, 8];
  const [opened, setIsOpened] = useState(false);

  const style = {
    pagination: css({
      gridColumnStart: '2',
      gridColumnEnd: '5',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.9rem',
      alignItems: 'center'
    }),
    navigation: css({
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
      color: 'white'
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
      'display': 'flex',
      'flexDirection': 'column',
      'position': 'absolute',
      'background': '#191818',
      'width': '-webkit-fill-available;',
      'left': 0,
      'top': '1.8rem',
      'borderBottomLeftRadius': '0.3rem',
      'borderBottomRightRadius': '0.3rem',
      '& div': {
        'padding': '0.437rem 0.437rem',
        ':hover': {
          backgroundColor: '#383838',
          cursor: 'pointer'
        }
      }
    }),
    current_page_count: css({}),
    show_text: css({
      opacity: 0.3
    })
  };
  return (
    <div css={style.pagination}>
      <div css={style.navigation}>
        <div css={style.pagination_props}>
          <div css={style.show_text}>Show</div>
          <div css={style.page_count_dd}>
            <div css={style.current_page_count}>{pageSize}</div>
            {opened && (
              <div css={style.page_count_list}>
                {pageSizeList.map((size) => (
                  <div onClick={() => setPageSize(size)}>{size}</div>
                ))}
              </div>
            )}

            <Button
              css={[style.btn, style.btn_bottom]}
              onClick={() => {
                setIsOpened((state) => !state);
              }}
            >
              <ArrowSvg />
            </Button>
          </div>
        </div>
        <div css={style.pages}>
          {generatePageNavigation(
            currentPage,
            pagesCount,
            setCurrentPageCallback
          )}
        </div>
        <div>|</div>
        <div css={style.button_container}>
          <Button
            css={[style.btn, style.btn_left]}
            onClick={() => {
              previousClickCallback();
            }}
            disabled={currentPage === 0}
          >
            <ArrowSvg />
          </Button>
          <Button
            css={[style.btn, style.btn_right]}
            onClick={() => {
              nextClickCallback();
            }}
            disabled={currentPage === pagesCount - 1}
          >
            <ArrowSvg />
          </Button>
        </div>
      </div>
    </div>
  );
};
