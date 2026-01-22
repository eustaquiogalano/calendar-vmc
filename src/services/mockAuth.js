import { users } from "../mocks/users.mock";

function userAuth(username, password) {
  let verifiedUser = users.find((user) => {
    return user.username === username && user.password === password;
  });

  // if (!user) {
  //   alert("Username or Password does not match");
  //   return undefined;
  // }

  // alert("You are logged in");
  // return { ...user, isLoggedIn: true };

  alert("You are logged in");

  return {
    name: "Sample Student",
    username: "sample.student@example.com",
    password: "sampstudent",
    idNumber: "1234",
    isLoggedIn: true,
    requestedDocs: [],
  };
}

export default userAuth;
