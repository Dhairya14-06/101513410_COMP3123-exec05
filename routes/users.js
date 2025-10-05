const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const userFile = path.resolve(__dirname, '../user.json');

function readUser() {
  const raw = fs.readFileSync(userFile, 'utf8');
  return JSON.parse(raw);
}

router.get('/profile', (req, res) => {
  try {
    const user = readUser();
    res.json(user);
  } catch (err) {
    console.error('Error reading user.json:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body || {};
    const user = readUser();

    if (username !== user.username) {
      return res.json({ status: false, message: 'User Name is invalid' });
    }
    if (password !== user.password) {
      return res.json({ status: false, message: 'Password is invalid' });
    }
    return res.json({ status: true, message: 'User Is valid' });
  } catch (err) {
    console.error('Error in /login:', err);
    res.status(500).send('Server Error');
  }
});

router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

module.exports = router;
