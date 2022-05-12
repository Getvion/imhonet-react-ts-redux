import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Header } from './components';
import { Auth, Main, Profile, Games, Movies, Shows, Books } from './pages';

// todo: заменить слайдер на свайпер слайдер
// todo: добавить страницы фильмов и сериалов

function App() {
  const [games, setGames] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get('https://api.rawg.io/api/games?key=2d5893a4192a410486b36abbd099f4cb&page=1')
        .then(({ data }) => setGames(data.results));
      await axios
        .get('https://omdbapi.com/?i=tt3896198&apikey=8a6a67e4')
        .then(({ data }) => setMovies(data));
    }
    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/games' element={<Games name={'Популярные игры'} games={games} />} />
        <Route path='/movies' element={<Movies name={'Популярные фильмы'} movies={movies} />} />
        <Route path='/shows' element={<Shows />} />
        <Route path='/books' element={<Books />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
