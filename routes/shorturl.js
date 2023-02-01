const router = require("express").Router();

let urlCounter = 0;
const urlMap = {};

router.get("/:url", (req, res) => {
    res.redirect(urlMap[req.params.url]);
});

router.post("/", (req, res) => {
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
})

module.exports = router;