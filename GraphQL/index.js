import express from "express";
import resolvers from "./resolvers.js";
import schema from "./schema.js";

import { graphqlHTTP } from "express-graphql"

const app = express()


app.get("/", (req, res) => {
    res.send("hello world")
})

const root = resolvers


app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("server running at 4000");
})