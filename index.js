const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

const userRouter = require('./routes/users');
app.use('/api/v1/user', userRouter);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.use((req, res, next) => {
  return res.status(404).json({ status: false, message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

const PORT = process.env.port || process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log('Web Server is listening at port ' + PORT);
});
