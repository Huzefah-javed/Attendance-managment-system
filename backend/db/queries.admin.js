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
    
    
    export async function gettingIndividualAttendance (rollNo, subject){
        let result = {status: 0, msg:""}
        try {
            const [data] =  await pool.query(`SELECT 
            SE.SUBJECT,
            SESSION_DATE,
            status
            FROM attendance_table AS A
            INNER JOIN student_info AS S
            INNER JOIN SESSIONS AS SE
            WHERE S.ID = A.student_id && S.ID = SE.SESSION_ID && STUDENT_ROLLNO = ? && SE.SUBJECT=?`, [rollNo, subject])
            return  result = {status: 200 ,msg:data}
        } catch (error) {
            console.log(err)
            const status = 500
            const msg = "something went wrong"
            return result = {status, msg}
            }
            } 
    
    export async function studentsForAttendance (subject){
        console.log(subject)
        let result = {status: 0, msg:""}
        try {
            const [data] =  await pool.query('SELECT s.id, s.STUDENT_NAME, s.STUDENT_ROLLNO, se.subject, se.SESSION_DATE from attendance_table as a inner join student_info as s inner join sessions as se on a.student_id = s.ID and a.session_id = se.SESSION_ID  where END_DATE >= current_time() && SESSION_DATE = curdate() && se.subject = ? && IS_ATTENDANCE_MARKED = false', [subject]) 
           
            if (data.length == 0) {
                return  result = {status: 200 ,msg:"No session found for student attendance"}    
            }else{
                return  result = {status: 200 ,msg:data}
            }
        } catch (err) {
            console.log(err)
            const status = 500
            const msg = "something went wrong"
            return result = {status, msg}
            }
            } 