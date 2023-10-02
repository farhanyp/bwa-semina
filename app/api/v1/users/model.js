const mongoose = require('mongoose')
const { model, Schema } = mongoose
const bcrypt = require('bcryptjs')

let userSchema = Schema (
    {
        name: {
            type: String,
            required: [true, 'Penyelenggara harus diisi'],
            minlength: 3,
            maxlength: 50
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email harus diisi']
        },
        password: {
            type: String,
            unique: true,
            required: [true, 'Password harus diisi']
        },
        role: {
            type: String,
            enum: ['admin','organizer', 'owner'],
            default: 'admin'
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true
        }
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next){
    const User = this
    if(User.isModified('password')){
        User.password = await bcrypt.hash(User.password, 12)
    }
})

userSchema.methods.comparePassword = async function(canditatePassword){
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = model('Users', userSchema)