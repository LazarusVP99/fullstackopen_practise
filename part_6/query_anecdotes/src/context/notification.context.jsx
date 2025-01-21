import { createContext, useEffect, useReducer } from "react";

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "ERROR_NOTIFICATION":
      return { message: action.payload, type: "error", seconds: 7 };
    case "SUCCESS_NOTIFICATION":
      return { message: action.payload, type: "success", seconds: 5 };
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(
        () =>
          notificationDispatch({
            type: "CLEAR_NOTIFICATION",
          }),
        notification.seconds * 1000
      );

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };
