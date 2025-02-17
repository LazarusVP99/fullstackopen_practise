const usersControllerSetup = ({
  db_service, constants, errors,
}) => ({
  getUsers: async (_req, res) => res
    .json(await db_service.readAll(constants.dataToPopulate)),
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await db_service.readOne(id, constants.dataToPopulate);

    constants.isUserDefined(user, errors);

    res.json(user);
  },
  postUserInfo: async (req, res) => {
    const { username, name, password } = req.body;
    const { message, validatePassword } = constants;

    validatePassword(password, errors);

    await db_service.create({ username, name, password });

    res.status(constants.CREATED).json({ message });
  },
});

export default usersControllerSetup;
