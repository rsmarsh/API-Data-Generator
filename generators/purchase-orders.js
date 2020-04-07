const generator = require('../data-generator.js');
const productGenerator = require('./product');

let newPOList = function () {

    let poList = [];
    let itemList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": true,
        "data": poList
    };


    let singlePO = () => {
        return {
            "poNumber": generator.integer(false, 0, 99999).toString(),
            "projectNumber": generator.integer(false, 0, 999999).toString(),
            "dateCreated": generator.date('yyyy/mm/dd'),
            "supplier": generator.companyName(),
            "status": generator.randomFromArray(["PO Not Sent", "New Order"]),
            "poDetails": {
                "distPONumber": generator.integer(false, 0, 99999).toString(),
                "customer": generator.companyName(),
                "contact": generator.fullName(),
                "salesRep": generator.fullName(),
                "subject": generator.randomFromArray(["PO Subject","PO For Big Pen Order", "Here is your PO", "PO Here, thanks for your custom"]),
                "startDate": generator.date('yyyy/mm/dd'),
                "targetDate": generator.date('yyyy/mm/dd'),
                "dateUpdated": generator.date('yyyy/mm/dd'),
                "shipDate": generator.date('yyyy/mm/dd'),
                "inHandsDate": generator.date('yyyy/mm/dd'),
            },
            "items": {
                "itemList": itemList,
                "totals": {
                    "gross": generator.percent(),
                    "subtotal": generator.integer(false, 0, 999999).toString(),
                    "salesTax": generator.integer(false, 0, 100).toString(),
                    "total": generator.integer(false, 0, 5000).toString(),
                }
            }
        };
    };

   
    // generate a random number of companies
    var count = generator.integer(false, 0, 15);
    
    for (var i = 0; i < count; i++) {
        var newPO = singlePO();
        poList.push(newPO);
    }

    // generate a random number of items within a single purchase order
    var itemCount = generator.integer(false, 0, 6);

    for (var itemIndex = 0; itemIndex <= itemCount; itemIndex++){
        itemList.push(productGenerator(['id', 'quantity', 'totalPrice']));
    }
    
    responseObject.totalCount = count;
    responseObject.perPage = 15;

    return responseObject;

};


module.exports = newPOList;