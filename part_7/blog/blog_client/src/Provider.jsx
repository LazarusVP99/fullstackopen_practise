import { NotificationContextProvider } from './context/notification.context';
import { UserContextProvider } from './context/user.context';

const ContextProvider = ({ children }) => (
  <UserContextProvider>
    <NotificationContextProvider>{children}</NotificationContextProvider>
  </UserContextProvider>
);

export default ContextProvider;
