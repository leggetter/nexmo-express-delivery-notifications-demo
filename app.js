import express from 'express';
import parser from 'body-parser';


// initialize express, the template directory, and form parsing
const app = express();
app.use(express.static(__dirname + '/views'));
app.use(parser.urlencoded({ extended: false }));

// a form for submitting phone numbers
app.get('/', (_, response) => {
  response.sendFile('index.html');
});

// notification endpoint
app.post('/notify', (request, response) => {
  response.send('Notification sent');
});

// start the server
app.listen(3000);
