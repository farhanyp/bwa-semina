const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const categoriesRouter = require("./app/api/v1/categories/router")
const imagesRouter = require("./app/api/v1/images/router")
const talentsRouter = require("./app/api/v1/talents/router")
const eventsRouter = require("./app/api/v1/events/router")
const organizersRouter = require("./app/api/v1/organizers/router")
const autoCMSRouter = require("./app/api/v1/auth/router")
const ordersRouter = require("./app/api/v1/orders/router")
const participantsRouter = require("./app/api/v1/participants/router")
const paymentsRouter = require("./app/api/v1/payments/router")
const db = require('./app/db/index')
const { PORT } = require("./app/config")
const { urlDb } = require("./app/config")
const notFoundMiddleware = require('./app/middlewares/not-found')
const handleErrorMiddleware = require('./app/middlewares/handler-error')
const mongoose = require('mongoose');

const app = express()
const port = PORT || 3000

db.on('error', (err) => {
    console.log('Connection Error: Tidak terhubung ke mongo DB')
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Selamat datang di API Semina"
    })
})

app.use('/api/v1/cms', categoriesRouter)
app.use('/api/v1/cms', imagesRouter)
app.use('/api/v1/cms', talentsRouter)
app.use('/api/v1/cms', eventsRouter)
app.use('/api/v1/cms', organizersRouter)
app.use('/api/v1/cms', autoCMSRouter)
app.use('/api/v1/cms', ordersRouter)
app.use('/api/v1/cms', paymentsRouter)
app.use('/api/v1', participantsRouter)
app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)

db.on('open', () => {
    console.log("Database Terhubung")

    app.listen( port, () => {
        console.log(`listening on port ${port}`)
      })
})