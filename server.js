const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 5000;
app.listen(port);

app.get('*', function(req, res) {
  res.redirect('/');
});

console.log(`Server started at ${port}`);