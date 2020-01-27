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
    .populate('acceptedYourRequest', '_id profession cities languages email name')
    .populate('wantToContactYou', '_id profession cities languages email name')
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
      //   'profession.subProfessions': { $elemMatch: { name: { $in: profession.subProfessions.map(s => s.name) } } },
      contactRequests: { "$ne": _id },
      acceptedByYou: { "$ne": _id },
      contactedByYou: { "$ne": _id }
    },
    {
      'hashed_password': 0,
      name: 0,
      email: 0,
      role: 0,
      contactRequests: 0,
      acceptedByYou: 0,
      eventsTracker: 0
    })
    .exec((error, users) => {
      if (error) {
        return res.json({ error: errorHandler(error) })
      }
      return res.json(users)
    })
}
exports.declinedUser = (req, res) => {
  const { _id, companyName } = req.profile;
  const { userId } = req.body;
  User.findById(userId).exec((err, user) => {
    if (err) {
      return res.json({ error: errorHandler(err) })
    }
    user.acceptedByYou = user.acceptedByYou.filter(contact => contact.toString() !== _id.toString())
    user.eventsTracker = [...user.eventsTracker, { eventName: `${companyName} will not continue with the proses` }]
    user.save((erro, result) => {
      if (erro) {
        return res.json({ error: errorHandler(erro) })
      }
      Company.findById(_id).exec((error, company) => {
        if (error) {
          return res.json({ error: errorHandler(error) })
        }
        company.eventsTracker = [...company.eventsTracker, { eventName: `you chose not to continue with ${user.name}` }]
        company.acceptedYourRequest = company.acceptedYourRequest.filter(contact => contact.toString() !== userId.toString())
        company.save((er, resultCompany) => {
          if (er) {
            return res.json({ error: errorHandler(er) })
          }
          return res.json({ success: 'success' })
        })
      })
    })
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
            html: `<h4> ${companyName} sent contact request </h4>, <p>login for more information</p>`
          }
          sgMail.send(emailData).then(sent => {
            return res.json({ success: 'success', userId })
          })
        })
      })
    })
  })
}
exports.declineContactRequestFromUser = (req, res) => {
  const { _id } = req.profile
  const { userId } = req.body;
  User.findById(userId).exec((error, user) => {
    if (error) {
      return res.json({ error: errorHandler(error) })
    }
    Company.findById(_id).exec((erro, company) => {
      if (erro) {
        return res.json({ error: errorHandler(erro) })
      }
      company.wantToContactYou = company.wantToContactYou.filter(contacted => contacted.toString() !== userId.toString())
      company.eventsTracker = [...company.eventsTracker, { eventName: `you rejected request from ${user.profession.name}` }]

      company.save((er, companyResult) => {
        if (er) {
          return res.json({ error: errorHandler(er) })
        }
        user.eventsTracker = [...user.eventsTracker, { eventName: `${company.companyName} rejected request from you` }]
        user.contactedByYou = user.contactedByYou.filter(contact => contact.toString() !== _id.toString())
        user.save((err, result) => {
          if (err) {
            return res.json({ error: errorHandler(err) })
          }
          return res.json({ success: 'success' })
        })
      })
    })
  })
}
exports.acceptContactRequestFromUser = (req, res) => {
  return res.json('you')

}
exports.cancelContactUser = (req, res) => {
  const { _id } = req.profile;
  const { userId } = req.body;
  Company.findById(_id).exec((error, company) => {
    if (error) {
      return res.json({ error: errorHandler(error) })
    }
    company.contactedByYou = company.contactedByYou.filter(contacted => contacted.toString() !== userId)
    company.eventsTracker = [...company.eventsTracker, { eventName: `you canceled your request` }]
    company.save((erro, result) => {
      if (erro) {
        return res.json({ error: errorHandler(erro) })
      }
      User.findById(userId).exec((err, user) => {
        if (err) {
          return res.json({ error: errorHandler(err) })
        }
        const { email } = user
        user.contactRequests = user.contactRequests.filter(contact => contact.toString() !== _id.toString())
        user.eventsTracker = [...user.eventsTracker, {
          eventName: `${company.companyName} canceled the request!`
        }]
        user.save((er, resultUser) => {
          if (er) {
            return res.json({ error: errorHandler(er) })
          }
          const emailData = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject: `${company.companyName} canceled Contact Request`,
            html: `<h4> ${company.companyName} canceled contact request </h4>`
          }
          sgMail.send(emailData).then(sent => {
            return res.json({
              success: 'success'
            })
          })
        })
      })
    })
  })
}