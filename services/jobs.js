const rp = require('request-promise-native');

class Jobs {
  static async getAll(requestData) {
    const jobsResponse = await rp({ uri: process.env.JOBS_API_URL, json: true });
    const data = {
      fulfillmentText: requestData.queryResult.fulfillmentText,
      fulfillmentMessages: requestData.queryResult.fulfillmentMessages,
    };
    jobsResponse.offers.forEach((job) => {
      data.fulfillmentMessages.push({
        card: {
          title: job.title,
          subtitle: job.location,
          buttons: [
            {
              text: 'Mais detalhes',
              postback: job.careers_url,
            },
          ],
        },
      });
    });
    return data;
  }
}

module.exports = Jobs;
