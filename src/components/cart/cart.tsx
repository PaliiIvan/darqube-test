/** @jsxImportSource @emotion/react */

//import { StyleSheet } from '../../helpers/aphrodite';
import { BookMarkSvgIcon } from 'src/svg/bookmark.svg';
import { GoToIcon } from '../../svg/got_to.svg';
import { EmptyFn } from '../../types/news.model';
import { css } from '@emotion/react';

export type CartType = {
  related: string;
  date: Date;
  headline: string;
  summary: string;
  image: string;
  isResearchedCart?: boolean;
  addToBookmarkCallback: EmptyFn<void>;
  removeFromBookmarkCallback: EmptyFn<void>;
  isInBookmark: boolean;
};

const formatDate = (date: Date) => {
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'short' });

  return `${day} ${month}`;
};

export const Cart = ({
  related,
  date,
  headline,
  summary,
  image,
  addToBookmarkCallback,
  removeFromBookmarkCallback,
  isResearchedCart = false,
  isInBookmark = false
}: CartType) => {
  const cart_summary = css({
    label: 'cart_summary',
    marginBottom: '1rem',
    fontSize: '0.8rem',
    opacity: 0.8,
    overflow: 'hidden',
    background: '-webkit-linear-gradient(#eee, #333)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  });

  const style = {
    cart_container: css({
      label: 'cart_container',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      background: `url(${image}) center no-repeat`,
      backgroundSize: 'cover',
      color: 'white',
      borderRadius: '0.3rem'
    }),
    cart_type: css({
      label: 'cart_type',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem',
      marginLeft: '1rem',
      marginRight: '0',
      fontSize: '0.7rem',
      border: '1px solid',
      width: '5.7rem',
      height: '1.2rem',
      borderRadius: '1rem',
      padding: '0.1rem 0.2rem',
      backgroundColor: 'rgb(0 0 0 / 50%)'
    }),
    cart_footer: css({
      'label': 'cart_footer',
      'display': 'flex',
      'flexDirection': 'column',
      'padding': '1rem',
      'background': 'rgb(0 0 0 / 76%)',
      'height': '15vh',
      'borderBottomLeftRadius': '0.26rem',
      'borderBottomRightRadius': '0.26rem',
      '&:hover': {
        'height': '80%',
        [`.css-${cart_summary.name}`]: {
          background: '-webkit-linear-gradient(#eee, #fff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        },
        '.cart_type': {
          display: 'none'
        }
      },
      'transition': '0.7s'
    }),
    cart_headline: css({
      label: 'cart_headline',
      marginBottom: '1rem',
      fontSize: '1rem',
      textShadow: 'black 0px 0px 2px',
      fontWeight: 600
    }),
    cart_footer_information: css({
      label: 'cart_footer_information',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      fontSize: '0.8rem',
      color: '#babcbe',
      alignItems: 'center',
      marginTop: 'auto'
    }),
    header: css({
      label: 'header',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }),
    research_badge: css({
      label: 'research_badge',
      backgroundColor: '#B73556',
      fontSize: '0.6rem',
      width: 'fit-content',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem',
      padding: '0 0.4rem',
      border: '1px solid',
      height: '1.2rem',
      marginRight: '1rem'
    }),
    research_link: css({
      label: 'research_link',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: 'white',
      gap: '0.5rem'
    }),
    link_date: css({
      label: 'link_date',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '12rem'
    }),
    date: css({
      label: 'date',
      opacity: 0.5
    }),
    bookmark: css({
      label: 'bookmark',
      height: '14px'
    })
  };

  return (
    <div css={style.cart_container}>
      <header css={style.header}>
        <div css={style.cart_type} className="cart_type">
          {related}
        </div>
        {isResearchedCart && (
          <div css={style.research_badge}>LATEST RESEARCH</div>
        )}
      </header>

      <footer css={style.cart_footer}>
        <div css={style.cart_headline}>{headline}</div>
        <div css={cart_summary}>{summary}</div>
        <div css={style.cart_footer_information}>
          <div css={style.link_date}>
            <div css={style.research_link}>
              <GoToIcon /> <div>Read the research</div>
            </div>
            <div>|</div>
            <div css={style.date}>{`${formatDate(date)}`}</div>
          </div>

          {!isInBookmark ? (
            <div css={style.bookmark} onClick={addToBookmarkCallback}>
              <BookMarkSvgIcon filled={false} />
            </div>
          ) : (
            <div css={style.bookmark} onClick={removeFromBookmarkCallback}>
              <BookMarkSvgIcon filled={true} />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
