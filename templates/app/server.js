const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

app.set('views', 'dist/views');
app.use(express.static(path.join(__dirname, 'dist')));

// Home Page
app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

app.get('/views/:page', (req, res) => {
  res.redirect('/views/' + req.params.page + '.html');
});

module.exports = app;
