const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema
const announceSchema = new mongoose.Schema({
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
  profession: { type: ObjectId, ref: 'Profession', require: true },
  company: [{ type: ObjectId, ref: 'Company', require: true }],
}, { timestamps: true })
module.exports = mongoose.model('Announce', announceSchema);