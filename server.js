// Imports
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(8080, () => console.log('Listening on port 8080'));

// A GET route that returns the ProjectData on the server
app.get('/all', (req, res) => {
	res.send(projectData);
});

// A POST route that adds incoming data to the ProjectData
app.post('/postData', (req, res) => {
	console.log(req.body);
	projectData.temperature = req.body.temperature;
	projectData.date = req.body.date;
	projectData.userResponse = req.body.userResponse;
	res.send(200);
	console.log('New data has been posted');
});
