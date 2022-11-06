import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import {
  loadBestBooks,
  loadBestGames,
  loadBestMovies,
  loadBestShows,
  selectBestContent
} from '../../features/best/bestContentSlice';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ContentInner } from './components';

import classes from './Content.module.scss';

interface IProps {
  sectionName: string;
}

export const Content: React.FC<IProps> = ({ sectionName }) => {
  const dispatch = useAppDispatch();

  const { books, games, shows, movies } = useSelector(selectBestContent);

  useEffect(() => {
    if (sectionName === 'games') dispatch(loadBestGames());
    if (sectionName === 'movies') dispatch(loadBestMovies());
    if (sectionName === 'shows') dispatch(loadBestShows());
    if (sectionName === 'books') dispatch(loadBestBooks());
  }, [sectionName]);

  const contentTypeCheck = () => {
    if (sectionName === 'games') return 'игры';
    if (sectionName === 'movies') return 'фильмы';
    if (sectionName === 'shows') return 'сериалы';
    if (sectionName === 'books') return 'книги';
  };

  return (
    <div className={classes.content}>
      <h2 className={classes.content__title}>Лучшие {contentTypeCheck()}</h2>
      {sectionName === 'games' ? <ContentInner content={games} section={sectionName} /> : null}
      {sectionName === 'movies' ? <ContentInner content={movies} section={sectionName} /> : null}
      {sectionName === 'shows' ? <ContentInner content={shows} section={sectionName} /> : null}
      {sectionName === 'books' ? <ContentInner content={books} section={sectionName} /> : null}
    </div>
  );
};
