const Qualifications = require('../Model/Qualifications')

exports.createQualifications = async (req, res) => {
  const qualifications = new Qualifications(req.body)
  await qualifications.save()
  res.json(qualifications)
}
