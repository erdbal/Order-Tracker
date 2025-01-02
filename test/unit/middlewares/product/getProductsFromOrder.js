var expect = require('chai').expect;
var getProductsFromOrderMW = require('../../../../middlewares/product/getProductsFromOrder');

describe('getProductsFromOrder middleware ', function () {

    it('should return items', function (done) {
        const mw = getProductsFromOrderMW({
            ItemModel: {
                find: (p1) => {
                    expect(p1).to.be.eql({ _order: 'test' });
                    return {
                        exec: () => {
                            return Promise.resolve('items');
                        }
                    };
                }
            }
        });

        const resmock = {
            locals: {
                order: {
                    _id: 'test'
                },
            }
        };

        mw({},
            resmock,
            () => {
                expect(resmock.locals.items).to.be.eql('items');
                done();
            });
    });

    it('items should be undefined because order is undefined', function (done) {
        const mw = getProductsFromOrderMW({
            ItemModel: {
                find: (p1) => {
                    expect.fail('ItemModel.find should not be called because order is undefined');
                    return {
                        exec: () => {
                            return Promise.resolve('items');
                        }
                    };
                }
            }
        });
        const resmock = {
            locals: {
                
            }
        };

        mw({},
            resmock,
            () => {
                expect(resmock.locals.order).to.be.undefined;
                expect(resmock.locals.items).to.be.undefined;
                done();
            });
    });
});