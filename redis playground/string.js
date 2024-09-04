import {client} from "./client.js"


// client.get("user:1", function (err, result) {
//     console.log(result)
// })

client.on('error', (err) => {
    console.log('Error ' + err);
});


async function init() {
    // const result = await client.set("msg:1", "hello world")
    // const result = await client.get("msg:1")

    const result = await client.expire("msg:1", 10)


    console.log(result)
}

init()