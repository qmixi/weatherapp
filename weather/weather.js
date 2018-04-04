const request = require('request');
const getWeather = (latitude, longitude, callback) => {
    console.log('latitude, longitude', `https://api.darksky.net/forecast/${process.env.FORECAST_SECRET}/${latitude},${longitude}`);
    request({
        url: `https://api.darksky.net/forecast/${process.env.FORECAST_SECRET}/${latitude},${longitude}?units=si`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io server.');
        } else if (!error && response.statusCode === 200) {
            callback(undefined, body);
        } else {
            callback('Unable to fetch weather.');
        }
        
    })
}

module.exports = {
    getWeather
}