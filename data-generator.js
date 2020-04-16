const companyNames = require('./lists/companies.json');
const addresses = require('./lists/addresses.json');
const names = require('./lists/names.json');
const products = require('./lists/products.json');
const locales = require('./lists/locales.json');

/**
 * Returns a randomly generated Phone/Mobile number
 * This is a random 11 digit number, with a chance of returning a 12 character number with a space in the middle
 *
 * @param {Boolean} neverBlank - when true, the generator will force the phone number to always exist
 * @param {Boolean} isMobile - returns a mobile number, rather than the default landline number
 * @returns {String} - randomly generated phone number as a string
 */
let phoneNumber = function(neverBlank, isMobile) {

    // return nothing to simulate a missing number
    if (!neverBlank &&_bool()) {
        return;
    }

    // random number with the length of 9
    let number = Math.random().toString().replace('.', '').substr(0,9);

    // prepend with either 07 or 01 to represent mobiles/landlines
    if (isMobile) {
        number =  '07'+number;
    } else {
        number =  '0'+integer(false, 0, 5)+number;
    }

    // sometimes add a space in the middle of a number to match how some users enter numbers
    if (_bool()) {
        number = [number.substring(0, 5), number.substring(6, 11)].join(' ');
    }

    return number;

    
}

/**
 * Returns a randomly generated Mobile Phone number
 * This is a random 11 digit number, with a chance of returning a 12 character number with a space in the middle
 *
 * @param {Boolean} neverBlank - when true, the generator will force the phone number to always exist
 * @returns {String} - randomly generated mobile number as a string
 */
let mobileNumber = function(neverBlank) {
    return phoneNumber(neverBlank, true);
}

/**
 * Picks a random first name from the first name json file
 *
 * @returns {String} - the first name
 */
let firstName = function() {
    return _getRandomEntry(names.firstName);
}

/**
 * Picks a random surname from the lastname json file
 *
 * @returns {String} - the last name
 */
let lastName = function() {
    return _getRandomEntry(names.lastName);
}

/**
 * Returns a random first name joined with a random last name
 *
 * @returns {String} - the two word name as a string
 */
let fullName = function() {
    return firstName()+' '+lastName();
}

/**
 * Builds an address with multiple lines, comma seperated instead of new lines to match DB storage method
 * The number of lines returned is randomised
 * The address can be based in any country and zipcode as imported from the json files
 *
 * @returns {String} - one line comma seperated string, built up from randomised address segments
 */
let fullAddress = function() {
    var newAddress = [];
    newAddress.push(_getRandomEntry(addresses.firstLine));
    newAddress.push(_getRandomEntry(addresses.secondLine));
    newAddress.push(_getRandomEntry(addresses.city));

    // randomise between UK/US area codes
    if (_bool()) {
        newAddress.push(
            character().toUpperCase() + character().toUpperCase() + integer(false, 1, 10) +' '+ integer(false, 1, 10) + character().toUpperCase() + character().toUpperCase()
            );
    } else {
        newAddress.push(integer(false, 10000, 99999).toString());
    }
    // country is not always present in customer addresses
    if (_bool()){
        newAddress.push(_getRandomEntry(addresses.country));
    }

    return newAddress.join(', ');
}

/**
 *  Returns a randomised company name, consisting of at least two words, with the randomised chance to have up to 4 words
 *
 * @param {Boolean} short - whether the return value should only consist of a two word company name
 * @returns {String} - Between 2 and 4 words. each word seperated by spaces
 */
let companyName = function(short) {
    var newCompanyName = _getRandomEntry(companyNames.primary);
    newCompanyName += ' '+_getRandomEntry(companyNames.secondary);

    if (short) {
        return newCompanyName;
    }

    // 50% chance
    if (_bool()) {
        newCompanyName += ' '+_getRandomEntry(companyNames.extra);
    }

    // 25% chance
    if (_bool() && _bool()) {
        newCompanyName += ' '+_getRandomEntry(companyNames.suffix);
    }

    return newCompanyName;
}

/**
 *  Builds a random email address using parts from the names json, company names json, and internal domain TLD list
 * The first name is shortened to an intial and seperated from the surname with a '.'
 *
 * @returns {String} - an email address consisting of 'firstname'.'lastname'@'companyname'.'domain name'
 */
let emailAddress = function() {
    return firstName().charAt(0).toLowerCase() +'.'+ lastName().toLowerCase() +'@'+ companyName(true).replace(' ', '').toLowerCase() +'.'+ _topLevelDomain();
}


