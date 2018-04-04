const request = require('request');
const getWeather = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        console.log('latitude, longitude', `https://api.darksky.net/forecast/${process.env.FORECAST_SECRET}/${latitude},${longitude}`);
        request({
            url: `https://api.darksky.net/forecast/${process.env.FORECAST_SECRET}/${latitude},${longitude}?units=si`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Forecast.io server.');
            } else if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject('Unable to fetch weather.');
            }
            
        })
    });    
}

module.exports = {
    getWeather
}