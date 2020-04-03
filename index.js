const express = require('express');
const cors = require('cors');
const app = express();

let companyGenerator = require('./endpoints/company-data.js');
let poGenerator = require('./endpoints/purchase-orders.js');

let endpointHits = 0;

// list of permitted generator files, which when invoked will return a valid JSON object
const APIList = {
    "companyData": companyGenerator,
    "purchaseOrderData": poGenerator
};

app.use(cors());

const getEndpointList = () => {
    let returnValue = ''
    Object.keys(APIList).forEach((prop) => {returnValue+='/'+prop+'\n\t'});
    return returnValue;
};

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`CORS-enabled server listening on ${server.address().port}`);
    console.log('There are '+Object.keys(APIList).length+' endpoints available. They are:');
    console.log(getEndpointList());
    
});

app.get('/', (req, res) => {
    res.write(`
    The following endpoints are active, by visiting /api:
        ${getEndpointList()}
    These endpoints have been hit ${endpointHits} times since the last deploy
    `);
    
    res.end();
});

app.get('/api/:endpointName', cors(), (req, res) => {
    console.log(`endpoint requested. ${endpointHits+=1} total hits.`);
    if (req.params && req.params.endpointName) {

        console.log('"'+req.params.endpointName+'" endpoint requested');

        if (APIList[req.params.endpointName]) {
            var data = APIList[req.params.endpointName]();
            res.json(data);
        } else {
            console.log("no matching json file found for "+req.params.endpointName);
            res.status(404).send();
        }

    } else {
        console.log("invalid endpoint requested");
        res.status(400).send({
            message: 'Endpoint name not provided'
        });
    }

})