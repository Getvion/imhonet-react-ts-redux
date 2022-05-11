import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Auth, Main, Profile, Section } from './pages';

// TODO: вместо ссылки на профиль показывать предложение войти в аккаунт когда пользователь не залогинен

function App() {
  const [theme, setTheme] = useState('light');
  const [isUserLogined, setIsUserLogined] = useState(true);

  return (
    <div className='app'>
      <Header
        theme={theme}
        setTheme={setTheme}
        isUserLogined={isUserLogined}
        setIsUserLogined={setIsUserLogined}
      />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/games' element={<Section section={'Игры'} />} />
        <Route path='/movies' element={<Section section={'Movies'} />} />
        <Route path='/shows' element={<Section section={'Shows'} />} />
        <Route path='/shows' element={<Section section={'Shows'} />} />
        <Route path='/books' element={<Section section={'books'} />} />
        <Route path='/music' element={<Section section={'Music'} />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
