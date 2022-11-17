import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  loadBestBooks,
  loadBestGames,
  loadBestMovies,
  loadBestShows,
  selectBestContent
} from '../../features/best/bestContentSlice';

import { SectionType } from '../../@types/intefaces';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { Pagination } from '../../components';
import { ContentInner } from './components';

import classes from './Content.module.scss';

interface IProps {
  sectionName: SectionType;
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
      {sectionName === 'games' && <ContentInner content={games} section={sectionName} />}
      {sectionName === 'movies' && <ContentInner content={movies} section={sectionName} />}
      {sectionName === 'shows' && <ContentInner content={shows} section={sectionName} />}
      {sectionName === 'books' && <ContentInner content={books} section={sectionName} />}

      {sectionName === 'games' && (
        <Pagination onClick={(page: number) => dispatch(loadBestGames(String(page)))} />
      )}
      {sectionName === 'movies' && (
        <Pagination onClick={(page: number) => dispatch(loadBestMovies(String(page)))} />
      )}
      {sectionName === 'shows' && (
        <Pagination onClick={(page: number) => dispatch(loadBestShows(String(page)))} />
      )}
      {sectionName === 'books' && (
        <Pagination onClick={(page: number) => dispatch(loadBestBooks(String(page)))} />
      )}
    </div>
  );
};
