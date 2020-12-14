// load libraries
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mysql = require('mysql2/promise')
const secure = require('secure-env')
const bodyParser = require('body-parser')

// import mongo db driver
const MongoClient = require('mongodb').MongoClient

// connection string
const MONGO_USER = process.env.MONGO_USER
const MONGO_DB = process.env.MONGO_DB
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_URL = 'mongodb://localhost:27017'
// const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}>@cluster0.r2tvd.mongodb.net/${MONGO_DB}>?retryWrites=true&w=majority`

// create mongo pool
const mongo = new MongoClient(MONGO_URL,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
)

const app = express()

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// use cors headers
app.use(cors())

// log using morgan
app.use(morgan('combined'))

// GET /countries
app.get('/country', async (req, resp) => {
    try {
        const results = await mongo.db('wine')
            .collection('mywine')
            .distinct("country")
        // results.reverse()
        resp.status(200)
        resp.type('application/json')
        resp.send(results)
    } catch (e) {
        resp.status(500)
        resp.type('application/json')
        resp.send({"Error": e})    
    }
})

// GET /country/:country
app.get('/country/:country', async (req, resp) => {
    const country = req.params.country;
    console.info(country)
    try {
        const results = await mongo.db('wine')
            .collection('mywine')
            .find({
                country: {$regex: country, $options: 'i'}})
                .sort({province: 1})
                .limit(5)
                .project({
                    title: 1, 
                    price: 1 })
                .toArray()
        resp.status(200)
        resp.type('application/json')
        resp.send(results)
    } catch (e) {
        resp.status(500)
        resp.type('application/json')
        resp.send({"Error": e})
    }
})

mongo.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.info(`Application is listening PORT ${PORT} on ${new Date()}`)
        })
    })
    .catch(e => {
        console.info("Error connecting to mongodb ", e)
    })
