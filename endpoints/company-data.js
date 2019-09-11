const generator = require('../data-generator.js');
let newContact = require('./contact.js');

let newCompanyList = function () {

    let companyList = [];
    let contactList = [];

    // the wrapper to the response which will always be present whether any companies exist or not
    let responseObject = {
        "status": generator.boolean(),
        "data": companyList
    };


    let singleCompany = () => {
        return {
            "name": generator.companyName(),
            "accountNumber": generator.integer(false, 0, 999999).toString(),
            "customerType": generator.integer(false, 1, 2),
            "ceased": generator.boolean(),
            "onHold": generator.boolean(),
            "additional": {
                "paymentTermDay": generator.integer(false, 1, 30),
                "repCode": generator.fullName,
            },
            "contactInfo": {
                "address": generator.fullAddress(),
                "phone": generator.phoneNumber(),
                "email": generator.emailAddress(),
                "website": generator.website(),
            },
            "contacts": contactList
        };
    };

   
    // generate a random number of companies
    for (var i = 0; i < generator.integer(false, 1, 1); i++) {
        var newCompany = singleCompany();
        
        // generate a random number of contacts within each company
        for (var i = 0; i < generator.integer(false, 1, 3); i++) {
            contactList.push(newContact());
        }

        companyList.push(newCompany);
    }

    return responseObject;



};


module.exports = newCompanyList;