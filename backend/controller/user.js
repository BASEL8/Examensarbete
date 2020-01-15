
const User = require('../models/user');
exports.users = (req, res) => {
  User.find({ published: true }, { "hashed_password": 0, "email": 0, "name": 0, username: 0 }).exec((err, users) => {
    if (err) {
      return res.status(300).json({ err: 'error' })
    }
    return res.json({ users })
  })
}
exports.user = (req, res) => {
  let { _id } = req.params;
  User.findOne({ _id }, { "hashed_password": 0, "email": 0, 'name': 0, username: 0 }).exec((err, user) => {
    if (err) {
      return res.status(300).json({ err: 'error' })
    }
    return res.json(user)
  })
}
exports.publish = (req, res) => {
  const { _id } = req.body;
  User.findOne({ _id }, { "hashed_password": 0, "email": 0, "name": 0, username: 0 }).exec((err, user) => {
    if (err) {
      return res.status(300).json({ err: 'error' })
    }
    if (!user) {
      return res.status(300).json({ err: 'no user with this name' })
    }
    user.published = true;
    user.save((saveErr, saveRes) => {
      if (saveErr) {
        return res.status(300).json({ err: saveErr })
      }
      return res.json(user)
    })
  })
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