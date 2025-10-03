import { createSession } from "../db/queries.admin.js";


export async function creatingSession(req, res,next){
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
