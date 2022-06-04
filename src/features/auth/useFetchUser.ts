import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './userSlice';

interface IUserData {
  user: { email: string; name: string; description: string; imageUrl: string };
}

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: IUserData) => state.user);

  useEffect(() => {
    const getData = async () => {
      if (userData.email) {
        const docRef = doc(db, 'users', userData.email);

        const docSnap = await getDoc(docRef);
        const fetchData = docSnap.data();
        if (fetchData) {
          const { name, email, token, imageUrl, description } = fetchData;
          dispatch(
            setUser({ name: name, email: email, token: token, imageUrl: imageUrl, description: description })
          );
        }
      }
    };

    getData();
  }, [dispatch, userData]);

  return userData;
};
