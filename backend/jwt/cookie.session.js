

export function assignSessionCookie({id, role}, res){
    res.cookie("sessional_id", {id, role}, {
    httpOnly: true,           
    maxAge: 10 * 365 * 24 * 60 * 60 * 1000  
  })
}