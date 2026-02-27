import { getUsers } from "../utils/storage";

async function userAuth(username, password) {
  let users = await getUsers();

  let verifiedUser = users.find((user) => {
    return user.username === username && user.password === password;
  });

  // if no user matched the given username and password
  // inform user and do nothing
  if (!verifiedUser) {
    alert("Username or Password does not match");
    return undefined;
  }

  // inform the user and return the matched user
  alert("You are logged in");
  return { ...verifiedUser, isLoggedIn: true };
}

export default userAuth;
