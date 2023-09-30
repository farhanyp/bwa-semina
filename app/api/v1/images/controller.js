const Categories = require("./model")
const { getAllCategories, createCategories, getOneCategories, updateCategories, deleteCategories } = require('../../../services/mongoosee/categories')
const { StatusCodes } = require("http-status-codes")
const { createImages } = require("../../../services/mongoosee/images")

const create = async(req, res, next) => {
    try {
        console.log(req.file)
        const result = await createImages(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

module.exports ={
    create
}