const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ERROR_NOTIFICATION':
      return { message: action.payload, type: 'error', timer: 7 };
    case 'INFO_NOTIFICATION':
      return { message: action.payload, type: 'info', timer: 5 };
    case 'SUCCESS_NOTIFICATION':
      return { message: action.payload, type: 'success', timer: 5 };
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
