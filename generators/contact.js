const generator = require('../data-generator.js');

 // function to generate a single contact for a company
 let singleContact = () => {
    return  {
            "name": generator.fullName(),
            "phone": generator.phoneNumber(),
            "email": generator.emailAddress(),
            "mobile": generator.mobileNumber()
    }
};

module.exports = singleContact;