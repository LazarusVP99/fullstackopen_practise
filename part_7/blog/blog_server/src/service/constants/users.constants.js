const userConstants = {
  dataToPopulate: {
    path: 'blogs',
    select: 'title author url likes',
  },
  CREATED: 201,
  message: 'User created',
  validatePassword: (password, errors) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      throw errors.ValidationError(
        'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number',
      );
    }
  },
  isUserDefined: (user, errors) => {
    if (!user) throw errors.NotFoundError("User not found");
  },
};
export default Object.freeze(userConstants);
