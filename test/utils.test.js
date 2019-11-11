const { expect } = require('chai');
const { checkChildren } = require('../app/utils');


describe('The Utility Functions', () => {
    
    describe('checkChildren function', () => {

        const data = {
            "identifier": "System",
            "subviews": [
                {
                    "contentView": {
                        "subviews": [{ "class": "Input" }]
                    }
                }
            ]
        }

        it('returns subview if contentView is a child', () => {
            const { subviews, contentView } = data.subviews[0];

            expect(checkChildren(subviews, contentView)).to.equal(data.subviews[0].contentView.subviews);
        })
        it('returns subview if subview is a child', () => {
            const { subviews, contentView } = data;

            expect(checkChildren(subviews, contentView)).to.equal(data.subviews);
        })
        it('returns nothing if neither  is a child', () => {
            const { subviews, contentView } = data.subviews[0].contentView.subviews;

            expect(checkChildren(subviews, contentView)).to.equal(undefined);
        })
    })

})
