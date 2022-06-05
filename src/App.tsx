import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

//
// import { db } from './firebase';
// import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
//

import { Header } from './components';
import { Auth, Main, Profile, Games, Movies, Shows, Books, Search, Settings } from './pages';
import { Book, Game, Movie, Show } from './pages/DetailsPages';
import { LoginPopupOffer } from './features/loginOffer/LoginPopupOffer';

function App() {
  const [shows, setShows] = useState([]);
  const BASE_SHOWS = 'https://api.tvmaze.com';

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${BASE_SHOWS}/search/shows?q=girls`).then(({ data }) => setShows(data));
    };

    fetchData();
  }, []);

  // const [users, setUsers] = useState({});
  //
  // const usersCollectionRef = collection(db, 'users');
  // useEffect(() => {
  // async function fetchData() {
  // const data = await getDocs(usersCollectionRef);
  //
  // получаем данные из файрбейза и добавляем id юзера в стейт
  // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  //
  // const newUser = {
  //   name: `${Math.random()}-name`,
  //   surnname: `${Math.random()}-surname`,
  //   age: Math.random() * 100,
  // };
  //
  // добавить пользователя с данными newUser по пути usersCollectionRef
  // await addDoc(usersCollectionRef, newUser);
  //
  // update data
  // const updateUser = async (userId: string, prevAge: number) => {
  // const userDoc = doc(db, 'users', userId);
  //   const newFields = { age: prevAge + 1 };
  //   await updateDoc(userDoc, newFields);
  // };
  // updateUser('zKHyk4XZQ39RTWteegns', 21);
  //
  // удалить пользователя
  // const deleteUser = async (userId: string) => {
  //   const userDoc = doc(db, 'users', userId);
  //   deleteDoc(userDoc);
  // };
  // deleteUser('zKHyk4XZQ39RTWteegns');
  // }
  // fetchData();
  // }, []);

  return (
    <div className='app'>
      <Header />
      <LoginPopupOffer />
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
