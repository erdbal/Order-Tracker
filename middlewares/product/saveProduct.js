/**
 * Save a product to the database
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const ItemModel = requireOption(objectrepository, 'ItemModel');
    return function (req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.guarantee === 'undefined' ||
            typeof req.body.price === 'undefined' ||
            typeof res.locals.order === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.item === 'undefined') {
            res.locals.item = new ItemModel();
        }
        res.locals.item.name = req.body.name;
        res.locals.item.guarantee = req.body.guarantee;
        res.locals.item.price = req.body.price;
        res.locals.item._order = res.locals.order._id;

        res.locals.item.save().then(() => {


            return res.redirect('/order/edit/' + res.locals.order._id);
        });
    };
};