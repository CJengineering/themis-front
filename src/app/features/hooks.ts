import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { useState, useEffect } from 'react';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem('user-data');

    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user && typeof user === 'object') {
          setUserData(user);
        } else {
          console.error('User data is not in the expected format');
          // Handle case where user data is not in the expected format
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // Handle error for invalid JSON string
      }
    }
  }, []);

  return userData;
};
