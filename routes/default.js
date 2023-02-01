const router = require('express').Router();

const indexPage = process.cwd() + "/views/pages/index";

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

//GET for landing page
router.get("/", (req, res) => {
    res.render(indexPage, {
        elementPath: "../partials/links",
        pages: pages
    });
});

//GET for all pages
pages.forEach(page => {
    router.get(page.link, (req, res) => {
        res.render(indexPage, {
            elementPath: "../partials" + page.link,
        })
    })
})

module.exports = router;