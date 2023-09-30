const express = require("express")
const { create, index, find, update, destroy } = require("./controller")
const router = express()

router.get('/events', index)

router.post ("/events", create)

router.get('/events/:id', find)

router.put('/events/:id', update)

router.delete('/events/:id', destroy)

module.exports = router
