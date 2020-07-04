/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import Twitter from 'twitter-lite';
import config from '../../conf/config';

class Client {
  app: Twitter | undefined;

  constructor() {}

  async start() {
    const user = new Twitter({
      consumer_key: config.TWITTER_CONSUMER_KEY,
      consumer_secret: config.TWITTER_CONSUMER_SECRET,
    });

    const response = await user.getBearerToken();
    this.app = new Twitter({
      consumer_key: config.TWITTER_CONSUMER_KEY,
      consumer_secret: config.TWITTER_CONSUMER_SECRET,
      bearer_token: response.access_token,
    });
  }

  isAuth() {
    return !!this.app;
  }
}

const TwitterClient = new Client();

export default TwitterClient;
