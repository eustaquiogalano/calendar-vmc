import localforage from "localforage";
import { users as mockUsers } from "../mocks/users.mock";

// set initial users from mock database
async function setInitialUsers() {
  const existing = await localforage.getItem("students");

  if (!existing) {
    await localforage.setItem("students", mockUsers);
  }
}

// get student users only
async function getStudentUsers() {
  await fakeNetwork();

  let users = await localforage.getItem("users");
  if (!users) return (users = []);

  let students = users.filter((user) => {
    if (user.userType === "student") return user;
  });

  await set(students, "students");

  return students;
}

// get admin only
async function getAdminUsers() {
  await fakeNetwork();

  let users = await localforage.getItem("users");
  if (!users) return (users = []);

  let admins = users.filter((user) => {
    if (user.userType === "admin") return user;
  });

  await set(admins, "admins");

  return admins;
}

// get all users
async function getUsers(query) {
  await fakeNetwork(query);

  let users = await localforage.getItem("users");
  if (!users) return (users = []);

  return users;
}

// not yet finished
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
  getCurrentUser,
};
