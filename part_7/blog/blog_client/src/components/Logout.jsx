import { useContext } from 'react';

import { UserContext } from '../context/user.context';

const Logout = ({ showNotification }) => {
  const { dispatchUser } = useContext(UserContext);
  return (
    <button
      onClick={() => {
        dispatchUser({ type: 'REMOVE_USER' });
        showNotification('info', 'Logged out');
      }}
      className="logout">
      Logout
    </button>
  );
};

export default Logout;
