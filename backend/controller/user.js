
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
  User.findOne({ _id }, { "hashed_password": 0 }).exec((err, user) => {
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
  const { _id } = req.profile;
  User.findOne({ _id }, { "hashed_password": 0 })
    .exec((err, user) => {
      if (err) {
        return res.json({ err })
      }
      const { about,
        wantToWorkAs,
        cities,
        kindOfEmployment,
        salary,
        languages,
        lookingForJob,
        available,
        reasonToNewJob,
        workingRemotely,
        priorityBenefits,
        profession } = req.body
      user.about = about
      user.wantToWorkAs = wantToWorkAs
      user.cities = cities
      user.kindOfEmployment = kindOfEmployment
      user.salary = salary
      user.languages = languages
      user.lookingForJob = lookingForJob
      user.available = available
      user.reasonToNewJob = reasonToNewJob
      user.workingRemotely = workingRemotely
      user.priorityBenefits = priorityBenefits
      const newProfession = new Profession({ ...profession })
      user.profession = newProfession;
      user.profileComplete = Object.values(req.body).map(value => typeof value === 'object' ? Array.isArray(value) ? !!value.length : !!value.subProfessions.length : !!value).indexOf(false) === -1
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