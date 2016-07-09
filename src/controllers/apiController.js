var mysql = require('mysql');
var config = require('../config/config');

var apiController = function () {
    var search = function (req, res) {
        console.log(req.params);
        var term = req.params.current;
        console.log(term);
        var connection = mysql.createConnection(config);
        connection.query('SELECT DISTINCT Term FROM HeartDB.Pairs WHERE Term LIKE ?\'%\'', [term], function (err, rows) {
            if (err) {
                console.log('apiController error query: ' + err.stack);
                connection.end();
                return;
            } else {
                console.log(rows);
                res.json(rows);
                connection.end();
            }
        });

    };

    return search;
};

module.exports = apiController;