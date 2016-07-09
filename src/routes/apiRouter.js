var express = require('express');
var apiRouter = express.Router();
var mysql = require('mysql');
var config = require('../config/config');

var router = function () {
    //var apiController = require('../controllers/apiController');
    apiRouter.get('/term/:current', function (req, res) {
        //console.log(req.params);
        var term = req.params.current;
        // var term = 'a';
        //console.log(term);
        var connection = mysql.createConnection(config);
        connection.query('SELECT DISTINCT Term FROM HeartDB.Pairs WHERE Term LIKE ? OR Term LIKE ?', [term + '%', '% ' + term + '%'], function (err, rows) {
            if (err) {
                console.log('apiController error query: ' + err.stack);
                connection.end();
                return;
            } else {
                var arr = [];
                for (var k = 0; k < rows.length; k++) {
                    arr.push(rows[k].Term);
                }
                console.log(arr);
                res.json(arr);
                connection.end();
            }
        });

        //apiRouter.get('/:current', apiController('Match'));

    });
    
    apiRouter.get('/match/:current', function(req, res) {
        //console.log(req.params);
        var match = req.params.current;
        // var term = 'a';
        //console.log(match);
        var connection = mysql.createConnection(config);
        connection.query('SELECT DISTINCT TopMatch FROM HeartDB.Pairs WHERE TopMatch LIKE ? OR TopMatch LIKE ?', [match + '%', '% ' + match + '%'], function (err, rows) {
            if (err) {
                console.log('apiController error query: ' + err.stack);
                connection.end();
                return;
            } else {
                var arr = [];
                for (var k = 0; k < rows.length; k++) {
                    arr.push(rows[k].TopMatch);
                }
                console.log(arr);
                res.json(arr);
                connection.end();
            }
        });
    })
    return apiRouter;

};

module.exports = router;