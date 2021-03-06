const request = require('request')

const forecast = (lat, long, callback) => {
    url = "https://api.darksky.net/forecast/a364c2b4387445cee18ea988918ffd1b/" + lat + "," + long + "?units=si"
    request({ url, json: true }, (error, { body } = {}) => {

        const { currently } = body

        if (error) {
            callback('Unable to connect to the forecast service')
        } else if (body.error) {
            callback(body.error + 'Lattitude:' + lat + ',' + 'Longitude' + long)
        } else if (currently) {
            const { temperature, precipProbability, summary } = body.currently
            const { temperatureHigh, temperatureLow } = body.daily.data[0]
            callback(undefined, {
                forecastData: `${summary}. Temperature: ${temperature} degrees with ${precipProbability}% chances of rain.`,
                temperatureMin: temperatureLow,
                temperatureMax: temperatureHigh
            })
        } else {
            callback('Plz, check the link')
        }
    })
}

module.exports = forecast;