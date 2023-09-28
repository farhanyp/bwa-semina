const Images = require('../../api/v1/images/model')
const { checkingImage } = require('./images')
const { NotFoundError, BadRequestError } = require('../../errors')
const Talent = require('../../api/v1/talents/model')

const getAllTalents = async (req) => {
    const { keyword } = req.query

    let condition = {}

    if(keyword){
        condition = { ...condition, name: { $regex: keyword, $options: 'i'}}
    }

    const result = await Talent.find(condition)
    .populate({
        path: 'image',
        select: '_id name'
    })
    .select('_id name role image')

    return result
}

const getOneTalent = async (req) => {
    const { id } = req.params

    const result = await Talent.findOne({ _id: id})
    .populate({
        path: 'image',
        select: '_id name'
    })
    .select('_id name role image')

    if(!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`)

    return result
}

const createTalent = async (req) => {
    const { name, role, image } = req.body

    await checkingImage(image)

    const check = await Talent.findOne({ name })

    if(check) throw new BadRequestError('pembicara nama duplikat')

    const result = await Talent.create({ name, image, role})

    return result
}

const updateTalents = async (req) => {
    const { id } = req.params
    const { name, image, role} = req.body

    await checkingImage(image)

    const check = await Talent.findOne({
        name,
        _id: { $ne: id }
    })

    if(check) throw new BadRequestError('Pembicara nama duplikat')

    const result = await Talent.findOneAndUpdate(
        { _id: id},
        { name, image, role},
        { new: true, runValidators: true }
    )

    if(!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`)

    return result
}

const deleteTalents = async (req) => {
    const { id } = req.params

    const result = await Talent.findOneAndDelete({
        _id: id
    })

    if(!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`)

    return result
}


module.exports = {
    createTalent,
    getAllTalents,
    getOneTalent,
    updateTalents,
    deleteTalents
}

