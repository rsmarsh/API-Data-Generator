const generator = require('../data-generator.js');

let newSalesOrderList = function () {

    let salesOrderList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": true,
        "data": salesOrderList
    };


    let singleSalesOrder = () => {
        return {
           
        };
    };

   
    // generate a random number of sales orders
    var count = generator.integer(false, 0, 15);
    
    for (var i = 0; i < count; i++) {
        var newSalesOrder = singleSalesOrder();
        salesOrderList.push(newSalesOrder);
    }

    
    responseObject.totalCount = count;
    responseObject.perPage = 15;

    return responseObject;

};


module.exports = newSalesOrderList;