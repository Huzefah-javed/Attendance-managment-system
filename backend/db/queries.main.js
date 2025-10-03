import pool from "./pool.js";

export async  function loginVerificationAsStudent({rollNo, password}){
        const [row] = await pool.query("SELECT ID, STUDENT_NAME, STUDENT_ROLLNO, ROLE FROM STUDENT_INFO WHERE STUDENT_ROLLNO = ? AND STUDENT_PASSWORD = ?", [rollNo, password])
    return row;
}

export async  function loginVerificationAsTeacher({email, password}){
        const [row] = await pool.query("SELECT ID,NAME, SUBJECT, EMAIL, ROLE FROM ADMINS WHERE EMAIL = ? AND PASSWORD = ?", [email, password])
        return row;
}