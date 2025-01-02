/**
 * Get the order object from the database using the id from the request
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const OrderModel = requireOption(objectrepository, 'OrderModel');
    return function (req, res, next) {
        OrderModel.findOne({
            _id: req.params.orderid
        }).exec().then(order => {
            res.locals.order = order;
            return next();
        });
    };
};