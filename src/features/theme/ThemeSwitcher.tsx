import React from 'react';

import { GlobalSvgSelector } from '../../assets/icons/GlobalSvgSelector';
import { useTheme } from '../../hooks';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{ backgroundColor: 'inherit', border: 'none', color: 'inherit' }}
    >
      {theme === 'light' ? <GlobalSvgSelector id='moon' /> : <GlobalSvgSelector id='sun' />}
    </button>
  );
};
