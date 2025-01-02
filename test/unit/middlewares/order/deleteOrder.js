var expect = require('chai').expect;
var deleteOrderMW = require('../../../../middlewares/order/deleteOrder');


describe('deleteOrder middleware ', function () {

    it('should redirect', function (done) {
        const mw = deleteOrderMW({
            ItemModel: {
                deleteMany: (p1) => {
                    expect(p1).to.be.eql({ _order: 'test' });
                    return {
                        exec: () => {
                            return Promise.resolve();
                        }
                    };
                }
            },
            OrderModel: {
                findByIdAndDelete: (p1) => {
                    expect(p1).to.be.eql('test');
                    return Promise.resolve();
                }
            }            
        });

        mw({},
            {
            locals: {
                order: {
                    _id: 'test'
                }
            },
            redirect: (p1) => {
                done();
            }
        }, () => {
            expect.fail("next should not be called");
         });
       
    });

    it('should call next because order is undefined', function (done) {
        const mw = deleteOrderMW({
            ItemModel: {
                deleteMany: (p1) => {
                    expect.fail('ItemModel.deleteMany should not be called because order is undefined');
                    return {
                        exec: () => {
                            return Promise.resolve();
                        }
                    };
                }
            },
            OrderModel: {                
                findByIdAndDelete: (p1) => {
                    expect.fail('OrderModel.findByIdAndDelete should not be called because order is undefined');
                }
            }            
        });

        mw({},
            {
            locals: {
            },
            redirect: (p1) => {
                expect.fail("res.redirect should not be called");
            }
        }, () => {
            done();
         });
       
    });



});