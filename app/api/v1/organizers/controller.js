const Categories = require("./model")
const { createCMSOrganizer, createCMSUser, getAllUsers } = require('../../../services/mongoosee/users')
const { StatusCodes } = require("http-status-codes")

const getUsers = async(req, res, next) => {
    try {
        const result = await getAllUsers(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const createOrganizer = async(req, res, next) => {
    try {
        const result = await createCMSOrganizer(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const createUser = async(req, res, next) => {
    try {
        const result = await createCMSUser(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

module.exports ={
    createOrganizer,
    createUser,
    getUsers
}