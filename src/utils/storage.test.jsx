import { describe, it, expect, beforeEach } from "vitest";

import {
  setInitialUsers,
  getUsers,
  getStudentUsers,
  updateUser,
  getAdminUsers,
  getCurrentUser,
  deleteRequestHF,
} from "./storage";

describe("storage management", () => {
  let initialUsers;

  beforeEach(async () => {
    initialUsers = await setInitialUsers();
  });

  it("test initialization", async () => {
    let users = await getUsers();

    console.log(`users: ${users}`);
    console.log(`initial users: ${initialUsers}`);

    expect(initialUsers).toEqual(users);
  });

  it("get students only", async () => {
    let students = await getStudentUsers();
    console.log(students);
  });

  it("data mutation", async () => {
    await updateUser("3X0COL-XXXXXX", {
      isLoggedIn: true,
      wanderpets: "yes",
    });

    let users = await getUsers();
    console.log(users);

    await updateUser("3X0COL-XXXXXX", {
      isLoggedIn: false,
      wanderpets: "nononnno",
    });

    users = await getUsers();
    console.log(users);
  });

  it("gets admin users only", async () => {
    const admins = await getAdminUsers();
    console.log(admins);

    expect(admins.length).toBe(2);
  });

  // NEXT TEST THE getCurrentUser
  it("get current user", async () => {
    let currentUser = await getCurrentUser();
    console.log(currentUser);

    await updateUser("3X0COL-XXXXXX", { isLoggedIn: true });

    currentUser = await getCurrentUser();
    console.log(currentUser);
    console.log(await getUsers());
  });

  it("delete a request", async () => {
    let students = await getStudentUsers();

    let joris = students[0];

    let ja = students[2];

    // await deleteRequestHF(joris.idNumber, joris.requestedDocuments[0].id);
    // await deleteRequestHF(joris.idNumber, joris.requestedDocuments[1].id);

    // await deleteRequestHF(ja.idNumber, ja.requestedDocuments[0].id);
    // await deleteRequestHF(ja.idNumber, ja.requestedDocuments[1].id);

    await deleteRequestHF(ja.idNumber, ja.requestedDocuments[1].id);

    await deleteRequestHF(ja.idNumber, ja.requestedDocuments[0].id);

    console.log(await getStudentUsers());
  });
});
