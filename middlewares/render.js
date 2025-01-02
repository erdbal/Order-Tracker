/**
 * Render middleware for rendering the page 
 */
const requireOption = require('./requireOption');

module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        // console.log('rendering: ' + viewName);
        res.render(viewName);
    };
};