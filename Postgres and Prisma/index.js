import express from "express"
import cors from "cors"

import dotenv from "dotenv";


dotenv.config({
  path: "./.env"
})

const app = express()

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

app.get("/", (req, res) => {
  return res.send("Hello world");
});


// Routes import
import userRouter from "./src/routes/user.route.js"

app.use("/api/v1/users", userRouter)

// app.on("error", (error) =>{
//   console.log("app not able to talk to Db ERROR: ", error)
//   throw error
// })

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

console.log(`http://localhost:${process.env.PORT}`)
