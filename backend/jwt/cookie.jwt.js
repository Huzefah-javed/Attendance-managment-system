import jwt from "jsonwebtoken";

export  function assignJWTCookie(data, res){
    const token = jwt.sign(data, process.env.JWT_SECRET)

    res.cookie("security_token", token, {
        httpOnly: true,           
        maxAge: 24 * 60 * 60 * 1000  
    })
}

