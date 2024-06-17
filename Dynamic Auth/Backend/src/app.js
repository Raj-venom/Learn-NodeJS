import express from "express";
import cors from "cors"
import { ApiError } from "./utils/ApiError.js"
import cookieParser from "cookie-parser"
import { getAllRoutes } from "./controllers/permission.controllers.js"


const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())


// Router Import
import userRouter from "./routes/user.routes.js"
import permissionRouter from "./routes/permission.routes.js"
import taskRouter from "./routes/task.routes.js"


// routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/permission", permissionRouter)
app.use("/api/v1/task", taskRouter)


app.get("/api/v1/allroutes", getAllRoutes(app))


app.use((err, req, res, next) => {
  if (err instanceof ApiError) {

    console.log(err)
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      success: false

    });
  }
  console.log(err)
  return res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
  });
});


export default app