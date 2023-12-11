// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Setup empty JS object to act as endpoint for all routes
const projectData = [{}];

// Start up an instance of app
const app = express();
const port = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const server = app.listen(port, listening);


//Callback to debug
function listening(){
    console.log('server running');
    console.log(`server running on localhost: ` + port);
}

app.get('/weatherJournal', function (req, response) {
  let data = {};
    if (projectData){
      data = projectData[projectData.length-1]
  }    return response.send(data)
});

//Post
function pushData(req, res) {
    console.log('Inside pushData function in server', req.body);
    const newDataEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData.push(newDataEntry);
    res.send(projectData)
}

app.post('/weatherJournal', (req, res) =>  {
    pushData(req,res);
});





