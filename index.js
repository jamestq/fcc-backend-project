//index.js - entry point for the app
//set up required variables
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
//enable CORS so that the API can be tested by FCC
let cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); //some legacy browsers choke on 204

//import routers
const apiRoute = require("./routes/api");
const defaultRoute = require("./routes/default");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

//Landing Page
app.use("/api", apiRoute);
app.use("/", defaultRoute);


const PORT = process.env.PORT || 3000;

//listen for requests
let listener = app.listen(PORT, () => {
  console.log("Your app is listening on port", PORT);
})
