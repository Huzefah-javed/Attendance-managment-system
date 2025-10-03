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


export async function getAttendance({subject, student_id, skip}){
    let result;
    try {
      const [data] = await pool.query("SELECT * FROM attendance_table WHERE student_id = ? AND subject= ? LIMIT 10 OFFSET ?", [student_id, subject, skip])
        return data
    } catch (error) {
        console.log(error)
        const status = 500
        const msg = "something went wrong during getting data"
        result = {status, msg}
        return result
    }
}

