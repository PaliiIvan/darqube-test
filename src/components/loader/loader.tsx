/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { LoaderSvg } from '../../svg/loading.svg';

const rotationAnimation = keyframes({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
});

const style = {
  loader_container: css({
    'label': 'loader_container',
    'position': 'absolute',
    'width': '100%',
    'height': '100%',
    'top': 0,
    'left': 0,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    '& svg': {
      fill: '#6d6d6d',
      animation: `${rotationAnimation} 2s linear infinite`
    }
  })
};

export const Loader = () => {
  return (
    <div css={style.loader_container}>
      <LoaderSvg></LoaderSvg>
    </div>
  );
};
