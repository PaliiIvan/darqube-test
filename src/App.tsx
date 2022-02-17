import React, { useEffect } from 'react';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Loader } from './components/loader/loader';
import { Navigation } from './components/navigation/navigation';
import { useAppDispatch, useAppSelector } from './hooks/reducer.hooks';
import NewsPage from './pages/news.page';
import { getBookMarkNewsSelector } from './state/global.selectors';
import { fetchNews } from './state/news-page/news.reducer';

function App() {
  const dispatch = useAppDispatch();
  const { news, isLoading } = useAppSelector((state) => state.newsPage);
  const newsInBookmark = useAppSelector(getBookMarkNewsSelector);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/news" />}></Route>
            <Route
              path={'/news'}
              element={<NewsPage key={'news'} news={news} />}
            ></Route>
            <Route
              path={'/bookmarks'}
              element={<NewsPage key={'bookmark'} news={newsInBookmark} />}
            ></Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
