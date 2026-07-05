export interface User {
  id: string;
  email: string;
  userType: "student" | "admin";
}

export interface Student extends User {
  userType: "student";
  userId: string;
  firstName: string;
  middleName?: string;
  suffix?: string;
  lastName: string;
  idNumber: string;
  yearLevel: number;
}

export interface Admin extends User {
  userType: "admin";
  userId: string;
  name: string;
  idNumber: string;
}

export function mapStudent(data: Record<string, any>): Student {
  return {
    id: data.id,
    email: data.email,
    userType: data.user_type,
    userId: data.user_id,
    firstName: data.first_name,
    middleName: data.middle_name,
    suffix: data.suffix,
    lastName: data.last_name,
    idNumber: data.id_number,
    yearLevel: data.year_level,
  };
}

export function mapAdmin(data: Record<string, any>): Admin {
  return {
    id: data.id,
    email: data.email,
    userType: data.user_type,
    userId: data.user_id,
    name: data.name,
    idNumber: data.id_number,
  };
}
