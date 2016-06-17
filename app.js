import express from 'express';
const app = express();

app.get('/message', (_, res) => {
  res.send('Message Sent!');
});

app.listen(3000);
