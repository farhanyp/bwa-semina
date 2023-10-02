const Categories = require("./model")
const { createOrganizer } = require('../../../services/mongoosee/users')
const { StatusCodes } = require("http-status-codes")

const create = async(req, res, next) => {
    try {
        const result = await createOrganizer(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

module.exports ={
    create,
}