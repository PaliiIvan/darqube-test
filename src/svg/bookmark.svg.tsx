import React from 'react';

export const BookMarkSvgIcon = ({ filled }: { filled: boolean }) => {
  if (filled) {
    return (
      <svg
        width="13"
        height="14"
        viewBox="0 0 41 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H41V43.9286L20.3913 35.3824L0 43.9286V0Z" fill="#828383" />
      </svg>
    );
  } else {
    return (
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M2.76367 2.83594V10.1574L5.71327
            8.92119L6.48226 8.5989L7.25246
            8.91829L10.27 10.1696V2.83594H2.76367ZM0.763672
            0.835938H12.27V13.1642L6.48634
            10.7657L0.763672 13.1642V0.835938Z`}
          fill="#828383"
        />
      </svg>
    );
  }
};
