//Imports (the node.js way)
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

//Import schema
const graphqlSchema = require('./graphql/schema/index')
//Import resolvers
const graphqlResolvers = require('./graphql/resolvers/index')

//create the app
const app = express();

//add bodyparser with json functionality
app.use(bodyParser.json());

//configure graphQL with shema and resolvers
app.use(
    '/graphql',
    graphqlHttp({
     schema: graphqlSchema,
     rootValue: graphqlResolvers,
     graphiql: true
    })
);
//${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD} Parsing the passwort via env is not working somehow!
//Use mongoose to connect with MongoDB cluster
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:kH7ZFUffTx3R9v0q@graphql-tutorial-egoz3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
    .then( () => {
        app.listen(3000);
    })
    .catch(err =>{console.log(err);})

