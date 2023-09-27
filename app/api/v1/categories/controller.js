const Categories = require("./model")
const { getAllCategories, createCategories } = require('../../../services/mongoosee/categories')

const create = async(req, res, next) => {
    try {
        const result = await createCategories(req)

        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const index = async(req, res, next) => {
    try {
        const result = await getAllCategories()

        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const find = async(req, res, next) => {
    try {
        const { id } = req.params
        const result = await Categories.findOne({ _id: id})

        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const update = async(req, res, next) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const result = await Categories.findOneAndUpdate({
            _id: id
        },
        { name },
        {
            new: true,
            runValidators: true
        }
        )

        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async(req, res, next) => {
    try {
        const { id } = req.params
        const result = await Categories.findByIdAndRemove(id)

        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

module.exports ={
    create,
    index,
    find,
    update,
    destroy
}