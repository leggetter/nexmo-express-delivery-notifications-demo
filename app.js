import dotenv from 'dotenv';
import express from 'express';
import parser from 'body-parser';
import Nexmo from 'nexmo';

// load the environment variables
dotenv.config();

// initialize express, the template directory, and form parsing
const app = express();
app.use(express.static(__dirname));
app.use(parser.urlencoded({ extended: false }));

// initialize nexmo
const nexmo = new Nexmo({
  key: process.env.KEY,
  secret: process.env.SECRET
});

// the delivery options
const options = [
  'this Friday',
  'next Monday',
  'next Tuesday'
];

// the notification message
let notification = "Your Nexmo Mail delivery is scheduled for tomorrow between " +
              "8am and 2pm. If you wish to change the delivery date please " +
              "reply by typing 1, 2 or 3:\n\n";

options.forEach((option, index) => {
  notification += `${index+1}. for ${option}\n`;
});

// a form for submitting phone numbers
app.get('/', (_, response) => {
  response.sendFile('index.html');
});

// notification endpoint
app.post('/notify', (request, response) => {
  send(request.body.number, notification);
  response.send('Notification sent');
});


// the webhook endpoint
app.get('/response', (request, response) => {
  // TODO: store this selection somewhere
  const selection = parseInt(request.query.text) - 1;
  const day = options[selection];

  let message = "Please select from on of the valid options only.";

  if (day) {
    message = `Thank you! Your delivery has been rescheduled for ${day}`;
  }

  send(request.query.msisdn, message);
  response.send('Response processed');
});

// simple function around sending a message
let send = function(number, message) {
  nexmo.sms.sendTextMessage(
    process.env.FROM,
    number,
    message
  );
}

// start the server
app.listen(3000);
