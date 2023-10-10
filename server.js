const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();

// start express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connnect to DB
mongoose.connect('mongodb://0.0.0.0:27017/AdsPageBackend', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

app.use((req, res, next) => {
  console.log(req.body);
  req.db = db;
  next();
});

// add middleware
if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}

app.use(session({ 
  secret: 'fdsf34234', 
  store: MongoStore.create(mongoose.connection), 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    secure: process.env.NODE_ENV == 'production',
} }));

// server static files from the React app 
// app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

// add routes
// app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/ads.router'));
app.use('/auth', require('./routes/auth.routes'));

// at any other link, just serve react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

module.exports = server;