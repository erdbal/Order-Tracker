/**
 * Save the order to the database
 */
const requireOption = require('../requireOption');
const mongoose = require('mongoose');


module.exports = function (objectrepository) {
    const OrderModel = requireOption(objectrepository, 'OrderModel');
    const ItemModel = requireOption(objectrepository, 'ItemModel');
    return function (req, res, next) {
        if (
            (typeof req.body.ordername === 'undefined') ||
            (typeof req.body.expectedDelivery === 'undefined')
        ) {
            return next();
        }

        

        if (typeof res.locals.order === 'undefined') {
            res.locals.order = new OrderModel();
            res.locals.order.name = req.body.ordername;
            res.locals.order.expectedDelivery = req.body.expectedDelivery;
            if (req.body.arrived === 'on') {
                res.locals.order.arrived = true;
                
            }
            
            else {
                res.locals.order.arrived = false;
            }
            res.locals.order.orderTotal = 0;
            res.locals.order.save().then(() => {

                return res.redirect('/');

            })
        }
        else {
            ItemModel.aggregate([
                {
                    $match: { _order: mongoose.Types.ObjectId.createFromHexString(req.params.orderid) }
                },
                {
                    $group: {
                        _id: null,
                        totalPrice: { $sum: '$price' }
                    }
                },
                {
                    $project: {
                        _id: 0, // Exclude the _id field
                        totalPrice: 1 // Include only the totalPrice field
                    }
                }
            ]).exec().then(result => {
                const totalPrice = result.length > 0 ? result[0].totalPrice : 0;
                res.locals.order.name = req.body.ordername;
                res.locals.order.expectedDelivery = req.body.expectedDelivery;
                res.locals.order.orderTotal = totalPrice;
                if (req.body.arrived === 'on') {
                    res.locals.order.arrived = true;
                    
                }
                
                else {
                    res.locals.order.arrived = false;
                }

                res.locals.order.save().then(() => {
                    return res.redirect('/');
    
                })
            });
        };
    };
};