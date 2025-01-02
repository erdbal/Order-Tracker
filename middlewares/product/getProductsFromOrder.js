/**
 * Get the products from the order object from the database using the id from the request
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const ItemModel = requireOption(objectrepository, 'ItemModel');
    return function (req, res, next) {
        if (typeof res.locals.order === 'undefined') {
            return next();
        }

        ItemModel.find({
            _order: res.locals.order._id
        }).exec().then(items => {


            res.locals.items = items;
            return next();
        });


    };
};