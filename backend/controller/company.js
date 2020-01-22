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
        website
      } = req.body
      company.companyName = companyName
      company.organisationNumber = organisationNumber
      company.about = about
      company.website = website
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
  const { wantToWorkAs,
    cities,
    salary,
    lookingForJob,
    available,
    workingRemotely,
    priorityBenefits,
    profession } = req.body;
  if (!wantToWorkAs) {
    return res.json({ err: 'wantToWorkAs is required' })
  }
  if (!cities || cities.length === 0) {
    return res.json({ err: 'cities is required' })
  }
  if (!salary || salary === 0) {
    return res.json({ err: 'salary is required' })
  }
  if (!workingRemotely) {
    return res.json({ err: 'workingRemotely is required' })
  }
  if (!lookingForJob) {
    return res.json({ err: 'lookingForJob is required' })
  }
  if (!available) {
    return res.json({ err: 'available is required' })
  }
  if (!profession) {
    return res.json({ err: 'profession is required' })
  }
  let announce = new Announce();
  announce.wantToWorkAs = wantToWorkAs
  announce.cities = cities
  announce.salary = salary
  announce.lookingForJob = lookingForJob
  announce.available = available
  announce.workingRemotely = workingRemotely
  announce.priorityBenefits = priorityBenefits
  announce.profession = profession
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