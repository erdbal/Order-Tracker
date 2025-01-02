/**
 * Delete an order identified by the id parameter
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const OrderModel = requireOption(objectrepository, 'OrderModel');
    const ItemModel = requireOption(objectrepository, 'ItemModel');
    return function (req, res, next) {
        if (typeof res.locals.order === 'undefined') {
            return next();
        }
        ItemModel.deleteMany({
            _order: res.locals.order._id
        }).exec();
        OrderModel.findByIdAndDelete(res.locals.order._id).then(() => {
            return res.redirect('/');
        });
    };
};