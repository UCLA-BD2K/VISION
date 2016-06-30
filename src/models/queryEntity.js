var mysql = require('mysql');
var config = require('../config/config');

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
    
    // TODO: error handling/no results found
    connection.query('SELECT * FROM HeartDB.Pairs WHERE Term LIKE ? AND TopMatch LIKE ?', [self.param1, self.param2], function (err, rows) {
        if (err) {
            console.error('error query: ' + err.stack);
            return;
        }
        self.param1 = rows[0].Term;
        self.param2 = rows[0].TopMatch;
        self.type = rows[0].MatchType;
        self.ID = rows[0].ID;
        connection.query('SELECT * FROM HeartDB.Pairs WHERE Term LIKE ? AND MatchType = ?', [self.param1, self.type], function (err, rows) {
            if (err) {
                console.error('error query: ' + err.stack);
                return;
            }
            return display(rows);
        });
    });
};

module.exports = QueryEntity;