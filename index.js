//index.js - entry point for the app
//set up required variables
let express = require("express");
let app = express();
multer = require("multer");

const upload = multer({dest: process.cwd() + "/public/data/uploads/"});
const { convertToUnix, formatDate } = require("./utility/helper");

//enable CORS so that the API can be tested by FCC
let cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); //some legacy browsers choke on 204

app.use(express.static("public"));

//temporary storage option
const urlMap = {};
let urlCounter = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  })
})

app.post("/api/shorturl", (req, res) => {
  let returnJSONObj = {}
  try {
    let url = req.body.url;
    if(url.startsWith("http://") || url.startsWith("https://")){
      let url = new URL(req.body.url);
      returnJSONObj["original_url"] = url;
      returnJSONObj["short_url"] = urlCounter;
      urlMap[urlCounter] = url;
      urlCounter++; 
    }else{
      throw TypeError;
    }
  } catch (error) {
    returnJSONObj["error"] = "invalid url"
  }
  res.json(returnJSONObj);
});

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  })
})

app.get("/api/shorturl/:url", (req, res, next) => {
  res.redirect(urlMap[req.params.url]);
});

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
