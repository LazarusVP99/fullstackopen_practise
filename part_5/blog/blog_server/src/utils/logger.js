const info = (...params) => {
  console.log(...params);
};

const errors = (...params) => {
  console.error(...params);
};

export default {
  info,
  errors,
};
