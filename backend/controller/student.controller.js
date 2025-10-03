import { getAttendance, setAttendance } from "../db/queries.student.js"

export async function markingAttendance (req, res, next){
    const {lecSessionId, status} = req.body
    if (!lecSessionId || !status) {
       return res.json({msg: "plz try again or login again"})
    }
    const sessionID = Number(lecSessionId)
    const isAttendanceMarked =   await setAttendance({
                            sessionID, 
                            status,
                            student_id: req.user.ID
                        })
                        if (isAttendanceMarked.status === 201) {
                            res.json(isAttendanceMarked)
                        }else{
                            next(isAttendanceMarked)
                        }
}

export async function checkingAttendance(req, res, next){
        const {subject, student_id, skip=0} = req.body
            if (!subject || !student_id) {
              return  res.json({msg: "select the subject or login again"})
            }
            console.log({subject, student_id, skip})
       const data = await getAttendance({subject, student_id, skip})
       if (data.status === 200) {
           res.json({status: 200, msg: data})
         }else{
            next(data)
         }
}