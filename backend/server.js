import express from "express"
import { configDotenv } from "dotenv";
import mainRouter from "./routers/router.main.js"
import cookieParser from "cookie-parser";
// import { cookieVerification } from "./jwt/cookie.jwt.js";
import { errorMiddleware } from "./middleware/middleware.error.js";
import cors from "cors"
import mongoose from "mongoose";

const app =express()

configDotenv()
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))

app.use(mainRouter)

app.use(errorMiddleware)


try {
   await mongoose.connect(process.env.MONGOURI)
    console.log("db connect")
    
app.listen(process.env.PORT, ()=>{
    console.log("port ready on 5000")
})
} catch (error) {
    console.log(error)
    console.log("error occurred in the db connection")
}