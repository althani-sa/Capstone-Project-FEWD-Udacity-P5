// TODO: Refactor code using JS guidelines @Udacity
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')



app.use(cors())

app.use(express.static('dist'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send('dist/index.html')
})

app.listen(1412, function () {
    console.log('Example app listening on port 1412!')
})