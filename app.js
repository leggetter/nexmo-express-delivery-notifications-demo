import dotenv from 'dotenv';
import express from 'express';
import Nexmo from 'nexmo';

dotenv.config();
const app = express();
const nexmo = new Nexmo({
  key: process.env.KEY,
  secret: process.env.SECRET
});

app.get('/', (_, res) => {
  const message = `
  Your delivery is scheduled for tomorrow between 8am and 2pm. If you wish to change the delivery date please reply by typing 1, 2 or 3:

  1. for tomorrow
  2. for next Monday
  3. for next Tuesday
  `
  nexmo.sms.sendTextMessage(
    process.env.FROM,
    process.env.TO,
    message,
    () => {
      res.send('Notification sent!');
    }
  );
});

app.listen(3000);
