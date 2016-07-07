var mysql = require('mysql');
var QueryEntity = require('../models/queryEntity');

/**
 * Calls the QueryController model to get the data, then renders the results page.
 * @param {Array.<Object>} nav The array of navigation objects.
 */
var queryController = function (nav) {
    var results = function (req, res) {
        var param1 = req.query['param1'];
        var param2 = req.query['param2'];
        qe = new QueryEntity(param1, param2);
        //console.log(qe.getJSON());

        var display = function (data, text) {
            res.render('results', {
                title: 'Search Results',
                nav: nav,
                param1: qe.param1,
                param2: qe.param2,
                id: qe.ID,
                rows: data,
                wiki: text
            });
        };
        qe.getJSON(display);
    };
    return results;
};

module.exports = queryController;