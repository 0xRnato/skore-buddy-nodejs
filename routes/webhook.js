const Services = require('../helpers/services');

module.exports = async (req, res) => {
  try {
    if (!req.body) return res.sendStatus(400);
    const service = Services.getByIntent(req.body.queryResult.intent.displayName);
    const result = await service.getAll(req.body);
    return res.send(result);
  } catch (err) {
    throw err;
  }
};
