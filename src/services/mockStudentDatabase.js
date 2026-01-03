const mockStudentDatabase = [
  {
    type: "student",
    name: "Jor",
    level: "3",
    username: "joris.arancon@example.com",
    password: "jorispogi",
    idNumber: "1234",
    isLoggedIn: false,
    requestedDocs: [
      {
        id: 1,
        document: "Diploma",
        purpose: "Job Application",
        date: "01/01/2026",
        status: "PENDING",
      },
      {
        id: 1,
        document: "TOR",
        purpose: "Scholarship",
        date: "01/01/2026",
        status: "PENDING",
      },
    ],
  },
  {
    type: "student",
    name: "Dec",
    username: "dexter.lab@example.com",
    password: "dexterlab",
    idNumber: "123",
    isLoggedIn: false,
    requestedDocs: [
      {
        id: 1,
        document: "CTC",
        purpose: "Scholarship",
        date: "01/01/2026",
        status: "PENDING",
      },
      {
        id: 1,
        document: "Form 138",
        purpose: "Scholarship",
        date: "01/01/2026",
        status: "PENDING",
      },
      {
        id: 1,
        document: "TOR",
        purpose: "Scholarship",
        date: "01/01/2026",
        status: "PENDING",
      },
    ],
  },
];

export default mockStudentDatabase;
