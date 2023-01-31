//index.js - entry point for the app
//set up required variables
let express = require("express");
let multer = require("multer");
let bodyParser = require("body-parser");

//constants
const currentDirectory = process.cwd();
const indexPage = "pages/index";
const pages = [
  {
    title: "Timestamp Microservice",
    link: "/timestamp",
  },
  {
    title: "Request Header Parser",
    link: "/headerparser",
  },
  {
    title: "URL Shortener",
    link: "/urlshort",
  },
  {
    title: "File Metadata Microservice",
    link: "/filemeta",
  },
  {
    title: "Exercise Tracker",
    link: "/exercise",
  }
]

let app = express();

const upload = multer({dest: currentDirectory + "/public/data/uploads/"});
const { convertToUnix, formatDate } = require("./utility/helper");

//enable CORS so that the API can be tested by FCC
let cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); //some legacy browsers choke on 204

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

//temporary storage option
const urlMap = {};
const userDatabase = [];
const exerciseDatabase = [];
let urlCounter = 0;

//Landing Page
app.get("/", (req, res) => {
  let defaultPath = "../partials/links";
  res.render(indexPage, {
    elementPath: defaultPath,
    pages: pages
  });
});

//GET REQUESTS
app.get("/timestamp", (req, res) => {
  res.render(indexPage, {
    elementPath: "../partials/timestamp"
  })
});

app.get("/headerparser", (req, res) => {
  res.render(indexPage, {
    elementPath: "../partials/headerparser"
  })
})

app.get("/urlshort", (req, res) => {
  res.render(indexPage, {
    elementPath: "../partials/urlshort"
  })
})

app.get("/filemeta", (req, res) => {
  res.render(indexPage, {
    elementPath: "../partials/filemeta"
  })
})

app.get("/exercise", (req, res) => {
  res.render(indexPage, {
    elementPath: "../partials/exercise"
  })
})

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

app.post("/api/users", (req, res) => {
  let newUser = {
    username: req.body.username,
    _id: crypto.randomUUID()
  };
  userDatabase.push(newUser);
  res.json(newUser);
});

app.post("/api/users/:_id/exercises", (req, res, next) => {
  let date = "";
  if (req.body.date) {
    date = (new Date(req.body.date)).toDateString();
  } else {
    date = (new Date()).toDateString();
  }
  const newExercise = {
    username: (userDatabase.find(user => user._id === req.params._id)).username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: date,
    _id: req.params._id
  }
  exerciseDatabase.push(newExercise);
  res.json(newExercise);
})

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

app.get("/api/users/:_id/logs", (req, res) => {
  let [from, to, limit] = [req.query.from, req.query.to, req.query.limit];
  const exercises = exerciseDatabase.filter(exercise => filterEx(exercise, from, to, req.params._id));
  logSize = limit ? limit : exercises.length;
  const log = [];
  for (let i = 0; i < logSize; i++) {
    log.push({
      description: exercises[i].description,
      duration: Number(exercises[i].duration),
      date: exercises[i].date
    })
  }
  const userLog = {
    username: username = (userDatabase.find(user => user._id === req.params._id)).username,
    count: logSize,
    _id: req.params._id,
    log: log
  }
  res.json(userLog);
})

const PORT = process.env.PORT || 3000;

//listen for requests
let listener = app.listen(PORT, () => {
  console.log("Your app is listening on port", PORT);
})
