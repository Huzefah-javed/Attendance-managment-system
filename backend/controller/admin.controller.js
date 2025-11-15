import { createSession, getSessionHistoryInDetails, gettingIndividualAttendance, latestSessionsHistory, lectureSessionsHistory, markingPresentOfStudents, studentsForAttendance } from "../db/queries.admin.js";


export async function creatingSession(req, res,next){

  if(req.user.Role === "ADMIN") next(401, "please login as teacher to access this route");
  
  const {subjectName,  sessionHour="00", sessionMin, createdBy} = req.body;
  
  console.log(subjectName, sessionMin, createdBy)

  if (!subjectName || !sessionMin || !createdBy) {
    return res.status(400).json({msg: "please send all detail"});
  }
  const sessionEndTime = sessionHour + ":" + sessionMin+":00"
  console.log(sessionEndTime)
  const response =  await createSession({subjectName, sessionEndTime, createdBy})
  if (response.status === 201) {
    res.json(response)
  } else {
    next(response);
  }
}

export async function gettingStudentForAttendance(req, res, next){
  if(req.user.Role === "ADMIN") next(401, "please login as teacher to access this route");
    //  date, subject, ismarked, duration, 
    const sessionId =  req.params.sessionId

   const response = await studentsForAttendance(sessionId)
   if (response.status == 200) {
    return res.json(response)
   }else{
    next(response)
   }
}


export async function individualAttendanceData(req, res, next){
  if(req.user.Role === "ADMIN") next(401, "please login as teacher to access this route");
  const {rollNo} = req.body;
  if (!rollNo) {
    res.status(400).json({msg: "please send all detail"});
    
  }
  
     const data = await gettingIndividualAttendance(rollNo, req.user?.SUBJECT)
     if (data.status == 200) {
        res.status(200).json(data)
     }else{
      next(data)
     }
}


export async function markingStudentAttendance(req, res, next){
  if(req.user.Role === "ADMIN") next(401, "please login as teacher to access this route");
  const {sessionId, presentStudents} = req.body;
  if (!sessionId) {
    return res.json({status: 401, msg : "something went wrong ,please try again"})
  }
  console.log("outside")
  const response = await markingPresentOfStudents(sessionId, presentStudents)

  if (response.status == 200) {
    res.json(response)
  }else{
    next(response)
  }

}

export async function getLatestSessionHistory(req, res, next){
  if(req.user.Role === "ADMIN") next(401, "please login as teacher to access this route");
  const subject= req.user.SUBJECT
  const response = await latestSessionsHistory(subject)
  if (response.status == 200) {
    res.json(response)
  }else{
    next(response)
  }
}

export async function getSessionHistory(req, res, next){
  if(req.user.Role === "ADMIN") next(401, "please login as teacher to access this route");
  const subject= req.user.SUBJECT
  const {skip } = req.body
  const response = await lectureSessionsHistory(subject, skip)
  if (response.status == 200) {
    res.json(response)
  }else{
    next(response)
  }
}

export async function getSessionHistoryDetails(req, res, next){
  if(req.user.Role === "ADMIN") next(401, "please login as teacher to access this route");
        const { sessionId }  =req.body
        const response = await getSessionHistoryInDetails(sessionId)
  if (response.status == 200) {
      let present_students = 0;
      let total_students = response.msg.length;
      response.msg.map((student)=>{
        if(student.status == 'present' ){
          present_students++;
        }    
      })
      let absent_students= total_students - present_students

    res.json({status : response.status, msg:{subject: req.user.SUBJECT, present_students, absent_students, total_students, student_data: response.msg}})
  }else{
    next(response)
  }
}