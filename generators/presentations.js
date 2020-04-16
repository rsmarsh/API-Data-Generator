const generator = require('../data-generator.js');
const productGenerator = require('./product');

let newPresentationList = function () {

    let presentationList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": true,
        "data": presentationList,
        "locale": generator.locale()
    };


    let singlePresentation = () => {
        return {
            "presentationNumber": generator.integer(false, 0, 99999).toString(),
            "projectNumber": generator.integer(false, 0, 99999).toString(),
            "quotationDate": generator.date('yyyy/mm/dd'),
            "dateCreated": generator.date('yyyy/mm/dd'),
            "companyName": generator.companyName(),
            "status": generator.randomFromArray(['New Presentation', 'Presentation Sent']),
            "details": {
                "customer": generator.companyName(),
                "contact": generator.fullName(),
                "salesRep": generator.fullName(),
                "subject": generator.randomFromArray(['This is the subject','Short subject', 'A long subject which might overrun more than one single line on the page']),
                "startDate": generator.date('yyyy/mm/dd'),
                "targetDate": generator.date('yyyy/mm/dd'),
                "updatedDate":  generator.date('yyyy/mm/dd'),
            },
            "products": []
        };
    };

   
    // generate a random number of presentations
    var count = generator.integer(false, 0, 15);
    
    console.log(count);
    for (var i = 0; i < count; i++) {
        var newPresentation = singlePresentation();
        
        // generate a random number of products within a single purchase order
        var productCount = generator.integer(false, 0, 6);
        for (var productIndex = 0; productIndex <= productCount; productIndex++){
            newPresentation.products.push(productGenerator(['id', 'supplier']));
        }
        
        
        presentationList.push(newPresentation);
    }
    
    
    responseObject.totalCount = count;
    responseObject.perPage = 15;

    return responseObject;

};


module.exports = newPresentationList;