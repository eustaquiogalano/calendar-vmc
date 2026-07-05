export interface User {
  id: string;
  email: string;
  userType: "student" | "admin";
}

export interface Student extends User {
  userId: string;
  firstName: string;
  middleName?: string;
  suffix?: string;
  lastName: string;
  idNumber: string;
  yearLevel: number;
}

export interface Admin extends User {
  userId: string;
  name: string;
  idNumber: string;
}
