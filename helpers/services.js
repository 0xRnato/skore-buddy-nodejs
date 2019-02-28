class Services {
  static getByIntent(intentName) {
    // eslint-disable-next-line
    const service = require(`../services/${intentName}.js`);
    return service;
  }
}

module.exports = Services;
