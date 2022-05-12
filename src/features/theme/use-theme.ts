import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './themeSlice';

export const useTheme = () => {
  const theme = useSelector((state: { theme: string }) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement;
    const components = ['bg-color', 'text-color', 'shadow-color'];

    components.forEach((component) => {
      root.style.setProperty(`--${component}-default`, `var(--${component}-${theme})`);
    });
  }, [theme]);

  return [theme, toggleTheme];
};
