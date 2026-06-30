interface User {
  userType: string;
  username: string;
  password: string;
  email: string;
  name: string;
  idNumber: string;
  yearLevel: number;
  isLoggedIn: boolean;
  requestedDocuments: Array<{
    id: string;
    document: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    purpose: string;
    date: string;
  }>;
}

interface State {
  users: User[];
  currentUser: User | null;
  admins: User[];
  students: User[];
}

interface InitUsersAction {
  type: "INIT_USERS";
  payload: State;
}

interface LoginAction {
  type: "LOGIN";
  payload: User | null;
}

interface LogoutAction {
  type: "LOGOUT";
}

type Action = InitUsersAction | LoginAction | LogoutAction;

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
