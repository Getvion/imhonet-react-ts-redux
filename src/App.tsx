import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Auth, Main, Profile, Games, Movies, Shows, Books } from './pages';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.rawg.io/api/games?key=2d5893a4192a410486b36abbd099f4cb&page=1')
      .then(({ data }) => setGames(data.results));
  }, []);

  useEffect(() => {}, []);
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/games' element={<Games name={'Игры'} games={games} />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/shows' element={<Shows />} />
        <Route path='/books' element={<Books />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
