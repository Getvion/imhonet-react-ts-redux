import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Header } from './components';
import { Auth, Main, Profile, Games, Movies, Shows, Books } from './pages';

// todo: добавить страницы фильмов и сериалов
// todo: добавить индикатор загрузки при переклюечении картинок в слайдере
// todo: в слайдер вставлять случайную игру

function App() {
  const [games, setGames] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const GAMES_BASE = 'https://api.rawg.io/api';
  const GAMES_API_KEY = '2d5893a4192a410486b36abbd099f4cb';

  const MOVIES_BASE = 'https://kinopoiskapiunofficial.tech/api';
  const MOVIES_API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';

  const BASE_SHOWS = 'https://api.tvmaze.com';

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${GAMES_BASE}/games?key=${GAMES_API_KEY}&page=1`)
        .then(({ data }) => setGames(data.results));

      await axios
        .get(`${MOVIES_BASE}/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1`, {
          headers: {
            'X-API-KEY': MOVIES_API_KEY,
          },
        })
        .then(({ data }) => setMovies(data.films));

      await axios.get(`${BASE_SHOWS}/search/shows?q=girls`).then(({ data }) => setShows(data));
    }

    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/games' element={<Games name={'Лучшие игры'} games={games} />} />
        <Route path='/movies' element={<Movies name={'Лучшие фильмы'} movies={movies} />} />
        <Route path='/shows' element={<Shows />} />
        <Route path='/books' element={<Books />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
