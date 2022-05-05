const Califications = require('../Model/Califications')

exports.createCalification = async (req, res) => {
  const calification = new Califications(req.body)
  await calification.save()
  res.json(calification)
}
