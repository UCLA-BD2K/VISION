var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello'
    })
});

var connection = mysql.createConnection({
    host: '10.44.115.120',
    user: 'developer',
    password: 'uclabd2k2015'
})

connection.connect(function (err) {
    if (err) {
        console.error('error connection: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM sys.sys_config', function (err, rows, fields) {
    if (err) {
        console.error('error query: ' + err.stack);
        return;
    }

    console.log('The first row is ', rows[0].variable);
});

connection.end();

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});