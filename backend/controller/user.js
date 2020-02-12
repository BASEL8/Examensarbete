
const User = require('../models/user');
const Profession = require('../models/profession')
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
  User.findOne({ _id }, { "hashed_password": 0, 'name': 0, username: 0 })
    .exec((err, user) => {
      if (err) {
        return res.json({ err })
      }
      for (const key in data) {
        if (data.hasOwnProperty(key) && key !== 'profession') {
          user[key] = data[key]

        }
        if (data.hasOwnProperty(key) && key === 'profession') {
          const newProfession = new Profession({ ...data['profession'] })
          user.profession = newProfession;
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
exports.listUsers = (req, res) => {
  const { _id } = req.body
  User.find({
    published: true,
    $or:
      [
        { 'profession.relatedId': _id },
        { 'profession.subProfessions.relatedId': _id }
      ]
  }, { "hashed_password": 0, "email": 0, "name": 0, username: 0 })
    .exec((err, users) => {
      if (err) {
        return res.json({ err })
      }
      return res.json({ users })
    })

}
exports.deleteMyProfile = (req, res) => {
  return res.json('created')
}
exports.AdminRemoveUser = (req, res) => {
  return res.json('created')
}