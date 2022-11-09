import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Auth, Main, Profile, Search, Settings, Detail, Content } from './pages';
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

        <Route path='/games' element={<Content sectionName='games' />} />
        <Route path='/movies' element={<Content sectionName='movies' />} />
        <Route path='/shows' element={<Content sectionName='shows' />} />
        <Route path='/books' element={<Content sectionName='books' />} />

        <Route path='/auth' element={<Auth />} />
        <Route path='/search/*' element={<Search />} />
        <Route path='/settings/*' element={<Settings />} />

        <Route path='/games/:id' element={<Detail sectionName='games' />} />
        <Route path='/movies/:id' element={<Detail sectionName='movies' />} />
        <Route path='/shows/:id' element={<Detail sectionName='shows' />} />
        <Route path='/books/:id' element={<Detail sectionName='books' />} />
      </Routes>
    </div>
  </div>
);

export default App;
