const Users = require('../../api/v1/users/model')
const Organizers = require('../../api/v1/organizers/model')
const { BadRequestError } = require('../../errors')

const createCMSOrganizer = async (req) => {
    const { organizer, email, password, role, confirmPassword, name } = req.body

    if( password !== confirmPassword){
        throw new BadRequestError('Password and confirmPassword tidak cocok')
    }

    const result = await Organizers.create({ organizer })

    const users = await Users.create({
        email,
        name,
        password,
        organizer: result._id,
        role
    })

    delete users._doc.password

    return users
}

const createCMSUser = async (req) => {
    const { email, password, role, confirmPassword, name } = req.body

    if( password !== confirmPassword){
        throw new BadRequestError('Password and confirmPassword tidak cocok')
    }

    const users = await Users.create({
        email,
        name,
        password,
        organizer: req.user.organizer,
        role
    })

    delete users._doc.password

    return users
}

const getAllUsers = async (req) => {
    const result = await Users.find();

    return result
}

module.exports = {
    createCMSOrganizer,
    createCMSUser,
    getAllUsers
}