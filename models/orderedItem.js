const Schema = require('mongoose').Schema;
const db = require('../config/db');

const OrderedItem = db.model('OrderedItem', {
    name: String, // termék neve
    guarantee: Number, // garancia időtartama években
    price: Number, // termék ára
    _order: { 
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = OrderedItem;