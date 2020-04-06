const generator = require('../data-generator.js');

let newPresentationList = function () {

    let presentationList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": true,
        "data": presentationList
    };


    let singlePresentation = () => {
        return {
           
        };
    };

   
    // generate a random number of presentations
    var count = generator.integer(false, 0, 15);
    
    for (var i = 0; i < count; i++) {
        var newPresentation = singlePresentation();
        presentationList.push(newPresentation);
    }

    
    responseObject.totalCount = count;
    responseObject.perPage = 15;

    return responseObject;

};


module.exports = newPresentationList;