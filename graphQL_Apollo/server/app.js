const express = require('express');
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const { default: axios } = require("axios");
const users_db = require("../db/users");
const todos_db = require("../db/todos");

async function start_server() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type User {
                id : ID!
                name: String!
                username : String!
            }
            type Todo {
                id : ID!
                title : String!
                completed : Boolean
                user : User
            }
            type Query {
                getTodos : [Todo]
                getAllUsers : [User]
                getUser (id: ID!): User
            }
            type Mutation{
                addTask (userId : ID!,title : String!) : Todo
                doneTask (id:ID!) : Boolean
            }
        `,
        resolvers: {
            Todo: {
                user: async (todo) => {
                    for (user of users_db) {
                        if (user.id == todo.userId) {
                            return user;
                        }
                    }
                }
            },
            Query: {
                getTodos: async () => {
                    return todos_db;
                },
                getAllUsers: async () => {
                    return users_db;
                },
                getUser: async (parent, args_obj) => {
                    for (user of users_db) {
                        if (user.id == args_obj.id) {
                            return user;
                        }
                    }
                }
            },
            Mutation: {
                addTask: (parent, { title, userId }) => {
                    todos_db.push({
                        id: todos_db.length + 1,
                        title: title,
                        completed: false,
                        userId: userId
                    });
                    return todos_db[todos_db.length-1];
                },
                doneTask : (parent,{id})=>{
                    console.log(id);
                    let index = todos_db.findIndex(todo=>{
                        if (todo.id==id) {
                            return true;
                        }
                    })
                    todos_db.splice(index, 1);
                    return true;
                }
            }
        }
    });

    app.use(bodyParser.json());
    app.use(express.static("../client"));
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(3000, () => console.log("server started at 8000..."));
}

start_server();