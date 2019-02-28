const rp = require('request-promise-native');

class Spaces {
  static async getAll(requestData) {
    const spacesResponse = await rp({
      uri: process.env.SPACES_API_URL,
      headers: {
        Authorization: process.env.SPACES_API_TOKEN,
      },
      json: true,
    });
    const data = {
      fulfillmentText: requestData.queryResult.fulfillmentText,
      fulfillmentMessages: requestData.queryResult.fulfillmentMessages,
    };
    spacesResponse.results.forEach((content) => {
      data.fulfillmentMessages.push({
        card: {
          title: content.name,
          subtitle: content.space.name,
          imageUri: content.thumb_url,
        },
      });
    });
    return data;
  }
}

module.exports = Spaces;
