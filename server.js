// Env Variables
const path = require('path');
require('custom-env').env('staging');

// Get dependencies
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


// import the routing file to handle the default (index) route
// ..................................................................................//
var index = require('./server/routes/app');
const messageRoutes = require('./server/routes/chat');
const contactRoutes = require('./server/routes/contacts');
const userRoutes = require('./server/routes/user');
const convoRoutes = require('./server/routes/conversations');

var app = express(); // create an instance of express


// .................................. REMOTE MONGODB ..................................//
// const MONGO_USER = process.env.DB_USER;
// const MONGO_PASS = process.env.DB_PASS;
// const MONGODB_URL = "mongodb+srv://" + MONGO_USER + ":" + MONGO_PASS + "@cluster0.2scof.mongodb.net/cms"

// mongoose.connect(MONGODB_URL)
//     .then(() => {
//         console.log("Connection to the database was successful")
//     })
//     .catch(() => {
//         console.log("Connection to the database failed!");
//     });
// .................................. LOCAL MONGODB ..................................//
const MONGODB_LOCAL = "mongodb://localhost:27017/cms";

// establish a connection to the mongo database
mongoose.connect(MONGODB_LOCAL, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log('Connection failed: ' + err);
    } else {
        console.log('Connected to database!');
    }
});
// .................................. END MONGODB ..................................//

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/cms')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/chat', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/conversations', convoRoutes);
// app.use('/user', userRoutes);
// app.use('/user', userRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/chatwombat/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
    console.log('API running on localhost: ' + port)
});