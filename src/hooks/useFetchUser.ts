import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { setUser } from '../features/auth/userSlice';

interface IUserData {
  user: {
    userData: {
      email: string;
      name: string;
      imageUrl: string;
      description: string;
      country: string;
      socialMedia: { link: string; name: string }[];
    };
  };
}

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IUserData) => state.user);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'users', user.userData.email);
      const docSnap = await getDoc(docRef);
      const fetchData = docSnap.data();

      dispatch(setUser(fetchData));
    };

    getData();
  }, [dispatch, user.userData.email]);

  return user;
};
