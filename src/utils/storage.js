import localforage from "localforage";
import { users as mockUsers } from "../mocks/users.mock";

async function setInitialUsers() {
  await fakeNetwork();

  const persistentData = await localforage.getItem("users");

  if (persistentData) {
    return await localforage.setItem("users", persistentData);
  }

  return await localforage.setItem("users", mockUsers);
}

async function getStudentUsers() {
  await fakeNetwork();

  let users = await localforage.getItem("users");
  if (!users) users = [];

  let students = users.filter((user) => {
    if (user.userType === "student") return user;
  });

  await set(students, "students");

  return students;
}

async function getAdminUsers() {
  await fakeNetwork();

  let users = await localforage.getItem("users");
  if (!users) users = [];

  let admins = users.filter((user) => {
    if (user.userType === "admin") return user;
  });

  await set(admins, "admins");

  return admins;
}

async function getUsers(query) {
  await fakeNetwork(query);

  let users = await localforage.getItem("users");
  if (!users) users = [];

  return users;
}

async function updateUser(id, update) {
  await fakeNetwork();

  let users = await localforage.getItem("users");
  if (!users) users = [];

  let user = users.find((user) => user.idNumber === id);

  if (!user) throw new Error(`No user found for`);
  Object.assign(user, update);
  await set(users);

  return user;
}

async function getCurrentUser() {
  await fakeNetwork();

  let users = await localforage.getItem("users");
  if (!users) users = [];

  let currentUser = users.find((user) => {
    if (user.isLoggedIn === true) return user;
  });

  await set(currentUser, "currentUser");

  return currentUser;
}

async function updateRequestStatus(studentID, requestID, update) {
  await fakeNetwork();

  let students = await getStudentUsers();
  if (!students) return [];

  let student = students.find((student) => student.idNumber === studentID);
  if (!student) throw new Error(`No student found.`);

  let request = student.requestedDocuments.find(
    (request) => request.id === requestID
  );
  if (!request) throw new Error(`No request found.`);

  Object.assign(request, update);
  console.log(request);

  await updateUser(student.idNumber, student);

  // GET BACK HERE
  // YOU ARE UPDATING THE REQUEST
  //
}

function set(users, type = "users") {
  return localforage.setItem(`${type}`, users);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

export {
  setInitialUsers,
  getUsers,
  getStudentUsers,
  getAdminUsers,
  updateUser,
  getCurrentUser,
  updateRequestStatus,
};
