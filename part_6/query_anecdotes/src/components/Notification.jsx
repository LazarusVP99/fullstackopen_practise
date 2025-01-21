import { useNotificationValue } from "../hooks/notification.hook";
const Notification = () => {
  const notification = useNotificationValue();

  if (!notification) return null;

  return (
    notification && (
      <div className={`${notification.type}_notification`}>
        {notification.message}
      </div>
    )
  );
};

export default Notification;
