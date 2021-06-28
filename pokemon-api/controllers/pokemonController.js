const url = require('whatwg-url');
const { pokemonService } = require('../services');

exports.handleGetRequest = (req, res) => {
    
    const querystringParam = new URL(req.headers.host + req.url).search;
    const nameParam =  new URLSearchParams(querystringParam);
    const name = nameParam.get('name');

    const result = pokemonService.get(name);
    let statusCode = 200;

    if (!result.success) {
        statusCode = 400;
    }

    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(result));
    res.end();

};

exports.handlePostRequest = (req, res) => {
    const data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
    });

    req.on('end', () => {
        const parsedData = Buffer.concat(data).toString();
        const dataJson = JSON.parse(parsedData);

        const result = pokemonService.insert(dataJson);
        let statusCode = 200;

        if (!result.success) {
           statusCode = 400;
        }

        res.writeHead(statusCode, {
            'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(result));
        res.end();
    });
};

exports.handleDeleteRequest = (req, res) => {

    const querystringParam = new URL(req.headers.host + req.url).search;
    const nameParam =  new URLSearchParams(querystringParam);
    const name = nameParam.get('name');

    const result = pokemonService.delete(name);
    let statusCode = 200;

    if (!result.success) {
       statusCode = 400;
    }

    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(result));
    res.end();
};

exports.handlePutRequest = (req, res) => {
    const data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
    });

    req.on('end', () => {
        const querystringParam = new URL(req.headers.host + req.url).search;
        const nameParam =  new URLSearchParams(querystringParam);
        const name = nameParam.get('name');

        const parsedData = Buffer.concat(data).toString();
        const dataJson = JSON.parse(parsedData);

        const result = pokemonService.update(name, dataJson);
        let statusCode = 200;

        if (!result.success) {
           statusCode = 400;
        }

        res.writeHead(statusCode, {
            'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(result));
        res.end();
    });
};


