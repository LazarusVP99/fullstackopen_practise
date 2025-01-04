const userConstants = {
  dataToPopulate: {
    path: 'user',
    select: 'username name id',
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
};
export default Object.freeze(userConstants);
