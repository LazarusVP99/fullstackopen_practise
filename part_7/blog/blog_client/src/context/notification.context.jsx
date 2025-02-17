import { createContext, useEffect, useReducer } from 'react';

import notificationReducer from '../utils/notificationReducer';

const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(
        () => dispatch({ type: 'CLEAR_NOTIFICATION' }),
        notification.timer * 1000
      );
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (type, message) =>
    dispatch({
      type: `${type.toUpperCase()}_NOTIFICATION`,
      payload: message,
    });

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };
