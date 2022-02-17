/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { mqMax } from '../../helpers/css-helper';
import { useOutsideClick } from '../../hooks/click-outside.hook';
import { useAppSelector } from '../../hooks/reducer.hooks';
import SearchIcon from '../../images/search.svg';
import { News } from '../../types/news.model';

const style = {
  search: css({
    'label': 'search',
    'position': 'relative',
    'display': 'flex',
    'width': '100%',
    ':before': {
      backgroundImage: `url("${SearchIcon}")`,
      backgroundRepeat: 'no-repeat',
      content: "''",
      width: '2rem',
      backgroundColor: '#191818',
      backgroundPosition: 'center'
    }
  }),
  search_input: css({
    'label': 'search_input',
    'backgroundColor': '#191818',
    'border': 'none',
    'width': '100%',
    'height': '1.6rem',
    'color': '#a9a9a9;',
    ':focus': {
      outline: 'none'
    },
    ':active': {
      outline: 'none'
    }
  }),
  search_result_container: css({
    'label': 'search_result_container',
    'position': 'absolute',
    'backgroundColor': '#191818',
    'width': '100%',
    'top': '1.7rem',
    'color': '#a9a9a9',
    'fontSize': '0.7rem',
    'zIndex': 1,
    'maxHeight': '35rem',
    'overflowY': 'auto',
    '&::-webkit-scrollbar': {
      width: '0.6rem',
      border: '1px solid #4e3e3e'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#8a8a8a'
    },
    [mqMax[500]]: {
      right: '0%',
      width: '17rem'
    }
  }),
  search_result: css({
    'label': 'search_result',
    'padding': '1rem',
    'display': 'flex',
    'alignItems': 'center',
    'cursor': 'pointer',
    'color': '#a9a9a9',
    'textDecoration': 'none',
    '&:hover': {
      backgroundColor: '#383838'
    }
  })
};

export const SearchInput = () => {
  const news = useAppSelector((state) => state.newsPage.news);
  const [searchInputVal, setSearchInputVal] = useState('');
  const [searchResult, setSearchResult] = useState<Array<News>>([]);
  const searchResultContainerRef = useRef();

  const onOutsideClickCallback = useCallback(() => {
    setSearchResult([]);
    setSearchInputVal('');
  }, []);

  useOutsideClick({
    ref: searchResultContainerRef,
    callback: onOutsideClickCallback
  });

  useEffect(() => {
    const items = news.filter((x) =>
      x.headline.toLowerCase().includes(searchInputVal.toLowerCase() || null)
    );
    setSearchResult(items);
  }, [news, searchInputVal, setSearchResult]);

  return (
    <div ref={searchResultContainerRef} css={style.search}>
      <input
        value={searchInputVal}
        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInputVal(event.target.value)
        }
        css={style.search_input}
        type="text"
        placeholder="Search"
      ></input>
      <div css={style.search_result_container}>
        {searchResult?.map((n) => (
          <a css={style.search_result} href={n.url} target={'_blank'}>
            {n.headline}
          </a>
        ))}
      </div>
    </div>
  );
};
