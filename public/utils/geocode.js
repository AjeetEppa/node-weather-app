const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?types=poi&access_token=pk.eyJ1IjoiYWplZXRlcHBhIiwiYSI6ImNqc3ZuOGJlbjA2M3Q0NHFwbzlldDA5MzgifQ.X-FX489l_4KH_sJzSrsDOw";

    request({ url, json: true }, (error, {body} = {}) => {

        if (error) {
            callback('Unable to connect to the Weather Service')
        } else if (body.message) {
            callback('Please check your query',{})
        } else if (body.features.length === 0) {
            callback('Unable to find location,Plz try another search')
        } else {
            const { center, place_name:placeName } = body.features[0]
            callback(undefined, {
                lat: center[1],
                long: center[0],
                placeName
            })
        }
    })
}

module.exports = geocode;