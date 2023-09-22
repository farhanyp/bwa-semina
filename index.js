const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const categoriesRouter = require("./app/api/v1/categories/router")

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello"
    })
})

app.use('/api/v1/cms', categoriesRouter)

app.listen(3000, () => {
    console.log("Example app listening on port 3000")
  })