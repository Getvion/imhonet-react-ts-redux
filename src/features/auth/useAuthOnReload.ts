import { Auth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './userSlice';

export const useAuthOnReload = (auth: Auth) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            email: currentUser.email,
            name: currentUser.displayName,
            token: currentUser.refreshToken,
          })
        );
      }
    });
  }, [auth, dispatch]);
};
