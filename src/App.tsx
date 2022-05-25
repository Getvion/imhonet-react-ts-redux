import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Header } from './components';
import { Auth, Main, Profile, Games, Movies, Shows, Books, Search } from './pages';
import { Book, Game, Movie, Show } from './pages/DetailsPages';

function App() {
  const [shows, setShows] = useState([]);

  const BASE_SHOWS = 'https://api.tvmaze.com';

  useEffect(() => {
    async function fetchData() {
      await axios.get(`${BASE_SHOWS}/search/shows?q=girls`).then(({ data }) => setShows(data));
    }

    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />
      <div className='app__container'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/profile/*' element={<Profile />} />
          <Route path='/games' element={<Games />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/shows' element={<Shows />} />
          <Route path='/books' element={<Books />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/search/*' element={<Search />} />

          <Route path='/games/*' element={<Game />} />
          <Route path='/movies/*' element={<Movie />} />
          <Route path='/shows/*' element={<Show />} />
          <Route path='/books/*' element={<Book />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
