import { client } from "./client.js";


async function init() {

    // stroing the set values
    // const result = await client.sadd("set:1", "hello22", "world22", "world22")
    // const result2 = await client.sadd("set:1", ["hello222", "world222", "world222"])
    // const result = await client.sadd("set:2", "hello22", "world22", "world22")


    // smembers is used to get the values stored in the set
    // const result = await client.smembers("set:1")


    // srem is used to remove the values from the set
    const result = await client.srem("set:1", "world2j2")


    // scard is used to get the number of values stored in the set
    // const result = await client.scard("set:1")


    // sInter is used to get the common values between the sets
    // const result = await client.sinter("set:1", "set:2")


    // sUnion is used to get the union of the values between the sets
    // const result = await client.sunion("set:1", "set:2")


    // sdiff is used to get the difference of the values between the sets
    // const result = await client.sdiff("set:1", "set:2")


    // sismember is used to check if the value is present in the set
    // const result = await client.sismember("set:1", "world22")

    // srandmember is used to get the random value from the set
    // const result = await client.srandmember("set:1")

    // spop is used to remove the random value from the set
    // const result = await client.spop("set:1")

    // sscan is used to get the values from the set using cursor
    // const result = await client.sscan("set:1", 0)
    // const result = await client.sscan("set:1", 0, "match", "world222")


    console.log(result)

}

init()