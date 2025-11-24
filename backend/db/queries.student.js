import e from "express";
import { errorMiddleware } from "../middleware/middleware.error.js";
import pool from "./pool.js";


export async function gettingStudents(){
    const [rows]= await pool.query('SELECT *  FROM STUDENT_INFO')
    return rows;
}

export async function  setAttendance({ sessionID,  status, student_id}){
    let result;
    console.log({ sessionID,  status, student_id})
    try {
        await pool.query("INSERT INTO ATTENDANCE_TABLE (STUDENT_ID, SESSION_ID, STATUS, MARKED_AT) VALUES(?, ?, ?, now())", [student_id, sessionID, status])
       result= {status: 201, msg: "Attendance mark successfully"}
        return result
    } catch (error) {
        console.log(error)
        const status = 500
        const msg = "something went wrong"
        result = {status, msg}
    }
}


export async function getAttendance(student_id){
    let result = {status, msg};
    try {
      const [data] = await pool.query("select sessions.SUBJECT,SESSION_DATE,status,IS_ATTENDANCE_MARKED from attendance_table inner join sessions on sessions.SESSION_ID = attendance_table.session_id where SESSION_DATE = curdate() && attendance_table.student_id = ?", [student_id, subject, skip])
      result.status = 200;  
      result.msg = data;  
      return
    } catch (error) {
        console.log(error)
        const status = 500
        const msg = "something went wrong during getting data"
        result = {status, msg}
        return result
    }
}

