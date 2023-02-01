const router = require("express").Router();
const bodyParser = require("body-parser");
const crypto = require("node:crypto");
const {filterEx} = require("../utility/helper");

//temporary storage option
const userDatabase = [];
const exerciseDatabase = [];

router.get("/", (req, res) => {
    res.json(userDatabase);
})

router.post("/", (req, res) => {
    let newUser = {
      username: req.body.username,
      _id: crypto.randomUUID()
    };
    userDatabase.push(newUser);
    res.json(newUser);
});

router.post("/:_id/exercises", (req, res) => {
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

router.get("/:_id/logs", (req, res) => {
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
    console.log(userLog);
    res.json(userLog);
})

module.exports = router;