/**
 * Internal helper function to return a random TLD, used by both email addresses and website generation
 *
 * @returns {String} - the ending TLD, without the '.' symbol prepended
 */
let _topLevelDomain = function() {
   return _getRandomEntry(['org', 'co.uk', 'com', 'gov.uk', 'biz', 'co', 'fr', 'de', 'ie', 'tv']);
};

/**
 * Creates a randomised website
 * The end result consists of a protocol, a domain name, and a TLD
 *
 * @param {Boolean} neverBlank - since website can be optional, leaving this undefined will have a chance of returning nothing
 * @returns {String} - full website name. Has the chance of being blank by default
 */
let website = function(neverBlank) {
    if (!neverBlank && _bool()) {
        return;
    }

    let protocol = _getRandomEntry(['https://', 'http://', 'www.', '']);
    let domainName = companyName(true).replace(' ', '').toLowerCase();
    let TLD = _topLevelDomain();

    return protocol+domainName+'.'+TLD;

}

/**
 * Has equal chance of returning true or false
 * Uses the internal function to retrieve the random value
 *
 * @returns {Boolean}
 */
let boolean = function() {
    return _bool();
}

/**
 * Returns a random integer
 * By default ranges between 0 and the maximum integer value
 *
 * @param {Boolean} allowNegative - Allow negative numbers to be returned also
 * @param {Number} [min=0] - The lowest number allowed to be returned
 * @param {Number} [max=Number.MAX_SAFE_INTEGER] - The highest number allowed to be returned
 * @returns {Number} - A random number within the provided range
 */
let integer = function(allowNegative, min = 0, max = Number.MAX_SAFE_INTEGER) {
    if (allowNegative) {
        min = Number.MIN_SAFE_INTEGER;
    }
    return _randomInRange(min, max);
}

/**
 * Gets a random letter from the English alphabet, between A-Z
 * Capitalisation is not handed within this function, which always returns a lower case letter
 *
 * @returns {String} - a single letter from the alphabet
 */
let character = function(){
    return _getRandomEntry('abcdefghijklmnopqrstuvwxyz'[integer(false, 0, 25)]);
}

/**
 * This returns a random element from a provided array
 *
 * @param {*} [fromArray=[]] - Arrayfrom which to return a random element/character
 * @returns {*} - the element found at the random position
 */
let _getRandomEntry = function(fromArray = []) {
    return fromArray[_randomInRange(0, fromArray.length)];
}

/**
 * Returns a random number from the given range
 * 
 *
 * @param {Number} [min=0] - the lower end of the range
 * @param {Number} [max=Number.MAX_SAFE_INTEGER] - the upper end of the range
 * @returns {Number} - a random number between the two provided number arguments
 */
let _randomInRange = function(min = 0, max = Number.MAX_SAFE_INTEGER) {
    return min + Math.floor(Math.random() * (Math.abs(min)+max));
}

/**
 * Internal function to generate a boolean with even chance of true/false
 *
 * @returns {Boolean}
 */
let _bool = function(){
    return Math.random() > 0.5;
}


/**
 * Returns a date string in the supplied format
 *
 * @param {String} format - the desired date syntax, see switch statement for supported ones
 * @returns {String} - A string representation of a randomly generated date
 */
let date = function(format) {
    switch(format) {
        case 'yyyy/mm/dd':
        default:
            return `${new Date().getFullYear()}/${integer(false, 0,13)}/${integer(false, 0,28)}`;
    }
}

/**
 * Pass an array to this function, and a random index will be returned
 * Useful for items which can have around 3 - 10 fixed values
 *
 * @param {Array} arr - an array consisting of any/mixed types
 * @returns a single variable of any type
 */
let randomFromArray = function(arr){
    return arr[_randomInRange(0, arr.length-1)];
}

let productName = function(){
    return products[_randomInRange(0, products.length)];
}

let percent = function(allowNegative = false){
    return `${integer(allowNegative, 0, 100)}%`;
}

let locale = function(getDefinition = false) {
    let randomLocale = _randomInRange(Object.keys(locales));
    return getDefinition ?  randomLocale : locales[randomLocale];
}


module.exports = {
    phoneNumber,
    mobileNumber,
    firstName,
    lastName,
    fullName,
    fullAddress,
    companyName,
    emailAddress,
    website,
    boolean,
    integer,
    date,
    randomFromArray,
    productName,
    percent

};