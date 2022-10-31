import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Auth, Main, Profile, Games, Movies, Search, Settings, DetailPage } from './pages';
import { ListsCatalogPopup, LoginPopupOffer, Notification } from './features';

const App = () => (
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
        <Route path='/shows' element={<Movies />} />

        <Route path='/auth' element={<Auth />} />
        <Route path='/search/*' element={<Search />} />
        <Route path='/settings/*' element={<Settings />} />

        <Route path='/games/:id' element={<DetailPage sectionName='games' />} />
        <Route path='/movies/:id' element={<DetailPage sectionName='movies' />} />
        <Route path='/shows/:id' element={<DetailPage sectionName='shows' />} />
        <Route path='/books/:id' element={<DetailPage sectionName='books' />} />
      </Routes>
    </div>
  </div>
);

export default App;
