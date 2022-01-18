/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmptyFn } from '../../types/news.model';

export type ButtonType = {
  children: JSX.Element | string;
  onClick: EmptyFn<void>;
  className?: string;
  disabled?: boolean;
};

const style = {
  container: css({
    'backgroundColor': '#D6D6D6',
    'border': 'none',
    'cursor': 'pointer',
    'width': '1rem',
    'height': '1rem',
    'borderRadius': '1rem',
    'fontWeight': 600,
    'color': 'white',
    'textTransform': 'uppercase',
    'fontSize': '0.6rem',
    ':disabled': {
      backgroundColor: '#3C3C3C',
      opacity: '0.4'
    }
  })
};

export const Button = ({
  children,
  onClick,
  className = 'default',
  disabled = false
}: ButtonType) => (
  <button
    disabled={disabled}
    css={style.container}
    className={className}
    onClick={onClick}
  >
    {children}
  </button>
);
