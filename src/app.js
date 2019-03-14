const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('../public/utils/forecast')
const geocode = require('../public/utils/geocode')

// Create express application
const app = express()

// Define paths for Express config 
const publicDirectoryName = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryName))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        message: 'Use this site to get Weather reports!',
        creator: 'Ajeet Eppakayala'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        creator: 'Ajeet Eppakayala'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        descp: 'Some helpful texts here.',
        creator: 'Ajeet Eppakayala'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    let address = req.query.address
    
    geocode(address, (error, { lat, long, placeName } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecastData,
                location: placeName,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404: Page Not Found',
        errorMessage: 'Help article not found.',
        creator: 'Ajeet Eppakayala'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404: Page Not Found',
        errorMessage: 'Page not found.',
        creator: 'Ajeet Eppakayala'
    })
})

app.listen(3000, () => {
    console.log('Listening server on port 3000...')
})