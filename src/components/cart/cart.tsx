/** @jsxImportSource @emotion/react */

import { BookMarkSvgIcon } from 'src/svg/bookmark.svg';
import { GoToIcon } from '../../svg/got_to.svg';
import { News } from '../../types/news.model';
import { css, keyframes, SerializedStyles } from '@emotion/react';
import { mqMax } from '../../helpers/css-helper';
import { formatDate } from '../../helpers/data-helper';

export type CartType = {
  news: News;
  isResearchedCart?: boolean;
  addToBookmarkCallback(id: number): void;
  removeFromBookmarkCallback(id: number): void;
  size: 'medium' | 'small';
  className?: SerializedStyles;
};

export const Cart = ({
  news,
  addToBookmarkCallback,
  removeFromBookmarkCallback,
  isResearchedCart = false,
  size = 'medium',
  className = null
}: CartType) => {
  const rotationAnimation = keyframes({
    from: {
      height: '6ch'
    },
    to: {
      height: '25ch'
    }
  });

  const cart_summary = css({
    label: 'cart_summary',
    marginBottom: '1rem',
    fontSize: size === 'medium' ? '0.8rem' : '0.7rem',
    opacity: 0.8,
    overflow: 'hidden',
    background: '-webkit-linear-gradient(#eee, #333)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    height: '6ch'
  });

  const style = {
    cart_container: css({
      label: 'cart_container',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      background: `url(${news.image}) center no-repeat`,
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
      label: 'cart_footer',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      background: 'rgb(0 0 0 / 76%)',
      height: '20vh',
      borderBottomLeftRadius: '0.26rem',
      borderBottomRightRadius: '0.26rem',
      '&:hover': {
        height: '80%',
        [`.css-${cart_summary.name}`]: {
          background: '-webkit-linear-gradient(#eee, #fff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${rotationAnimation} 1s forwards`
        }
      },
      transition: '0.7s'
    }),
    footer_content: css({}),
    cart_headline: css({
      label: 'cart_headline',
      marginBottom: '1rem',
      fontSize: size === 'medium' ? '1rem' : '0.8rem',
      textShadow: 'black 0px 0px 2px',
      fontWeight: 600,
      [mqMax[1260]]: {
        fontSize: '0.8rem'
      }
    }),
    cart_footer_information: css({
      label: 'cart_footer_information',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      fontSize: size === 'medium' ? '0.8rem' : '0.6rem',
      color: '#babcbe',
      alignItems: 'center',
      marginTop: 'auto',
      [mqMax[1260]]: {
        fontSize: '0.6rem'
      }
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
      gap: '0.5rem',
      cursor: 'pointer',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline',

        '& svg': {
          fill: 'white'
        }
      }
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
      '& svg': {
        height: size === 'medium' ? '14px' : '12px'
      },
      height: size === 'medium' ? '14px' : '12px',
      marginLeft: '0.4rem',
      [mqMax[1260]]: {
        height: '12px'
      }
    })
  };

  return (
    <div css={[style.cart_container, className]}>
      <header css={style.header}>
        <div css={style.cart_type} className="cart_type">
          {news.related}
        </div>
        {isResearchedCart && (
          <div css={style.research_badge}>LATEST RESEARCH</div>
        )}
      </header>

      <footer css={style.cart_footer}>
        <div css={style.footer_content}>
          <div css={style.cart_headline}>
            {news.headline?.length > 70
              ? `${news.headline.slice(0, 70)}...`
              : news.headline}
          </div>
          <div css={cart_summary}>{news.summary}</div>
        </div>

        <div css={style.cart_footer_information}>
          <div css={style.link_date}>
            <a href={news.url} target={'_blank'} css={style.research_link}>
              <GoToIcon /> <div>Read the research</div>
            </a>
            <div>|</div>
            <div css={style.date}>{`${formatDate(news.datetime)}`}</div>
          </div>

          {!news.isInBookmarks ? (
            <div
              css={style.bookmark}
              onClick={() => addToBookmarkCallback(news.id)}
            >
              <BookMarkSvgIcon filled={false} />
            </div>
          ) : (
            <div
              css={style.bookmark}
              onClick={() => removeFromBookmarkCallback(news.id)}
            >
              <BookMarkSvgIcon filled={true} />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
