var express = require('express');
var mysql = require('mysql');
var app = express();
//var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

var nav = [{
    text: 'Home',
    link: '/'
    }, {
    text: 'About',
    link: '/about'
    }, {
    text: 'Contact',
    link: '#'
    }];

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

var mainRouter = require('./src/routes/mainRouter')(nav);

app.use('/', mainRouter);

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});