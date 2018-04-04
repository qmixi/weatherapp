require('dotenv').config()
const yargs = require('yargs');
const request = require('request');
const geocode = require('../geocode/geocode');
const weather = require('../weather/weather');
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
        weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResult) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`Currently it's ${weatherResult.currently.temperature}°C, but it feels like ${weatherResult.currently.apparentTemperature}°C`);
            }
        });
    }
});