import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
// !  { items: [], title: '', description: '' } - структура элемента списка

//
// todo настройки все
// todo удаление элемента из списка
// todo создание списков
// todo удаление списков
// todo для слайдеров добавить стрелочки
// todo придумать что можно сделать с функциями добавления в любимое и ожидаемое
//

import { Header } from './components';
import { Auth, Main, Profile, Games, Movies, Shows, Books, Search, Settings } from './pages';
import { Book, Game, Movie, Show } from './pages/DetailsPages';
import { ListsCatalogPopup, LoginPopupOffer, Notification } from './features';

function App() {
  const [shows, setShows] = useState([]);
  const BASE_SHOWS = 'https://api.tvmaze.com';

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${BASE_SHOWS}/search/shows?q=girls`).then(({ data }) => setShows(data));
    };

    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />
      <LoginPopupOffer />
      <ListsCatalogPopup />
      <div className='app__container'>
        <Notification />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/profile/*' element={<Profile />} />
          <Route path='/games' element={<Games />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/shows' element={<Shows />} />
          <Route path='/books' element={<Books />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/search/*' element={<Search />} />
          <Route path='/settings/*' element={<Settings />} />

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
