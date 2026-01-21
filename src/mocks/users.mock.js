import mockAdminDatabase from "./admin.mock";
import mockStudentDatabase from "./students.mock";

export const users = [...mockStudentDatabase, ...mockAdminDatabase];
