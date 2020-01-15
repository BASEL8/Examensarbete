
const User = require('../models/user');

exports.users = (req, res) => {
  User.find({}, { "hashed_password": 0, "email": 0 }).exec((err, users) => {
    if (err) {
      return res.status(300).json({ err: 'error' })
    }
    return res.json({ users })
  })
}
exports.user = (req, res) => {
  let { username } = req.params;
  User.findOne({ username }, { "hashed_password": 0, "email": 0 }).exec((err, user) => {
    if (err) {
      return res.status(300).json({ err: 'error' })
    }
    return res.json(user)
  })
}
exports.publish = (req, res) => {
  return res.json('created')
}
exports.updateUser = (req, res) => {
  return res.json('created')
}
exports.deleteMyProfile = (req, res) => {
  return res.json('created')
}
exports.AdminRemoveUser = (req, res) => {
  return res.json('created')
}