const Images = require("../../api/v1/images/model")


const generateUrlImage = async (req) => {
    const result = `uploads/${req.file.filename}`
}

const createImages = async (req) => {
    const result = await Images.create({
        name: req.files ?
        `uploads/${req.file.filename}`:
        'uploads/avatar/default.jpg'
    })

    return result
}

module.exports = {
    createImages,
    generateUrlImage
}