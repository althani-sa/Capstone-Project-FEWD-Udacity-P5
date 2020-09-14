// TODO: Refactor code using JS guidelines @Udacity -- Complete!
require('dotenv').config();

let tripInfo = [] // create an empty js object to act as an endpoint for routes

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const request = require('postman-request')
app.use(cors())

app.use(express.static('dist'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.get('/', function(request, response) {
    response.send('dist/index.html')
})
app.get('/all', (request, response) => {
    response.send(tripInfo)
    console.log("Hello?")
})
app.post('/all', (request, response) => {
    frontData = {
        pixabay: request.body.pixabay,
        geonames: request.body.geonames,
        city: request.body.city,
        weatherbit: request.body.weatherbit,
        moment: request.body.checkDate
    }
    // testing the above.
    response.status(200).json({
        message: 'success'
    })
    tripInfo.push(frontData)
    response.send(tripInfo)
    console.log(tripInfo)
})
const port = 1412;
const serverIsRunning = () => {
    console.log('Example app listening on port 1412!')
}

const server = app.listen(port, serverIsRunning)

module.exports = app
console.log("Server is running.")