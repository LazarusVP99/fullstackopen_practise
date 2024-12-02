import * as bcrypt from 'bcrypt';

const usersControllerSetup = ({ db_service, errors }) => ({
  getUsers: async (_req, res) => {
    const dataToPopulate = {
      path: 'blogs',
      select: 'url title author id',
    };

    const users = await db_service.readAll(dataToPopulate);

    res.json(users);
  },
  postUserInfo: async (req, res) => {
    const { username, name, password } = req.body;

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      throw errors.ValidationError(
        'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number',
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userToCreate = {
      username,
      name,
      password: passwordHash,
    };

    await db_service.create(userToCreate);

    res.status(201).json({ message: 'User created' });
  },
});

export default usersControllerSetup;
