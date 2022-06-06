import { Auth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setEmailAndName } from './userSlice';

export const useAuthOnReload = (auth: Auth) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setEmailAndName({ email: currentUser.email, name: currentUser.displayName }));
      }
    });
  }, [auth, dispatch]);
};
