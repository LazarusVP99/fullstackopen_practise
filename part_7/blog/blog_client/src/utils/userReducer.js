import localStorageSet from '../services/storage.service';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      localStorageSet.setItem('user', action.payload);
      return action.payload;
    case 'REMOVE_USER':
      localStorageSet.removeItem('user');
      return null;
    default:
      return state;
  }
};

export default userReducer;
