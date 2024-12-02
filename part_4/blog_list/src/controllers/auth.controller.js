import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../utils/config.js';

const authControllerSetup = ({ db_service, errors }) => ({
  userAuth: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) throw errors.ValidationError('Username and password are required');

    const user = await db_service.Model.findOne({ username });

    if (!user) throw errors.UnauthorizedError('Enter valid username');

    const { name, _id: id } = user;
    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) throw errors.UnauthorizedError('Enter valid password');

    const userToken = jwt.sign(
      {
        username: user.username,
        id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      config.SECRET,
    );

    res.status(200).json({
      token: userToken,
      username: user.username,
      name,
      expiresIn: 3600,
    });
  },
});

export default authControllerSetup;
