
const User = require('../models/user');
const Profession = require('../models/profession')
const Company = require('../models/company')
const { errorHandler } = require('../helpers/dbErrorHandler')
exports.users = (req, res) => {
  User.find({ published: true }, { "hashed_password": 0, "email": 0, "name": 0, username: 0 }).exec((err, users) => {
    if (err) {
      return res.status(300).json({ err: 'error' })
    }
    return res.json({ users })
  })
}
exports.user = (req, res) => {
  let { _id } = req.profile;
  User.findOne({ _id }, { "hashed_password": 0 })
    .populate('contactRequests', '_id companyName profession city')
    .exec((err, user) => {
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
      user.about = about.toLowerCase()
      user.wantToWorkAs = wantToWorkAs.toLowerCase()
      user.cities = cities.map(city => city.toLowerCase())
      user.kindOfEmployment = kindOfEmployment.toLowerCase()
      user.salary = salary
      user.languages = languages.map(lang => lang.toLowerCase())
      user.lookingForJob = lookingForJob.toLowerCase()
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
exports.companyJustForYou = (req, res) => {
  const { cities, profession, _id } = req.profile;
  Company.find(
    {
      city: { "$in": cities },
      'profession.name': profession.name,
      'profession.subProfessions': { $elemMatch: { name: { $in: profession.subProfessions.map(s => s.name) } } },
      contactedByYou: { "$ne": _id }
    },
    {
      'hashed_password': 0,
      email: 0,
      role: 0,
      profileComplete: 0,
      createdBy: 0
    })
    .exec((error, company) => {
      if (error) {
        return res.json({ error: errorHandler(error) })
      }
      company.contactedByYou = undefined
      return res.json(company)
    })
}
exports.rejectRequest = (req, res) => {
  const { contactRequestId } = req.body
  const { _id } = req.profile;
  User.findById(_id).exec((error, user) => {
    if (error) {
      return res.json({ error: errorHandler(error) })
    }
    Company.findById(contactRequestId).exec((erro, company) => {
      if (erro) {
        return res.json({ error: errorHandler(erro) })
      }
      company.contactedByYou = company.contactedByYou.filter(contacted => contacted.toString() !== _id.toString())
      company.eventsTracker = [...company.eventsTracker, { eventName: `user reject yor contact request` }]

      company.save((er, companyResult) => {
        if (er) {
          return res.json({ error: errorHandler(er) })
        }
        user.eventsTracker = [...user.eventsTracker, { eventName: `you rejected request from ${company.companyName}` }]
        user.contactRequests = user.contactRequests.filter(contact => contact.toString() !== contactRequestId)
        user.save((err, result) => {
          if (err) {
            return res.json({ error: errorHandler(err) })
          }
          return res.json(result)
        })
      })
    })
  })
}
exports.AdminRemoveUser = (req, res) => {
  return res.json('created')
}