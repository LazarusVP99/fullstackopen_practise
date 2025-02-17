import { useContext } from 'react';

import { NotificationContext } from '../context/notification.context';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) return null;

  return (
    <div className={`${notification.type}-message-box`} data-testid="alert-message">
      {notification.message}
    </div>
  );
};

export default Notification;
