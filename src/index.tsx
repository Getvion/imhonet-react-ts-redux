import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import App from './App';

import './styles/app.scss';

import './firebase';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
  // </React.StrictMode>
);
