import { useSelector } from "react-redux";
import { notificationSelector } from "../reducers/notificationReducer";
const Notification = () => {
  const notification = useSelector(notificationSelector);

  return (
    notification.message && <div className="notification_container">{notification.message}</div>
  );
};

export default Notification;
