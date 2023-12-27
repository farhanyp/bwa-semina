const { signin } = require('../../../services/mongoosee/auth')
const { StatusCodes } = require('http-status-codes')

const signinCms = async (req, res, next) => {
    try {
        const result = await signin(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports= {signinCms}