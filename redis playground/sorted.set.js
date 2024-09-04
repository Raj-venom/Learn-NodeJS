import { client } from "./client.js";

async function init() {

    // store the score of the players
    // const result = await client.zadd("scoreboard", 100, "john", 200, "doe", 300, "smith")



    // zrange: get the range of the sorted set
    // const result = await client.zrange("scoreboard", 0, -1, "WITHSCORES")


    // zrevrange: get the range of the sorted set in reverse order
    // const result = await client.zrevrange("scoreboard", 0, -1, "WITHSCORES")



    // zrangebyscore: get the range of the sorted set by score
    // const result = await client.zrangebyscore("scoreboard", 100, 300, "WITHSCORES")

    // const result = await client.zrank("scoreboard", "smith")


    // const result = await client.zrangebyscore("scoreboard", 100, 300, "WITHSCORES")



    console.log(result)

}

init()