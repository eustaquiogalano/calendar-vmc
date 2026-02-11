import localforage from "localforage";
import { users as mockUsers } from "../mocks/users.mock";

async function setInitialUsers() {
  await fakeNetwork();

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

async function setCurrentUser() {
  await fakeNetwork();

  let users = await localforage.getItem("users");
  if (!users) users = [];

  let currentUser = users.find((user) => {
    if (user.isLoggedIn === true) return user;
  });

  await set(currentUser, "currentUser");

  return currentUser;
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
  setCurrentUser,
};
