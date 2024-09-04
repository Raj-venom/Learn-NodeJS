import { client } from "./client.js";


async function init() {

    // stroing the list values
    // const result2 = await client.lpush("list:1", "world")
    const result2 = await client.rpush("list:1", "world")


    // lrange is used to get the values stored in the list
    // const result3 = await client.lrange("list:1", 0, -1)


    // lpop is used to remove the first element from the list
    // const result = await client.lpop("list:1")


    // rpop is used to remove the last element from the list
    const result = await client.rpop("list:1")


    console.log(result)
}


init()