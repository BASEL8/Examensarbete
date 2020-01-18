const mongoose = require('mongoose');

const SubProfession = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  years: {
    type: Number,
  },
  relatedId: {
    type: String,
    required: true
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
  relatedId: {
    type: String,
    required: true
  },
  salt: String,
  years: {
    type: Number,
  },
  subProfessions: {
    type: [SubProfession],
    default: undefined
  }
}, { timestamps: true })

module.exports = mongoose.model('Profession', professionSchema);
exports.testSchema = professionSchema;