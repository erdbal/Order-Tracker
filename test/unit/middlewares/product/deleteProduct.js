var expect = require('chai').expect;
var deleteProductMW = require('../../../../middlewares/product/deleteProduct');

describe('deleteProduct middleware ', function () {

    it('should call ItemModel.findByIdAndDelete and redirect', function (done) {
        const mw = deleteProductMW({
            ItemModel: {
                findByIdAndDelete: (p1) => {
                    expect(p1).to.be.eql('test');
                    return Promise.resolve();
                }
            }
        });

        mw({
            get: (p1) => {
                expect(p1).to.be.eql('referer');
                return 'referer';
            }
        }, {
            locals: {
                item: {
                    _id: 'test'
                }
            },
            redirect: (p1) => {
                expect(p1).to.be.eql('referer');
                done();
            }
        }, () => {
         });
       
    });


    it('should call next because item is undefined', function (done) {
        const objectrepository = {
            ItemModel: {
                findByIdAndDelete: (p1) => {
                    expect.fail('ItemModel.findByIdAndDelete should not be called because item is undefined');
                }
            }
        };
        const mw = deleteProductMW(objectrepository);
        
        
        mw({
            get: (p1) => {
                expect(p1).to.be.eql('referer');
                return 'referer';
            }
        }, {
            locals: {
            },
            redirect: (p1) => {
                expect(p1).to.be.eql('referer');
            }
        }, () => {
            done();
         });
       
    });

});