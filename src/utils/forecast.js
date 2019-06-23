const request = require('request');

const forecast = (address1, address2, callback) => {
    const url = 'https://api.darksky.net/forecast/59d1e62ea2bf3642a292e506b15400d6/'+address1+','+address2

    request({url: url, json: true}, (error, {body})=>{
        // console.log(error)
        // console.log(response);
        // const data = JSON.parse(response.body);
        // // console.log(data);
        // console.log(data.currently);
        //console.log(response.body.currently)
        if (error)
        {
            callback('Unable to connect to weather service', undefined);
        }
        else if (body.error)
        {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. There is a ${body.currently.precipProbability}% chance of rain`);
        }
    })
}

module.exports = forecast