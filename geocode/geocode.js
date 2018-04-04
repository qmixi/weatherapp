const request = require('request');
const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
            json: true
        }, (error, response, body) => {
            console.log('error', error);
            if (error) {
                reject('Unable to connect to google servers');        
            } else if(body.status === 'ZERO RESULTS') {
                reject('Unable to find that address');
            } else if(body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng,
                });
            } else {
                reject('another problem');
            }
        
        });
    });    
}

module.exports = {
    geocodeAddress
};