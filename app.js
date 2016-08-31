var express = require('express');
var mysql = require('mysql');
var app = express();
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
var apiRouter = require('./src/routes/apiRouter')();

app.use('/', mainRouter);
app.use('/api', apiRouter); 

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});