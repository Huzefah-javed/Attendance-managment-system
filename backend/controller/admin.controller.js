import { createSession, gettingIndividualAttendance } from "../db/queries.admin.js";


export async function creatingSession(req, res,next){

  if(req.user.Role === "ADMIN") next(401, "please login as teacher to access this route");
  
  const {subjectName, sessionEndTime, createdBy} = req.body;
  
  if (!subjectName || !sessionEndTime || !createdBy) {
    res.status(400).json({msg: "please send all detail"});
  }
  
  const response =  await createSession({subjectName, sessionEndTime, createdBy})
  if (response.status === 201) {
    res.json(response)
  } else {
    next(response);
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