const generator = require('../data-generator.js');

let newPOList = function () {

    let poList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": true,
        "data": poList
    };


    let singlePO = () => {
        return {
            "poNumber": generator.integer(false, 0, 99999).toString(),
            "projectNumber": generator.integer(false, 0, 999999).toString(),
            "lastUpdated": generator.date('yyyy/mm/dd'),
            "companyName": generator.companyName(),
            "status": generator.randomFromArray(["Receive PO","PO Not Sent"]),
            "poDetails": {
                "customer": generator.companyName(),
                "contact": generator.fullName(),
                "salesRep": generator.fullName(),
                "subject": generator.randomFromArray(["PO Subject","PO For Big Pen Order", "Here is your PO", "PO Here, thanks for your custom"]),
                "startDate": generator.date('yyyy/mm/dd')
            },
            "items": {
                "itemList": [
                    {
                        "productId": generator.integer(false, 0, 999999).toString(),
                        "description": generator.productName(),
                        "quantity": generator.integer(false, 0, 999).toString(),
                        "total": generator.integer(false, 0, 999999).toString(),
                    }
                ],
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

    
    responseObject.totalCount = count;
    responseObject.perPage = 15;

    return responseObject;

};


module.exports = newPOList;