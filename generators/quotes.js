const generator = require('../data-generator.js');
const productGenerator = require('./product');

let newQuoteList = function () {

    let quoteList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": true,
        "data": quoteList,
        "locale": generator.locale(false, true)
    };

    let singleQuote = () => {
        return {
            "quoteNumber": generator.integer(false, 0, 99999).toString(),
            "createdDate": generator.date('yyyy/mm/dd'),
            "updatedDate": generator.date('yyyy/mm/dd'),
            "customerName": generator.fullName(),
            "status": generator.randomFromArray(['New Quote', 'Quote Sent']),
            "details": {
                "type": generator.randomFromArray(['Customer', 'Prospect']),
                "customerNumber": generator.integer(false, 0, 99999).toString(),
                "contact": generator.fullName(),
                "salesRep": generator.fullName(),
                "subject": generator.randomFromArray(['This is the subject','Short subject', 'A long subject which might overrun more than one single line on the page']),
                "targetDate": generator.date('yyyy/mm/dd'),
                "lastUpdated":  generator.date('yyyy/mm/dd'),
            },
            "products": []
        };
    };

   
    // generate a random number of records
    let count = generator.integer(false, 0, 15);
    
    for (let i = 0; i < count; i++) {
        let newQuote = singleQuote();
        
        // generate a random number of products within a single record
        let productCount = generator.integer(false, 0, 6);
        for (let productIndex = 0; productIndex <= productCount; productIndex++){
            newQuote.products.push(productGenerator(['id', 'supplier']));
        }
        
        quoteList.push(newQuote);
    }
    
    responseObject.totalCount = count;
    responseObject.perPage = 15;

    return responseObject;

};

module.exports = newQuoteList;