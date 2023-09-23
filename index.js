const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const categoriesRouter = require("./app/api/v1/categories/router")
const db = require('./app/db/index')
const { PORT } = require("./app/config")

const app = express()
const port = PORT || 3000
db.on('error', (err) => {
    console.log('Connection Error: Tidak terhubung ke mongo DB')
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "ini Index"
    })
})

app.use('/api/v1/cms', categoriesRouter)

db.on('open', () => {
    console.log("Database Terhubung")

    app.listen( port, () => {
        console.log(`listening on port ${port}`)
      })
})