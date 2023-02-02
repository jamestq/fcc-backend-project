# Microservices with Express Application
Link to the description page of the projects: https://www.freecodecamp.org/learn/back-end-development-and-apis#back-end-development-and-apis-projects

## Demo or Installation 

Refer to the link http://3.27.45.147/ for the demo 

**NOTE**: 
- The webpage can only be accessed with an insecured http connection as Let's Encrypt does not certify AWS domains, and a custom domain is required. 
- Use an Incognito/Private window of your browser and DO NOT enter any private information

Alternatively, to run locally on your machine, ensure that Node >15.8.0 is installed, and type the following commands to your terminal
```
git clone https://github.com/jamestq/fcc-backend-project.git
cd fcc-backend-project
npm install
npm run start
```
## Live Demo used for Free Code Camp certification

**Certificate**: https://freecodecamp.org/certification/jamestq/back-end-development-and-apis

- **Timestamp** - https://boilerplate-project-timestamp.jamestq.repl.co/

- **Request Header Parser** - https://boilerplate-project-headerparser.jamestq.repl.co/

- **URL Shortener** - https://boilerplate-project-urlshortener.jamestq.repl.co/

- **Exercise Tracker** - https://boilerplate-project-exercisetracker.jamestq.repl.co/

- **File Metadata** - https://boilerplate-project-filemetadata.jamestq.repl.co/


# Microservices available

## Timestamp Microservice

A request to <code>/api/:date?</code> with a valid date returns a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds, and a utc key that is a string of the input date in the format: <code>Weekday DD MMM YYYY HH:MM:SS GMT.</code>

Accepts any requests with dates that can be successfully arsed by new Date(date_string). If the input is invalid, returns a JSON object <code>{error: "Invalid Date"}</code>.

If the input is empty, returns the JSON object with the unix and utc key of the current time.


## Request Header Parser Microservice

A request to <code>/api/whoami</code> returns a JSON object with your IP address in the <code>ipaddress</ipaddress></code> key, your preferred language in the <code>language</code> key and your software in the <code>software</code> key.


## URL shortener Microservice


A POST to the <code>/api/shorturl</code> returns a JSON response with <code>original_url</code> and <code>short_url</code> properties.

Afterwards, when visiting <code>/api/shorturl/short_url</code>, the address is redirected to the original url.

If the url doesn't follow the format of <code>http://www.example.com</code> (same with https protocol) format, the JSON response will contain <code>{error:'invalid url'}</code>


## Exercise Tracker

<code>/api/users</code>

A POST request creates a new user and returns a JSON object:

    {
        username: "username"
        _id: idNumber
    }

A GET request returns an array of users.

<code>/api/users/:_id/exercises</code>

A POST request creates a new exercise, adds it to the user with <code>._id</code> and returns a JSON object: 

    {
        username: "username"
        description: "exercise description"
        duration: durationNumber,
        date: "Day MMM DD YYYY",
        _id: idNumber
    }

<code>/api/user/:_id/logs?[from][&amp;to][&amp;limit]</code>

A GET request returns a JSON object of the user along with their exercises:

    {
        username: "username",
        count: numberOfExerciseLogs,
        _id: idNumber,
        log: [{
            description: "description",
            duration: durationNumber,
            date: "Day MMM DD YYYY",
        }...]
    }

optional parameters <code>from</code>, <code>to</code>, <code>limit</code> can be used to filter the logs to be included in the response.


## File Metadata Microservice

When submitting a file, a JSON object with the <code>name</code>, <code>type</code>, and <code>size</code> (in bytes) properties are returned.
