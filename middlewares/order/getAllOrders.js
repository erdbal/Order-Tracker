/**
 * Get all orders from the database 
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const OrderModel = requireOption(objectrepository, 'OrderModel');
    return function (req, res, next) {
        OrderModel.find({}).exec().then(orders => {
            res.locals.orders = orders;
            return next();
        });
    };
};