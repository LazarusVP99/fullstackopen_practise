const authControllerSetup = ({
  db_service, constants, errors,
}) => ({
  userAuth: async (req, res) => {
    const { username, password } = req.body;
    const { formatAuthResponse, OK } = constants;

    constants.validateAuthCredentials({ username, password }, errors);

    const user = await db_service.Model.findOne({ username });

    constants.isValidUsername(user, errors);

    const validatePassword = await user.comparePassword(password);

    constants.isValidPass(validatePassword, errors);

    res.status(OK).json(formatAuthResponse(user));
  },
});

export default authControllerSetup;
