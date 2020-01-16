
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
  const { _id, published } = req.body;
  User.findOne({ _id }, { "hashed_password": 0, "email": 0, "name": 0, username: 0 }).exec((err, user) => {
    if (err) {
      return res.status(300).json({ err: 'error' })
    }
    if (!user) {
      return res.status(300).json({ err: 'no user with this name' })
    }
    user.published = published;
    user.save((saveErr, saveRes) => {
      if (saveErr) {
        return res.status(300).json({ err: saveErr })
      }
      return res.json(user)
    })
  })
}
exports.updateUser = (req, res) => {
  const { _id, ...data } = req.body
  console.log(data)
  User.findOne({ _id }, { "hashed_password": 0, 'name': 0, username: 0 }).exec((err, user) => {
    if (err) {
      return res.json({ err })
    }
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        user[key] = data[key]
      }
    }
    user.save((err, response) => {
      if (err) {
        return res.json(err)
      }
      return res.json(user)
    });
  })
}
exports.deleteMyProfile = (req, res) => {
  return res.json('created')
}
exports.AdminRemoveUser = (req, res) => {
  return res.json('created')
}