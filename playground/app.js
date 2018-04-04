require('dotenv').config();
const yargs = require('yargs');
const request = require('request');
const geocode = require('../geocode/geocode.js');
const argv = yargs
    .options({
        a: {
            demand: 'true',
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .argv;

const address = argv.address;    
geocode.geocodeAddress(address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(result, undefined, 2));
    }
});

request({
    url: `https://api.darksky.net/forecast/${process.env.FORECAST_SECRET}/37.8267,-122.4233`,
    json: true
}, (error, request, body) => {
    if (error) {
        console.log('Unable to connect to Forecast.io server')
    }
    console.log('Temperature', body.currently.temperature);
})