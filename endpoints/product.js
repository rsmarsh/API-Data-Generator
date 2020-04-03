const generator = require('../data-generator.js');

// function to generate a single contact for a company
let singleProduct = () => {
    return generator.productName()
};

module.exports = singleProduct;