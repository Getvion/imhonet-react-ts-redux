import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser, setUser } from '../features/auth/userSlice';

import { IUserData } from '../@types/state';

import { db } from '../firebase';

export const fetchUserData = async (user: IUserData) => {
  const docRef = doc(db, 'users', user.userData.email);
  const docSnap = await getDoc(docRef);
  const fetchData = docSnap.data() as IUserData;

  return fetchData;
};

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchUserData(user).then((data: IUserData) => data && dispatch(setUser(data)));
  }, []);

  if (!user.userData.imageUrl) {
    fetchUserData(user).then((data: IUserData) => data && dispatch(setUser(data)));
  }

  return user;
};
