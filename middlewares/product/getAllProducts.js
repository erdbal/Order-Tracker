/**
 * Get all products from the database 
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const ItemModel = requireOption(objectrepository, 'ItemModel');

    return function (req, res, next) {
        ItemModel.find({}).exec().then(items => {

            res.locals.items = items;
            return next();
        });
    };
};