/**
 * Renders home and about pages.
 * @param {Array.<Object>} nav The array of navigation objects.
 */
var mainController = function (nav) {
    var home = function (req, res) {
        res.render('index', {
            title: 'Home',
            nav: nav
        });
    };

    var about = function (req, res) {
        res.render('about', {
            title: 'About',
            nav: nav
        })
    };

    return {
        home: home,
        about: about
    };
};

module.exports = mainController;