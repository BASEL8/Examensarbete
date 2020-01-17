const Company = require('../models/company')
const Announce = require('../models/announce')
exports.company = (req, res) => {
  return res.json({ created: 'done' })
}
exports.updateCompany = (req, res) => {
  return res.json({ created: 'done' })
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