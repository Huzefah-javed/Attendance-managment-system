import pool from "./pool.js";

export async  function loginVerificationAsStudent({rollNo, password}){
     const [row] = await pool.query("SELECT ID, STUDENT_NAME AS 'NAME', STUDENT_ROLLNO, STUDENT_EMAIL as 'EMAIL', ROLE FROM STUDENT_INFO WHERE STUDENT_ROLLNO = ? AND STUDENT_PASSWORD = ?", [rollNo, password])
    return row;
}

export async  function loginVerificationAsTeacher({email, password}){
        const [row] = await pool.query("SELECT ID,NAME, SUBJECT, EMAIL, ROLE FROM ADMINS WHERE EMAIL = ? AND PASSWORD = ?", [email, password])
        return row;
}

export async function getAdminDataById(id){
       const [row] =  await pool.query("SELECT ID, NAME, SUBJECT, EMAIL, ROLE FROM admins WHERE ID = ?", [id])
       return row[0];
}

export async function getStudentDataById(id){
       const [row] =  await pool.query("select ID, STUDENT_NAME AS 'NAME', STUDENT_ROLLNO, STUDENT_EMAIL as 'EMAIL', ROLE from student_info where ID = ", [id])
       return row[0];
}