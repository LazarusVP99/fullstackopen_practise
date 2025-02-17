import { useContext, useState } from 'react';

import { NotificationContext } from '../context/notification.context';
import { UserContext } from '../context/user.context';
import { userAuth } from '../services/user.service';

const Login = () => {
  const { dispatchUser } = useContext(UserContext);
  const { showNotification } = useContext(NotificationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const loggedUser = await userAuth({
        username,
        password,
      });

      dispatchUser({ type: 'SET_USER', payload: loggedUser });

      setUsername('');
      setPassword('');
      showNotification('success', `Logged in as ${username}`);
    } catch (error) {
      showNotification('error', error);
      dispatchUser({ type: 'REMOVE_USER' });
    }
  };

  return (
    <div className="login-form">
      <h2>Login to Watch Notes</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="username"
          />
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
