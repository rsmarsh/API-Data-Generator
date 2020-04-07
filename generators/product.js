const generator = require('../data-generator.js');

// as well as the product name, these additional values can be added to the returned object by passing in an array of matching strings
const additionalValues = {
    id: generator.integer.bind(this, false, 1, 99999),
    quantity: generator.integer.bind(this, false, 1, 999),
    totalPrice: generator.integer.bind(this, false, 1, 99999),
    supplier: generator.companyName
}

// function to generate a single contact for a company
let singleProduct = (extras) => {
    const product = {
        name: generator.productName()
    };

    extras.map(extra => {
        if (additionalValues[extra]) {
          product[extra] = additionalValues[extra]().toString();
        }        
    });
    
    return product;
};

module.exports = singleProduct;