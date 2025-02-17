import { createContext, useReducer } from 'react';

import localStorageSet from '../services/storage.service';
import userReducer from '../utils/userReducer';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, localStorageSet.getItem('user'));

  const userValue = { user, dispatchUser };

  return <UserContext.Provider value={userValue}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
