const mongoose = require('mongoose');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema
const { testSchema } = require('./profession')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    max: 32,
    unique: true,
    index: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  profile: {
    type: String,
    required: true
  },
  profileComplete: {
    type: Boolean,
    default: false
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
  published: {
    type: Boolean,
    default: false
  },
  wantToWorkAs: {
    type: String
  },
  cities: {
    type: [],
    default: undefined
  },
  kindOfEmployment: {
    type: String
  },
  salary: {
    type: String
  },
  languages: {
    type: [],
    default: undefined
  },
  lookingForJob: {
    type: String
  },
  available: {
    type: String
  },
  reasonToNewJob: {
    type: String
  },
  workingRemotely: {
    type: String
  },
  priorityBenefits: {
    type: [],
    default: undefined
  },
  profession: {
    type: { testSchema },
  },
}, { timestamps: true })


userSchema.virtual('password')
  .set(function (password) {
    //create a temporary variable called hashed_password
    this._password = password

    //generate salt

    this.salt = this.makeSalt()
    //encryptPassword

    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () { return this._password })

userSchema.methods = {
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

module.exports = mongoose.model('User', userSchema);