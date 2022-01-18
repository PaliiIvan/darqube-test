import React, { useEffect } from 'react';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Navigation } from './components/navigation/navigation';
import { useAppDispatch } from './hooks/reducer.hooks';
// import BookMarksPage from './pages/bookmarks.page';
import NewsPage from './pages/news.page';
import { fetchNews } from './state/news-page/news.reducer';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/" element={<Navigate to="/news" />}></Route>
          <Route path={'/news'} element={<NewsPage />}></Route>
          {/* <Route path={'/bookmarks'} element={<BookMarksPage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
