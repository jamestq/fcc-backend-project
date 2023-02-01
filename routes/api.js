const router = require("express").Router();
const { convertToUnix, formatDate } = require("../utility/helper");
const upload = require("multer")({dest: process.cwd() + "/public/data/uploads/"});

const shortURL = require("./shorturl");
const users = require("./users");

console.log(process.cwd());

//Header-parser route
router.get("/whoami", (req, res) => {
    res.json({
        ipaddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        language: req.headers["accept-language"],
        software: req.headers["user-agent"]
    })
})

//URL Shortener
router.use("/shorturl", shortURL);

//Exercise Tracker Users
router.use("/users", users)

//File Metadata
router.post('/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    })
})

//Timestamp route
router.get("/:date?", (req, res) => {
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
});

module.exports = router;