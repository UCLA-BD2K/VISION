var mysql = require('mysql');
var config = require('../config/config');
var request = require('request');

/**
 * A query based on the user's search parameters.
 * @constructor
 * @param {string} param1 First search parameter, typically a disease.
 * @param {string} param2 Second search parameter, typically a drug, gene, or
 *     molecule.
 */
function QueryEntity(param1, param2) {
    var self = this;
    this.param1 = param1;
    this.param2 = param2;
    this.getJSON = function (display) {
        return self._getResults(self, display);
    };
};

/**
 * Queries database to get search results.
 * First gets the type (DrugOrGene) of param2, then gets all of the
 * entries that match that type for param1.
 * @param {QueryEntity} self The QueryEntity object passed from the constructor.
 * @param {function(Array.<Object>)} display The callback function that uses the
 *     received data from the database.
 */
QueryEntity.prototype._getResults = function (self, display) {
    var connection = mysql.createConnection(config);
    /* connection.connect(function (err) {
         if (err) {
             console.error('error connection: ' + err.stack);
             return;
         }
         console.log('connected as id ' + connection.threadId);
     });*/
    if (self.param2 == "") {
        connection.query('SELECT * FROM HeartDB.Pairs WHERE Term LIKE ?', [self.param1], function (err, rows) {
            if (err) {
                console.log('queryEntity error query: ' + err.stack);
                return;
            } else {
                self.param1 = rows[0].Term;
                self.param2 = self.param1                
                connection.end();
                return self._getWiki(self, rows, display);
            }
        });
    } else {
        connection.query('SELECT * FROM HeartDB.Pairs WHERE Term LIKE ? AND TopMatch LIKE ?', [self.param1, self.param2], function (err, rows) {
            if (err) {
                console.log('queryEntity error query: ' + err.stack);
                return;
            } else {
                try {
                    self.param1 = rows[0].Term;
                    self.param2 = rows[0].TopMatch;
                    self.type = rows[0].MatchType;
                    self.ID = rows[0].ID;
                } catch (err) {
                    connection.end();
                    return display(null, null);
                }
                connection.query('SELECT * FROM HeartDB.Pairs WHERE Term LIKE ? AND MatchType = ?', [self.param1, self.type], function (err, rows) {
                    if (err) {
                        console.log('error query: ' + err.stack);
                        return;
                    } else {
                        connection.end();
                        return self._getWiki(self, rows, display);
                    }
                });
            }
        });
    }

    /*process.on('uncaughtException', function () {
        console.log('error query');
        return display(null);
    });*/
};

QueryEntity.prototype._getWiki = function (self, rows, display) {
    var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=' + self.param2 + '&redirects';
    request(url, function (error, response, body) {
        if (error) {
            console.log('error wiki');
            return;
        } else {
            body = JSON.parse(body).query.pages;
            var page = Object.keys(body)[0];
            var title = body[page].title;
            body = body[page].extract;
            var wiki = {
                title: title,
                text: body
            };
            return display(rows, wiki);
        }
    });
};

module.exports = QueryEntity;