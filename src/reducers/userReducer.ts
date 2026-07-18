import { Admin, Student } from "@/types/user";

interface State {
  users: Student[] | Admin[];
  currentUser: Student | Admin | null;
  admins: Admin[];
  students: Student[];
}

interface InitUsersAction {
  type: "INIT_USERS";
  payload: State;
}

interface UpdateStudentAction {
  type: "UPDATE_CURRENT_USER";
  payload: Student | Admin;
}

interface LoginAction {
  type: "LOGIN";
  payload: Student | Admin | null;
}

interface LogoutAction {
  type: "LOGOUT";
}

type Action =
  | InitUsersAction
  | LoginAction
  | LogoutAction
  | UpdateStudentAction;

function usersReducer(state: State, action: Action) {
  switch (action.type) {
    case "INIT_USERS":
      return {
        ...state,
        users: action.payload.users,
        currentUser: action.payload.currentUser,
        admins: action.payload.admins,
        students: action.payload.students,
      };

    case "UPDATE_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
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
