var express = require('express');
var mainRouter = express.Router();
var mysql = require('mysql');

/**
 * Routes pages.
 * @param {Array.<Object>} nav The array of navigation objects. Each has a text
 *     and a link attribute.
 */
var router = function (nav) {
    var queryController = require('../controllers/queryController')(nav);
    var mainController = require('../controllers/mainController')(nav);
    
    mainRouter.get('/', mainController.home);
    
    mainRouter.get('/search', queryController);
    
    mainRouter.get('/about', mainController.about);
    
    return mainRouter;
};

module.exports = router;