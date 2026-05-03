function usersReducer(state, action) {
  switch (action.type) {
    case "INIT_USERS":
      return {
        ...state,
        users: action.payload.users,
        currentUser: action.payload.currentUser,
        admins: action.payload.admins,
        students: action.payload.students,
      };

    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
}

export default usersReducer;
