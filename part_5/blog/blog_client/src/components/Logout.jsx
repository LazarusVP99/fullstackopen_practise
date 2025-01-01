import localStorageSet from '../services/storage.service';

const Logout = ({ setUser, notify }) => (
  <button
    onClick={() => {
      localStorageSet.removeItem('user');
      notify('Logged out', 'success');
      setUser(null);
    }}
    className="logout"
  >
    Logout
  </button>
);

export default Logout;
