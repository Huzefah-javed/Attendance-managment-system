import pool from "./pool.js"


export async function createSession ({subjectName, sessionEndTime, createdBy}) {
     const connection = await pool.getConnection();
    let result = {status: 0, msg:""}
    try {
        await connection.beginTransaction()
        const [sessionData] = await connection.query(`INSERT INTO sessions (subject, session_date, start_date, end_date, created_by) VALUES (?, CURDATE(), CURTIME(), ADDTIME(CURTIME(), ?), ?)`, [subjectName, sessionEndTime, createdBy])    
        const id= sessionData.insertId
        await connection.query("INSERT INTO attendance_table (session_id, student_id, status) SELECT ?, ID, 'absent' FROM student_info", [id])
        await connection.commit()
       return  result = {status: 201 ,msg:"Session created successfully"}
        } catch (err) {
            console.log(err)
            await connection.rollback()
            const status = 500
            const msg = "something went wrong"
           return result = {status, msg}

        }
} 