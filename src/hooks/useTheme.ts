import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTheme, setTheme } from '../features/theme/themeSlice';

export const useTheme = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const localTheme = localStorage.getItem('theme');

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (localTheme) dispatch(setTheme(localTheme));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const root = document.querySelector(':root') as HTMLElement;
    const components = ['bg-color', 'text-color', 'shadow-color'];

    components.forEach((component) => {
      root.style.setProperty(`--${component}-default`, `var(--${component}-${theme})`);
    });
  }, [theme]);

  return { theme, toggleTheme };
};
