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
    link: '#'
    }, {
    text: 'Contact',
    link: '#'
    }];

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/search', function (req, res) {
    var param1 = req.query['param1'];
    var param2 = req.query['param2'];
    var type;

    var connection = mysql.createConnection({
        host: '10.44.115.120',
        user: 'developer',
        password: 'uclabd2k2015'
    });
    /* connection.connect(function (err) {
         if (err) {
             console.error('error connection: ' + err.stack);
             return;
         }
         console.log('connected as id ' + connection.threadId);
     });*/
    connection.query('SELECT * FROM HeartDB.DiseaseRelationExtraction WHERE QueryEntity LIKE ? AND TopRankedEntity LIKE ?', [param1, param2], function (err, rows) {
        if (err) {
            console.error('error query: ' + err.stack);
            return;
        }
        param1 = rows[0].QueryEntity;
        param2 = rows[0].TopRankedEntity;
        type = rows[0].DrugOrGene;

        connection.query('SELECT * FROM HeartDB.DiseaseRelationExtraction WHERE QueryEntity LIKE ? AND DrugOrGene = ?', [param1, type], function (err, rows) {
            if (err) {
                console.error('error query: ' + err.stack);
                return;
            }
            console.log(rows.length);
            console.log(rows);

            res.render('results', {
                title: 'Search Results',
                nav: nav,
                param1: param1,
                param2: param2,
                rows: rows
            });
        });
    });

    //connection.end();
});

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Home',
        nav: nav
    });
});

/*connection.query('SELECT * FROM HeartDB.DiseaseRelationExtraction', function (err, rows, fields) {
    if (err) {
        console.error('error query: ' + err.stack);
        return;
    }

    console.log('The first row is ', rows[0].QueryEntity + ' ' + rows[0].DrugOrGene);
});

connection.end();*/

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});