import express from "express";
import axios from "axios";
import { client } from "./client.js";


const app = express();


app.get("/", async (req, res) => {

    // stroing in redis server
    const catchedData = await client.get("posts")

    if(catchedData){
        console.log("Data is cached")
        return res.json(JSON.parse(catchedData))
    }

    const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts")
    await client.set("posts", JSON.stringify(data))
    await client.expire("posts", 30)

    console.log("i am here")
    return res.json(data)

})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

