var express = require('express')
var app = express()
var routes = require("./route/routes")
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var escrowRoutes = require("./route/escrow/escrowRoutes")

var constants = require('./constants')

mongoose.connect(constants.BASE_URL,
    {
        // useMongoClient: true
    })

app.use(bodyParser.json())

routes(app)
escrowRoutes(app)

app.use((err, req, res, next) => {

    console.log(err.message)

    res.send(err.message)
    next()
})


module.exports = app