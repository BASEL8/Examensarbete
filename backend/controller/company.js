const Company = require('../models/company')
const Announce = require('../models/announce')
exports.company = (req, res) => {
  return res.json({ created: 'done' })
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
        createdBy
      } = req.body
      company.companyName = companyName
      company.organisationNumber = organisationNumber
      company.about = about
      company.website = website
      company.city = city
      company.createdBy = createdBy
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
  // let arrayOfCategories = categories && categories.split(',')
  // let arrayOfTags = tags && tags.split(',')
  announce.save((err, data) => {
    if (err) {
      return res.json({ err })
    }
    return res.json(data)
  })


}