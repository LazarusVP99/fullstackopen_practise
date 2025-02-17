const authConstants = {
  validateAuthCredentials: (credentials, errors) => {
    const { username, password } = credentials;
    if (!username?.trim() || !password?.trim()) throw errors.ValidationError('Username and password are required');
  },
  isValidUsername: (user, errors) => {
    if (!user) throw errors.UnauthorizedError('Enter valid username');
  },
  isValidPass: (validatePassword, errors) => {
    if (!validatePassword) throw errors.UnauthorizedError('Enter valid password');
  },
  formatAuthResponse: (user) => ({
    token: user.generateToken(),
    username: user.username,
    name: user.name,
    id: user._id,
    expiresIn: 3600,
  }),
  OK: 200,
};

export default authConstants;
