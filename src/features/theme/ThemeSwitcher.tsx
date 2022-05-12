import React from 'react';
import { GlobalSvgSelector } from '../../assets/icons/GlobalSvgSelector';
import { useTheme } from './use-theme';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme}>
      {theme === 'light' ? <GlobalSvgSelector id='moon' /> : <GlobalSvgSelector id='sun' />}
    </div>
  );
};
