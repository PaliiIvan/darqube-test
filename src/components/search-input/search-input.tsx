/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/reducer.hooks';
import SearchIcon from '../../images/search.svg';

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
    label: 'search_result_container',
    position: 'absolute',
    backgroundColor: '#191818',
    width: '100%',
    top: '1.7rem',
    color: '#a9a9a9',
    fontSize: '0.7rem',
    zIndex: 1
  }),
  search_result: css({
    'label': 'search_result',
    'padding': '1rem',
    'display': 'flex',
    'alignItems': 'center',
    'cursor': 'pointer',
    '&:hover': {
      backgroundColor: '#383838'
    }
  })
};

export const SearchInput = () => {
  const news = useAppSelector((state) => state.newsPage.news);
  const [searchInputVal, setSearchInputVal] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const items = news.filter((x) =>
      x.headline.toLowerCase().includes(searchInputVal.toLowerCase() || null)
    );
    setSearchResult(items);
  }, [news, searchInputVal, setSearchResult]);

  return (
    <div css={style.search}>
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
          <div css={style.search_result}>{n.headline}</div>
        ))}
      </div>
    </div>
  );
};
