const Profession = require('../models/profession')

exports.create = (req, res) => {
  const { name, subProfessions } = req.body;
  console.log(req.body)
  const profession = new Profession({ name, subProfessions })
  profession.save((err, result) => {
    if (err) {
      return res.json({ err })
    }
    return res.json(profession)
  })
}
exports.list = (req, res) => {
  return res.json({ created: 'done' })
}
exports.update = (req, res) => {
  return res.json({ created: 'done' })
}
exports.adminRemoveProfession = (req, res) => {
  const { _id } = req.body;
  Profession.findOneAndRemove({ _id }).exec((err, data) => {
    if (err) {
      return res.json({ err })
    }
    res.json({ message: 'profession deleted successfully' })
  })
}
exports.listRelated = (req, res) => {
  return res.json({ created: 'done' })
}
exports.listSearch = (req, res) => {
  return res.json({ created: 'done' })
}