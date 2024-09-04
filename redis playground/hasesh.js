import { client } from "./client.js";

async function init() {

    // stroing in hashes 
    // const result = await client.hset("hash:1", "name", "john", "age", 30)
    // const result = await client.hset("hash:1", {
    //     name: "john",
    //     age: 30
    // })

    // getting the values from the hash
    // const result = await client.hget("hash:1", "name")
    const result = await client.hgetall("hash:1")




    console.log(result)


}

init()