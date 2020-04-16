const generator = require('../data-generator.js');
const productGenerator = require('./product');

let newPresentationList = function () {

    let presentationList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": true,
        "data": presentationList,
        "locale": generator.locale(false, true)
    };

    let singlePresentation = () => {
        return {
            "presentationNumber": generator.integer(false, 0, 99999).toString(),
            "projectNumber": generator.integer(false, 0, 99999).toString(),
            "createdDate": generator.date('yyyy/mm/dd'),
            "customerName": generator.fullName(),
            "status": generator.randomFromArray(['New Presentation', 'Presentation Sent']),
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

   
    // generate a random number of presentations
    let count = generator.integer(false, 0, 15);
    
    for (let i = 0; i < count; i++) {
        let newPresentation = singlePresentation();
        
        // generate a random number of products within a single purchase order
        let productCount = generator.integer(false, 0, 6);
        for (let productIndex = 0; productIndex <= productCount; productIndex++){
            newPresentation.products.push(productGenerator(['id', 'supplier']));
        }
        
        presentationList.push(newPresentation);
    }
    
    responseObject.totalCount = count;
    responseObject.perPage = 15;

    return responseObject;

};

module.exports = newPresentationList;