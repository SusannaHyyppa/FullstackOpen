const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true

    },
    passwordHash: String,
    name: String, 
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ] 
  })


userSchema.set('toJSON', {
  transform: (document, retObj) => {
      retObj.id = retObj._id.toString(),
      delete retObj.__v
      delete retObj._id
      delete retObj.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)