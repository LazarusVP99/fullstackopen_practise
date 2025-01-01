import { useState } from 'react';
import PropTypes from 'prop-types';

import authService from '../services/blog.service';
import localStorageSet from '../services/storage.service';

const Login = ({ notify, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await authService.userAuth({
        username,
        password,
      });

      localStorageSet.setItem('user', loggedUser);

      setUser(loggedUser);
      setUsername('');
      setPassword('');
      notify(`Logged in as ${username}`, 'success');
    } catch (error) {
      notify(error.response.data.error, 'error');
      setUser(null);
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

Login.propTypes = {
  notify: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;