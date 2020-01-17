const mongoose = require('mongoose');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    index: true,
    lowercase: true
  },
  organisationNumber: {
    type: Number,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  website: {
    type: String,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  about: {
    type: String
  },
  role: {
    type: Number,
    default: 0
  },
  resetPassword: {
    data: String,
    default: ''
  },
  logo: {
    data: Buffer,
    contentType: String
  },

}, { timestamps: true })


companySchema.virtual('password')
  .set(function (password) {
    //create a temporary variable called hashed_password
    this._password = password

    //generate salt

    this.salt = this.makeSalt()
    //encryptPassword

    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () { return this._password })

companySchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  }
}

module.exports = mongoose.model('Company', companySchema);