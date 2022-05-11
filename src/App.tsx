import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Main } from './pages';

// TODO: вместо ссылки на профиль показывать предложение войти в аккаунт когда пользователь не залогинен

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
