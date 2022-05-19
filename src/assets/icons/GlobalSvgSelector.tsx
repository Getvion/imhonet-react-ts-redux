import React from 'react';

interface Props {
  id: string;
}

export const GlobalSvgSelector = ({ id }: Props) => {
  switch (id) {
    case 'moon':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
        </svg>
      );

    case 'sun':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='5'></circle>
          <line x1='12' y1='1' x2='12' y2='3'></line>
          <line x1='12' y1='21' x2='12' y2='23'></line>
          <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
          <line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
          <line x1='1' y1='12' x2='3' y2='12'></line>
          <line x1='21' y1='12' x2='23' y2='12'></line>
          <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
          <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
        </svg>
      );

    case 'more':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 123 123'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M61.44,0c16.96,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44s-6.88,32.33-18,43.44c-11.12,11.12-26.48,18-43.44,18 c-16.96,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.48,6.88,29.12,18,18C29.11,6.88,44.47,0,61.44,0L61.44,0z M61.44,92.3c-3.99,0-7.23-3.24-7.23-7.22s3.24-7.22,7.23-7.22c3.99,0,7.23,3.24,7.23,7.22C68.67,89.07,65.43,92.3,61.44,92.3 L61.44,92.3L61.44,92.3z M61.44,43.99c-3.99,0-7.23-3.23-7.23-7.22c0-3.99,3.24-7.22,7.23-7.22c3.99,0,7.23,3.23,7.23,7.22 S65.43,43.99,61.44,43.99L61.44,43.99L61.44,43.99z M61.44,68.15c-3.99,0-7.23-3.24-7.23-7.22c0-3.99,3.24-7.22,7.23-7.22 c3.99,0,7.23,3.24,7.23,7.22C68.67,64.91,65.43,68.15,61.44,68.15L61.44,68.15L61.44,68.15z M97.67,25.2 C88.4,15.93,75.59,10.2,61.44,10.2c-14.15,0-26.96,5.74-36.23,15.01C15.93,34.48,10.2,47.29,10.2,61.44 c0,14.15,5.74,26.96,15.01,36.24c9.27,9.27,22.08,15.01,36.24,15.01s26.96-5.74,36.23-15.01c9.27-9.27,15.01-22.08,15.01-36.24 C112.68,47.29,106.95,34.48,97.67,25.2L97.67,25.2z' />
        </svg>
      );
    default:
      return null;
  }
};
