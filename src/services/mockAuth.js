import students from "./mockStudentDatabase";

function userAuth(username, password) {
  // verify admin first
  if (username === "admin.vmc" && password === "qualityeducation") {
    // if admin return admin
    return { userType: "admin", name: "Admin" };
  }

  // if not admin search for student
  let user = students.find((student) => {
    return student.username === username && student.password === password;
  });

  // user cannot find match
  if (!user) {
    alert("Username or Password does not match");
    return undefined;
  }

  // user found return user
  alert("You are logged in");
  return { ...user, isLoggedIn: true };
}

export default userAuth;
