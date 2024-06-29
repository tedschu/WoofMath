// THIS FILE INITIATLIZES THE EXPRESS SERVER AND THE MAIN ROUTES TO OUR DB TABLES

const express = require("express");
const app = express();
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const port = 8080; // ****  UPDATE TO process.env.PORT || 8080;

//app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//log out the body to the console.
app.use((req, res, next) => {
  console.log("<___BODY LOGGER START___>");
  console.log(req.body);
  console.log("<___BODY LOGGER END>");
  next();
});

// **** REVISIT THESE LINES / FROM TYLER'S CODEBASE
app.use("/", express.static(__dirname + "/client/dist"));

//   //Parse the request headers to see if there is a token
// app.use(parseToken);

const baseQuery = `/api/`;

app.get(baseQuery, (req, res) => [
  res.json({
    success: true,
  }),
]);

// Requiring each of our routes - UPDATE AS THESE ARE COMPLETED
app.use("/auth", require("../auth/index")); // for register and login
app.use(baseQuery + "users", require("./users"));
app.use(baseQuery + "badges", require("./badges"));
// app.use(baseQuery + "game_state", require("./game_state"));
app.use(baseQuery + "scores", require("./scores"));
app.use(baseQuery + "user_stats", require("./user_stats"));

app.listen(port, () => {
  console.log(`WoofMath is running at port ${port}`);
});
