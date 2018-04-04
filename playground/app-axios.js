require('dotenv').config()
const yargs = require('yargs');
const axios = require('axios');
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


axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`)
    .then(response => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }
        console.log('response.data', response.data);
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        return axios.get(`https://api.darksky.net/forecast/${process.env.FORECAST_SECRET}/${lat},${lng}?units=si`)
    })
    .then(weatherResult => {
        console.log(`Currently it's ${weatherResult.data.currently.temperature}°C, but it feels like ${weatherResult.data.currently.apparentTemperature}°C`);
    })
    .catch(e => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }        
    });