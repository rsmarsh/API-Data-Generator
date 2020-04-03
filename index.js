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

const server = app.listen(3001, () => {
    console.log(`CORS-enabled server listening on ${server.address().port}`);
    console.log('There are '+Object.keys(APIList).length+' endpoints available. They are:');
    Object.keys(APIList).forEach((prop) => {console.log(prop)});
});


app.get('/endpoints/:endpointName', cors(), (req, res) => {
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