var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/loginSignup');
var deleteuserRouter = require('./routes/deleteuser');
var chartData = require('./routes/chartData')
var visualization = require('./routes/visualization')
var getVisualizations = require('./routes/getVisualizations')

var app = express();
var cors = require('cors')
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/getvisualization', getVisualizations);
app.use('/visualization', visualization);
app.use(authenticateToken);
app.use('/chart', chartData);
app.use('/deleteuser', deleteuserRouter);



function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader)
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.MY_TOKEN, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
    next();

  });
}


module.exports = app;

