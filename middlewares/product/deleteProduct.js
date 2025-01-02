/**
 * Delete a product from the database identified by the id parameter
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const ItemModel = requireOption(objectrepository, 'ItemModel');
    return function (req, res, next) {
        if (typeof res.locals.item === 'undefined') {
            return next();
        }

        ItemModel.findByIdAndDelete(res.locals.item._id).then(() => {

            return res.redirect(req.get('referer'));
        });
    };
};