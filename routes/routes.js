const getAllOrdersMW = require('../middlewares/order/getAllOrders');
const getOrderMW = require('../middlewares/order/getOrder');
const saveOrderMW = require('../middlewares/order/saveOrder');
const deleteOrderMW = require('../middlewares/order/deleteOrder');
const changeDeliveryStatusMW = require('../middlewares/order/changeDeliveryStatus');
const getAllProductsMW = require('../middlewares/product/getAllProducts');
const saveProductMW = require('../middlewares/product/saveProduct');
const deleteProductMW = require('../middlewares/product/deleteProduct');
const getProductsFromOrderMW = require('../middlewares/product/getProductsFromOrder');
const getProductMW = require('../middlewares/product/getProduct');
const renderMW = require('../middlewares/render');

const OrderModel = require('../models/order');
const ItemModel = require('../models/orderedItem');

module.exports = function (app) {
    const objRepo = {
        OrderModel: OrderModel,
        ItemModel: ItemModel,
    };
    

    app.get('/products',
        getAllProductsMW(objRepo),
        renderMW(objRepo, 'all-products'),
    )

    app.use('/order/new',
        saveOrderMW(objRepo),
        saveProductMW(objRepo),
        renderMW(objRepo, 'order-details'),
    )

    app.use('/order/edit/:orderid',
        getOrderMW(objRepo),
        getProductsFromOrderMW(objRepo),
        saveOrderMW(objRepo),
        saveProductMW(objRepo),
        renderMW(objRepo, 'order-details'),
    )

    app.get('/order/delete/:orderid',
        getOrderMW(objRepo),
        deleteOrderMW(objRepo),
        renderMW(objRepo, 'index'),
    )

    app.get('/product/delete/:productid/',
        getProductMW(objRepo),
        deleteProductMW(objRepo),
        renderMW(objRepo, 'all-products'),
    )

    app.use('/product/new',
        saveProductMW(objRepo),
        renderMW(objRepo, 'product-details'),
    )

    app.get('/',
        getAllOrdersMW(objRepo),
        renderMW(objRepo, 'index'),
    );

    app.use('/',
        getAllOrdersMW(objRepo),
        changeDeliveryStatusMW(objRepo),
        renderMW(objRepo, 'index'),
    )
}