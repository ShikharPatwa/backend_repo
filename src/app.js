import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,
    limit:"20kb"
}))
app.use(express.static("public"))
app.use(cookieparser())

// Import routes
// import userRouter from './route/user.route.js'

// Routes Declaration
// app.use("/api/v1/users",userRouter)

export {app};