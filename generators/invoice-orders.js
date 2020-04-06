const generator = require('../data-generator.js');

let newInvoiceList = function () {

    let invoiceList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": true,
        "data": invoiceList
    };


    let singleQuote = () => {
        return {
           
        };
    };

   
    // generate a random number of invoices
    var count = generator.integer(false, 0, 15);
    
    for (var i = 0; i < count; i++) {
        var newInvoice = singleQuote();
        invoiceList.push(newInvoice);
    }

    
    responseObject.totalCount = count;
    responseObject.perPage = 15;

    return responseObject;

};


module.exports = newInvoiceList;