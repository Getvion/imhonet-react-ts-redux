import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

//
// todo унифицировать входящие данные
// todo добавить поле описание для списков
// todo настройки все
// todo добавить индикаторы загрузки в профиль и в страницы элементов
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

          <Route path='/games/*' element={<Game sectionName={'games'} />} />
          <Route path='/movies/*' element={<Movie sectionName={'movies'} />} />
          <Route path='/shows/*' element={<Show />} />
          <Route path='/books/*' element={<Book />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
