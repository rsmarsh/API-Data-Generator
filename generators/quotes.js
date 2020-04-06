const generator = require('../data-generator.js');

let newQuoteList = function () {

    let quoteList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": true,
        "data": quoteList
    };


    let singleQuote = () => {
        return {
           
        };
    };

   
    // generate a random number of quotes
    var count = generator.integer(false, 0, 15);
    
    for (var i = 0; i < count; i++) {
        var newQuote = singleQuote();
        quoteList.push(newQuote);
    }

    
    responseObject.totalCount = count;
    responseObject.perPage = 15;

    return responseObject;

};


module.exports = newQuoteList;