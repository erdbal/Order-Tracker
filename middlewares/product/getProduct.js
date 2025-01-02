/**
 * Get the product object from the database using the id parameter
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const ItemModel = requireOption(objectrepository, 'ItemModel');

    return function (req, res, next) {
        ItemModel.findOne({
            _id: req.params.productid
        }).exec().then(item => {
            res.locals.item = item;
            return next();
        });
    };
};