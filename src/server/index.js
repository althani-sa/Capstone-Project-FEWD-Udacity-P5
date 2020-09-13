// TODO: Refactor code using JS guidelines @Udacity -- Complete!
require('dotenv').config();
let tripInfo = {} // create an empty js object to act as an endpoint for routes

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const request = require('postman-request')
app.use(cors())

app.use(express.static('dist'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', function (request, response) {
    response.send('dist/index.html')
})
app.get('/all', (request, response) => {

            console.log(tripInfo) // test
            response.send(tripInfo)
})
app.post('/all', (request, response) => {
    tripInfo = request.body
    // console.log(request.body)
    response.status(200).json({
        message: 'success'
    })
})
const port =  process.env.PORT || 1412
app.listen(port, function () {
    console.log('Example app listening on port 1412!')
})
module.exports = { app };