const mongoose = require('mongoose');

const SubProfession = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  years: {
    type: Number,
    default: '0'
  }
});
const professionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
    unique: true,
    index: true,
    lowercase: true
  },
  salt: String,
  about: {
    type: String
  },
  years: {
    type: Number,
    default: '0'
  },
  SubProfession: {
    type: [SubProfession],
    default: undefined
  }
}, { timestamps: true })

module.exports = mongoose.model('Profession', professionSchema);