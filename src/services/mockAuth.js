import students from "./mockDatabase";

function userAuth(username, password) {
  // let user = students.find((student) => {
  //   return student.username === username && student.password === password;
  // });

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
