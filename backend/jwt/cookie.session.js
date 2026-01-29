import jwt from "jsonwebtoken"


export function assignSessionCookie({id, role}, res){
  const sessionalJwt = jwt.sign({id, role} , process.env.JWT_SECRET)
    res.cookie("sessional_id", sessionalJwt, {
    httpOnly: true,           
    maxAge: 10 * 365 * 24 * 60 * 60 * 1000  
  })
}