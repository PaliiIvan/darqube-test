// import React, { useCallback } from 'react';
// import { Cart } from 'src/components/cart/cart';
// import { Pagination } from '../components/pagination/pagination';
// import { useAppDispatch, useAppSelector } from '../hooks/reducer.hooks';
// import { NewsPageAction } from '../state/news-page/news.reducer';

// import { StyleSheet, css } from 'aphrodite';
// import { getBookmarkNewsPage } from '../state/global.selectors';

// const NewsPage = () => {
//   const { pagination, news } = useAppSelector((state) => state.newsPage);

//   const newsOnPage = useAppSelector((state) =>
//     getBookmarkNewsPage(state, pagination)
//   );

//   const dispatch = useAppDispatch();

//   const style = StyleSheet.create({
//     container: {
//       color: 'white',
//       display: 'grid',
//       height: '85vh',
//       gridTemplateColumns: '2fr 20% 20% 20%',
//       gridTemplateRows: '45% 45% 5rem',
//       gridGap: '1rem',
//       padding: '3rem'
//     },
//     last_search_item: {
//       gridRowStart: '1',
//       gridRowEnd: '3',
//       height: '80%'
//     },
//     pagination: {
//       gridColumnStart: '2',
//       gridColumnEnd: '5'
//     }
//   });

//   const goToNextPage = useCallback(
//     () => dispatch(NewsPageAction.nextNewsPage()),
//     [dispatch]
//   );
//   const goToPreviousPage = useCallback(
//     () => dispatch(NewsPageAction.previousNewsPage()),
//     [dispatch]
//   );

//   const addToBookmark = (id: number) =>
//     dispatch(NewsPageAction.addToBookmark(id));
//   const removeFromBookmark = (id: number) =>
//     dispatch(NewsPageAction.removeFromBookmark(id));

//   return (
//     <div className={css(style.container)}>
//       <div className={css(style.last_search_item)}>
//         <Cart
//           related={news[news.length - 1]?.related}
//           date={new Date(news[news.length - 1]?.datetime)}
//           headline={news[news.length - 1]?.headline}
//           summary={news[news.length - 1]?.summary}
//           image={news[news.length - 1]?.image}
//           addToBookmarkCallback={() => {
//             addToBookmark(news[news.length - 1]?.id);
//           }}
//           removeFromBookmarkCallback={() =>
//             removeFromBookmark(news[news.length - 1]?.id)
//           }
//           isInBookmark={news[news.length - 1]?.isInBookmarks}
//         ></Cart>
//       </div>
//       {newsOnPage.map((n) => {
//         return (
//           <Cart
//             related={n.related}
//             date={new Date(n.datetime)}
//             headline={n.headline}
//             summary={n.summary}
//             image={n.image}
//             addToBookmarkCallback={() => {
//               addToBookmark(n.id);
//             }}
//             removeFromBookmarkCallback={() => removeFromBookmark(n.id)}
//             isInBookmark={n.isInBookmarks}
//           ></Cart>
//         );
//       })}
//       <Pagination
//         allItemsNumber={news.length}
//         currentPage={pagination.from}
//         itemsNumber={pagination.to}
//         nextClickCallback={goToNextPage}
//         previousClickCallback={goToPreviousPage}
//       ></Pagination>
//     </div>
//   );
// };

// export default NewsPage;
export {};
