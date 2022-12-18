//index.js - entry point for the app
//set up required variables
let express = require("express");
let app = express();
const { convertToUnix, formatDate } = require("./utility/helper");

//enable CORS so that the API can be tested by FCC
let cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); //some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  })
})

//API endpoints
app.get("/api/:date?",
  (req, res) => {
    let date = formatDate(req.params.date);
    if (date === null) {
      res.json({
        error: "Invalid Date"
      })
    } else {
      res.json({
        unix: convertToUnix(date),
        utc: date.toUTCString()
      })
    }
  })

//listen for requests
let listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
})

