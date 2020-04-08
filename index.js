const express = require('express');
const cors = require('cors');
const app = express();

const APIList  = require('./generators');

let apiHits = 0;
let apiStartDate = new Date();

app.use(cors());

const getEndpointList = () => {
    let returnValue = ''
    Object.keys(APIList).forEach((prop) => {returnValue+='/'+prop+'\n\t'});
    return returnValue;
};

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`CORS-enabled server listening on ${server.address().port}`);
});

app.get('/', (req, res) => {
    res.write(`
    The following endpoints are active, by visiting /api:
        ${getEndpointList()}
    These endpoints have been hit ${apiHits} times since the last deploy on ${apiStartDate}
    `);
    
    res.end();
});

app.get('/api/:endpointName', cors(), (req, res) => {

    if (req.params && req.params.endpointName) {

        const generatorRequested = APIList[req.params.endpointName];
        if (generatorRequested && typeof generatorRequested === 'function') {
            endpointHits+=1;
            var data = generatorRequested();
            res.json(data);
            
        } else {
            console.log("no matching json file found for "+req.params.endpointName);
            res.status(404).send();
        }
    } else {
        res.status(400).send({
            message: 'Endpoint name not provided'
        });
    }

})