const Company = require('../models/company')
const Announce = require('../models/announce')
const User = require('../models/user')
const { errorHandler } = require('../helpers/dbErrorHandler')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
exports.company = (req, res) => {
  const { _id } = req.profile;
  Company.findById(_id, { 'hashed_password': 0 })
    .populate('contactedByYou', '_id profession cities languages')
    .exec((error, company) => {
      if (error) {
        return res.json({ error: errorHandler(error) })
      }
      Announce.find({ company: _id }).exec((err, announces) => {
        if (err) {
          return res.json({ error: errorHandler(err) })
        }
        return res.json({ company, announces })
      })
    })

}
exports.updateCompany = (req, res) => {
  const { _id } = req.profile;
  console.log(req.profile)
  Company.findOne({ _id }, { "hashed_password": 0 })
    .exec((err, company) => {
      if (err) {
        return res.json({ err })
      }
      const {
        about,
        website,
        city,
        createdBy,
        workingRemotely,
        profession
      } = req.body
      company.about = about
      company.website = website
      company.city = city
      company.createdBy = createdBy
      company.workingRemotely = workingRemotely
      company.profession = profession
      company.profileComplete = Object.values(req.body).map(value => typeof value === 'object' ? Array.isArray(value) ? !!value.length : !!value.subProfessions.length : !!value).indexOf(false) === -1
      company.save((err, response) => {
        if (err) {
          return res.json({ error: errorHandler(err) })
        }
        return res.json(company)
      });
    })
}
exports.createAnnounce = (req, res) => {
  const { _id } = req.profile
  const {
    city,
    priorityBenefits,
    profession,
    workingRemotely,
    kindOfEmployment
  } = req.body;
  let announce = new Announce();
  announce.city = city
  announce.workingRemotely = workingRemotely
  announce.priorityBenefits = priorityBenefits
  announce.profession = profession
  announce.kindOfEmployment = kindOfEmployment
  announce.company = _id;
  announce.save((err, data) => {
    if (err) {
      return res.json({ err })
    }
    return res.json(data)
  })


}
exports.removeAnnounce = (req, res) => {
  const { _id } = req.profile;
  const { body } = req;
  Announce.findOneAndRemove({ _id: body._id, company: _id }).exec((error, data) => {
    if (error) {
      return res.json({ error: errorHandler(error) })
    }
    return res.json(data)
  })
}
exports.justForYourCompany = (req, res) => {
  const { city, profession, _id } = req.profile;
  User.find(
    {
      published: true,
      cities: city,
      'profession.name': profession.name,
      'profession.subProfessions': { $elemMatch: { name: { $in: profession.subProfessions.map(s => s.name) } } },
      contactRequests: { "$ne": _id }
    },
    { 'hashed_password': 0, name: 0, email: 0, role: 0 })
    .exec((error, users) => {
      if (error) {
        return res.json({ error: errorHandler(error) })
      }
      return res.json(users)
    })
}
exports.sendContactRequest = (req, res) => {
  const { _id, companyName } = req.profile;
  const { _id: userId } = req.body;
  User.findById(userId).exec((error, user) => {
    if (error) {
      return res.json({ error: errorHandler(error) })
    }
    user.contactRequests = [...user.contactRequests, _id]
    user.eventsTracker = [...user.eventsTracker, { eventName: `${companyName} sent contact request` }]
    const { email } = user;
    user.save((err, result) => {
      if (err) {
        return res.json({ error: errorHandler(err) })
      }
      Company.findById(_id).exec((er, company) => {
        if (er) {
          return res.json({ error: errorHandler(er) })
        }
        company.contactedByYou = [...company.contactedByYou, userId]
        company.eventsTracker = [...company.eventsTracker, { eventName: `you sent contact request to ${user.profession.name} user` }]

        company.save((e, result) => {
          if (e) {
            return res.json({ error: errorHandler(e) })
          }
          const emailData = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject: `Contact Request`,
            html: `<h4>${companyName} sent contact request<h4>, login for more information`
          }
          sgMail.send(emailData).then(sent => {
            return res.json({ success: 'success', userId })
          })
        })
      })
    })
  })
}