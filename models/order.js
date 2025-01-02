const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Order = db.model('Order', {
    name: String,  // rendelés neve
    expectedDelivery: Date, // várható szállítás dátuma
    orderTotal: Number, // rendelés összértéke
    arrived: Boolean, // megérkezett-e a rendelés
});

module.exports = Order;