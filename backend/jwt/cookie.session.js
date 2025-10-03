

export function assignSessionCookie(id, res){
    res.cookie("sessional_id", id, {
    httpOnly: true,           
    maxAge: 10 * 365 * 24 * 60 * 60 * 1000  
  })
}