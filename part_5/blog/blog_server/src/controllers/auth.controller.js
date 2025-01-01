const authControllerSetup = ({ db_service, errors }) => ({
  userAuth: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) throw errors.ValidationError('Username and password are required');

    const user = await db_service.Model.findOne({ username });

    if (!user) throw errors.UnauthorizedError('Enter valid username');

    const validatePassword = await user.comparePassword(password);

    if (!validatePassword) throw errors.UnauthorizedError('Enter valid password');

    res.status(200).json({
      token: user.userToken(),
      username: user.username,
      name: user.name,
      id: user._id,
      expiresIn: 3600,
    });
  },
});

export default authControllerSetup;
