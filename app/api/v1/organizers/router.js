const express = require("express")
const { createOrganizer, createUser, getUsers } = require("./controller")
const router = express()
const { authenticateUser, authorizeRoles} = require('../../../middlewares/auth')

router.post ("/organizers", authenticateUser, authorizeRoles('owner'), createOrganizer)
router.post ("/users", authenticateUser, authorizeRoles('organizer'), createUser)
router.get("/users", authenticateUser, authorizeRoles("owner"), getUsers)

module.exports = router
