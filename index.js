
const express = require('express');
var bodyParser = require('body-parser')
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');    
app.use(bodyParser.urlencoded({ extended: false }));    
app.use(bodyParser.json())

const OrderModel = require('./models/order');
const ItemModel = require('./models/orderedItem');

OrderModel.find().exec().then(check => {    //Seeding a bit of data so it doesn't look so empty
if (check.length === 0) {
    const order = new OrderModel();
    const order2 = new OrderModel();
    const item = new ItemModel();
    item.name = "testItem";
    item.guarantee = 1;
    item.price = 100;
    order2.name = "test2";
    order2.expectedDelivery = new Date();
    order2.arrived = false;
    order2.orderTotal = 0;
    order2.save();
    order.name = "test1";
    order.expectedDelivery = new Date();
    order.arrived = false;
    order.orderTotal = 100;
    order.save();
    item._order = order._id;
    item.save();
}
});

require('./routes/routes')(app);

app.listen(3000, function () {
    console.log('Listening on :3000');
});