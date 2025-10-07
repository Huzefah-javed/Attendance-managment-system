import express from "express"
import { configDotenv } from "dotenv";
import mainRouter from "./routers/router.main.js"
import cookieParser from "cookie-parser";
import { cookieVerification } from "./jwt/cookie.jwt.js";
import { errorMiddleware } from "./middleware/middleware.error.js";
import cors from "cors"

const app =express()

configDotenv()
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use(mainRouter)

app.use(errorMiddleware)


app.listen(3000, ()=>{
    console.log("app listen at the 3000")
})
