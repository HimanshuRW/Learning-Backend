const express = require("express");
const app = express();
const {graphqlHTTP} = require("express-graphql");

app.use(express.static("./public"));

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
app.post("/graphql", graphqlHTTP({
    schema : graphqlSchema,
    rootValue : graphqlResolver
}))
app.listen(3000,()=>{
    console.log("listening to port 3000....");
})