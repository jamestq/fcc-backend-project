//index.js - entry point for the app
//set up required variables
let express = require("express");
let app = express();
const { convertToUnix, formatDate} = require("./utility/helper");

//enable CORS so that the API can be tested by FCC
let cors = require("cors");
app.use(cors({optionsSuccessStatus: 200})); //some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

//API endpoints
app.get("/api/:date?", 
    (req, res, next) => {
        let date = formatDate(req.params.date); 
        if(date === null){
            res.json({
                error: "Invalid Date"
            })
        }
        req.date = date;
        next();
    }, 
    (req, res) => {
        res.json({
            unix: convertToUnix(req.date),
            utc:  req.date.toUTCString()
        })
    })

//listen for requests
let listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
})

