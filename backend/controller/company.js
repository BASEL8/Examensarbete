const Company = require('../models/company')
const Announce = require('../models/announce')
const { errorHandler } = require('../helpers/dbErrorHandler')
exports.company = (req, res) => {
  const { _id } = req.profile;
  console.log(_id)
  Company.findById(_id, { 'hashed_password': 0 }).exec((error, company) => {
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
  Company.findOne({ _id }, { "hashed_password": 0 })
    .exec((err, company) => {
      if (err) {
        return res.json({ err })
      }
      const {
        companyName,
        organisationNumber,
        about,
        website,
        city,
        createdBy,
        workingRemotely,
        profession
      } = req.body
      company.companyName = companyName
      company.organisationNumber = organisationNumber
      company.about = about
      company.website = website
      company.city = city
      company.createdBy = createdBy
      company.workingRemotely = workingRemotely
      company.profession = profession

      company.profileComplete = Object.values(req.body).map(value => typeof value === 'object' ? Array.isArray(value) ? !!value.length : !!value.subProfessions.length : !!value).indexOf(false) === -1
      company.save((err, response) => {
        if (err) {
          return res.json(err)
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
  console.log(_id, body)
  Announce.findOneAndRemove({ _id: body._id, company: _id }).exec((err, data) => {
    if (err) {
      return res.json({ error: errorHandler(err) })
    }
    return res.json(data)
  })
}