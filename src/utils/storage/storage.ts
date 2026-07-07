import localforage from "localforage";
import { users as mockUsers } from "../../mocks/users.mock";
import { User, Student, Admin } from "@/types/user";

// interface User {
//   userType: string;
//   username: string;
//   password: string;
//   email: string;
//   name: string;
//   idNumber: string;
//   yearLevel: number;
//   isLoggedIn: boolean;
//   requestedDocuments: Array<{
//     id: string;
//     document: string;
//     status: "PENDING" | "APPROVED" | "REJECTED";
//     purpose: string;
//     date: string;
//   }>;
// }

type Item =
  | Student[]
  | Admin[]
  | Student
  | Admin
  | SchoolEvent
  | SchoolEvent[]
  | null;

function set(item: Item, type = "users") {
  if (item === undefined) return;

  return localforage.setItem(`${type}`, item);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: Record<string, boolean> = {};

async function fakeNetwork(key: string) {
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

async function setInitialUsers() {
  await fakeNetwork("initUsers");

  const persistentData = await localforage.getItem("users");

  if (persistentData) {
    return await localforage.setItem("users", persistentData);
  }

  return await localforage.setItem("users", mockUsers);
}

async function addStudentUser(newUser: Student) {
  let users: Student[] = (await localforage.getItem("users")) || [];

  users = [...users, newUser];

  await set(users, "users");
  return users;
}

async function getStudentUsers() {
  await fakeNetwork("getStudentUsers");

  let users = await localforage.getItem<Student[]>("users");
  if (!users) users = [];

  let students = users.filter((user) => {
    if (user.userType === "student") return user;
  });

  await set(students, "students");

  return students;
}

async function getAdminUsers() {
  await fakeNetwork("getAdminUsers");

  let users = await localforage.getItem<Admin[]>("users");
  if (!users) users = [];

  let admins = users.filter((user) => {
    if (user.userType === "admin") return user;
  });

  await set(admins, "admins");

  return admins;
}

async function getUsers() {
  await fakeNetwork("getUsers");

  let users = await localforage.getItem<Student[] | Admin[]>("users");
  if (!users) users = [];

  return users;
}

async function updateUser(id: string, update: Partial<Student | Admin>) {
  await fakeNetwork("updateUser");

  let users = await localforage.getItem<Student[] | Admin[]>("users");
  if (!users) users = [];

  let user = users.find((user) => user.idNumber === id);

  if (!user) throw new Error(`No user found for`);
  Object.assign(user, update);
  await set(users);

  return user;
}

async function getCurrentUser() {
  await fakeNetwork("getCurrentUser");

  let users = await localforage.getItem<User[]>("users");
  if (!users) users = [];

  let currentUser = users.find((user) => user.isLoggedIn === true) ?? null;

  await set(currentUser, "currentUser");

  return currentUser;
}

async function updateRequestStatusHF(
  studentID: string,
  requestID: string,
  update: Partial<DocumentRequest>,
) {
  await fakeNetwork("updateRequestStatusHF");

  let students = await getStudentUsers();
  if (!students) return [];

  let student = students.find((student) => student.idNumber === studentID);
  if (!student) throw new Error(`No student found.`);

  let request = student.requestedDocuments.find(
    (request) => request.id === requestID,
  );
  if (!request) throw new Error(`No request found.`);

  Object.assign(request, update);
  console.log(request);

  await updateUser(student.idNumber, student);

  // GET BACK HERE
  // YOU ARE UPDATING THE REQUEST
  //
}

interface DocumentRequest {
  id: string;
  document: string;
  purpose: string;
  date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

async function addRequestHF(newRequest: DocumentRequest) {
  await fakeNetwork("addRequestHF");

  let currentUser = await getCurrentUser();
  if (!currentUser) currentUser = {} as User;

  currentUser.requestedDocuments = [
    ...currentUser.requestedDocuments,
    newRequest,
  ];

  await updateUser(currentUser.idNumber, currentUser);

  console.log(currentUser);
}

async function deleteRequestHF(studentID: string, requestID: string) {
  await fakeNetwork("deleteRequestHF");

  let users = await localforage.getItem<User[]>("users");
  if (!users) return [];

  // get student
  let student = users.find((user) => user.idNumber === studentID);
  if (!student) throw new Error(`No student found.`);

  // create new request list without the selected request
  let updatedRequestList = student.requestedDocuments.filter(
    (request) => request.id !== requestID,
  );
  if (!updatedRequestList) throw new Error(`No request found.`);

  Object.assign(student, {
    requestedDocuments: [...updatedRequestList],
  });

  await updateUser(studentID, student);
}

interface SchoolEvent {
  date: string;
  endTime: string;
  id: string;
  name: string;
  startTime: string;
  type: string;
}

async function getEvents() {
  await fakeNetwork("getEvents");

  let events = (await localforage.getItem<SchoolEvent[]>("events")) || [];

  return events;
}

async function addEvent(newEvent: SchoolEvent) {
  await fakeNetwork("addEvent");

  let events = (await localforage.getItem<SchoolEvent[]>("events")) || [];

  events = [...events, newEvent];
  await set(events, "events");
  console.log(events);

  return events;
}

async function deleteEvent(eventID: string) {
  let events = (await localforage.getItem<SchoolEvent[]>("events")) || [];

  let updatedEvents = events.filter((event) => event.id !== eventID);

  await set(updatedEvents, "events");
  return updatedEvents;
}

export {
  setInitialUsers,
  addStudentUser,
  getUsers,
  getStudentUsers,
  getAdminUsers,
  updateUser,
  getCurrentUser,
  updateRequestStatusHF,
  addRequestHF,
  deleteRequestHF,
  addEvent,
  getEvents,
  deleteEvent,
};
