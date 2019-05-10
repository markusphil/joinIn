//Imports (the node.js way)
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const path = require("path");
//Import middleware
const isAuth = require("./middleware/is-auth");
//Import schema
const graphqlSchema = require("./graphql/schema/index");
//Import resolvers
const graphqlResolvers = require("./graphql/resolvers/index");

//create the app
const app = express();

//add bodyparser with json functionality
app.use(bodyParser.json());

//configure CORS access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //allow requests from any origin
  res.setHeader("Access-Control-Allow-Methos", "POST,GET,OPTIONS"); //allow methods. OPTIONS is a standard-action modern browsers perfom
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    //Handle the OPTIONS Request
    return res.sendStatus(200);
  }
  next();
});

//add custombuild authentification-middleware
app.use(isAuth);

//priority serve static react files
//app.use(express.static(path.resolve(__dirname, "../react-frontend/build")));
//configure graphQL with shema and resolvers
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);
//return react app for all remaining request
/* app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../react-frontend/build", "index.html")
  );
}); */
//Use mongoose to connect with MongoDB cluster
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
